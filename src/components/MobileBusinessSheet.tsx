import { PlacedBusiness } from "@/lib/geo";
import BusinessCard from "./BusinessCard";

interface MobileBusinessSheetProps {
  businesses: PlacedBusiness[];
}

// Mobile bottom sheet: sits over the map, anchored to the bottom of
// the screen. The drag handle is visual only right now — actual
// drag-to-resize behavior will be added once the map itself is real,
// so we have real content/height to drag against.
export default function MobileBusinessSheet({ businesses }: MobileBusinessSheetProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex max-h-[45%] flex-col rounded-t-3xl bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
      <div className="flex shrink-0 justify-center py-2">
        <div className="h-1.5 w-10 rounded-full bg-neutral-300" />
      </div>
      <div className="shrink-0 px-4 pb-2">
        <p className="text-sm text-neutral-500">{businesses.length} local businesses nearby</p>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <div className="flex flex-col gap-2">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </div>
  );
}
