import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage : string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false , errorMessage : ""};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log(error.message);
    return { hasError: true , errorMessage : error.message};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        // implement error notification soon
        return <h1>
            {this.state.errorMessage}
        </h1>
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
