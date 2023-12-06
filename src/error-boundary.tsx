import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props<TError> {
  children: ReactNode;
  errorMessage?: string;
  errorElement?: ((error: TError | null) => ReactNode) | ReactNode;
}

interface State<TError> {
  hasError: boolean;
  error: TError | null;
}

export class ErrorBoundary<TError extends Error> extends Component<
  Props<TError>,
  State<TError>
> {
  public state: State<TError> = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(_: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: TError, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          {this.props.errorElement ? (
            typeof this.props.errorElement === "function" ? (
              this.props.errorElement(this.state.error)
            ) : (
              this.props.errorElement
            )
          ) : (
            <div className="y-container flex h-full w-full flex-col items-center justify-center gap-3">
              <p>{this.props.errorMessage ?? "Oops, there is an error!"}</p>
              <pre className="rounded bg-black p-2 text-white">
                {this.state.error?.message ?? "Unknown error occurred."}
              </pre>
              <button
                onClick={() => this.setState({ hasError: false })}
                aria-label="Reload page">
                Try again?
              </button>
            </div>
          )}
        </>
      );
    }

    return this.props.children;
  }
}
