import type { FakeStoreProduct, Product } from "../types";
import { generateVariants } from "../utils/variantGenerator";

const BASE_URL = "https://fakestoreapi.com";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

function attachVariants(product: FakeStoreProduct): Product {
  return { ...product, variants: generateVariants(product) };
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await handleResponse<FakeStoreProduct[]>(res);
  return data.map(attachVariants);
}

export async function fetchProductById(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  const data = await handleResponse<FakeStoreProduct>(res);
  return attachVariants(data);
}

export function mockAddToCartRequest(): Promise<{ ok: true }> {
  return new Promise((resolve, reject) => {
    const delay = 500 + Math.random() * 600;
    setTimeout(() => {
      if (Math.random() < 0.12) {
        reject(new Error("Could not reach the cart service. Try again."));
      } else {
        resolve({ ok: true });
      }
    }, delay);
  });
}
