import { useState } from "react"
import { Link } from "react-router-dom"
import { useMarket } from "../context/MarketContext"
import { money, when } from "../utils/format"

const FILTERS = [
  { id: "all", label: "All" },
  { id: "buy", label: "Buys" },
  { id: "sell", label: "Sells" },
]

export function OrderHistory({ symbol, limit }) {
  const { book } = useMarket()
  const [filter, setFilter] = useState("all")
  const rows = book.orders
    .filter((order) => (symbol ? order.symbol === symbol : true))
    .filter((order) => (filter === "all" ? true : order.side === filter))
    .slice(0, limit || undefined)

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-6">
        <h2 className="font-serif text-3xl">{symbol ? "Recent fills" : "Transaction history"}</h2>
        {limit ? (
          <Link to={symbol ? `/trade/${symbol}` : "/dashboard?view=orders"} className="text-sm font-semibold text-gold hover:text-cream">
            Full history
          </Link>
        ) : (
          <div className="flex rounded-full border border-line p-1" role="tablist" aria-label="Filter orders">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${filter === item.id ? "bg-cream text-ink" : "text-muted hover:text-cream"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {rows.length === 0 ? (
        <p className="px-4 pb-8 text-sm text-muted md:px-6">No paper fills yet. A buy or sell will land here.</p>
      ) : (
        <ul>
          {rows.map((order) => (
            <li key={order.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line px-4 py-3 md:px-6">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${order.side === "buy" ? "bg-mint/15 text-mint" : "bg-coral/15 text-coral"}`}>
                {order.side === "buy" ? "Buy" : "Sell"}
              </span>
              <Link to={`/stock/${order.symbol}`} className="w-16 font-semibold hover:text-gold">
                {order.symbol}
              </Link>
              <span className="font-mono text-sm text-cream">
                {order.qty} @ {money(order.price)}
              </span>
              <span className="ml-auto font-mono text-sm">{money(order.total)}</span>
              <span className="w-full text-xs text-muted sm:w-auto">{when(order.at)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
