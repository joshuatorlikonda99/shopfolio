import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const { itemCount, openDrawer } = useCart();

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          Shopfolio
        </Link>

        <button
          type="button"
          className={styles.cartButton}
          onClick={openDrawer}
          aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 4h2l1.6 9.6a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L19.5 8H6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
            <circle cx="17" cy="20" r="1.4" fill="currentColor" />
          </svg>
          {itemCount > 0 && (
            <span className={`${styles.badge} mono`} aria-hidden="true">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
