// mockItems.ts
import type { CartItem } from "./core/useCart";

export const mockItems: CartItem[] = [
  {
    id: "p1",
    name: "Wireless Mouse",
    price: 15.99,
    qty: 2,
    image: "https://picsum.photos/seed/mouse/80/80"
  },
  {
    id: "p2",
    name: "Mechanical Keyboard",
    price: 45.5,
    qty: 1,
    image: "https://picsum.photos/seed/keyboard/80/80"
  },
  {
    id: "p3",
    name: "HD Monitor 24''",
    price: 120.0,
    qty: 1,
    image: "https://picsum.photos/seed/monitor/80/80"
  },
  {
    id: "p4",
    name: "USB-C Hub",
    price: 25.0,
    qty: 3,
    image: "https://picsum.photos/seed/hub/80/80"
  }
];
