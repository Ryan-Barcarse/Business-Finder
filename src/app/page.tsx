"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import Header from "@/components/Header";
import CategoryFilters from "@/components/CategoryFilters";
import BusinessListPanel from "@/components/BusinessListPanel";
import MobileBusinessSheet from "@/components/MobileBusinessSheet";
import { fakeBusinesses } from "@/data/fakeBusinesses";
import { placeBusinesses } from "@/lib/geo";
import { DEFAULT_CENTER } from "@/lib/mapCenter";
import { useGeolocation } from "@/hooks/useGeolocation";

// Leaflet touches `window` at import time, so the map must never be
// part of the server-rendered bundle — ssr: false keeps it entirely
// client-side.
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-sm text-neutral-400">
      Loading map…
    </div>
  ),
});

export default function Home() {
  const { position, error } = useGeolocation();

  // Places the fake businesses near the user's real location once we
  // have it (falling back to a default area otherwise), and recomputes
  // their distances live as that location updates.
  const businesses = useMemo(
    () => placeBusinesses(fakeBusinesses, position ?? DEFAULT_CENTER, position),
    [position]
  );

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <Header />
      <CategoryFilters />

      <div className="relative flex min-h-0 flex-1">
        <BusinessListPanel businesses={businesses} />

        <main className="relative min-h-0 flex-1">
          <MapView businesses={businesses} userPosition={position} locationError={error} />
          <MobileBusinessSheet businesses={businesses} />
        </main>
      </div>
    </div>
  );
}
