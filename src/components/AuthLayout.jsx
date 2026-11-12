export function AuthLayout({ image, imageAlt, kicker, title, children }) {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="relative min-h-64 lg:min-h-[calc(100svh-7.2rem)]">
        <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{kicker}</p>
          <h1 className="mt-3 max-w-md font-serif text-4xl leading-tight text-balance md:text-6xl">{title}</h1>
        </div>
      </div>
      <div className="bg-panel px-4 py-10 md:px-12 lg:px-16 lg:py-16">{children}</div>
    </div>
  )
}
