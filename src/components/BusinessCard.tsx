"use client";

import { useState } from "react";
import { Business } from "@/types/business";

interface BusinessCardProps {
  business: Business;
}

// Card used in the business list panel. Favoriting is local, visual-only
// state for now. Clicking the card will eventually highlight the matching
// map marker, once the real map exists.
export default function BusinessCard({ business }: BusinessCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-2xl border border-black/5 bg-white p-3 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
        {business.emoji}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-neutral-900">{business.name}</p>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-neutral-500">
          <span className="text-amber-500">★</span>
          <span>{business.rating.toFixed(1)}</span>
          <span className="text-neutral-300">·</span>
          <span>{business.category}</span>
          <span className="text-neutral-300">·</span>
          <span>{business.distanceMiles} mi</span>
        </p>
      </div>

      <span
        role="button"
        aria-label="Toggle favorite"
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite((v) => !v);
        }}
        className={`shrink-0 text-xl transition ${
          isFavorite ? "text-rose-500" : "text-neutral-300 hover:text-neutral-400"
        }`}
      >
        {isFavorite ? "♥" : "♡"}
      </span>
    </button>
  );
}
