// src/components/MenuItemCard.tsx
import React from "react";
import type { MenuItem } from "../types/menu";

interface Props {
  item: MenuItem;
}

export const MenuItemCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="flex gap-3 py-3 border-b border-white/5">
      {item.imageUrl && (
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex-1">
        <div className="flex justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm sm:text-base">
                {item.name}
              </h3>
              {!item.isAvailable && (
                <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                  Not available
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                {item.description}
              </p>
            )}
            {item.longDescription && (
              <p className="text-[11px] text-white/50 mt-1 hidden sm:block">
                {item.longDescription}
              </p>
            )}
          </div>
          <div className="text-right min-w-[72px] ml-2">
            <div className="text-sm font-semibold">
              {item.price.toFixed(2)} €
            </div>
          </div>
        </div>

        {(item.tags.length > 0 || item.allergens.length > 0) && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.map(tag => (
              <span
                key={`tag-${tag}`}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60"
              >
                {tag}
              </span>
            ))}
            {item.allergens.map(all => (
              <span
                key={`allergen-${all}`}
                className="text-[10px] px-2 py-0.5 rounded-full border border-yellow-400/60 text-yellow-300/80 bg-yellow-500/5"
              >
                {all}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
