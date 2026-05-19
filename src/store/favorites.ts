import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_FAVORITES = 5;

interface FavoritesState {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  reorder: (from: number, to: number) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id) => {
        const current = get().favorites;
        if (current.includes(id)) return;
        const updated = [id, ...current].slice(0, MAX_FAVORITES);
        set({ favorites: updated });
      },

      removeFavorite: (id) => {
        set({ favorites: get().favorites.filter((f) => f !== id) });
      },

      reorder: (from, to) => {
        const list = [...get().favorites];
        const [moved] = list.splice(from, 1);
        list.splice(to, 0, moved);
        set({ favorites: list });
      },

      isFavorite: (id) => get().favorites.includes(id),
    }),
    { name: "rick-morty-favorites" }
  )
);
