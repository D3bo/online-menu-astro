// src/components/MenuCategorySection.tsx
import React from "react";
import type { MenuCategory } from "../types/menu";
import { MenuItemCard } from "./MenuItemCard";

interface Props {
  category: MenuCategory;
}

export const MenuCategorySection: React.FC<Props> = ({ category }) => {
  return (
    <section className="scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-semibold mb-1 flex items-center gap-2">
        {category.name}
        <span className="h-px flex-1 bg-gradient-to-r from-red-500/60 to-transparent" />
      </h2>
      {category.description && (
        <p className="text-xs sm:text-sm text-white/60 mb-2">
          {category.description}
        </p>
      )}
      <div className="text-xs text-white/50 mb-4">
        {category.items.length} item{category.items.length !== 1 && "s"}
      </div>

      <div className="bg-white/5 rounded-2xl p-4 sm:p-6 shadow-lg shadow-black/40">
        {category.items.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
