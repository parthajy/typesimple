"use client";

import { clsx } from "clsx";

export function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  className,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99]",
        variant === "primary" &&
          "bg-black text-white hover:bg-black/90 disabled:bg-black/40",
        variant === "ghost" &&
          "border border-black/10 bg-white/70 text-zinc-900 hover:bg-white disabled:text-zinc-400 disabled:bg-white/40",
        className
      )}
    >
      {children}
    </button>
  );
}

export function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border px-3 py-1 text-xs transition",
        active
          ? "bg-black text-white border-black"
          : "bg-white/70 border-black/10 text-zinc-800 hover:bg-white"
      )}
    >
      {children}
    </button>
  );
}
