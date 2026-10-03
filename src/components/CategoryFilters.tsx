"use client";

import { useState } from "react";
import { Category } from "@/types/business";

const CATEGORIES: { label: Category; emoji: string }[] = [
  { label: "Food", emoji: "🍽️" },
  { label: "Coffee", emoji: "☕" },
  { label: "Shopping", emoji: "🛍️" },
  { label: "Entertainment", emoji: "🎉" },
  { label: "Services", emoji: "🔧" },
];

// Chip row is interactive (toggle highlight) but doesn't filter the
// business list yet — that comes once the map/list are wired together.
export default function CategoryFilters() {
  const [active, setActive] = useState<Category | null>(null);

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-black/5 bg-white px-4 py-3 sm:px-6">
      {CATEGORIES.map(({ label, emoji }) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setActive(isActive ? null : label)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              isActive
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-black/10 bg-white text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
