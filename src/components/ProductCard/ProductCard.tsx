import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { useCart } from "../../context/useCart";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
}

function firstAvailableSize(product: Product) {
  return product.variants.sizes.find((s) => s.stockLevel !== "sold-out");
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, openDrawer } = useCart();
  const availableSize = firstAvailableSize(product);
  const soldOut = !availableSize;

  const handleQuickAdd = () => {
    if (!availableSize) return;
    addItem({
      productId: product.id,
      title: product.title,
      image: product.image,
      unitPrice: product.price,
      color: product.variants.colors[0]?.name ?? "Default",
      size: availableSize.label,
      quantity: 1,
    });
    openDrawer();
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <img src={product.image} alt={product.title} loading="lazy" />
          {product.variants.originalPrice && <span className={styles.saleTag}>Sale</span>}
          {soldOut && <span className={styles.soldTag}>Sold out</span>}
        </div>
      </Link>

      <div className={styles.info}>
        <p className={styles.brand}>{product.variants.brand}</p>
        <Link to={`/product/${product.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>

        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {product.variants.originalPrice && (
            <span className={styles.originalPrice}>${product.variants.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <button
          type="button"
          className={styles.quickAdd}
          onClick={handleQuickAdd}
          disabled={soldOut}
        >
          {soldOut ? "Sold out" : "Quick add"}
        </button>
      </div>
    </div>
  );
}
