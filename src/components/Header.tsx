// Top bar: brand + search input. Purely visual for now — typing
// doesn't filter anything yet since we're still laying out the page.
export default function Header() {
  return (
    <header className="flex items-center gap-4 border-b border-black/5 bg-white px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2 font-semibold text-emerald-700">
        <span className="text-xl">📍</span>
        <span className="hidden text-lg sm:inline">Nearby</span>
      </div>

      <div className="relative flex-1 max-w-xl">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search businesses or locations"
          className="w-full rounded-full border border-black/10 bg-neutral-100 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      <button
        className="hidden shrink-0 items-center gap-1.5 rounded-full border border-black/10 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 sm:flex"
        type="button"
      >
        <span>♡</span>
        <span>Favorites</span>
      </button>
    </header>
  );
}
