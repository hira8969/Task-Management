import React from 'react';
import Button from '../ui/Button.jsx';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-mesh p-6">
          <section className="glass-panel max-w-md rounded-xl p-8 text-center">
            <h1 className="text-2xl font-black">Something went sideways.</h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">The app caught the error before it reached your work.</p>
            <Button className="mt-6" onClick={() => window.location.reload()}>Reload</Button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}
