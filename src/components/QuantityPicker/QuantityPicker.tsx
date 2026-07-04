import styles from "./QuantityPicker.module.scss";

interface QuantityPickerProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantityPicker({ quantity, onChange, min = 1, max = 99, disabled }: QuantityPickerProps) {
  const decrease = () => onChange(Math.max(min, quantity - 1));
  const increase = () => onChange(Math.min(max, quantity + 1));

  return (
    <div className={styles.picker} data-disabled={disabled || undefined}>
      <button
        type="button"
        className={styles.step}
        onClick={decrease}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={`${styles.value} mono`} aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className={styles.step}
        onClick={increase}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
