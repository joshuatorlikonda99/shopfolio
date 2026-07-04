import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../context/useCart";
import { mockAddToCartRequest } from "../../api/fakeStoreApi";
import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import { ColorSwatch } from "../../components/ColorSwatch/ColorSwatch";
import { SizeButton } from "../../components/SizeButton/SizeButton";
import { QuantityPicker } from "../../components/QuantityPicker/QuantityPicker";
import { StockMeter } from "../../components/StockMeter/StockMeter";
import { Loader } from "../../components/Loader/Loader";
import { ErrorState } from "../../components/ErrorState/ErrorState";
import styles from "./ProductDetailPage.module.scss";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id);
  const { addItem, openDrawer } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const [quantity, setQuantity] = useState(1);
  const [addState, setAddState] = useState<"idle" | "loading" | "error">("idle");

  const urlColor = searchParams.get("color");
  const urlSize = searchParams.get("size");

 
  useEffect(() => {
    if (!product) return;
    const validColor = product.variants.colors.some((c) => c.name === urlColor);
    const validSize = product.variants.sizes.some((s) => s.label === urlSize);

    if (!validColor || !validSize) {
      const nextColor = validColor ? urlColor! : product.variants.colors[0]?.name ?? "";
      const nextSize = validSize
        ? urlSize!
        : product.variants.sizes.find((s) => s.stockLevel !== "sold-out")?.label ??
          product.variants.sizes[0]?.label ??
          "";
      setSearchParams({ color: nextColor, size: nextSize }, { replace: true });
    }
   
  }, [product]);

  if (loading) return <Loader label="Loading product" />;
  if (error || !product) return <ErrorState message={error ?? "Product not found."} />;

  const selectedColor = urlColor ?? product.variants.colors[0]?.name ?? "";
  const selectedSize = urlSize ?? "";
  const sizeOption = product.variants.sizes.find((s) => s.label === selectedSize);
  const soldOut = !sizeOption || sizeOption.stockLevel === "sold-out";
  const maxQty = sizeOption ? Math.max(1, sizeOption.stock) : 1;

  const setColor = (name: string) => setSearchParams({ color: name, size: selectedSize }, { replace: false });
  const setSize = (label: string) => setSearchParams({ color: selectedColor, size: label }, { replace: false });

  const handleAddToCart = async () => {
    if (soldOut) return;
    setAddState("loading");
    try {
      await mockAddToCartRequest();
      addItem({
        productId: product.id,
        title: product.title,
        image: product.image,
        unitPrice: product.price,
        color: selectedColor,
        size: selectedSize,
        quantity,
      });
      setAddState("idle");
      openDrawer();
    } catch {
      setAddState("error");
    }
  };

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        ← Back to catalog
      </Link>

      <div className={styles.layout}>
        <ImageGallery images={product.variants.images} alt={product.title} />

        <div className={styles.details}>
          <p className={styles.brand}>{product.variants.brand}</p>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            {product.variants.originalPrice && (
              <span className={styles.originalPrice}>${product.variants.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <section className={styles.field}>
            <p className={styles.fieldLabel}>
              Colour <span className="mono">{selectedColor}</span>
            </p>
            <ColorSwatch colors={product.variants.colors} selected={selectedColor} onSelect={setColor} />
          </section>

          <section className={styles.field}>
            <p className={styles.fieldLabel}>Size</p>
            <div className={styles.sizeRow} role="radiogroup" aria-label="Size">
              {product.variants.sizes.map((option) => (
                <SizeButton
                  key={option.label}
                  option={option}
                  selected={option.label === selectedSize}
                  onSelect={setSize}
                />
              ))}
            </div>
            {sizeOption && <StockMeter level={sizeOption.stockLevel} stock={sizeOption.stock} />}
          </section>

          <section className={styles.field}>
            <p className={styles.fieldLabel}>Quantity</p>
            <QuantityPicker quantity={quantity} onChange={setQuantity} max={maxQty} disabled={soldOut} />
          </section>

          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddToCart}
            disabled={soldOut || addState === "loading"}
          >
            {soldOut ? "Sold out" : addState === "loading" ? "Adding…" : "Add to cart"}
          </button>

          {addState === "error" && (
            <p className={styles.addError} role="alert">
              Couldn't add this to your cart. <button type="button" onClick={handleAddToCart}>Try again</button>
            </p>
          )}

          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </div>
  );
}