import { RefreshCw, LocateFixed, Plus, Minus } from "lucide-react";
import { fakeBusinesses } from "@/data/fakeBusinesses";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

// Stand-in for the real map. No map library wired up yet — this just
// reserves the layout space and shows what will eventually be real
// markers, so we can confirm the overall page structure first.
export default function MapPlaceholder() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-100">
      {/* Faint grid to suggest "map" without pulling in a real map library yet */}
      <div
        className="absolute inset-0 opacity-60"
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
        <span className="absolute inset-0 -m-1.5 block rounded-full bg-blue-500/15" />
        <span className="relative block h-3 w-3 rounded-full border-2 border-white bg-blue-600 shadow" />
      </div>

      {/* Placeholder business markers */}
      {fakeBusinesses.map((business) => {
        const Icon = CATEGORY_ICONS[business.category];
        return (
          <div
            key={business.id}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ top: `${business.position.top}%`, left: `${business.position.left}%` }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 shadow-md">
              <Icon className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <div className="mx-auto h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-emerald-600" />
          </div>
        );
      })}

      {/* "Search this area" control — not functional until the real map exists */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-md transition hover:bg-neutral-50"
        >
          <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
          <span>Search this area</span>
        </button>
      </div>

      {/* Zoom / recenter controls */}
      <div className="absolute bottom-6 right-4 flex flex-col gap-2">
        <button
          type="button"
          aria-label="Center on my location"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-700 shadow-md transition hover:bg-neutral-50"
        >
          <LocateFixed className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>
        <div className="flex flex-col overflow-hidden rounded-full bg-white shadow-md">
          <button
            type="button"
            aria-label="Zoom in"
            className="flex h-10 w-10 items-center justify-center text-neutral-700 transition hover:bg-neutral-50"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
          </button>
          <div className="h-px bg-neutral-200" />
          <button
            type="button"
            aria-label="Zoom out"
            className="flex h-10 w-10 items-center justify-center text-neutral-700 transition hover:bg-neutral-50"
          >
            <Minus className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <p className="absolute bottom-4 left-4 rounded-md bg-white/90 px-2 py-1 text-xs text-neutral-500">
        Map placeholder — real map coming in a later step
      </p>
    </div>
  );
}
