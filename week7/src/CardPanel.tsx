import {useCart} from './core/useCart';
import { Button } from './ui/Button';
import { CartItemCard } from './ui/CartItemCart';
export default function CartPanel() {
  const { items, add, update, remove, totalQty, totalPrice } = useCart();

  return (
    <div>
      <Button onClick={() => add({ id:"p1", name:"Product 1", price:19.9, qty:1 })}>Add P1</Button>
      <div className="mt-4 space-y-2">
        {items.map(it => (
          <CartItemCard
            key={it.id}
            item={it}
            onUpdateQty={(q)=>update(it.id, { qty: q })}
            onRemove={()=>remove(it.id)}
          />
        ))}
      </div>
      <div className="mt-4 font-semibold">Items: {totalQty} • Total: ${totalPrice.toFixed(2)}</div>
    </div>
  );
}
