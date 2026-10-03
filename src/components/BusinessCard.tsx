"use client";

import { useState } from "react";
import { Star, Heart, Store } from "lucide-react";
import { PlacedBusiness } from "@/lib/geo";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

interface BusinessCardProps {
  business: PlacedBusiness;
}

// Card used in the business list panel. Favoriting is local, visual-only
// state for now. Clicking the card will eventually highlight the matching
// map marker, once the real map exists.
export default function BusinessCard({ business }: BusinessCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const CategoryIcon = CATEGORY_ICONS[business.category];

  return (
    <button
      type="button"
      className="flex w-full items-start gap-3 rounded-xl border border-neutral-200 bg-white p-3 text-left transition hover:border-neutral-300 hover:shadow-sm"
    >
      {/* Photo placeholder — real photos come once we wire up business data */}
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
        <CategoryIcon className="h-6 w-6 text-neutral-400" strokeWidth={1.75} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-neutral-900">{business.name}</p>

        <p className="mt-1 flex items-center gap-1 text-[13px] text-neutral-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={0} />
          <span className="font-medium text-neutral-700">{business.rating.toFixed(1)}</span>
          <span className="text-neutral-300">·</span>
          <span>{business.category}</span>
          <span className="text-neutral-300">·</span>
          <span>{business.distanceMiles.toFixed(1)} mi</span>
        </p>

        {business.isIndependent && (
          <p className="mt-1.5 flex items-center gap-1 text-[12px] text-emerald-700">
            <Store className="h-3 w-3" strokeWidth={2} />
            <span>Independently owned</span>
          </p>
        )}
      </div>

      <span
        role="button"
        aria-label="Toggle favorite"
        aria-pressed={isFavorite}
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite((v) => !v);
        }}
        className="shrink-0 p-0.5 text-neutral-300 transition hover:text-neutral-400"
      >
        <Heart
          className={`h-5 w-5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`}
          strokeWidth={2}
        />
      </span>
    </button>
  );
}
