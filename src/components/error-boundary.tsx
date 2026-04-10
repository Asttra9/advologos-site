'use client';

import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Advologos] Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          id="main-content"
          className="min-h-screen flex items-center justify-center bg-[#0A0A0A]"
        >
          <div className="text-center px-6">
            <h1 className="font-serif text-[clamp(28px,5vw,48px)] text-[#EDE8E0] mb-4">
              Advologos
            </h1>
            <p className="text-[#C0C4CC] text-[15px] mb-8">
              Algo inesperado aconteceu. Recarregue a página.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-full bg-[#8B1E2D] text-[#EDE8E0] text-[12px] font-bold tracking-[0.1em] uppercase py-3 px-6 border-none cursor-pointer"
            >
              Recarregar
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
