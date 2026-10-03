"use client";

import { useState } from "react";
import { Category } from "@/types/business";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

const CATEGORIES: Category[] = ["Food", "Coffee", "Shopping", "Entertainment", "Services"];

// Chip row is interactive (toggle highlight) but doesn't filter the
// business list yet — that comes once the map/list are wired together.
export default function CategoryFilters() {
  const [active, setActive] = useState<Category | null>(null);

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-neutral-200 bg-white px-4 py-3 sm:px-6">
      {CATEGORIES.map((label) => {
        const Icon = CATEGORY_ICONS[label];
        const isActive = active === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setActive(isActive ? null : label)}
            aria-pressed={isActive}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              isActive
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
