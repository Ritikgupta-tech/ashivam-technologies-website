import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';

/**
 * Internal admin tool — not linked from public navigation, excluded
 * from the sitemap, and disallowed in robots.txt. Access control is
 * the same bearer token the /api/admin/* API already requires (see
 * server/src/middleware/adminAuth.ts): there is no separate user
 * login system, so anyone who holds ADMIN_API_TOKEN can use this page.
 * The token is kept in sessionStorage only (cleared when the tab
 * closes) and is never sent anywhere except this deployment's own API.
 */

const TOKEN_KEY = 'ashivam_admin_token';

type Tab = 'leads' | 'applications';

type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED' | 'SPAM';
type ApplicationStatus = 'RECEIVED' | 'REVIEWING' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';

interface Lead {
  id: string;
  fullName: string;
  workEmail: string;
  phone: string | null;
  company: string | null;
  service: string;
  budget: string | null;
  projectDetails: string;
  status: LeadStatus;
  createdAt: string;
}

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  linkedin: string | null;
  github: string | null;
  message: string | null;
  status: ApplicationStatus;
  resumeUrl: string | null;
  resumeFileName: string | null;
  createdAt: string;
}

const LEAD_STATUSES: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'SPAM'];
const APPLICATION_STATUSES: ApplicationStatus[] = ['RECEIVED', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED'];

export function AdminPage() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));

  return (
    <>
      <Helmet>
        <title>Admin — Ashivam Technologies</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-paper px-4 py-10 text-ink sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="eyebrow">Internal tool</p>
              <h1 className="mt-1 text-2xl font-semibold">Leads & applications</h1>
            </div>
            {token && (
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  sessionStorage.removeItem(TOKEN_KEY);
                  setToken(null);
                }}
              >
                Log out
              </button>
            )}
          </div>

          {token ? (
            <Dashboard token={token} onUnauthorized={() => { sessionStorage.removeItem(TOKEN_KEY); setToken(null); }} />
          ) : (
            <TokenGate onSubmit={(value) => { sessionStorage.setItem(TOKEN_KEY, value); setToken(value); }} />
          )}
        </div>
      </div>
    </>
  );
}

function TokenGate({ onSubmit }: { onSubmit: (token: string) => void }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (value.trim()) onSubmit(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="card mx-auto max-w-md">
      <label htmlFor="admin-token" className="field-label">Admin API token</label>
      <input
        id="admin-token"
        type="password"
        className="field-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste the ADMIN_API_TOKEN value"
        autoComplete="off"
      />
      <p className="mt-2 text-sm text-slate-600">
        This is the same value set as <code className="font-mono text-xs">ADMIN_API_TOKEN</code> in the
        server environment. It's kept only in this tab's session storage.
      </p>
      <button type="submit" className="btn-primary mt-4 w-full">Continue</button>
    </form>
  );
}

function Dashboard({ token, onUnauthorized }: { token: string; onUnauthorized: () => void }) {
  const [tab, setTab] = useState<Tab>('leads');

  return (
    <div>
      <div className="mb-6 flex gap-2 border-b border-line">
        {(['leads', 'applications'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-3 text-sm font-medium capitalize transition-colors ${
              tab === t ? 'border-signal text-signal' : 'border-transparent text-slate-600 hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'leads' ? (
        <LeadsPanel token={token} onUnauthorized={onUnauthorized} />
      ) : (
        <ApplicationsPanel token={token} onUnauthorized={onUnauthorized} />
      )}
    </div>
  );
}

/**
 * The origin (protocol + host, no path) the admin API is served from.
 * siteConfig.adminApiUrl can be either a same-origin relative path
 * (local dev: "/api/admin", proxied by Vite) or an absolute cross-origin
 * URL (production: "https://ashivam-api.onrender.com/api/admin", since
 * the frontend is on Vercel and the API is on Render). `new URL(...,
 * window.location.origin)` normalizes both cases to a real origin.
 */
function apiOrigin(): string {
  return new URL(siteConfig.adminApiUrl, window.location.origin).origin;
}

function useAdminFetch(token: string, onUnauthorized: () => void) {
  // The low-level fetch, shared by both call shapes below: it always
  // takes a fully-qualified URL, attaches the bearer token, and centralizes
  // the 401 -> log-out behavior.
  const fetchFromApi = useCallback(
    async (url: string, init?: RequestInit) => {
      const response = await fetch(url, {
        ...init,
        headers: {
          ...(init?.headers || {}),
          Authorization: `Bearer ${token}`,
          ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
        },
      });
      if (response.status === 401) {
        onUnauthorized();
        throw new Error('Unauthorized');
      }
      return response;
    },
    [token, onUnauthorized],
  );

  // Convenience wrapper for the common case: a path relative to
  // siteConfig.adminApiUrl, e.g. adminFetch('/leads?page=1').
  const adminFetch = useCallback(
    (path: string, init?: RequestInit) => fetchFromApi(`${siteConfig.adminApiUrl}${path}`, init),
    [fetchFromApi],
  );

  return { adminFetch, fetchFromApi };
}

function LeadsPanel({ token, onUnauthorized }: { token: string; onUnauthorized: () => void }) {
  const { adminFetch } = useAdminFetch(token, onUnauthorized);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const load = useCallback(
    async (targetPage: number) => {
      setStatus('loading');
      try {
        const response = await adminFetch(`/leads?page=${targetPage}`);
        if (!response.ok) throw new Error('failed');
        const body = await response.json();
        setLeads(body.data);
        setTotal(body.total);
        setPage(targetPage);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    },
    [adminFetch],
  );

  useEffect(() => {
    load(1);
  }, [load]);

  const updateStatus = async (id: string, newStatus: LeadStatus) => {
    const previous = leads;
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead)));
    try {
      const response = await adminFetch(`/leads/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('failed');
    } catch {
      setLeads(previous);
    }
  };

  if (status === 'loading') return <LoadingState label="Loading leads" />;
  if (status === 'error') return <ErrorState message="Could not load leads. Check the token and try again." onRetry={() => load(page)} />;
  if (leads.length === 0) return <EmptyState title="No contact inquiries yet" />;

  return (
    <div>
      <div className="overflow-x-auto rounded-md border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <Th>Received</Th>
              <Th>Name</Th>
              <Th>Contact</Th>
              <Th>Service</Th>
              <Th>Details</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <Td>{new Date(lead.createdAt).toLocaleDateString()}</Td>
                <Td>
                  {lead.fullName}
                  {lead.company && <span className="block text-xs text-slate-500">{lead.company}</span>}
                </Td>
                <Td>
                  <a href={`mailto:${lead.workEmail}`} className="link-underline">{lead.workEmail}</a>
                  {lead.phone && <span className="block text-xs text-slate-500">{lead.phone}</span>}
                </Td>
                <Td>{lead.service}</Td>
                <Td className="max-w-xs truncate" title={lead.projectDetails}>{lead.projectDetails}</Td>
                <Td>
                  <StatusSelect
                    value={lead.status}
                    options={LEAD_STATUSES}
                    onChange={(next) => updateStatus(lead.id, next as LeadStatus)}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={total} pageSize={50} onChange={load} />
    </div>
  );
}

function ApplicationsPanel({ token, onUnauthorized }: { token: string; onUnauthorized: () => void }) {
  const { adminFetch, fetchFromApi } = useAdminFetch(token, onUnauthorized);
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [downloadErrors, setDownloadErrors] = useState<Record<string, string>>({});

  const load = useCallback(
    async (targetPage: number) => {
      setStatus('loading');
      try {
        const response = await adminFetch(`/applications?page=${targetPage}`);
        if (!response.ok) throw new Error('failed');
        const body = await response.json();
        setApplications(body.data);
        setTotal(body.total);
        setPage(targetPage);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    },
    [adminFetch],
  );

  useEffect(() => {
    load(1);
  }, [load]);

  const updateStatus = async (id: string, newStatus: ApplicationStatus) => {
    const previous = applications;
    setApplications((current) => current.map((app) => (app.id === id ? { ...app, status: newStatus } : app)));
    try {
      const response = await adminFetch(`/applications/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('failed');
    } catch {
      setApplications(previous);
    }
  };

  const downloadResume = async (app: Application) => {
    if (!app.resumeUrl) return;

    setDownloadErrors((current) => {
      const { [app.id]: _drop, ...rest } = current;
      return rest;
    });

    try {
      // app.resumeUrl is already the full API path (e.g.
      // "/api/admin/resumes/<key>"), returned as-is by the backend — it
      // must be requested against the admin API's origin directly, not
      // re-prefixed with siteConfig.adminApiUrl (which already ends in
      // "/api/admin" and would double that segment whenever adminApiUrl
      // is an absolute, cross-origin URL, as it is in production).
      const response = await fetchFromApi(`${apiOrigin()}${app.resumeUrl}`);
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message || `Download failed (HTTP ${response.status}).`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = app.resumeFileName || 'resume';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Download failed.';
      console.error('[admin] resume download failed:', app.id, message);
      setDownloadErrors((current) => ({ ...current, [app.id]: message }));
    }
  };

  if (status === 'loading') return <LoadingState label="Loading applications" />;
  if (status === 'error') return <ErrorState message="Could not load applications. Check the token and try again." onRetry={() => load(page)} />;
  if (applications.length === 0) return <EmptyState title="No career applications yet" />;

  return (
    <div>
      <div className="overflow-x-auto rounded-md border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <Th>Received</Th>
              <Th>Name</Th>
              <Th>Contact</Th>
              <Th>Role</Th>
              <Th>Links</Th>
              <Th>Resume</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {applications.map((app) => (
              <tr key={app.id}>
                <Td>{new Date(app.createdAt).toLocaleDateString()}</Td>
                <Td>{app.fullName}</Td>
                <Td>
                  <a href={`mailto:${app.email}`} className="link-underline">{app.email}</a>
                  <span className="block text-xs text-slate-500">{app.phone}</span>
                </Td>
                <Td>{app.role}</Td>
                <Td>
                  <div className="flex flex-col gap-1 text-xs">
                    {app.linkedin && <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline">LinkedIn</a>}
                    {app.github && <a href={app.github} target="_blank" rel="noopener noreferrer" className="link-underline">GitHub</a>}
                  </div>
                </Td>
                <Td>
                  {app.resumeUrl ? (
                    <div className="flex flex-col items-start gap-1">
                      <button type="button" className="link-underline text-xs" onClick={() => downloadResume(app)}>
                        Download
                      </button>
                      {downloadErrors[app.id] && (
                        <span className="text-xs text-red-600">{downloadErrors[app.id]}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500">Not provided</span>
                  )}
                </Td>
                <Td>
                  <StatusSelect
                    value={app.status}
                    options={APPLICATION_STATUSES}
                    onChange={(next) => updateStatus(app.id, next as ApplicationStatus)}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={total} pageSize={50} onChange={load} />
    </div>
  );
}

function Th({ children }: { children: ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}

function Td({ children, className, title }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <td className={`px-4 py-3 align-top text-slate-700 ${className || ''}`} title={title}>
      {children}
    </td>
  );
}

function StatusSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="rounded border border-line bg-surface px-2 py-1.5 text-xs text-ink focus:border-primary focus:ring-1 focus:ring-primary"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}

function Pagination({
  page,
  total,
  pageSize,
  onChange,
}: {
  page: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
      <span>Page {page} of {totalPages} — {total} total</span>
      <div className="flex gap-2">
        <button type="button" className="btn-outline" disabled={page <= 1} onClick={() => onChange(page - 1)}>
          Previous
        </button>
        <button type="button" className="btn-outline" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
