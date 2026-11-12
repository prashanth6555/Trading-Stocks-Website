import { useEffect, useRef, useState } from "react"
import { priceOf } from "../utils/format"

export function LivePrice({ quote, className = "" }) {
  const flash = quote.dir === "up" ? "flash-up" : quote.dir === "down" ? "flash-down" : ""
  return (
    <span key={quote.tick} className={`inline-block rounded-md px-1 font-mono tabular-nums ${flash} ${className}`}>
      {priceOf(quote)}
    </span>
  )
}

export function FlashValue({ value, format, className = "" }) {
  const previous = useRef(value)
  const [dir, setDir] = useState("flat")
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (value > previous.current) setDir("up")
    else if (value < previous.current) setDir("down")
    else setDir("flat")
    if (value !== previous.current) setTick((count) => count + 1)
    previous.current = value
  }, [value])

  const flash = dir === "up" ? "flash-up" : dir === "down" ? "flash-down" : ""
  return (
    <span key={tick} className={`inline-block rounded-md font-mono tabular-nums ${flash} ${className}`}>
      {format(value)}
    </span>
  )
}
