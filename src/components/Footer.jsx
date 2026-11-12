import { Link } from "react-router-dom"
import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#050b12]">
      <div className="grid gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            A paper trading desk for watching a moving market, reading charts, and rehearsing orders. Prices are simulated. Fills stay in this browser.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Desk</p>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            <li><Link className="hover:text-cream" to="/dashboard">Markets</Link></li>
            <li><Link className="hover:text-cream" to="/trade">Trade</Link></li>
            <li><Link className="hover:text-cream" to="/dashboard?view=watchlist">Watchlist</Link></li>
            <li><Link className="hover:text-cream" to="/dashboard?view=portfolio">Portfolio</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Account</p>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            <li><Link className="hover:text-cream" to="/login">Log in</Link></li>
            <li><Link className="hover:text-cream" to="/signup">Sign up</Link></li>
            <li><Link className="hover:text-cream" to="/stock/NVDA">NVIDIA</Link></li>
            <li><Link className="hover:text-cream" to="/stock/AAPL">Apple</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Session</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Nothing here is an offer to buy or sell a security. There is no broker, no live exchange, and no real money.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-line px-4 py-4 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-6">
        <p>© 2026 NexTrade Desk</p>
        <p>Simulated market data for demonstration.</p>
      </div>
    </footer>
  )
}
