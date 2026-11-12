export function money(value) {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return "—"
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function priceOf(item) {
  if (!item) return "—"
  if (item.kind === "index") {
    return item.price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
  return money(item.price)
}

export function pct(value) {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return "—"
  const sign = amount > 0 ? "+" : ""
  return `${sign}${amount.toFixed(2)}%`
}

export function signedMoney(value) {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return "—"
  const sign = amount > 0 ? "+" : amount < 0 ? "-" : ""
  return `${sign}${money(Math.abs(amount))}`
}

export function orderTotal(qty, price) {
  return Number((qty * price).toFixed(2))
}

export function when(iso) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function parseCompact(value) {
  if (typeof value === "number") return value
  const match = String(value).replace(/[$,]/g, "").match(/([\d.]+)\s*([TMBK])?/i)
  if (!match) return 0
  const amount = Number(match[1])
  const unit = (match[2] || "").toUpperCase()
  const multiplier = { T: 1e12, B: 1e9, M: 1e6, K: 1e3 }[unit] || 1
  return amount * multiplier
}
