import { PlacedBusiness } from "@/lib/geo";
import BusinessCard from "./BusinessCard";

interface BusinessListPanelProps {
  businesses: PlacedBusiness[];
}

// Desktop/tablet sidebar: a fixed-width column listing businesses
// currently "visible" on the map (all of them, for now — no real
// map bounds to filter by yet).
export default function BusinessListPanel({ businesses }: BusinessListPanelProps) {
  return (
    <aside className="hidden h-full w-[380px] shrink-0 flex-col border-r border-neutral-200 bg-white md:flex">
      <div className="border-b border-neutral-200 px-4 py-3">
        <p className="text-sm text-neutral-500">{businesses.length} local businesses nearby</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-2">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </aside>
  );
}
