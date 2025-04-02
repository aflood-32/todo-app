interface ErrorDisplayProps {
  error: Error;
  resetError?: () => void;
  className?: string;
}

const ErrorDisplay = ({ error, resetError }: ErrorDisplayProps) => {
  return (
    <div className="generic-error">
      <h2>Unexpected Error</h2>
      <p>{error.message}</p>
      <button onClick={resetError}>Try Again</button>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorDisplay;
