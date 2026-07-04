import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { QuantityPicker } from "../QuantityPicker/QuantityPicker";
import styles from "./CartDrawer.module.scss";

export function CartDrawer() {
  const { items, subtotal, isDrawerOpen, closeDrawer, setQuantity, removeItem } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeDrawer}>
      <aside
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className={styles.header}>
          <h2>Your cart</h2>
          <button type="button" className={styles.close} onClick={closeDrawer} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty.</p>
            <Link to="/" onClick={closeDrawer} className={styles.browseLink}>
              Browse products →
            </Link>
          </div>
        ) : (
          <>
            <ul className={styles.lines}>
              {items.map((line) => (
                <li key={`${line.productId}-${line.color}-${line.size}`} className={styles.line}>
                  <img src={line.image} alt={line.title} className={styles.thumb} />
                  <div className={styles.lineInfo}>
                    <p className={styles.lineTitle}>{line.title}</p>
                    <p className={`${styles.lineVariant} mono`}>
                      {line.color} · {line.size}
                    </p>
                    <p className={styles.linePrice}>${line.unitPrice.toFixed(2)}</p>

                    <div className={styles.lineControls}>
                      <QuantityPicker
                        quantity={line.quantity}
                        onChange={(q) => setQuantity(line.productId, line.color, line.size, q)}
                        max={20}
                      />
                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() => removeItem(line.productId, line.color, line.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span className="mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span className="mono">${subtotal.toFixed(2)}</span>
              </div>
              <button type="button" className={styles.checkout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
