
import './App.css'
import { useCart } from './core/useCart';
import { mockItems } from './mockItem';
import { CartItemCard } from './ui/CartItemCart';

function App() {
  const { items, add, update, remove, totalQty, totalPrice } = useCart(mockItems);

  return (
    <div className="p-4 space-y-3">
      <div className="flex-row">
        {items.map(it => (
          <CartItemCard
            key={it.id}
            item={it}
            onUpdateQty={q => update(it.id, { qty: q })}
            onRemove={() => remove(it.id)}
          />
        ))}
      </div>
      <div className="font-semibold">
        Total items: {totalQty} • Total price: ${totalPrice.toFixed(2)}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-xl"
        onClick={() => add({ id: "p5", name: "Bluetooth Speaker", price: 35, qty: 1 })}
      >
        Add Speaker
      </button>
    </div>
  );
}

export default App
