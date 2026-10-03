"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from "react-leaflet";
import { RefreshCw, LocateFixed, Plus, Minus, Star, Store } from "lucide-react";
import { PlacedBusiness } from "@/lib/geo";
import { getBusinessIcon, getUserLocationIcon } from "@/lib/mapIcons";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "@/lib/mapCenter";
import { GeoPosition } from "@/hooks/useGeolocation";

interface MapViewProps {
  businesses: PlacedBusiness[];
  userPosition: GeoPosition | null;
  locationError: string | null;
}

export default function MapView({ businesses, userPosition, locationError }: MapViewProps) {
  const initialCenter = userPosition ?? DEFAULT_CENTER;

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[initialCenter.lat, initialCenter.lng]}
        zoom={DEFAULT_ZOOM}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userPosition && (
          <>
            <Circle
              center={[userPosition.lat, userPosition.lng]}
              radius={userPosition.accuracy}
              pathOptions={{ color: "#2563eb", weight: 1, fillColor: "#2563eb", fillOpacity: 0.08 }}
            />
            <Marker position={[userPosition.lat, userPosition.lng]} icon={getUserLocationIcon()} />
          </>
        )}

        {businesses.map((business) => (
          <Marker
            key={business.id}
            position={[business.lat, business.lng]}
            icon={getBusinessIcon(business.category)}
          >
            <Popup>
              <div className="min-w-[160px]">
                <p className="font-medium text-neutral-900">{business.name}</p>
                <p className="mt-1 flex items-center gap-1 text-[13px] text-neutral-500">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={0} />
                  <span className="font-medium text-neutral-700">{business.rating.toFixed(1)}</span>
                  <span>·</span>
                  <span>{business.category}</span>
                  <span>·</span>
                  <span>{business.distanceMiles.toFixed(1)} mi</span>
                </p>
                {business.isIndependent && (
                  <p className="mt-1 flex items-center gap-1 text-[12px] text-emerald-700">
                    <Store className="h-3 w-3" strokeWidth={2} />
                    <span>Independently owned</span>
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        <RecenterOnFirstFix position={userPosition} />
        <MapControls userPosition={userPosition} />
      </MapContainer>

      {locationError && (
        <p className="absolute bottom-4 left-4 z-[1000] rounded-md bg-white/90 px-2 py-1 text-xs text-neutral-500">
          {locationError}
        </p>
      )}
    </div>
  );
}

// Flies to the user's real location the first time it's found, so the
// map doesn't sit on the generic fallback area once we actually know
// where they are. Only fires once — later position updates (the user
// physically moving) just move the marker, they don't yank the map.
function RecenterOnFirstFix({ position }: { position: GeoPosition | null }) {
  const map = useMap();
  const hasCentered = useRef(false);

  useEffect(() => {
    if (position && !hasCentered.current) {
      hasCentered.current = true;
      map.flyTo([position.lat, position.lng], Math.max(map.getZoom(), 15));
    }
  }, [position, map]);

  return null;
}

// Custom controls styled to match the rest of the UI, replacing
// Leaflet's default zoom buttons (zoomControl={false} above).
function MapControls({ userPosition }: { userPosition: GeoPosition | null }) {
  const map = useMap();
  const [showSearchArea, setShowSearchArea] = useState(false);

  useMapEvents({
    dragend: () => setShowSearchArea(true),
    zoomend: () => setShowSearchArea(true),
  });

  return (
    <>
      {showSearchArea && (
        <div className="absolute top-4 left-1/2 z-[1000] -translate-x-1/2">
          <button
            type="button"
            onClick={() => setShowSearchArea(false)}
            className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-md transition hover:bg-neutral-50"
          >
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
            <span>Search this area</span>
          </button>
        </div>
      )}

      <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-2">
        <button
          type="button"
          aria-label="Center on my location"
          disabled={!userPosition}
          onClick={() =>
            userPosition && map.flyTo([userPosition.lat, userPosition.lng], Math.max(map.getZoom(), 15))
          }
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-700 shadow-md transition hover:bg-neutral-50 disabled:opacity-40"
        >
          <LocateFixed className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>
        <div className="flex flex-col overflow-hidden rounded-full bg-white shadow-md">
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => map.zoomIn()}
            className="flex h-10 w-10 items-center justify-center text-neutral-700 transition hover:bg-neutral-50"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
          </button>
          <div className="h-px bg-neutral-200" />
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => map.zoomOut()}
            className="flex h-10 w-10 items-center justify-center text-neutral-700 transition hover:bg-neutral-50"
          >
            <Minus className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  );
}
