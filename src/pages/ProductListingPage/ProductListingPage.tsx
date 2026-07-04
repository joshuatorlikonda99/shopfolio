import { useProducts } from "../../hooks/useProducts";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { Loader } from "../../components/Loader/Loader";
import { ErrorState } from "../../components/ErrorState/ErrorState";
import styles from "./ProductListingPage.module.scss";

export function ProductListingPage() {
  const { products, loading, error } = useProducts();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className="mono">Stock No. 001–{String(products.length).padStart(3, "0")}</p>
        <h1>The full catalog</h1>
      </div>

      {loading && <Loader label="Loading products" />}
      {error && <ErrorState message={error} onRetry={() => window.location.reload()} />}
      {!loading && !error && <ProductGrid products={products} />}
    </div>
  );
}
