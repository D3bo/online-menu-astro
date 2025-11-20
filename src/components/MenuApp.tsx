import React, { useEffect, useState } from "react";
import type { MenuCategory } from "../types/menu";
import { fetchMenuForTenant } from "../api/menuApi";
import { CategoryTabs } from "./CategoryTabs";
import { MenuCategorySection } from "./MenuCategorySection";



export const MenuApp: React.FC = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const cats = await fetchMenuForTenant();
        setCategories(cats);
        if (cats.length > 0) {
          setActiveCategoryId(cats[0].id);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load menu");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {isLoading && (
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-40 bg-white/10 rounded-full" />
          <div className="h-6 w-full bg-white/5 rounded-xl" />
          <div className="h-64 w-full bg-white/5 rounded-2xl" />
        </div>
      )}

      {!isLoading && error && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-200 rounded-xl p-4 text-sm">
          <div className="font-semibold mb-1">Unable to load menu</div>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && categories.length > 0 && (
        <>
          <CategoryTabs
            categories={categories}
            activeCategoryId={activeCategoryId}
            onChange={setActiveCategoryId}
          />
          {activeCategory ? (
            <MenuCategorySection category={activeCategory} />
          ) : (
            <p className="text-white/60 text-sm">
              No items found for this category.
            </p>
          )}
        </>
      )}
    </div>
  );
};
