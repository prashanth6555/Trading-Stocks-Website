import { Menu, Search, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useMarket } from "../context/MarketContext"
import { Change } from "./Change"
import { Logo } from "./Logo"
import { buttonClass } from "./ui"

function SearchField({ quotes }) {
  const [query, setQuery] = useState("")
  const [focus, setFocus] = useState(false)
  const navigate = useNavigate()
  const box = useRef(null)

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return quotes.filter((quote) => `${quote.symbol} ${quote.name}`.toLowerCase().includes(term)).slice(0, 6)
  }, [query, quotes])

  useEffect(() => {
    const onDoc = (event) => {
      if (!box.current?.contains(event.target)) setFocus(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [])

  function go(symbol) {
    setQuery("")
    setFocus(false)
    navigate(`/stock/${symbol}`)
  }

  return (
    <div className="relative" ref={box}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setFocus(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && results[0]) {
            event.preventDefault()
            go(results[0].symbol)
          }
        }}
        placeholder="Search symbols"
        aria-label="Search symbols"
        className="w-full rounded-full border border-line bg-ink py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gold"
      />
      {focus && query.trim() ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-50 overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
          {results.length === 0 ? <p className="px-4 py-3 text-sm text-muted">No symbols match.</p> : null}
          {results.map((quote) => (
            <button
              key={quote.symbol}
              type="button"
              onMouseDown={() => go(quote.symbol)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/5"
            >
              <span className="min-w-0">
                <span className="font-semibold">{quote.symbol}</span>
                <span className="ml-2 text-sm text-muted">{quote.name}</span>
              </span>
              <Change value={quote.change} className="shrink-0 text-xs" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function Navbar() {
  const { quotes, user, logout, notify } = useMarket()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  function onLogout() {
    logout()
    notify("Signed out")
    setOpen(false)
    navigate("/")
  }

  const view = new URLSearchParams(location.search).get("view")
  const links = [
    { to: "/dashboard", label: "Markets", active: location.pathname === "/dashboard" && (!view || view === "board") },
    { to: "/trade", label: "Trade", active: location.pathname.startsWith("/trade") },
    { to: "/dashboard?view=portfolio", label: "Portfolio", active: location.pathname === "/dashboard" && view === "portfolio" },
    { to: "/dashboard?view=watchlist", label: "Watchlist", active: location.pathname === "/dashboard" && view === "watchlist" },
  ]

  const auth = user ? (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-cream xl:inline">{user.name.split(" ")[0]}</span>
      <button type="button" onClick={onLogout} className={buttonClass("ghost", "px-4")}>
        Log out
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Link to="/login" className="px-2 text-sm font-semibold text-cream hover:text-gold">
        Log in
      </Link>
      <Link to="/signup" className={buttonClass("primary")}>
        Sign up
      </Link>
    </div>
  )

  return (
    <div className="relative">
      <div className="flex h-16 w-full items-center gap-3 px-4 md:px-6">
        <Logo />
        <nav className="ml-4 hidden items-center gap-5 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={`text-sm font-semibold transition ${link.active ? "text-gold" : "text-muted hover:text-cream"}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden w-full max-w-xs lg:block">
          <SearchField quotes={quotes} />
        </div>
        <div className="ml-auto hidden lg:ml-0 lg:block">{auth}</div>
        <button
          type="button"
          className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[4.15rem] z-40 overflow-y-auto bg-ink px-4 py-5 lg:hidden">
          <SearchField quotes={quotes} />
          <nav className="mt-6 grid gap-1" aria-label="Mobile">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className={`rounded-2xl px-3 py-3 text-lg font-semibold ${link.active ? "bg-panel text-gold" : "text-cream"}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6">{auth}</div>
        </div>
      ) : null}
    </div>
  )
}
