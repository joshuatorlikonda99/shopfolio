import styles from "./ErrorState.module.scss";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className={styles.errorState} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry} type="button">
          Try again
        </button>
      )}
    </div>
  );
}
