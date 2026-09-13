import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/ui/Container';

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
        path="/404"
        noIndex
      />
      <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <span className="font-mono text-sm text-slate-500">Error 404</span>
        <h1 className="mt-4 text-4xl font-semibold text-ink md:text-5xl">This page doesn't exist.</h1>
        <p className="mt-4 max-w-md text-lg text-slate-600">
          The page may have been moved or the link may be out of date. Here are a few places to
          go instead.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            Back to homepage
          </Link>
          <Link to="/contact" className="btn-outline">
            Contact us
          </Link>
        </div>
      </Container>
    </>
  );
}
