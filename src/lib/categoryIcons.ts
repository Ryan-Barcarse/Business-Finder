import { Utensils, Coffee, ShoppingBag, Ticket, Wrench, LucideIcon } from "lucide-react";
import { Category } from "@/types/business";

// Single source of truth for category → icon, so the filter chips,
// business cards, and map markers all agree with each other instead
// of each picking their own.
export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  Food: Utensils,
  Coffee: Coffee,
  Shopping: ShoppingBag,
  Entertainment: Ticket,
  Services: Wrench,
};
