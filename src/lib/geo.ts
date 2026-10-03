import { Business } from "@/types/business";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface PlacedBusiness extends Business {
  lat: number;
  lng: number;
  distanceMiles: number;
}

const MILES_PER_DEGREE_LAT = 69.0;

function milesPerDegreeLng(latDeg: number): number {
  return 69.172 * Math.cos((latDeg * Math.PI) / 180);
}

/** Converts a fixed mile offset from a center point into real lat/lng. */
export function offsetToLatLng(
  center: LatLng,
  offset: { milesNorth: number; milesEast: number }
): LatLng {
  return {
    lat: center.lat + offset.milesNorth / MILES_PER_DEGREE_LAT,
    lng: center.lng + offset.milesEast / milesPerDegreeLng(center.lat),
  };
}

/** Great-circle distance between two coordinates, in miles. */
export function haversineMiles(a: LatLng, b: LatLng): number {
  const EARTH_RADIUS_MILES = 3958.8;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.min(1, Math.sqrt(h)));
}

/**
 * Places each fake business near `center` (the user's real location when
 * available, otherwise the default fallback) using its fixed mile offset,
 * and computes its live distance from the user's actual position.
 */
export function placeBusinesses(
  businesses: Business[],
  center: LatLng,
  userPosition: LatLng | null
): PlacedBusiness[] {
  return businesses.map((business) => {
    const latLng = offsetToLatLng(center, business.offset);
    const distanceMiles = haversineMiles(userPosition ?? center, latLng);
    return { ...business, ...latLng, distanceMiles };
  });
}
