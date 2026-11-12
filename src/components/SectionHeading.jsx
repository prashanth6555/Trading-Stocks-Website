export function SectionHeading({ eyebrow, title, action, children }) {
  return (
    <div className="flex flex-col gap-4 px-4 py-8 sm:flex-row sm:items-end sm:justify-between md:px-6 md:py-10">
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{eyebrow}</p> : null}
        <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight text-balance text-cream md:text-5xl">{title}</h2>
        {children ? <div className="mt-3 max-w-2xl text-base text-muted">{children}</div> : null}
      </div>
      {action}
    </div>
  )
}
