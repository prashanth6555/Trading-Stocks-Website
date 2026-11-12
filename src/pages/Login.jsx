import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthLayout } from "../components/AuthLayout"
import { Button, ButtonLink, Field, fieldClass } from "../components/ui"
import { useMarket } from "../context/MarketContext"
import { useTitle } from "../utils/useTitle"

function validate(values) {
  const errors = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address."
  if (!values.password) errors.password = "Enter your password."
  return errors
}

export function Login() {
  const { login, user, logout, notify } = useMarket()
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  useTitle("Log in — NexTrade")

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
    const result = login(values.email, values.password)
    if (!result.ok) {
      setErrors({ form: result.error })
      return
    }
    notify("Welcome back")
    navigate(dest, { replace: true })
  }

  function enterDemo() {
    const result = login("demo@NexTrade.app", "NexTrade123")
    if (!result.ok) {
      setErrors({ form: result.error })
      return
    }
    notify("Demo desk open")
    navigate(dest, { replace: true })
  }

  if (user) {
    return (
      <AuthLayout image="/images/night.jpg" imageAlt="City lights after the close" kicker="Account" title="You are already on the desk.">
        <h2 className="font-serif text-4xl">Signed in as {user.name}.</h2>
        <p className="mt-3 text-muted">{user.email}</p>
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
    <AuthLayout image="/images/night.jpg" imageAlt="City lights after the close" kicker="Welcome back" title="The session is open on paper.">
      <h2 className="font-serif text-4xl">Log in</h2>
      <p className="mt-3 text-muted">Use the account you created, or step into the demo desk.</p>
      <form className="mt-8 grid gap-5" onSubmit={onSubmit} noValidate>
        {errors.form ? (
          <p role="alert" className="rounded-2xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral">
            {errors.form}
          </p>
        ) : null}
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@desk.com"
          />
        </Field>
        <Field id="password" label="Password" error={errors.password}>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={values.password}
              onChange={(event) => update("password", event.target.value)}
              className={`${fieldClass} pr-12`}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              placeholder="Your password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-cream"
              onClick={() => setShow((value) => !value)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>
      <div className="mt-6 rounded-2xl border border-line bg-ink/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Demo desk</p>
        <p className="mt-2 font-mono text-sm">demo@NexTrade.app</p>
        <p className="font-mono text-sm">NexTrade123</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
          <button type="button" className="text-gold hover:text-cream" onClick={() => setValues({ email: "demo@NexTrade.app", password: "NexTrade123" })}>
            Fill the form
          </button>
          <button type="button" className="text-cream hover:text-gold" onClick={enterDemo}>
            Enter demo desk
          </button>
        </div>
      </div>
      <p className="mt-6 text-sm text-muted">
        New here?{" "}
        <Link to="/signup" state={location.state} className="font-semibold text-cream hover:text-gold">
          Create a paper account
        </Link>
      </p>
    </AuthLayout>
  )
}
