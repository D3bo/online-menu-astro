// src/api/menuApi.ts
import type { GroupDto, DishDto, MenuCategory, MenuItem } from "../types/menu";

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL || "https://cloud.vulcanoteam.it/api/cloudmenu/510337";

// Helper: transform DTO to view model
function buildMenu(groups: GroupDto[], dishes: DishDto[]): MenuCategory[] {
  const visibleGroups = groups
    .filter(g => !g.hidden)
    .sort((a, b) => a.order - b.order);

  return visibleGroups.map(group => {
    const groupDishes = dishes
      .filter(d => d.categoryId === group.code)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const items: MenuItem[] = groupDishes.map(d => ({
      id: d.code || `${group.code}-${d.name ?? ""}`,
      name: d.name ?? "",
      description: d.description ?? undefined,
      longDescription: d.longDescription ?? undefined,
      isAvailable: d.isAvailable,
      price: d.price,
      imageUrl: d.imageUrl || undefined,
      allergens: d.allergens || [],
      tags: d.tags || [],
    }));

    return {
      id: group.code,
      name: group.name,
      description: group.description || undefined,
      order: group.order,
      items,
    };
  });
}

export async function fetchMenuForTenant(): Promise<MenuCategory[]> {
  const [groupsRes, dishesRes] = await Promise.all([
    fetch(`${API_BASE_URL}/groups`, {
      headers: { Accept: "application/json" },
    }),
    fetch(`${API_BASE_URL}/dishes`, {
      headers: { Accept: "application/json" },
    }),
  ]);

  if (!groupsRes.ok) {
    throw new Error(`Failed to load groups (${groupsRes.status})`);
  }
  if (!dishesRes.ok) {
    throw new Error(`Failed to load dishes (${dishesRes.status})`);
  }

  const groups = (await groupsRes.json()) as GroupDto[];
  const dishes = (await dishesRes.json()) as DishDto[];

  return buildMenu(groups, dishes);
}
