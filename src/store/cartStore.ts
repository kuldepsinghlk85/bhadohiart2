import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
  slug?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id && i.size === item.size);
        if (existingItem) {
          return {
            items: state.items.map(i => 
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
            isOpen: true
          };
        }
        return { items: [...state.items, item], isOpen: true };
      }),
      removeItem: (id, size) => set((state) => ({
        items: state.items.filter(i => !(i.id === id && i.size === size))
      })),
      updateQuantity: (id, quantity, size) => set((state) => ({
        items: state.items.map(i => 
          i.id === id && i.size === size
            ? { ...i, quantity }
            : i
        )
      })),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'bhadohi-cart',
    }
  )
)
