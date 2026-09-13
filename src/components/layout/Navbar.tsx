import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { navLinks } from '@/config/site';
import { services, type ServiceCategory } from '@/data/services';
import { cn } from '@/lib/cn';

const CATEGORY_ORDER: ServiceCategory[] = ['Development', 'Product', 'Intelligence'];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [servicesOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 ease-standard',
        scrolled
          ? 'border-b border-line bg-paper/80 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container>
        <div className="flex h-18 items-center justify-between md:h-20">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Ashivam Technologies — homepage">
            <img
              src="/logo/ashivam-icon.png"
              alt="Ashivam Technologies"
              className="h-10 w-auto shrink-0 transition-transform duration-300 ease-out group-hover:rotate-[4deg] md:h-11"
            />
            <span className="font-display text-lg font-semibold leading-none">Ashivam</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) =>
              link.label === 'Services' ? (
                <div key={link.href} ref={menuRef} className="relative">
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((open) => !open)}
                  >
                    Services
                    <ChevronDown
                      size={14}
                      className={cn('transition-transform duration-200', servicesOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </button>
                  {servicesOpen && (
                    <div
                      role="menu"
                      className="animate-fade-up absolute left-1/2 top-full mt-3 w-[720px] -translate-x-1/2 rounded-md border border-line bg-paper p-6 shadow-lifted"
                      style={{ animationDuration: '180ms' }}
                    >
                      <div className="grid grid-cols-3 gap-8">
                        {CATEGORY_ORDER.map((category) => (
                          <div key={category}>
                            <p className="font-mono text-xs text-slate-500">{category}</p>
                            <div className="mt-3 space-y-1">
                              {services
                                .filter((service) => service.category === category)
                                .map((service) => {
                                  const Icon = service.icon;
                                  return (
                                    <Link
                                      key={service.slug}
                                      to={`/services/${service.slug}`}
                                      role="menuitem"
                                      className="group flex items-start gap-3 rounded px-2 py-2.5 hover:bg-surface"
                                    >
                                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded bg-surface text-ink group-hover:bg-signal group-hover:text-on-signal">
                                        <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
                                      </span>
                                      <span>
                                        <span className="block text-sm font-medium text-ink">{service.name}</span>
                                        <span className="mt-0.5 block text-xs text-slate-500">
                                          {service.shortDescription}
                                        </span>
                                      </span>
                                    </Link>
                                  );
                                })}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                        <p className="text-sm text-slate-600">Looking for something specific?</p>
                        <Link to="/services" role="menuitem" className="link-underline text-sm font-medium">
                          View all services
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded px-4 py-2 text-sm font-medium transition-colors hover:bg-surface',
                      isActive ? 'text-primary' : 'text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-primary" aria-hidden="true" />
                      )}
                    </>
                  )}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />

            <div className="hidden lg:block">
              <Link to="/contact" className="btn-primary">
                Let&rsquo;s Talk
              </Link>
            </div>

            <button
              type="button"
              className="rounded p-2 text-ink lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-line bg-paper md:top-20 lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'rounded px-3 py-4 text-lg font-medium',
                    isActive ? 'bg-surface text-primary' : 'text-ink',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-4 border-t border-line pt-4">
              <p className="px-3 font-mono text-xs text-slate-500">Services</p>
              <div className="mt-2 grid gap-1">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="rounded px-3 py-2.5 text-sm text-slate-700 hover:bg-surface hover:text-ink"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/contact" className="btn-primary mt-6 w-full">
              Let&rsquo;s Talk
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
