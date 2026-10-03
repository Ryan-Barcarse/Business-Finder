import { Business } from "@/types/business";

// Placeholder data so we can build the app before wiring up a real
// backend. Every entry here is a fictional independent/local business
// — no chains, by design. Each one has a fixed mile offset instead of
// a real address, so it gets placed realistically close to wherever
// the map is centered (see src/lib/geo.ts), rather than being pinned
// to one fixed, possibly-far-away city.
export const fakeBusinesses: Business[] = [
  {
    id: "1",
    name: "Maple & Rye Diner",
    category: "Food",
    rating: 4.7,
    reviewCount: 212,
    isIndependent: true,
    offset: { milesNorth: 0.2, milesEast: -0.35 },
  },
  {
    id: "2",
    name: "Cobblestone Coffee Co.",
    category: "Coffee",
    rating: 4.9,
    reviewCount: 388,
    isIndependent: true,
    offset: { milesNorth: 0.07, milesEast: 0.19 },
  },
  {
    id: "3",
    name: "Thistle & Thread Boutique",
    category: "Shopping",
    rating: 4.5,
    reviewCount: 94,
    isIndependent: true,
    offset: { milesNorth: -0.08, milesEast: 0.9 },
  },
  {
    id: "4",
    name: "The Rusty Reel Arcade",
    category: "Entertainment",
    rating: 4.6,
    reviewCount: 150,
    isIndependent: true,
    offset: { milesNorth: -1.22, milesEast: -0.44 },
  },
  {
    id: "5",
    name: "Hollow & Pine Hardware",
    category: "Services",
    rating: 4.8,
    reviewCount: 61,
    isIndependent: true,
    offset: { milesNorth: -0.12, milesEast: -0.69 },
  },
  {
    id: "6",
    name: "Salt & Ember BBQ",
    category: "Food",
    rating: 4.4,
    reviewCount: 176,
    isIndependent: true,
    offset: { milesNorth: -0.47, milesEast: 1.0 },
  },
  {
    id: "7",
    name: "Lantern Books & Records",
    category: "Shopping",
    rating: 4.9,
    reviewCount: 203,
    isIndependent: true,
    offset: { milesNorth: -0.56, milesEast: 0.21 },
  },
  {
    id: "8",
    name: "Juniper Lane Bike Repair",
    category: "Services",
    rating: 4.7,
    reviewCount: 48,
    isIndependent: true,
    offset: { milesNorth: 1.5, milesEast: -0.55 },
  },
];
