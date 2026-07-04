import type { Product } from "../../types";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.scss";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return <p className={styles.empty}>No products to show.</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
