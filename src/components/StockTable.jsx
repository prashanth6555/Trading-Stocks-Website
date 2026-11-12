import { Star } from "lucide-react"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useMarket } from "../context/MarketContext"
import { parseCompact } from "../utils/format"
import { Change } from "./Change"
import { LivePrice } from "./LivePrice"
import { Mark } from "./Mark"
import { Sparkline } from "./Sparkline"

const COLUMNS = [
  { key: "symbol", label: "Symbol" },
  { key: "price", label: "Last" },
  { key: "change", label: "Change" },
  { key: "volume", label: "Volume" },
  { key: "cap", label: "Mkt cap" },
]

function valueFor(row, key) {
  if (key === "volume" || key === "cap") return parseCompact(row[key])
  return row[key]
}

export function StockTable({ rows, empty = "Nothing matches that filter." }) {
  const { book, toggleWatch, notify } = useMarket()
  const [sort, setSort] = useState({ key: "symbol", dir: "asc" })

  const ordered = useMemo(() => {
    const copy = [...rows]
    copy.sort((a, b) => {
      const left = valueFor(a, sort.key)
      const right = valueFor(b, sort.key)
      const result = typeof left === "number" && typeof right === "number" ? left - right : String(left).localeCompare(String(right))
      return sort.dir === "asc" ? result : -result
    })
    return copy
  }, [rows, sort])

  function onSort(key) {
    setSort((current) => (current.key === key ? { key, dir: current.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "symbol" ? "asc" : "desc" }))
  }

  function onWatch(symbol, watched) {
    toggleWatch(symbol)
    notify(watched ? `${symbol} removed from watchlist` : `${symbol} added to watchlist`)
  }

  if (!rows.length) {
    return <p className="px-4 py-10 text-sm text-muted md:px-6">{empty}</p>
  }

  return (
    <>
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-y border-line text-[11px] uppercase tracking-[0.14em] text-muted">
              <th className="w-12 px-4 py-3 font-semibold md:px-6"> </th>
              {COLUMNS.map((column) => (
                <th key={column.key} className={`px-3 py-3 font-semibold ${column.key === "volume" || column.key === "cap" ? "hidden lg:table-cell" : ""}`}>
                  <button type="button" onClick={() => onSort(column.key)} className="inline-flex items-center gap-1 hover:text-cream">
                    {column.label}
                    {sort.key === column.key ? <span aria-hidden="true">{sort.dir === "asc" ? "↑" : "↓"}</span> : null}
                  </button>
                </th>
              ))}
              <th className="hidden px-3 py-3 font-semibold xl:table-cell">Trend</th>
              <th className="px-4 py-3 text-right font-semibold md:px-6"> </th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((row) => {
              const watched = book.watchlist.includes(row.symbol)
              return (
                <tr key={row.symbol} className="border-b border-line transition hover:bg-white/[0.03]">
                  <td className="px-4 py-3 md:px-6">
                    <button
                      type="button"
                      aria-pressed={watched}
                      aria-label={watched ? `Remove ${row.symbol} from watchlist` : `Add ${row.symbol} to watchlist`}
                      onClick={() => onWatch(row.symbol, watched)}
                      className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5"
                    >
                      <Star className={`h-4 w-4 ${watched ? "fill-gold text-gold" : "text-muted"}`} />
                    </button>
                  </td>
                  <td className="px-3 py-3">
                    <Link to={`/stock/${row.symbol}`} className="flex items-center gap-3">
                      <Mark symbol={row.symbol} className="h-9 w-9 rounded-xl text-xs" />
                      <span>
                        <span className="block font-semibold hover:text-gold">{row.symbol}</span>
                        <span className="block text-sm text-muted">{row.name}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3">
                    <LivePrice quote={row} className="text-sm" />
                  </td>
                  <td className="px-3 py-3">
                    <Change value={row.change} />
                  </td>
                  <td className="hidden px-3 py-3 font-mono text-sm text-muted lg:table-cell">{row.volume}</td>
                  <td className="hidden px-3 py-3 font-mono text-sm text-muted lg:table-cell">{row.cap}</td>
                  <td className="hidden px-3 py-3 xl:table-cell">
                    <Sparkline data={row.spark} up={row.change >= 0} />
                  </td>
                  <td className="px-4 py-3 text-right md:px-6">
                    <Link to={`/trade/${row.symbol}?side=buy`} className="text-sm font-semibold text-gold hover:text-cream">
                      Trade
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <ul className="md:hidden">
        {ordered.map((row) => {
          const watched = book.watchlist.includes(row.symbol)
          return (
            <li key={row.symbol} className="border-b border-line">
              <div className="flex items-center gap-3 px-4 py-4">
                <button
                  type="button"
                  aria-pressed={watched}
                  aria-label={watched ? `Remove ${row.symbol} from watchlist` : `Add ${row.symbol} to watchlist`}
                  onClick={() => onWatch(row.symbol, watched)}
                  className="grid h-9 w-9 place-items-center"
                >
                  <Star className={`h-4 w-4 ${watched ? "fill-gold text-gold" : "text-muted"}`} />
                </button>
                <Mark symbol={row.symbol} className="h-10 w-10 text-xs" />
                <Link to={`/stock/${row.symbol}`} className="min-w-0 flex-1">
                  <span className="block font-semibold">{row.symbol}</span>
                  <span className="block truncate text-sm text-muted">{row.name}</span>
                </Link>
                <span className="text-right">
                  <LivePrice quote={row} className="text-sm" />
                  <span className="mt-0.5 block">
                    <Change value={row.change} className="text-xs" />
                  </span>
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
