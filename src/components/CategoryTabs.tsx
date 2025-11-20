// src/components/CategoryTabs.tsx
import React from "react";
import type { MenuCategory } from "../types/menu";

interface Props {
  categories: MenuCategory[];
  activeCategoryId?: string;
  onChange: (id: string) => void;
}

export const CategoryTabs: React.FC<Props> = ({
  categories,
  activeCategoryId,
  onChange,
}) => {
  return (
    <nav className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm text-white/60 uppercase tracking-[0.15em]">
          Menu
        </h2>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => {
          const isActive = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={[
                "px-3 py-1.5 rounded-full text-xs sm:text-sm border transition whitespace-nowrap",
                isActive
                  ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-500/40"
                  : "bg-white/5 text-white/70 border-white/10 hover:border-red-400/60 hover:text-white"
              ].join(" ")}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
