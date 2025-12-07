import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulación de login (reemplazar con API real)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email && password.length >= 6) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email,
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=0D8ABC&color=fff`,
          };

          set({ user, isAuthenticated: true });
          return true;
        }

        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      register: async (name: string, email: string, password: string) => {
        // Simulación de registro (reemplazar con API real)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (name && email && password.length >= 6) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`,
          };

          set({ user, isAuthenticated: true });
          return true;
        }

        return false;
      },
    }),
    {
      name: 'user-storage',
    }
  )
);