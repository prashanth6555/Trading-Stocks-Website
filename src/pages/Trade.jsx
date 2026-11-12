import { Link, useParams, useSearchParams } from "react-router-dom"
import { Change } from "../components/Change"
import { LivePrice } from "../components/LivePrice"
import { Mark } from "../components/Mark"
import { OrderHistory } from "../components/OrderHistory"
import { OrderTicket } from "../components/OrderTicket"
import { SectionHeading } from "../components/SectionHeading"
import { useMarket } from "../context/MarketContext"
import { useTitle } from "../utils/useTitle"

export function Trade() {
  const params = useParams()
  const [search] = useSearchParams()
  const symbol = (params.symbol || "").toUpperCase()
  const { quotes, quoteMap } = useMarket()
  const quote = symbol ? quoteMap[symbol] : null
  const side = search.get("side") === "sell" ? "sell" : "buy"
  useTitle(symbol ? `Trade ${symbol} — NexTrade` : "Trade — NexTrade")

  if (!symbol || !quote) {
    return (
      <div>
        {symbol ? <p className="px-4 pt-6 text-sm text-coral md:px-6">{symbol} is not on this desk. Choose another name.</p> : null}
        <SectionHeading eyebrow="Trade" title="Choose a name to buy or sell.">
          Paper orders fill at the price you type. The summary updates before you confirm.
        </SectionHeading>
        <div className="grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {quotes.map((item) => (
            <Link key={item.symbol} to={`/trade/${item.symbol}?side=buy`} className="flex items-center justify-between gap-3 bg-ink px-4 py-4 transition hover:bg-panel md:px-5">
              <span className="flex min-w-0 items-center gap-3">
                <Mark symbol={item.symbol} />
                <span className="min-w-0">
                  <span className="block font-semibold">{item.symbol}</span>
                  <span className="block truncate text-sm text-muted">{item.name}</span>
                </span>
              </span>
              <span className="text-right">
                <LivePrice quote={item} className="text-sm" />
                <span className="mt-0.5 block">
                  <Change value={item.change} className="text-xs" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <nav className="flex items-center gap-2 px-4 py-4 text-sm text-muted md:px-6">
        <Link to="/trade" className="hover:text-cream">
          Trade
        </Link>
        <span>/</span>
        <Link to={`/stock/${symbol}`} className="text-cream hover:text-gold">
          {symbol}
        </Link>
      </nav>
      <div className="grid border-t border-line lg:grid-cols-2">
        <div className="border-b border-line lg:border-r lg:border-b-0">
          <OrderTicket symbol={symbol} initialSide={side} showSymbolSelect />
        </div>
        <OrderHistory />
      </div>
    </div>
  )
}
