import { useState } from "react";
import styles from "./ImageGallery.module.scss";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <img src={images[activeIndex]} alt={alt} />
      </div>
      <div className={styles.thumbRow} role="tablist" aria-label="Product images">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            className={`${styles.thumb} ${i === activeIndex ? styles.active : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            <img src={src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
