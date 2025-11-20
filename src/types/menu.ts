// src/types/menu.ts

// Back-end DTOs (1:1 with your C# classes)
export interface GroupDto {
  code: string;
  name: string;
  description: string;
  order: number;
  hidden: boolean;
}

export interface DishDto {
  code?: string | null;
  name?: string | null;
  description?: string | null;
  longDescription?: string | null;
  isAvailable: boolean;
  price: number;
  imageUrl: string;
  categoryId: string;
  category: string;
  allergens: string[];
  tags: string[];
  displayOrder: number;
}

// UI view models (what the React components will use)
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  longDescription?: string;
  isAvailable: boolean;
  price: number;
  imageUrl?: string;
  allergens: string[];
  tags: string[];
}

export interface MenuCategory {
  id: string;           // group code
  name: string;         // group name
  description?: string;
  order: number;
  items: MenuItem[];
}
