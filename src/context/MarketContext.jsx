import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { INDICES, STOCKS, decorate, freshBook, tickSome } from "../data/market"
import { orderTotal } from "../utils/format"

const MarketContext = createContext(null)
const USERS_KEY = "NexTrade_users"
const SESSION_KEY = "NexTrade_session"
const BOOK_KEY = "NexTrade_book_v1"

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private mode or a full disk should not crash the desk.
  }
}

function loadBook() {
  const saved = load(BOOK_KEY, null)
  if (!saved || typeof saved.cash !== "number" || !saved.holdings || !Array.isArray(saved.watchlist) || !Array.isArray(saved.orders)) {
    return freshBook()
  }
  return saved
}

function ensureUsers() {
  const users = load(USERS_KEY, [])
  if (!users.some((user) => user.email.toLowerCase() === "demo@NexTrade.app")) {
    users.push({ name: "Alex Morgan", email: "demo@NexTrade.app", password: "NexTrade123" })
    save(USERS_KEY, users)
  }
  return users
}

export function MarketProvider({ children }) {
  const [quotes, setQuotes] = useState(() => STOCKS.map(decorate))
  const [indices, setIndices] = useState(() => INDICES.map(decorate))
  const [user, setUser] = useState(() => load(SESSION_KEY, null))
  const [book, setBook] = useState(loadBook)
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    ensureUsers()
  }, [])

  useEffect(() => {
    save(BOOK_KEY, book)
  }, [book])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.hidden) return
      setQuotes((list) => tickSome(list))
      setIndices((list) => tickSome(list))
    }, 1100)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const notify = useCallback((message) => {
    setToast(message)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), 2600)
  }, [])

  const quoteMap = useMemo(() => Object.fromEntries(quotes.map((quote) => [quote.symbol, quote])), [quotes])

  const toggleWatch = useCallback((symbol) => {
    setBook((prev) => {
      const has = prev.watchlist.includes(symbol)
      return {
        ...prev,
        watchlist: has ? prev.watchlist.filter((item) => item !== symbol) : [...prev.watchlist, symbol],
      }
    })
  }, [])

  const placeOrder = useCallback((order) => {
    const qty = order.qty
    const price = order.price
    const total = orderTotal(qty, price)
    const holding = book.holdings[order.symbol]
    if (order.side === "buy" && total > book.cash + 0.001) {
      return { ok: false, error: "Not enough buying power for this order." }
    }
    if (order.side === "sell" && (!holding || holding.qty < qty)) {
      return { ok: false, error: "Not enough shares to sell." }
    }

    setBook((prev) => {
      const current = prev.holdings[order.symbol]
      const fill = {
        id: `ord-${Date.now()}`,
        symbol: order.symbol,
        side: order.side,
        qty,
        price,
        total,
        at: new Date().toISOString(),
      }
      if (order.side === "buy") {
        if (total > prev.cash + 0.001) return prev
        const nextQty = (current?.qty || 0) + qty
        const nextAvg = current ? (current.qty * current.avg + total) / nextQty : price
        return {
          ...prev,
          cash: Number((prev.cash - total).toFixed(2)),
          holdings: {
            ...prev.holdings,
            [order.symbol]: { qty: nextQty, avg: Number(nextAvg.toFixed(4)) },
          },
          orders: [fill, ...prev.orders],
        }
      }
      if (!current || current.qty < qty) return prev
      const nextQty = current.qty - qty
      const holdings = { ...prev.holdings }
      if (nextQty === 0) delete holdings[order.symbol]
      else holdings[order.symbol] = { qty: nextQty, avg: current.avg }
      return {
        ...prev,
        cash: Number((prev.cash + total).toFixed(2)),
        holdings,
        orders: [fill, ...prev.orders],
      }
    })

    return { ok: true }
  }, [book])

  const resetBook = useCallback(() => {
    setBook(freshBook())
  }, [])

  const login = useCallback((email, password) => {
    const users = ensureUsers()
    const found = users.find((entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password)
    if (!found) return { ok: false, error: "Those credentials do not match a paper account." }
    const session = { name: found.name, email: found.email }
    save(SESSION_KEY, session)
    setUser(session)
    return { ok: true }
  }, [])

  const signup = useCallback((payload) => {
    const users = ensureUsers()
    if (users.some((entry) => entry.email.toLowerCase() === payload.email.trim().toLowerCase())) {
      return { ok: false, error: "An account with that email already exists. Log in instead." }
    }
    const next = [...users, { name: payload.name.trim(), email: payload.email.trim(), password: payload.password }]
    save(USERS_KEY, next)
    const session = { name: payload.name.trim(), email: payload.email.trim() }
    save(SESSION_KEY, session)
    setUser(session)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {
      // Ignore storage failures and still clear the session in memory.
    }
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      quotes,
      indices,
      quoteMap,
      user,
      book,
      toast,
      notify,
      toggleWatch,
      placeOrder,
      resetBook,
      login,
      signup,
      logout,
    }),
    [quotes, indices, quoteMap, user, book, toast, notify, toggleWatch, placeOrder, resetBook, login, signup, logout],
  )

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
}

export function useMarket() {
  const context = useContext(MarketContext)
  if (!context) throw new Error("useMarket must be used within MarketProvider")
  return context
}

export function usePortfolio() {
  const { book, quoteMap } = useMarket()
  return useMemo(() => {
    const rows = Object.entries(book.holdings).flatMap(([symbol, holding]) => {
      const quote = quoteMap[symbol]
      if (!quote) return []
      const value = holding.qty * quote.price
      const day = holding.qty * (quote.price - quote.open)
      const pnl = holding.qty * (quote.price - holding.avg)
      return [{ symbol, qty: holding.qty, avg: holding.avg, quote, value, day, pnl }]
    })
    const marketValue = rows.reduce((sum, row) => sum + row.value, 0)
    const dayPL = rows.reduce((sum, row) => sum + row.day, 0)
    const totalPL = rows.reduce((sum, row) => sum + row.pnl, 0)
    return {
      rows,
      marketValue,
      dayPL,
      totalPL,
      cash: book.cash,
      equity: marketValue + book.cash,
    }
  }, [book, quoteMap])
}
