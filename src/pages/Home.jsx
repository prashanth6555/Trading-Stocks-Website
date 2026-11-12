import { Link } from "react-router-dom"
import { useMarket, usePortfolio } from "../context/MarketContext"
import { NOTES, TRENDING, gainersOf, losersOf } from "../data/market"
import { money, signedMoney } from "../utils/format"
import { useTitle } from "../utils/useTitle"
import { Change } from "../components/Change"
import { FlashValue, LivePrice } from "../components/LivePrice"
import { Mark } from "../components/Mark"
import { MoverList } from "../components/MoverList"
import { SectionHeading } from "../components/SectionHeading"
import { Sparkline } from "../components/Sparkline"
import { ButtonLink } from "../components/ui"

const FEATURES = [
  {
    eyebrow: "The tape",
    title: "Prices that refuse to sit still.",
    body: "Every symbol takes a small step through the session. The print flashes mint or coral, and the ticker along the top keeps the whole list moving.",
    image: "/images/screens.jpg",
    alt: "Market charts glowing on a trading screen",
  },
  {
    eyebrow: "The chart",
    title: "Daily, weekly, monthly. Same name, different story.",
    body: "Open a symbol and switch the range. Volume sits under the line, and the last print stays tied to the price above the chart.",
    image: "/images/chart.jpg",
    alt: "A close view of a rising and falling price chart",
    flip: true,
  },
  {
    eyebrow: "The ticket",
    title: "Rehearse the order before it matters.",
    body: "Set a share count and a fill price, read the summary, and place a paper order. Buying power, position size, and history update on the spot.",
    image: "/images/desk.jpg",
    alt: "A desk with a laptop open to financial charts",
  },
]

export function Home() {
  const { quotes, indices, quoteMap } = useMarket()
  const portfolio = usePortfolio()
  useTitle("NexTrade — Trading Desk")

  const advancing = quotes.filter((quote) => quote.change >= 0).length
  const declining = quotes.length - advancing
  const featured = TRENDING.map((symbol) => quoteMap[symbol]).filter(Boolean)
  const hero = quoteMap.NVDA
  const gainers = gainersOf(quotes).slice(0, 5)
  const losers = losersOf(quotes).slice(0, 5)

  return (
    <div>
      <section className="grid border-b border-line lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative px-4 py-12 md:px-6 md:py-20">
          <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
          <p className="animate-rise relative flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-mint" />
            </span>
            Simulated session
          </p>
          <h1 className="animate-rise relative mt-5 max-w-xl font-serif text-[2.7rem] leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl" style={{ animationDelay: "70ms" }}>
            Trade the tape <span className="italic text-gold">without the noise.</span>
          </h1>
          <p className="animate-rise relative mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg" style={{ animationDelay: "140ms" }}>
            NexTrade is a paper desk that runs edge to edge. Watch a moving market, keep a list, read a chart, and place buy or sell orders that never leave this browser.
          </p>
          <div className="animate-rise relative mt-8 flex flex-wrap gap-3" style={{ animationDelay: "200ms" }}>
            <ButtonLink to="/dashboard">Open the market</ButtonLink>
            <ButtonLink to="/signup" variant="ghost">Create a paper account</ButtonLink>
          </div>
          <dl className="relative mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-4">
            <Stat label="Advancing" value={String(advancing)} tone="text-mint" />
            <Stat label="Declining" value={String(declining)} tone="text-coral" />
            <Stat label="Symbols" value={String(quotes.length)} />
            <div className="bg-panel px-4 py-4">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Paper equity</dt>
              <dd className="mt-1 text-xl">
                <FlashValue value={portfolio.equity} format={money} className="text-xl" />
              </dd>
            </div>
          </dl>
        </div>
        <div className="relative min-h-[460px] lg:min-h-[680px]">
          <img src="/images/skyline.jpg" alt="Glass towers above a financial district" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/25 to-ink/55 lg:bg-gradient-to-r lg:from-ink lg:via-ink/20 lg:to-transparent" />
          {hero ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
              <div className="float-card w-full max-w-md rounded-3xl border border-white/15 bg-ink/75 p-5 shadow-2xl backdrop-blur-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Mark symbol={hero.symbol} />
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted">{hero.exchange}</p>
                      <p className="font-serif text-3xl leading-none">{hero.symbol}</p>
                    </div>
                  </div>
                  <Change value={hero.change} />
                </div>
                <LivePrice quote={hero} className="mt-4 text-4xl" />
                <Sparkline data={hero.spark} up={hero.change >= 0} fill className="mt-3 h-24 w-full" />
                <div className="mt-2">
                  {["AAPL", "MSFT", "TSLA"].map((symbol) => {
                    const quote = quoteMap[symbol]
                    if (!quote) return null
                    return (
                      <Link key={symbol} to={`/stock/${symbol}`} className="flex items-center justify-between border-t border-line py-2.5 hover:text-gold">
                        <span className="text-sm font-semibold">{symbol}</span>
                        <LivePrice quote={quote} className="text-sm" />
                        <Change value={quote.change} className="text-xs" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Market overview" title="Where the session stands." action={<ButtonLink to="/dashboard" variant="ghost">Open markets</ButtonLink>} />
        <div className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4 xl:grid-cols-8">
          {indices.map((item) => (
            <div key={item.symbol} className="bg-ink px-4 py-4 transition hover:bg-panel md:px-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{item.symbol}</p>
              <p className="mt-2 truncate text-sm text-cream">{item.name}</p>
              <LivePrice quote={item} className="mt-3 text-lg" />
              <div className="mt-1">
                <Change value={item.change} className="text-xs" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Trending" title="Names with a pulse.">
          Eight symbols the desk is watching. Open any of them for the chart and a live ticket.
        </SectionHeading>
        <div className="grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((quote) => (
            <Link key={quote.symbol} to={`/stock/${quote.symbol}`} className="group bg-ink p-5 transition hover:bg-panel">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Mark symbol={quote.symbol} />
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted">{quote.sector}</p>
                    <p className="text-lg font-semibold group-hover:text-gold">{quote.symbol}</p>
                    <p className="text-sm text-muted">{quote.name}</p>
                  </div>
                </div>
              </div>
              <Sparkline data={quote.spark} up={quote.change >= 0} className="mt-4 h-10 w-full" />
              <div className="mt-3 flex items-end justify-between">
                <LivePrice quote={quote} className="text-2xl" />
                <Change value={quote.change} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Movers" title="Leaders and laggards." />
        <div className="grid border-y border-line lg:grid-cols-2">
          <div className="border-b border-line lg:border-r lg:border-b-0">
            <h3 className="px-4 pt-5 font-serif text-3xl md:px-6">Top gainers</h3>
            <MoverList rows={gainers} />
          </div>
          <div>
            <h3 className="px-4 pt-5 font-serif text-3xl md:px-6">Top losers</h3>
            <MoverList rows={losers} />
          </div>
        </div>
      </section>

      {FEATURES.map((feature) => (
        <article key={feature.title} className="grid border-t border-line lg:grid-cols-2">
          <div className={`relative min-h-72 overflow-hidden lg:min-h-[520px] ${feature.flip ? "lg:order-2" : ""}`}>
            <img src={feature.image} alt={feature.alt} className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105" />
          </div>
          <div className={`flex items-center bg-ink px-4 py-12 md:px-10 lg:px-16 ${feature.flip ? "lg:order-1" : ""}`}>
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{feature.eyebrow}</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-balance md:text-5xl">{feature.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{feature.body}</p>
            </div>
          </div>
        </article>
      ))}

      <section className="border-t border-line">
        <SectionHeading eyebrow="Desk notes" title="What the board is saying." action={<ButtonLink to="/dashboard" variant="ghost">See every name</ButtonLink>} />
        <ul className="border-t border-line">
          {NOTES.map((note) => (
            <li key={note.title} className="border-b border-line">
              <Link
                to={note.symbol ? `/stock/${note.symbol}` : "/dashboard"}
                className="flex flex-col gap-2 px-4 py-5 transition hover:bg-white/[0.03] md:flex-row md:items-center md:gap-8 md:px-6"
              >
                <span className="w-40 text-xs font-semibold uppercase tracking-[0.16em] text-gold">{note.tag}</span>
                <span className="flex-1 text-lg">{note.title}</span>
                <span className="font-mono text-xs text-muted">{note.time}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden border-t border-line">
        <img src="/images/night.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="relative px-4 py-20 md:px-6 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Paper only</p>
          <h2 className="mt-3 max-w-4xl font-serif text-5xl leading-[0.95] text-balance md:text-7xl">Open the desk. The tape is already moving.</h2>
          <p className="mt-5 max-w-xl text-lg text-cream/80">
            Day P/L on the sample book is {signedMoney(portfolio.dayPL)}. Create an account, or step in with the demo desk and place a buy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/signup">Create account</ButtonLink>
            <ButtonLink to="/login" variant="ghost">Use the demo desk</ButtonLink>
          </div>
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value, tone = "text-cream" }) {
  return (
    <div className="bg-panel px-4 py-4">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className={`mt-1 font-mono text-xl ${tone}`}>{value}</dd>
    </div>
  )
}
