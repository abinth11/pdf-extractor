import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallbackUI: ReactNode;
  children: ReactNode; // Add the children prop
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state when an error is caught
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to a service or perform other error handling here
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI when an error occurs
      return this.props.fallbackUI;
    }
    // Render the child components when there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
