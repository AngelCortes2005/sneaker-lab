import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Sneaker } from '@/lib/action/general.actions';

export interface CartItem extends Sneaker {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (sneaker: Sneaker) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (sneaker: Sneaker) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === sneaker.id);
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === sneaker.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { ...sneaker, quantity: 1 }],
          };
        });
      },
      
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);