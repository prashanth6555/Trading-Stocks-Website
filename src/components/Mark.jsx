import { colorFor } from "../data/market"

export function Mark({ symbol, className = "h-10 w-10 text-sm" }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-2xl font-bold text-ink ${className}`}
      style={{ background: colorFor(symbol) }}
      aria-hidden="true"
    >
      {symbol.slice(0, 2)}
    </span>
  )
}
