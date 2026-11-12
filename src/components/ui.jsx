import { Link } from "react-router-dom"

const variants = {
  primary: "bg-cream text-ink hover:bg-gold px-5 py-2.5",
  ghost: "border border-line bg-transparent text-cream hover:border-gold/70 hover:bg-white/5 px-5 py-2.5",
  mint: "bg-mint text-ink hover:brightness-110 px-5 py-2.5",
  coral: "bg-coral text-ink hover:brightness-110 px-5 py-2.5",
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"

export function buttonClass(variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`
}

export function Button({ variant = "primary", className = "", type = "button", ...props }) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />
}

export function ButtonLink({ variant = "primary", className = "", ...props }) {
  return <Link className={buttonClass(variant, className)} {...props} />
}

export const fieldClass =
  "w-full rounded-2xl border border-line bg-ink px-4 py-3 text-base text-cream outline-none transition placeholder:text-muted/50 focus:border-gold"

export function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-coral">
          {error}
        </p>
      ) : null}
    </div>
  )
}
