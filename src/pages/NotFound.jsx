import { ButtonLink } from "../components/ui"
import { useTitle } from "../utils/useTitle"

export function NotFound() {
  useTitle("Not found — NexTrade")
  return (
    <div className="px-4 py-24 md:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">404</p>
      <h1 className="mt-3 font-serif text-5xl">That page is off the board.</h1>
      <ButtonLink to="/" className="mt-8">
        Back to the desk
      </ButtonLink>
    </div>
  )
}
