# Ashivam Technologies

<p align="center">
  <img src="public/logo/ashivam-logo.png" alt="Ashivam Technologies Logo" width="280" />
</p>

<h3 align="center">Building Technology. Creating Possibilities.</h3>

<p align="center">
  A premium, responsive corporate website for Ashivam Technologies,
  built with React, TypeScript, Vite and an Express + PostgreSQL backend.
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#technology-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#getting-started">Setup</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## Overview

**Ashivam Technologies** is a modern corporate website designed to present the company’s services, digital solutions, industries, projects and career opportunities through a professional and conversion-focused experience.

The project includes:

- Premium corporate website UI
- Responsive design for all screen sizes
- Service and solution showcase
- Industries and project sections
- Contact inquiry form
- Career application form
- Resume upload functionality
- Express backend API
- PostgreSQL database with Prisma ORM
- Protected admin dashboard
- Lead and application management
- SEO metadata and structured data
- Docker and cloud deployment configuration

> **Company Tagline:** Building Technology. Creating Possibilities.

---

## Website Pages

| Page | Route |
|---|---|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Service Details | `/services/:slug` |
| Solutions | `/solutions` |
| Industries | `/industries` |
| Projects | `/projects` |
| Careers | `/careers` |
| Career Application | `/careers/apply` |
| Contact | `/contact` |
| Privacy Policy | `/privacy-policy` |
| Terms & Conditions | `/terms-and-conditions` |
| Admin Dashboard | `/admin` |
| Not Found | `*` |

---

## Features

### Corporate Website

- Premium dark navy, gold and blue brand theme
- Fully responsive layout
- Modern typography and spacing system
- Reusable React components
- Smooth Framer Motion animations
- Mobile-friendly navigation
- Responsive footer
- Professional call-to-action sections
- Service and solution navigation
- Error boundary support
- Loading, success, error and empty states
- Scroll-to-top functionality
- Cookie consent support

### Interactive Sections

- Interactive service explorer
- Industries explorer
- Featured projects showcase
- Company process/workflow section
- Responsive mobile accordions
- Pointer-reactive hero visual
- Conversion-focused CTA sections
- Professional contact and career experiences

### Contact and Career Forms

- Contact inquiry form
- Career application form
- Resume upload support
- Client-side validation
- Server-side validation
- React Hook Form integration
- Zod validation
- Honeypot spam protection
- Rate limiting
- Idempotency protection
- Success and error feedback

### Admin Dashboard

- Protected admin access
- Contact lead management
- Career application management
- Lead status updates
- Application status updates
- API token authentication
- No public navigation link to admin area
- Admin page configured for `noindex` and `nofollow`

### SEO and Performance

- Page-level SEO metadata
- Canonical URLs
- Open Graph metadata
- Twitter card metadata
- JSON-LD structured data
- Sitemap configuration
- Robots configuration
- Favicon and social preview assets
- Production build support
- ESLint and TypeScript checks
- GitHub Actions workflow

---

## Technology Stack

| Category | Technology |
|---|---|
| Frontend | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Animations | Framer Motion |
| Icons | Lucide React |
| Forms | React Hook Form |
| Validation | Zod |
| SEO | react-helmet-async, JSON-LD |
| Backend | Node.js, Express |
| Backend Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| File Uploads | Multer |
| Email | Resend-ready mailer abstraction |
| Deployment | Render, Netlify, Docker |
| CI/CD | GitHub Actions |
| Runtime | Node.js 18.18+ |

---

## Project Structure

```text
ashivam-technologies-website/
│
├── public/
│   ├── logo/
│   │   ├── ashivam-icon.png
│   │   ├── ashivam-logo.png
│   │   └── favicon-512.png
│   ├── apple-touch-icon.png
│   ├── favicon-32.png
│   ├── favicon.svg
│   ├── og-image.jpg
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── config/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
│
├── server/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.ts
│   ├── uploads/
│   │   └── resumes/
│   ├── Dockerfile
│   └── tsconfig.json
│
├── scripts/
│   └── generate-sitemap.ts
│
├── deploy/
│   └── nginx.conf
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Dockerfile
├── docker-compose.yml
├── eslint.config.js
├── netlify.toml
├── render.yaml
├── package.json
├── package-lock.json
└── README.md
```

---

## Requirements

Before running the project, install:

- Node.js `18.18+`
- npm
- PostgreSQL
- Git
- Optional: Docker Desktop

Check versions:

```bash
node -v
npm -v
git --version
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AshivamTech/ashivam-technologies-website.git
cd ashivam-technologies-website
```

### 2. Install Dependencies

```bash
npm install
```

---

## Environment Configuration

### Frontend Environment

Create a `.env` file in the project root:

```env
VITE_SITE_URL=http://localhost:5173

VITE_CONTACT_API_URL=http://localhost:4000/api/contact
VITE_CAREERS_API_URL=http://localhost:4000/api/careers/apply
VITE_ADMIN_API_URL=http://localhost:4000/api/admin

# Optional Analytics
VITE_GA_MEASUREMENT_ID=
VITE_GTM_CONTAINER_ID=
VITE_META_PIXEL_ID=
```

### Backend Environment

Create `server/.env`:

```env
PORT=4000

CLIENT_ORIGIN=http://localhost:5173

DATABASE_URL=postgresql://ashivam:ashivam@localhost:5432/ashivam?schema=public

ADMIN_API_TOKEN=replace-with-a-long-random-secret

# Email Configuration
EMAIL_PROVIDER=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
RESEND_API_KEY=
```

> Never commit `.env` or `server/.env` files to GitHub.

---

## Database Setup

### Generate Prisma Client

```bash
npm run db:generate
```

### Run Local Migrations

```bash
npm run db:migrate
```

### Run Production Migrations

```bash
npm run db:migrate:deploy
```

### Open Prisma Studio

```bash
npm run db:studio
```

---

## Start the Application

### Start Backend

Open a terminal:

```bash
npm run server
```

Backend URL:

```text
http://localhost:4000
```

Health check:

```text
http://localhost:4000/api/health
```

### Start Frontend

Open another terminal:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the frontend |
| `npm run preview` | Preview the production build |
| `npm run server` | Start the Express backend in watch mode |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check frontend and backend |
| `npm run typecheck:server` | Type-check backend only |
| `npm run format` | Format files with Prettier |
| `npm run sitemap` | Generate the sitemap |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Run local Prisma migrations |
| `npm run db:migrate:deploy` | Apply production migrations |
| `npm run db:studio` | Open Prisma Studio |

---

## API Endpoints

### Public APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | API health check |
| `POST` | `/api/contact` | Submit contact inquiry |
| `POST` | `/api/careers/apply` | Submit career application |

### Admin APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/leads` | Fetch contact leads |
| `PATCH` | `/api/admin/leads/:id` | Update lead status |
| `GET` | `/api/admin/applications` | Fetch career applications |
| `PATCH` | `/api/admin/applications/:id` | Update application status |

Admin requests require:

```http
Authorization: Bearer YOUR_ADMIN_API_TOKEN
```

---

## Admin Dashboard

Open the admin dashboard locally:

```text
http://localhost:5173/admin
```

Use the same token configured in:

```env
ADMIN_API_TOKEN=your-secret-token
```

The admin dashboard supports:

- Viewing contact inquiries
- Managing lead status
- Viewing career applications
- Managing application status
- Reviewing submitted applicant information
- Accessing uploaded resume references

> Keep the admin token private and never expose it in frontend source code.

---

## Database Models

### ContactInquiry

Stores contact form submissions including:

- Full name
- Email
- Phone
- Company
- Requested service
- Budget
- Project details
- Lead status
- Idempotency key
- Created and updated timestamps

### CareerApplication

Stores career applications including:

- Applicant name
- Email
- Phone
- Applied role
- LinkedIn profile
- GitHub profile
- Message
- Application status
- Resume path
- Original resume filename
- Idempotency key
- Created and updated timestamps

---

## Resume Uploads

During local development, uploaded resumes are stored in:

```text
server/uploads/resumes/
```

The upload directory is protected from Git tracking.

For production, use persistent file storage such as:

- Amazon S3
- Cloudinary
- Cloud storage provider
- Persistent hosting disk

> Do not depend on an ephemeral filesystem for production resume storage.

---

## Deployment

### Render

The project includes:

```text
render.yaml
```

The deployment configuration supports:

- Frontend static site
- Express backend
- PostgreSQL database

Deployment steps:

1. Push the project to GitHub.
2. Open Render.
3. Create a new Blueprint.
4. Select the GitHub repository.
5. Review the services from `render.yaml`.
6. Add production environment variables.
7. Configure the frontend API URLs.
8. Configure persistent storage for resumes.
9. Deploy the services.

### Netlify

The project includes:

```text
netlify.toml
```

Recommended build settings:

```text
Build command: npm run build
Publish directory: dist
```

Update the API redirect in `netlify.toml` with your deployed backend URL.

### Docker

Build the frontend image:

```bash
docker build -t ashivam-website .
```

Run the frontend container:

```bash
docker run --rm -p 8080:80 ashivam-website
```

Run the complete stack:

```bash
docker compose up --build
```

Expected services:

```text
Frontend: http://localhost
Backend:  http://localhost:4000
Database: localhost:5432
```

---

## Security Guidelines

- Keep all environment variables private.
- Use a strong random admin token.
- Never expose `DATABASE_URL` to the frontend.
- Configure trusted frontend origins only.
- Enable HTTPS in production.
- Configure a real email provider before launch.
- Configure persistent resume storage.
- Keep dependencies updated.
- Review rate limits before production.
- Rotate admin credentials if exposed.
- Never commit uploaded resumes or secrets.

---

## Quality Checks

Run these commands before pushing changes:

```bash
npm run lint
npm run typecheck
npm run build
```

For backend validation:

```bash
npm run typecheck:server
```

---

## Company Information

| Field | Details |
|---|---|
| Company | Ashivam Technologies |
| Tagline | Building Technology. Creating Possibilities. |
| Location | Agra, India |
| Email | teamashivam@gmail.com |
| GitHub | AshivamTech |
| LinkedIn | Ashivam Technologies |
| Instagram | @ashivamtech |

---

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes.
4. Run quality checks:

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```

5. Commit your changes:

   ```bash
   git commit -m "feat: describe your change"
   ```

6. Push your branch:

   ```bash
   git push origin feature/your-feature
   ```

7. Create a pull request.

---

## License

This project is maintained for **Ashivam Technologies**.

The project license can be added here according to the company’s distribution requirements.

---

<p align="center">
  <strong>Ashivam Technologies</strong>
  <br />
  Building Technology. Creating Possibilities.
</p>
