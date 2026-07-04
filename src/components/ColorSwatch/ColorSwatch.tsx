import type { ColorOption } from "../../types";
import styles from "./ColorSwatch.module.scss";

interface ColorSwatchProps {
  colors: ColorOption[];
  selected: string;
  onSelect: (name: string) => void;
}

export function ColorSwatch({ colors, selected, onSelect }: ColorSwatchProps) {
  return (
    <div className={styles.row} role="radiogroup" aria-label="Colour">
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          role="radio"
          aria-checked={color.name === selected}
          title={color.name}
          className={`${styles.swatch} ${color.name === selected ? styles.selected : ""}`}
          style={{ backgroundColor: color.hex }}
          onClick={() => onSelect(color.name)}
        >
          <span className="visually-hidden">{color.name}</span>
        </button>
      ))}
    </div>
  );
}
