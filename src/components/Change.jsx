import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { pct } from "../utils/format"

export function Change({ value, className = "" }) {
  const up = value >= 0
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <span className={`inline-flex items-center gap-0.5 font-mono text-sm tabular-nums ${up ? "text-mint" : "text-coral"} ${className}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {pct(value)}
    </span>
  )
}
