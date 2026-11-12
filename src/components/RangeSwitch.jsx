const RANGES = [
  { id: "1D", label: "Daily" },
  { id: "1W", label: "Weekly" },
  { id: "1M", label: "Monthly" },
]

export function RangeSwitch({ value, onChange }) {
  return (
    <div className="flex rounded-full border border-line bg-ink/70 p-1" role="tablist" aria-label="Price range">
      {RANGES.map((range) => (
        <button
          key={range.id}
          type="button"
          role="tab"
          aria-selected={value === range.id}
          onClick={() => onChange(range.id)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
            value === range.id ? "bg-cream text-ink" : "text-muted hover:text-cream"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  )
}
