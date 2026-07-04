import type { SizeOption } from "../../types";
import styles from "./SizeButton.module.scss";

interface SizeButtonProps {
  option: SizeOption;
  selected: boolean;
  onSelect: (label: string) => void;
}

export function SizeButton({ option, selected, onSelect }: SizeButtonProps) {
  const soldOut = option.stockLevel === "sold-out";

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={soldOut}
      className={`${styles.sizeButton} ${selected ? styles.selected : ""} ${styles[option.stockLevel]}`}
      onClick={() => onSelect(option.label)}
      title={soldOut ? `${option.label} — sold out` : option.label}
    >
      {option.label}
      {option.stockLevel === "low-stock" && <span className={styles.lowDot} aria-hidden="true" />}
    </button>
  );
}
