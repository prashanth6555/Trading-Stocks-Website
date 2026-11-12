import { Area, Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { money } from "../utils/format"

function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const price = payload.find((item) => item.dataKey === "price")?.value
  const volume = payload.find((item) => item.dataKey === "volume")?.value
  return (
    <div className="rounded-2xl border border-line bg-ink/95 px-3 py-2 text-xs shadow-xl">
      <div className="text-muted">{label}</div>
      <div className="mt-1 font-mono text-sm text-cream">{money(price)}</div>
      {volume != null ? <div className="mt-1 text-muted">Vol {Number(volume).toLocaleString("en-US")}</div> : null}
    </div>
  )
}

export function PriceChart({ data, up }) {
  const stroke = up ? "#3ee0a2" : "#ff6d7a"
  const bar = up ? "rgba(62,224,162,0.35)" : "rgba(255,109,122,0.32)"
  const gradientId = up ? "priceFillUp" : "priceFillDown"

  return (
    <div className="h-[320px] w-full min-w-0 sm:h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 16, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.38} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(244,239,228,0.06)" vertical={false} />
          <XAxis dataKey="label" minTickGap={40} tick={{ fill: "#9aabbd", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            yAxisId="price"
            orientation="right"
            domain={["dataMin", "dataMax"]}
            tick={{ fill: "#9aabbd", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={62}
            tickFormatter={(value) => `$${Number(value).toFixed(value < 100 ? 2 : 0)}`}
          />
          <YAxis yAxisId="vol" hide domain={[0, (max) => max * 4]} />
          <Tooltip content={<ChartTip />} cursor={{ stroke: "rgba(228,196,138,0.45)" }} />
          <Bar yAxisId="vol" dataKey="volume" fill={bar} radius={[2, 2, 0, 0]} isAnimationActive={false} />
          <Area
            yAxisId="price"
            type="monotone"
            dataKey="price"
            stroke={stroke}
            strokeWidth={2.25}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
            dot={false}
            activeDot={{ r: 4, fill: stroke, stroke: "#071018" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
