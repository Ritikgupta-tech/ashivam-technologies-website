import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Uncaught application error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-semibold">Something went wrong.</h1>
          <p className="mt-4 max-w-md text-slate-600">
            This page hit an unexpected error. Try reloading — if the problem continues, contact
            us and we will look into it.
          </p>
          <button className="btn-primary mt-8" onClick={() => window.location.assign('/')}>
            Back to homepage
          </button>
        </Container>
      );
    }

    return this.props.children;
  }
}
