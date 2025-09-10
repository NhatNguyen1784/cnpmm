// useCart.ts
import { useState } from 'react';
export type CartItem = { id: string; name: string; price: number; qty: number; image?: string; meta?: Record<string, any> };

export function useCart(initial?: CartItem[]) {
  const [items, setItems] = useState<CartItem[]>(initial ?? []);
  const add = (item: CartItem) => setItems(prev => {
    const i = prev.findIndex(p => p.id === item.id);
    if (i >= 0) { const copy = [...prev]; copy[i] = { ...copy[i], qty: copy[i].qty + item.qty }; return copy; }
    return [...prev, item];
  });
  const update = (id: string, patch: Partial<CartItem>) =>
    setItems(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
  const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);
  const totalQty = items.reduce((s, it) => s + it.qty, 0);
  const totalPrice = items.reduce((s, it) => s + it.qty * it.price, 0);
  return { items, add, update, remove, clear, totalQty, totalPrice };
}
