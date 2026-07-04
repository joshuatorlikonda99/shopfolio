import { useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { CartAction, CartItem } from "../types";
import { CartContext, type CartContextValue } from "./CartContext";

const STORAGE_KEY = "shopfolio.cart.v1";


function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function sameLine(a: CartItem, b: { productId: number; color: string; size: string }) {
  return a.productId === b.productId && a.color === b.color && a.size === b.size;
}

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "HYDRATE":
      return action.items;

    case "ADD_ITEM": {
      const existing = state.find((line) => sameLine(line, action.item));
      if (existing) {
        return state.map((line) =>
          sameLine(line, action.item) ? { ...line, quantity: line.quantity + action.item.quantity } : line
        );
      }
      return [...state, action.item];
    }

    case "SET_QUANTITY": {
      return state
        .map((line) => (sameLine(line, action) ? { ...line, quantity: action.quantity } : line))
        .filter((line) => line.quantity > 0);
    }

    case "REMOVE_ITEM":
      return state.filter((line) => !sameLine(line, action));

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);
  const [isDrawerOpen, setDrawerOpen] = useReducer((_: boolean, next: boolean) => next, false);

 
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const itemCount = useMemo(() => items.reduce((sum, line) => sum + line.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0), [items]);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
    removeItem: (productId, color, size) => dispatch({ type: "REMOVE_ITEM", productId, color, size }),
    setQuantity: (productId, color, size, quantity) =>
      dispatch({ type: "SET_QUANTITY", productId, color, size, quantity }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
