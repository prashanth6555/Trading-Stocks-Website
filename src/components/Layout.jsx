import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useMarket } from "../context/MarketContext"
import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { Ticker } from "./Ticker"

export function Layout() {
  const { pathname } = useLocation()
  const { toast } = useMarket()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen w-full flex-col bg-ink text-cream">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
        <div className="h-0.5 w-full bg-gradient-to-r from-mint via-gold to-coral" />
        <Navbar />
        <Ticker />
      </header>
      <main id="content" className="w-full min-w-0 flex-1">
        <div key={pathname} className="animate-rise">
          <Outlet />
        </div>
      </main>
      <Footer />
      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-line bg-panel px-4 py-2.5 text-sm text-cream shadow-2xl">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
