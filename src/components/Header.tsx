import { MapPin, Search, Heart } from "lucide-react";

// Top bar: brand + search input. Purely visual for now — typing
// doesn't filter anything yet since we're still laying out the page.
export default function Header() {
  return (
    <header className="flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3 sm:gap-4 sm:px-6">
      <div className="flex items-center gap-1.5 text-neutral-900">
        <MapPin className="h-5 w-5 text-emerald-600" strokeWidth={2.25} />
        <span className="hidden text-[15px] font-semibold tracking-tight sm:inline">
          Nearby
        </span>
      </div>

      <div className="relative flex-1 max-w-xl">
        <Search
          className="pointer-events-none absolute inset-y-0 left-3 my-auto h-4 w-4 text-neutral-400"
          strokeWidth={2}
        />
        <input
          type="text"
          placeholder="Search businesses or locations"
          className="w-full rounded-full border border-neutral-200 bg-neutral-100 py-2.5 pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/15"
        />
      </div>

      <button
        type="button"
        className="hidden shrink-0 items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 sm:flex"
      >
        <Heart className="h-4 w-4" strokeWidth={2} />
        <span>Favorites</span>
      </button>
    </header>
  );
}
