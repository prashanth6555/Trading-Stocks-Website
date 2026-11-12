import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthLayout } from "../components/AuthLayout"
import { Button, ButtonLink, Field, fieldClass } from "../components/ui"
import { useMarket } from "../context/MarketContext"
import { useTitle } from "../utils/useTitle"

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = "Enter your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address."
  if (values.password.length < 8 || !/\d/.test(values.password)) errors.password = "Use at least 8 characters, including a number."
  if (values.confirm !== values.password) errors.confirm = "Passwords do not match."
  if (!values.terms) errors.terms = "Accept the paper-trading note to continue."
  return errors
}

const EMPTY = { name: "", email: "", password: "", confirm: "", terms: false }

export function Signup() {
  const { signup, user, logout, notify } = useMarket()
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  useTitle("Sign up — NexTrade")
  const dest = location.state?.from || "/dashboard"

  function update(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined, form: undefined }))
  }

  function onSubmit(event) {
    event.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length) return
    const result = signup(values)
    if (!result.ok) {
      setErrors({ form: result.error })
      return
    }
    notify("Paper account ready")
    navigate(dest, { replace: true })
  }

  if (user) {
    return (
      <AuthLayout image="/images/analytics.jpg" imageAlt="Analytics on a wide monitor" kicker="Account" title="You already have a seat.">
        <h2 className="font-serif text-4xl">Signed in as {user.name}.</h2>
        <p className="mt-3 text-muted">Log out if you want to register a different email on this browser.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/dashboard">Go to markets</ButtonLink>
          <Button variant="ghost" onClick={logout}>
            Log out
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout image="/images/analytics.jpg" imageAlt="Analytics on a wide monitor" kicker="Paper account" title="A desk of your own. Still not real money.">
      <h2 className="font-serif text-4xl">Sign up</h2>
      <p className="mt-3 text-muted">The form checks your name, email, and password before it opens the book.</p>
      <form className="mt-8 grid gap-5" onSubmit={onSubmit} noValidate>
        {errors.form ? (
          <p role="alert" className="rounded-2xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral">
            {errors.form}
          </p>
        ) : null}
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your name"
          />
        </Field>
        <Field id="signup-email" label="Email" error={errors.email}>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "signup-email-error" : undefined}
            placeholder="you@desk.com"
          />
        </Field>
        <Field id="signup-password" label="Password" error={errors.password}>
          <div className="relative">
            <input
              id="signup-password"
              name="new-password"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              value={values.password}
              onChange={(event) => update("password", event.target.value)}
              className={`${fieldClass} pr-12`}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "signup-password-error" : undefined}
              placeholder="At least 8 characters and a number"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-cream"
              onClick={() => setShow((value) => !value)}
              aria-label={show ? "Hide passwords" : "Show passwords"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
        <Field id="confirm" label="Confirm password" error={errors.confirm}>
          <input
            id="confirm"
            name="confirm-password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            value={values.confirm}
            onChange={(event) => update("confirm", event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.confirm)}
            aria-describedby={errors.confirm ? "confirm-error" : undefined}
            placeholder="Repeat the password"
          />
        </Field>
        <div>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={values.terms}
              onChange={(event) => update("terms", event.target.checked)}
              className="mt-1 h-4 w-4 accent-gold"
            />
            <span>I understand orders on NexTrade are simulated and stay in this browser.</span>
          </label>
          {errors.terms ? <p className="mt-2 text-sm text-coral">{errors.terms}</p> : null}
        </div>
        <Button type="submit" className="w-full">
          Create account
        </Button>
        <p className="text-xs leading-relaxed text-muted">Demo only. The password stays in this browser and is not sent anywhere.</p>
      </form>
      <p className="mt-6 text-sm text-muted">
        Already registered?{" "}
        <Link to="/login" state={location.state} className="font-semibold text-cream hover:text-gold">
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
