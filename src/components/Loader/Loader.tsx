import styles from "./Loader.module.scss";

export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
