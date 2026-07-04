import type { ColorOption, FakeStoreProduct, ProductVariants, SizeOption, StockLevel } from "../types";

const COLOR_PALETTE: ColorOption[] = [
  { name: "Black", hex: "#16181c" },
  { name: "Stone", hex: "#a9a297" },
  { name: "Forest", hex: "#2f6f4e" },
  { name: "Rust", hex: "#a85327" },
  { name: "Navy", hex: "#1f3350" },
  { name: "Ivory", hex: "#f0ece1" },
];

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"];
const JEWELERY_SIZES = ["One Size"];
const ELECTRONICS_SIZES = ["Standard"];

const BRANDS = ["Northgate", "Ferro & Vale", "Kestrel", "Aldwych Supply Co.", "Marrow", "Basalt Studio"];

function seededRandom(seed: number) {
 
  let t = seed + 0x6d2b79f5;
  return function () {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stockLevelFor(count: number): StockLevel {
  if (count === 0) return "sold-out";
  if (count <= 3) return "low-stock";
  return "in-stock";
}

function sizesForCategory(category: string, rand: () => number): SizeOption[] {
  const isClothing = category.includes("clothing");
  const labels = isClothing ? CLOTHING_SIZES : category === "jewelery" ? JEWELERY_SIZES : ELECTRONICS_SIZES;

  return labels.map((label) => {
    
    const roll = rand();
    const count = roll < 0.15 ? 0 : roll < 0.35 ? Math.floor(rand() * 3) + 1 : Math.floor(rand() * 12) + 4;
    return { label, stock: count, stockLevel: stockLevelFor(count) };
  });
}

function colorsForProduct(rand: () => number): ColorOption[] {
  const count = 2 + Math.floor(rand() * 3); 
  const shuffled = [...COLOR_PALETTE].sort(() => rand() - 0.5);
  return shuffled.slice(0, count);
}

export function generateVariants(product: FakeStoreProduct): ProductVariants {
  const rand = seededRandom(product.id * 7919);
  const onSale = rand() < 0.35;
  const originalPrice = onSale ? Math.round(product.price * (1 + 0.15 + rand() * 0.25) * 100) / 100 : null;
  const brand = BRANDS[product.id % BRANDS.length];

  return {
    colors: colorsForProduct(rand),
    sizes: sizesForCategory(product.category, rand),
    originalPrice,
    brand,
    images: [product.image, product.image, product.image],
  };
}
