import type { StockLevel } from "../../types";
import styles from "./StockMeter.module.scss";

interface StockMeterProps {
  level: StockLevel;
  stock: number;
}

const LABELS: Record<StockLevel, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "sold-out": "Sold out",
};


const FILLED_TICKS: Record<StockLevel, number> = {
  "in-stock": 3,
  "low-stock": 1,
  "sold-out": 0,
};

export function StockMeter({ level, stock }: StockMeterProps) {
  const filled = FILLED_TICKS[level];

  return (
    <div className={`${styles.meter} ${styles[level]}`}>
      <span className={styles.ticks} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`${styles.tick} ${i < filled ? styles.filled : ""}`} />
        ))}
      </span>
      <span className={`${styles.label} mono`}>
        {LABELS[level]}
        {level !== "sold-out" && ` · ${stock} left`}
      </span>
    </div>
  );
}
