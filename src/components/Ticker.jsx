import { Link } from "react-router-dom"
import { useMarket } from "../context/MarketContext"
import { priceOf } from "../utils/format"
import { Change } from "./Change"

export function Ticker() {
  const { indices, quotes } = useMarket()
  const items = [...indices, ...quotes]
  const loop = [...items, ...items]

  return (
    <div className="marquee overflow-hidden border-y border-line bg-panel">
      <div className="marquee-track flex w-max">
        {loop.map((item, index) => {
          const body = (
            <>
              <span className="text-xs font-semibold tracking-wide text-cream">{item.symbol}</span>
              <span className="font-mono text-xs text-muted">{priceOf(item)}</span>
              <Change value={item.change} className="text-xs" />
            </>
          )
          const className = "flex items-center gap-2.5 border-r border-line px-5 py-2.5 whitespace-nowrap"
          if (item.kind === "index") {
            return (
              <span key={`${item.symbol}-${index}`} className={className}>
                {body}
              </span>
            )
          }
          return (
            <Link key={`${item.symbol}-${index}`} to={`/stock/${item.symbol}`} className={`${className} hover:bg-white/5`}>
              {body}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
