import { Star } from "lucide-react"
import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { OrderHistory } from "../components/OrderHistory"
import { OrderTicket } from "../components/OrderTicket"
import { PriceChart } from "../components/PriceChart"
import { RangeSwitch } from "../components/RangeSwitch"
import { ButtonLink } from "../components/ui"
import { Mark } from "../components/Mark"
import { Change } from "../components/Change"
import { LivePrice } from "../components/LivePrice"
import { useMarket } from "../context/MarketContext"
import { buildSeries } from "../data/market"
import { money, signedMoney } from "../utils/format"
import { useTitle } from "../utils/useTitle"

const RANGE_NAME = { "1D": "Daily", "1W": "Weekly", "1M": "Monthly" }

export function StockDetails() {
  const params = useParams()
  const symbol = (params.symbol || "").toUpperCase()
  const { quoteMap, quotes, book, toggleWatch, notify } = useMarket()
  const quote = quoteMap[symbol]
  const [range, setRange] = useState("1D")
  useTitle(quote ? `${quote.symbol} — NexTrade` : "Symbol — NexTrade")

  const series = useMemo(() => {
    if (!quote) return []
    const base = buildSeries(symbol, range, quote.anchor)
    return base.map((point, index) => (index === base.length - 1 ? { ...point, price: quote.price } : point))
  }, [quote, range, symbol])

  if (!quote) {
    return (
      <div className="px-4 py-24 md:px-6">
        <h1 className="font-serif text-5xl">No such symbol.</h1>
        <p className="mt-3 text-muted">{symbol || "That ticker"} is not on this desk.</p>
        <ButtonLink to="/dashboard" className="mt-8">
          Browse markets
        </ButtonLink>
      </div>
    )
  }

  const watched = book.watchlist.includes(symbol)
  const rangeHigh = Math.max(...series.map((point) => point.price))
  const rangeLow = Math.min(...series.map((point) => point.price))
  const span = rangeHigh - rangeLow || 1
  const marker = Math.min(100, Math.max(0, ((quote.price - rangeLow) / span) * 100))
  const peers = quotes.filter((item) => item.sector === quote.sector && item.symbol !== quote.symbol).slice(0, 3)
  const up = series.length > 1 ? series[series.length - 1].price >= series[0].price : quote.change >= 0

  function onWatch() {
    toggleWatch(symbol)
    notify(watched ? `${symbol} removed from watchlist` : `${symbol} added to watchlist`)
  }

  const facts = [
    ["Open", money(quote.open)],
    [`${RANGE_NAME[range]} high`, money(rangeHigh)],
    [`${RANGE_NAME[range]} low`, money(rangeLow)],
    ["Volume", quote.volume],
    ["Market cap", quote.cap],
    ["P/E", quote.pe == null ? "—" : quote.pe.toFixed(1)],
    ["Dividend", quote.dividend == null ? "—" : `${quote.dividend.toFixed(2)}%`],
    ["52w high", money(quote.high52)],
    ["52w low", money(quote.low52)],
  ]

  return (
    <div>
      <nav className="flex items-center gap-2 px-4 py-4 text-sm text-muted md:px-6">
        <Link to="/dashboard" className="hover:text-cream">
          Markets
        </Link>
        <span>/</span>
        <span className="text-cream">{quote.symbol}</span>
      </nav>

      <div className="flex flex-col gap-6 px-4 pb-6 md:flex-row md:items-end md:justify-between md:px-6">
        <div className="flex items-start gap-4">
          <Mark symbol={quote.symbol} className="h-14 w-14 text-base" />
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted">
              <span>{quote.exchange}</span>
              <span>·</span>
              <span>{quote.sector}</span>
            </div>
            <h1 className="mt-1 font-serif text-4xl md:text-5xl">{quote.name}</h1>
          </div>
        </div>
        <div className="md:text-right">
          <LivePrice quote={quote} className="text-4xl md:text-5xl" />
          <div className="mt-2 flex items-center gap-3 md:justify-end">
            <span className={`font-mono ${quote.change >= 0 ? "text-mint" : "text-coral"}`}>{signedMoney(quote.price - quote.open)}</span>
            <Change value={quote.change} />
            <button
              type="button"
              onClick={onWatch}
              aria-pressed={watched}
              aria-label={watched ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`}
              className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-gold"
            >
              <Star className={`h-4 w-4 ${watched ? "fill-gold text-gold" : "text-muted"}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid border-t border-line lg:grid-cols-3">
        <div className="min-w-0 border-b border-line lg:col-span-2 lg:border-r lg:border-b-0">
          <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{RANGE_NAME[range]} range</p>
              <div className="mt-2 flex items-center justify-between font-mono text-xs text-muted">
                <span>{money(rangeLow)}</span>
                <span>{money(rangeHigh)}</span>
              </div>
              <div className="relative mt-2 h-1.5 rounded-full bg-white/10">
                <span className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-cream shadow" style={{ left: `calc(${marker}% - 7px)` }} />
              </div>
            </div>
            <RangeSwitch value={range} onChange={setRange} />
          </div>
          <PriceChart data={series} up={up} />
        </div>
        <div className="bg-panel/50">
          <OrderTicket symbol={symbol} />
          <div className="border-t border-line">
            <OrderHistory symbol={symbol} limit={3} />
          </div>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-3">
        {facts.map(([label, value]) => (
          <div key={label} className="bg-ink px-4 py-4 md:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
            <p className="mt-2 font-mono text-lg">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-5">
        <div className="px-4 py-10 md:px-6 lg:col-span-3">
          <h2 className="font-serif text-4xl">About {quote.name}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{quote.about}</p>
        </div>
        <div className="border-t border-line px-4 py-10 md:px-6 lg:col-span-2 lg:border-t-0 lg:border-l">
          <h2 className="font-serif text-3xl">Same sector</h2>
          <ul className="mt-4">
            {peers.map((peer) => (
              <li key={peer.symbol} className="border-t border-line first:border-t-0">
                <Link to={`/stock/${peer.symbol}`} className="flex items-center justify-between py-3 hover:text-gold">
                  <span>
                    <span className="block font-semibold">{peer.symbol}</span>
                    <span className="block text-sm text-muted">{peer.name}</span>
                  </span>
                  <Change value={peer.change} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
