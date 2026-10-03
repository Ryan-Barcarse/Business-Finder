import { fakeBusinesses } from "@/data/fakeBusinesses";
import BusinessCard from "./BusinessCard";

// Desktop/tablet sidebar: a fixed-width column listing businesses
// currently "visible" on the map (all of them, for now — no real
// map bounds to filter by yet).
export default function BusinessListPanel() {
  return (
    <aside className="hidden h-full w-[380px] shrink-0 flex-col border-r border-black/5 bg-white md:flex">
      <div className="border-b border-black/5 px-4 py-3">
        <p className="text-sm text-neutral-500">
          {fakeBusinesses.length} local businesses nearby
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-2">
          {fakeBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </aside>
  );
}
