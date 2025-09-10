// Button.tsx
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-2xl shadow ${className}`}
      {...rest}
    />
  );
}
