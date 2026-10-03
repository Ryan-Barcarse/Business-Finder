// Shared types for business data used across the app.

export type Category = "Food" | "Coffee" | "Shopping" | "Entertainment" | "Services";

export interface Business {
  id: string;
  name: string;
  category: Category;
  rating: number; // 0–5
  reviewCount: number;
  /** All businesses in this app are independently owned by design, but the
   *  flag is explicit so the UI can surface it rather than assume it. */
  isIndependent: boolean;
  /**
   * Fixed offset in miles from wherever the map is centered (the user's
   * real location when available, otherwise a default fallback area).
   * This keeps the fake data realistically "nearby" no matter where the
   * app is actually opened, instead of pinning it to one fixed city.
   * See src/lib/geo.ts for how this becomes a real lat/lng + distance.
   */
  offset: { milesNorth: number; milesEast: number };
}
