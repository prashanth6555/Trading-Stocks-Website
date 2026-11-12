import { Link } from "react-router-dom"

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="NexTrade home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-cream text-ink">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M3.5 16.5 8.5 8l4 5.5L16 6.5 20.5 11" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 19.5h17" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-serif text-[1.7rem] leading-none tracking-tight text-cream">NexTrade</span>
    </Link>
  )
}
