import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useMarket } from "../context/MarketContext"
import { money, orderTotal, pct } from "../utils/format"
import { LivePrice } from "./LivePrice"
import { Mark } from "./Mark"
import { Button, ButtonLink, fieldClass } from "./ui"

const SIZES = [1, 5, 10, 25]

export function OrderTicket({ symbol, initialSide = "buy", showSymbolSelect = false }) {
  const { quoteMap, quotes, book, user, placeOrder, notify } = useMarket()
  const navigate = useNavigate()
  const location = useLocation()
  const quote = quoteMap[symbol]
  const [side, setSide] = useState(initialSide === "sell" ? "sell" : "buy")
  const [qty, setQty] = useState("1")
  const [price, setPrice] = useState("")
  const [error, setError] = useState("")
  const [done, setDone] = useState(null)

  useEffect(() => {
    setSide(initialSide === "sell" ? "sell" : "buy")
  }, [initialSide, symbol])

  useEffect(() => {
    if (!quote) return
    setPrice(quote.price.toFixed(2))
    setQty("1")
    setError("")
    setDone(null)
  }, [symbol])

  if (!quote) {
    return <p className="px-4 py-8 text-sm text-muted md:px-6">Pick a symbol to open a ticket.</p>
  }

  const shares = book.holdings[symbol]?.qty || 0
  const parsedQty = Number(qty)
  const parsedPrice = Number(price)
  const qtyOk = Number.isInteger(parsedQty) && parsedQty >= 1
  const priceOk = Number.isFinite(parsedPrice) && parsedPrice >= 0.01
  const total = qtyOk && priceOk ? orderTotal(parsedQty, parsedPrice) : 0
  const cashAfter = side === "buy" ? book.cash - total : book.cash + total
  const sharesAfter = side === "buy" ? shares + (qtyOk ? parsedQty : 0) : shares - (qtyOk ? parsedQty : 0)
  const distance = priceOk ? ((parsedPrice - quote.price) / quote.price) * 100 : 0
  const returnTo = `${location.pathname}${location.search}`

  function choose(next) {
    setSide(next)
    setError("")
    setDone(null)
    if (showSymbolSelect) navigate(`/trade/${symbol}?side=${next}`, { replace: true })
  }

  function step(delta) {
    const current = Number.parseInt(qty, 10)
    const base = Number.isFinite(current) ? current : 0
    setQty(String(Math.max(1, base + delta)))
  }

  function onSubmit(event) {
    event.preventDefault()
    setDone(null)
    if (!user) {
      setError("Log in to place a paper order.")
      return
    }
    if (!qtyOk) {
      setError("Enter a whole number of shares.")
      return
    }
    if (!priceOk) {
      setError("Enter a price of at least $0.01.")
      return
    }
    const result = placeOrder({ symbol, side, qty: parsedQty, price: parsedPrice })
    if (!result.ok) {
      setError(result.error)
      return
    }
    setError("")
    setDone({ side, qty: parsedQty, price: parsedPrice, total: orderTotal(parsedQty, parsedPrice) })
    notify(`${side === "buy" ? "Bought" : "Sold"} ${parsedQty} ${symbol}`)
  }

  return (
    <form onSubmit={onSubmit} className="px-4 py-5 md:px-6" noValidate>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Mark symbol={quote.symbol} />
          <div>
            <h2 className="font-serif text-3xl leading-none">{quote.symbol}</h2>
            <p className="mt-1 text-sm text-muted">{quote.name}</p>
          </div>
        </div>
        <LivePrice quote={quote} className="text-xl" />
      </div>

      {showSymbolSelect ? (
        <label className="mt-5 block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">Symbol</span>
          <select
            value={symbol}
            onChange={(event) => navigate(`/trade/${event.target.value}?side=${side}`)}
            className={fieldClass}
            aria-label="Choose symbol"
          >
            {quotes.map((item) => (
              <option key={item.symbol} value={item.symbol}>
                {item.symbol} — {item.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => choose("buy")}
          className={`rounded-2xl py-3 text-sm font-semibold transition ${side === "buy" ? "bg-mint text-ink" : "border border-line text-cream hover:border-mint/60"}`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => choose("sell")}
          className={`rounded-2xl py-3 text-sm font-semibold transition ${side === "sell" ? "bg-coral text-ink" : "border border-line text-cream hover:border-coral/60"}`}
        >
          Sell
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line">
        <div className="bg-ink px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Buying power</p>
          <p className="mt-1 font-mono text-sm">{money(book.cash)}</p>
        </div>
        <div className="bg-ink px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Shares held</p>
          <p className="mt-1 font-mono text-sm">{shares}</p>
        </div>
      </div>

      <label className="mt-5 block" htmlFor="order-qty">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">Quantity</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => step(-1)} className="grid h-12 w-12 place-items-center rounded-2xl border border-line hover:border-gold" aria-label="Decrease quantity">
            <Minus className="h-4 w-4" />
          </button>
          <input
            id="order-qty"
            inputMode="numeric"
            value={qty}
            onChange={(event) => {
              setQty(event.target.value.replace(/[^\d]/g, ""))
              setError("")
            }}
            className={`${fieldClass} text-center font-mono text-lg`}
            aria-label="Share quantity"
          />
          <button type="button" onClick={() => step(1)} className="grid h-12 w-12 place-items-center rounded-2xl border border-line hover:border-gold" aria-label="Increase quantity">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        {SIZES.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setQty(String(size))}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${qty === String(size) ? "border-cream bg-cream text-ink" : "border-line text-muted hover:text-cream"}`}
          >
            {size}
          </button>
        ))}
      </div>

      <label className="mt-5 block" htmlFor="order-price">
        <span className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Fill price
          <button
            type="button"
            className="normal-case tracking-normal text-gold"
            onClick={() => {
              setPrice(quote.price.toFixed(2))
              setError("")
            }}
          >
            Match last
          </button>
        </span>
        <input
          id="order-price"
          inputMode="decimal"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value.replace(/[^\d.]/g, ""))
            setError("")
          }}
          className={`${fieldClass} font-mono text-lg`}
          aria-label="Fill price"
        />
      </label>
      {priceOk && Math.abs(distance) >= 2 ? (
        <p className="mt-2 text-xs text-gold">That price is {pct(distance)} from the last print.</p>
      ) : null}

      <div className="mt-5 rounded-2xl border border-line bg-ink/50 px-4">
        <h3 className="border-b border-line py-3 font-serif text-2xl">Order summary</h3>
        <dl className="divide-y divide-line">
          <SummaryRow label="Side" value={side === "buy" ? "Buy" : "Sell"} />
          <SummaryRow label="Symbol" value={symbol} />
          <SummaryRow label="Shares" value={qtyOk ? String(parsedQty) : "—"} />
          <SummaryRow label="Fill price" value={priceOk ? money(parsedPrice) : "—"} />
          <SummaryRow label="Estimated total" value={qtyOk && priceOk ? money(total) : "—"} />
          <SummaryRow label="Cash after" value={qtyOk && priceOk ? money(cashAfter) : money(book.cash)} warn={qtyOk && priceOk && cashAfter < 0} />
          <SummaryRow label="Shares after" value={qtyOk ? String(sharesAfter) : String(shares)} warn={qtyOk && sharesAfter < 0} />
        </dl>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">Paper orders fill at the price you enter. Nothing is routed to an exchange.</p>

      {error ? (
        <p role="alert" className="mt-4 rounded-2xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral">
          {error}
        </p>
      ) : null}
      {done ? (
        <p role="status" className="mt-4 rounded-2xl border border-mint/40 bg-mint/10 px-4 py-3 text-sm text-mint">
          Paper {done.side} filled: {done.qty} {symbol} at {money(done.price)}.
        </p>
      ) : null}

      <div className="mt-4">
        {user ? (
          <Button type="submit" variant={side === "buy" ? "mint" : "coral"} className="w-full">
            Place {side} order
          </Button>
        ) : (
          <ButtonLink to="/login" state={{ from: returnTo }} variant={side === "buy" ? "mint" : "coral"} className="w-full">
            Log in to {side}
          </ButtonLink>
        )}
      </div>
    </form>
  )
}

function SummaryRow({ label, value, warn = false }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className={`font-mono ${warn ? "text-coral" : "text-cream"}`}>{value}</dd>
    </div>
  )
}
