import { Button } from './Button';
export function CartItemCard({ item, onUpdateQty, onRemove }:{
  item: { id:string; name:string; price:number; qty:number; image?:string };
  onUpdateQty:(qty:number)=>void; onRemove:()=>void;
}) {
  return (
    <div className="flex gap-3 p-3 border rounded-2xl">
      {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />}
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        <div className="text-sm opacity-70">${item.price.toFixed(2)}</div>
        <div className="mt-2 flex items-center gap-2">
          <Button onClick={() => onUpdateQty(Math.max(1, item.qty-1))}>-</Button>
          <span>{item.qty}</span>
          <Button onClick={() => onUpdateQty(item.qty+1)}>+</Button>
          <Button className="ml-auto" onClick={onRemove}>Remove</Button>
        </div>
      </div>
    </div>
  );
}