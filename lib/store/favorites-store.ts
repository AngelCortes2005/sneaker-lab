import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id: string) => {
        set((state) => {
          if (state.favorites.includes(id)) return state;
          return { favorites: [...state.favorites, id] };
        });
      },

      removeFavorite: (id: string) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== id),
        }));
      },

      toggleFavorite: (id: string) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(id)) {
          removeFavorite(id);
        } else {
          addFavorite(id);
        }
      },

      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);