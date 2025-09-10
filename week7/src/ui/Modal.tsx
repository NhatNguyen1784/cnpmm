import { Button } from './Button';
export function Modal({ open, onClose, title, children }: { open:boolean; onClose():void; title?:string; children:React.ReactNode }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal className="fixed inset-0 grid place-items-center bg-black/40">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-lg rounded-2xl p-4 shadow-xl">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        {children}
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}