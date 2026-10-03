import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Category } from "@/types/business";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

// Builds a Leaflet divIcon per category, reusing the exact same icon set
// as the filter chips and business cards so markers stay visually
// consistent with the rest of the UI. Built once per category and cached,
// since the icon set never changes at runtime.
const businessIconCache = new Map<Category, L.DivIcon>();

export function getBusinessIcon(category: Category): L.DivIcon {
  const cached = businessIconCache.get(category);
  if (cached) return cached;

  const Icon = CATEGORY_ICONS[category];
  const svg = renderToStaticMarkup(<Icon color="white" size={16} strokeWidth={2} />);

  const icon = L.divIcon({
    className: "",
    html: `
      <div class="flex flex-col items-center">
        <div class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 shadow-md">${svg}</div>
        <div class="h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-emerald-600"></div>
      </div>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -36],
  });

  businessIconCache.set(category, icon);
  return icon;
}

let userLocationIcon: L.DivIcon | null = null;

export function getUserLocationIcon(): L.DivIcon {
  if (userLocationIcon) return userLocationIcon;

  userLocationIcon = L.divIcon({
    className: "",
    html: `
      <div class="relative flex h-7 w-7 items-center justify-center">
        <span class="absolute h-7 w-7 rounded-full bg-blue-500/20 animate-ping"></span>
        <span class="relative h-3 w-3 rounded-full border-2 border-white bg-blue-600 shadow"></span>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

  return userLocationIcon;
}
