// Shared types for business data used across the app.
// This stays intentionally small for now — no map/geo libraries yet.

export type Category = "Food" | "Coffee" | "Shopping" | "Entertainment" | "Services";

export interface Business {
  id: string;
  name: string;
  category: Category;
  rating: number; // 0–5
  reviewCount: number;
  distanceMiles: number;
  /** All businesses in this app are independently owned by design, but the
   *  flag is explicit so the UI can surface it rather than assume it. */
  isIndependent: boolean;
  /** Roughly positioned on the placeholder map as percentages (0–100). */
  position: { top: number; left: number };
}
