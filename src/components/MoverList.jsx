import { Link } from "react-router-dom"
import { useMarket } from "../context/MarketContext"
import { Change } from "./Change"
import { LivePrice } from "./LivePrice"
import { Mark } from "./Mark"
import { Sparkline } from "./Sparkline"

export function MoverList({ rows, empty = "No names in this group right now." }) {
  if (!rows.length) {
    return <p className="px-4 py-8 text-sm text-muted md:px-6">{empty}</p>
  }

  return (
    <ol>
      {rows.map((quote, index) => (
        <li key={quote.symbol} className="border-t border-line first:border-t-0">
          <Link to={`/stock/${quote.symbol}`} className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-white/[0.03] md:px-6">
            <span className="w-5 font-mono text-xs text-muted">{index + 1}</span>
            <Mark symbol={quote.symbol} className="h-9 w-9 rounded-xl text-xs" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{quote.symbol}</span>
              <span className="block truncate text-sm text-muted">{quote.name}</span>
            </span>
            <Sparkline data={quote.spark} up={quote.change >= 0} className="hidden h-8 w-24 sm:block" />
            <span className="text-right">
              <LivePrice quote={quote} className="text-sm" />
              <span className="mt-0.5 block">
                <Change value={quote.change} className="text-xs" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
