import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { OrderHistory } from "../components/OrderHistory"
import { MoverList } from "../components/MoverList"
import { StockTable } from "../components/StockTable"
import { useMarket, usePortfolio } from "../context/MarketContext"
import { SECTORS, gainersOf, losersOf } from "../data/market"
import { money, signedMoney } from "../utils/format"
import { useTitle } from "../utils/useTitle"
import { Mark } from "../components/Mark"
import { LivePrice } from "../components/LivePrice"

const TABS = [
  { id: "board", label: "Board" },
  { id: "gainers", label: "Gainers" },
  { id: "losers", label: "Losers" },
  { id: "watchlist", label: "Watchlist" },
  { id: "portfolio", label: "Portfolio" },
  { id: "orders", label: "Orders" },
]

export function Dashboard() {
  const { quotes, book, user, resetBook, notify } = useMarket()
  const portfolio = usePortfolio()
  const [params, setParams] = useSearchParams()
  const view = params.get("view") || "board"
  const [query, setQuery] = useState("")
  const [sector, setSector] = useState("All")
  useTitle("Markets — NexTrade")

  const gainers = useMemo(() => gainersOf(quotes), [quotes])
  const losers = useMemo(() => losersOf(quotes), [quotes])
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return quotes.filter((quote) => {
      const blob = `${quote.symbol} ${quote.name} ${quote.sector}`.toLowerCase()
      const matchesQuery = blob.includes(term)
      const matchesSector = sector === "All" || quote.sector === sector
      return matchesQuery && matchesSector
    })
  }, [quotes, query, sector])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  const dateLabel = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  const searching = query.trim().length > 0 || sector !== "All"

  function setView(id) {
    if (id === "board") setParams({})
    else setParams({ view: id })
  }

  function onReset() {
    if (window.confirm("Reset the paper account to the original demo book?")) {
      resetBook()
      notify("Paper account restored")
    }
  }

  const cells = [
    { label: "Equity", value: money(portfolio.equity), note: `Market value ${money(portfolio.marketValue)}` },
    { label: "Buying power", value: money(portfolio.cash), note: "Cash in this browser" },
    { label: "Day P/L", value: signedMoney(portfolio.dayPL), tone: portfolio.dayPL >= 0 ? "text-mint" : "text-coral", note: "From the session open" },
    { label: "Open P/L", value: signedMoney(portfolio.totalPL), tone: portfolio.totalPL >= 0 ? "text-mint" : "text-coral", note: "Against average cost" },
  ]

  return (
    <div>
      <div className="flex flex-col gap-4 px-4 py-8 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{dateLabel}</p>
          <h1 className="mt-2 font-serif text-4xl md:text-6xl">
            {greeting}
            {user ? `, ${user.name.split(" ")[0]}` : ""}.
          </h1>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">Simulated tape. Prices move on their own. Fills stay in this browser.</p>
      </div>

      <section className="grid grid-cols-2 gap-px border-y border-line bg-line lg:grid-cols-4">
        {cells.map((cell) => (
          <div key={cell.label} className="bg-panel px-4 py-5 md:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{cell.label}</p>
            <p className={`mt-2 font-mono text-2xl md:text-3xl ${cell.tone || "text-cream"}`}>{cell.value}</p>
            <p className="mt-1 text-sm text-muted">{cell.note}</p>
          </div>
        ))}
      </section>

      <div className="flex gap-1 overflow-x-auto border-b border-line px-4 md:px-6" role="tablist" aria-label="Dashboard views">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={view === tab.id}
            onClick={() => setView(tab.id)}
            className={`shrink-0 border-b-2 px-3 py-3 text-sm font-semibold ${view === tab.id ? "border-gold text-cream" : "border-transparent text-muted hover:text-cream"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {view === "board" ? (
        <div>
          {!searching ? (
            <div className="grid border-b border-line lg:grid-cols-2">
              <div className="border-b border-line lg:border-r lg:border-b-0">
                <h2 className="px-4 pt-5 font-serif text-3xl md:px-6">Top gainers</h2>
                <MoverList rows={gainers.slice(0, 5)} />
              </div>
              <div>
                <h2 className="px-4 pt-5 font-serif text-3xl md:px-6">Top losers</h2>
                <MoverList rows={losers.slice(0, 5)} />
              </div>
            </div>
          ) : null}
          <div className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:px-6">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter by name or symbol"
              aria-label="Filter stocks"
              className="w-full rounded-full border border-line bg-ink px-4 py-2.5 text-sm outline-none focus:border-gold md:max-w-sm"
            />
            <div className="flex gap-2 overflow-x-auto">
              {["All", ...SECTORS].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSector(item)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${sector === item ? "border-cream bg-cream text-ink" : "border-line text-muted hover:text-cream"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <StockTable rows={filtered} empty="No symbols match that filter." />
        </div>
      ) : null}

      {view === "gainers" ? (
        <div>
          <h2 className="px-4 pt-6 font-serif text-4xl md:px-6">Top gainers</h2>
          <MoverList rows={gainers} empty="Nothing is green right now." />
        </div>
      ) : null}

      {view === "losers" ? (
        <div>
          <h2 className="px-4 pt-6 font-serif text-4xl md:px-6">Top losers</h2>
          <MoverList rows={losers} empty="Nothing is red right now." />
        </div>
      ) : null}

      {view === "watchlist" ? (
        <div>
          <h2 className="px-4 pt-6 font-serif text-4xl md:px-6">Watchlist</h2>
          <p className="px-4 pb-2 text-sm text-muted md:px-6">Stars on the board add and remove names.</p>
          <StockTable
            rows={quotes.filter((quote) => book.watchlist.includes(quote.symbol))}
            empty="No names on the list yet. Star a symbol on the board."
          />
        </div>
      ) : null}

      {view === "portfolio" ? (
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3 px-4 pt-6 md:px-6">
            <h2 className="font-serif text-4xl">Portfolio</h2>
            <button type="button" onClick={onReset} className="text-sm font-semibold text-gold hover:text-cream">
              Reset paper account
            </button>
          </div>
          {portfolio.rows.length === 0 ? (
            <p className="px-4 py-8 text-sm text-muted md:px-6">No positions. A paper buy will show up here.</p>
          ) : (
            <ul className="mt-4 border-t border-line">
              {portfolio.rows.map((row) => (
                <li key={row.symbol} className="border-b border-line px-4 py-4 md:px-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Mark symbol={row.symbol} />
                      <div>
                        <Link to={`/stock/${row.symbol}`} className="font-semibold hover:text-gold">
                          {row.symbol}
                        </Link>
                        <p className="text-sm text-muted">
                          {row.qty} shares · avg {money(row.avg)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono">{money(row.value)}</p>
                      <p className={`font-mono text-sm ${row.pnl >= 0 ? "text-mint" : "text-coral"}`}>{signedMoney(row.pnl)}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted">
                      Last <LivePrice quote={row.quote} className="text-sm" /> · Day {signedMoney(row.day)}
                    </span>
                    <Link to={`/trade/${row.symbol}?side=buy`} className="font-semibold text-gold hover:text-cream">
                      Trade
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}

      {view === "orders" ? <OrderHistory /> : null}
    </div>
  )
}
