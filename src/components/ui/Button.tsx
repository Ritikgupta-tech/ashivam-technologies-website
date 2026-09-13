import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'signal' | 'outline' | 'ghost' | 'on-dark';

interface BaseProps {
  variant?: Variant;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  signal: 'btn-signal',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  'on-dark': 'btn-on-dark',
};

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, ...props }, ref) => (
    <button ref={ref} className={cn(variantClass[variant], className)} {...props} />
  ),
);
Button.displayName = 'Button';

interface ButtonLinkProps extends BaseProps {
  to: string;
  children: ReactNode;
  external?: boolean;
}

export function ButtonLink({ to, variant = 'primary', className, children, external }: ButtonLinkProps) {
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={cn(variantClass[variant], className)}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cn(variantClass[variant], className)}>
      {children}
    </Link>
  );
}
