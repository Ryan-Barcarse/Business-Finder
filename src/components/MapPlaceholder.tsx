import { fakeBusinesses } from "@/data/fakeBusinesses";

// Stand-in for the real map. No map library wired up yet — this just
// reserves the layout space and shows what will eventually be real
// markers, so we can confirm the overall page structure first.
export default function MapPlaceholder() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-emerald-50/60">
      {/* Faint grid to suggest "map" without pulling in a real map library yet */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Current location marker */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ top: "50%", left: "50%" }}
      >
        <span className="absolute inset-0 -m-2 block animate-ping rounded-full bg-blue-400/40" />
        <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-500 shadow" />
      </div>

      {/* Placeholder business markers */}
      {fakeBusinesses.map((business) => (
        <div
          key={business.id}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ top: `${business.position.top}%`, left: `${business.position.left}%` }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-base shadow-md">
            {business.emoji}
          </div>
          <div className="mx-auto h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-emerald-600" />
        </div>
      ))}

      {/* "Search this area" control — not functional until the real map exists */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-md transition hover:bg-neutral-50"
        >
          <span>🔄</span>
          <span>Search this area</span>
        </button>
      </div>

      {/* Zoom / recenter controls */}
      <div className="absolute bottom-6 right-4 flex flex-col gap-2">
        <button
          type="button"
          aria-label="Center on my location"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-md transition hover:bg-neutral-50"
        >
          🎯
        </button>
        <div className="flex flex-col overflow-hidden rounded-full bg-white shadow-md">
          <button
            type="button"
            aria-label="Zoom in"
            className="h-10 w-10 text-lg transition hover:bg-neutral-50"
          >
            +
          </button>
          <div className="h-px bg-black/10" />
          <button
            type="button"
            aria-label="Zoom out"
            className="h-10 w-10 text-lg transition hover:bg-neutral-50"
          >
            −
          </button>
        </div>
      </div>

      <p className="absolute bottom-4 left-4 rounded-md bg-white/80 px-2 py-1 text-xs text-neutral-500">
        Map placeholder — real map coming in a later step
      </p>
    </div>
  );
}
