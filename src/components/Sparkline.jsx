export function Sparkline({ data, up, className = "h-9 w-28", fill = false }) {
  if (!data?.length) return null
  const width = 120
  const height = 36
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const coords = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - 3 - ((value - min) / span) * (height - 6)
    return { x, y }
  })
  const line = coords.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ")
  const color = up ? "#3ee0a2" : "#ff6d7a"
  const area = `0,${height} ${line} ${width},${height}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio={fill ? "none" : "xMidYMid meet"} aria-hidden="true">
      {fill ? <polygon points={area} fill={color} opacity="0.16" /> : null}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={line}
        pathLength="1"
        className={fill ? "draw-line" : undefined}
      />
    </svg>
  )
}
