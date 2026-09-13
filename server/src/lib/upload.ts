import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import multer from 'multer';

/**
 * Resume storage abstraction.
 *
 * STORAGE_PROVIDER selects the backend the same way EMAIL_PROVIDER
 * selects a mail provider in services/mailer.ts:
 *
 *   - "local" (default when unset): resumes are written to local disk
 *     under server/uploads/resumes. Only fine for local development,
 *     or a single-instance deployment with a persistent volume/disk
 *     attached. Render's free/standard web services have an EPHEMERAL
 *     filesystem — anything written here is wiped on every deploy and
 *     every restart, and is invisible to any other instance. Do not
 *     use this provider in production on Render unless a paid instance
 *     with a persistent disk is attached (see the commented `disk:`
 *     block in render.yaml).
 *
 *   - "cloudinary": upload resumes as raw assets to Cloudinary. This is
 *     the production-ready provider for this project — persistent,
 *     works across restarts/redeploys and multiple instances, no extra
 *     infrastructure to provision. To activate:
 *       1. Create a free Cloudinary account (or use an existing one)
 *          and grab the Cloud name / API key / API secret from the
 *          dashboard.
 *       2. Set on the API host (e.g. Render):
 *            STORAGE_PROVIDER=cloudinary
 *            CLOUDINARY_CLOUD_NAME=...
 *            CLOUDINARY_API_KEY=...
 *            CLOUDINARY_API_SECRET=...
 *       3. `npm install` (the `cloudinary` package is already listed in
 *          package.json).
 *
 *   - "s3": upload to an S3-compatible bucket (AWS S3, Cloudflare R2,
 *     Backblaze B2, etc). To activate:
 *       1. Set STORAGE_PROVIDER=s3 and fill in the S3_* variables.
 *       2. Install the SDK: npm install @aws-sdk/client-s3
 *       3. Uncomment the implementation in saveResumeToS3 /
 *          readResumeFromS3 / deleteResumeFromS3 below.
 *     (Kept as a documented option for later; not wired up to real
 *     infrastructure in this project today — use "cloudinary" instead
 *     unless you specifically need S3.)
 *
 * Every consumer of this module (routes/careers.ts, routes/admin.ts)
 * talks only to the functions exported below — never to fs, Cloudinary,
 * or an S3 client directly — so switching STORAGE_PROVIDER never
 * requires touching a route handler. Multer is always configured with
 * memoryStorage() so the raw bytes are available in req.file.buffer
 * regardless of which backend is active; nothing ever touches local
 * disk unless the "local" provider is the one actually persisting it,
 * and — see routes/careers.ts — a resume is only handed to the active
 * provider once the database write that references it has actually
 * succeeded, so a validation failure or a duplicate/retried
 * submission never leaves an orphaned file behind on any backend.
 */

const STORAGE_PROVIDER = process.env.STORAGE_PROVIDER || 'local';

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'ashivam-resumes';

const UPLOAD_DIR = path.resolve(process.cwd(), 'server', 'uploads', 'resumes');

if (STORAGE_PROVIDER === 'local' && !existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR, { recursive: true });
}

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.doc', '.docx']);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB, matches the frontend's stated limit

export const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
    files: 1,
  },
  fileFilter(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(file.mimetype) || !ALLOWED_EXTENSIONS.has(ext)) {
      cb(new Error('INVALID_FILE_TYPE'));
      return;
    }
    cb(null, true);
  },
});

/**
 * A random, safe storage key derived from the uploaded file's original
 * name — never trust the client-supplied name itself (it can contain
 * path separators or collide with another upload); only its extension
 * is kept, and only if it's on the allow-list.
 */
export function resumeKeyFor(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase();
  const safeExt = ALLOWED_EXTENSIONS.has(ext) ? ext : '';
  return `${randomUUID()}${safeExt}`;
}

/** The URL the admin API serves this resume from — never a public static file. */
export function resumeUrlFor(key: string): string {
  return `/api/admin/resumes/${key}`;
}

/**
 * A resume key is always exactly what resumeKeyFor() produces: a UUID
 * plus an optional allow-listed extension. Validating against this
 * shape (rather than just blocking "/", "\\", "..") is provider-agnostic
 * — it protects the local filesystem path AND the Cloudinary/S3 object
 * key the same way — and rejects anything that isn't a key this server
 * itself ever generated.
 */
const RESUME_KEY_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(\.pdf|\.doc|\.docx)?$/i;

export function isSafeResumeKey(key: string): boolean {
  if (!key || !RESUME_KEY_PATTERN.test(key)) {
    return false;
  }
  if (STORAGE_PROVIDER === 'local') {
    // Extra defense-in-depth for the filesystem provider specifically:
    // confirm the resolved path still lands inside UPLOAD_DIR.
    const resolved = path.resolve(UPLOAD_DIR, key);
    return resolved === path.join(UPLOAD_DIR, key) && resolved.startsWith(UPLOAD_DIR);
  }
  return true;
}

export async function saveResume(key: string, buffer: Buffer): Promise<void> {
  if (STORAGE_PROVIDER === 'cloudinary') {
    return saveResumeToCloudinary(key, buffer);
  }
  if (STORAGE_PROVIDER === 's3') {
    return saveResumeToS3(key, buffer);
  }
  await writeFile(path.join(UPLOAD_DIR, key), buffer);
}

export async function readResume(key: string): Promise<Buffer> {
  if (STORAGE_PROVIDER === 'cloudinary') {
    return readResumeFromCloudinary(key);
  }
  if (STORAGE_PROVIDER === 's3') {
    return readResumeFromS3(key);
  }
  return readFile(path.join(UPLOAD_DIR, key));
}

/** Not currently called by any route (nothing deletes an application yet), but part of the storage contract so a future admin "delete" action needs no provider-specific code. */
export async function deleteResume(key: string): Promise<void> {
  if (STORAGE_PROVIDER === 'cloudinary') {
    return deleteResumeFromCloudinary(key);
  }
  if (STORAGE_PROVIDER === 's3') {
    return deleteResumeFromS3(key);
  }
  await unlink(path.join(UPLOAD_DIR, key)).catch(() => undefined);
}

/**
 * Lazily configures and returns the Cloudinary SDK client. Dynamic
 * import mirrors the pattern in services/mailer.ts: the dependency is
 * only touched when this provider is actually selected.
 */
async function getCloudinaryClient() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      '[storage] CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must all be set when STORAGE_PROVIDER=cloudinary.',
    );
  }

  const { v2: cloudinaryClient } = await import('cloudinary');
  cloudinaryClient.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
  return cloudinaryClient;
}

async function saveResumeToCloudinary(key: string, buffer: Buffer): Promise<void> {
  const cloudinaryClient = await getCloudinaryClient();

  await new Promise<void>((resolve, reject) => {
    const stream = cloudinaryClient.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: CLOUDINARY_FOLDER,
        // Keep the same key used everywhere else (DB, admin route) as
        // the Cloudinary public_id, so there is exactly one identifier
        // for a given resume across the whole system.
        public_id: key,
        use_filename: false,
        unique_filename: false,
        overwrite: true,
      },
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      },
    );
    stream.end(buffer);
  });
}

async function readResumeFromCloudinary(key: string): Promise<Buffer> {
  const cloudinaryClient = await getCloudinaryClient();
  const publicId = `${CLOUDINARY_FOLDER}/${key}`;
  const fileUrl = cloudinaryClient.url(publicId, { resource_type: 'raw', secure: true });

  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`[storage] Cloudinary returned ${response.status} for raw asset "${publicId}".`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function deleteResumeFromCloudinary(key: string): Promise<void> {
  const cloudinaryClient = await getCloudinaryClient();
  const publicId = `${CLOUDINARY_FOLDER}/${key}`;
  await cloudinaryClient.uploader.destroy(publicId, { resource_type: 'raw' }).catch((error) => {
    console.error('[storage] failed to delete Cloudinary raw asset:', publicId, error);
  });
}

async function saveResumeToS3(key: string, _buffer: Buffer): Promise<void> {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) {
    console.warn('[storage] S3_BUCKET is not set. Resume was not persisted.');
    return;
  }
  // Uncomment once "@aws-sdk/client-s3" is installed:
  //
  // const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
  // const client = new S3Client({ region: process.env.S3_REGION });
  // await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: _buffer }));
  console.info(`[storage] S3 configured but the SDK call is commented out. See lib/upload.ts. (key: ${key})`);
}

async function readResumeFromS3(key: string): Promise<Buffer> {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) {
    throw new Error('S3_BUCKET is not set.');
  }
  // Uncomment once "@aws-sdk/client-s3" is installed:
  //
  // const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3');
  // const client = new S3Client({ region: process.env.S3_REGION });
  // const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  // return Buffer.from(await response.Body!.transformToByteArray());
  throw new Error(`S3 storage configured but the SDK call is commented out. See lib/upload.ts. (key: ${key})`);
}

async function deleteResumeFromS3(key: string): Promise<void> {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) return;
  // Uncomment once "@aws-sdk/client-s3" is installed:
  //
  // const { S3Client, DeleteObjectCommand } = await import('@aws-sdk/client-s3');
  // const client = new S3Client({ region: process.env.S3_REGION });
  // await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  console.info(`[storage] S3 configured but the delete SDK call is commented out. (key: ${key})`);
}
