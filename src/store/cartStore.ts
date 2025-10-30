import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import useAuthStore from './authStore';

export type Cart = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export type UserCart = {
  userId: number;
  items: Cart[];
};

type CartAction = {
  userCarts: UserCart[];
  addToCart: (newItem: Cart) => void;
};

const useCartStore = create<CartAction>()(
  persist(
    (set, get) => ({
      userCarts: [],
      addToCart: (newItem) => {
        const activeUserId = useAuthStore.getState().currentUser!.userId;
        const userCarts = get().userCarts;
        const existingUserCart = userCarts.find(
          (cart) => cart.userId === activeUserId
        );

        if (!existingUserCart) {
          const newCart: UserCart = {
            userId: activeUserId,
            items: [newItem],
          };
          set({ userCarts: [...get().userCarts, newCart] });
          return;
        }

        const existingItems = existingUserCart.items;
        const existingItem = existingItems.find(
          (item) => item.id === newItem.id
        );
        let updatedItems: Cart[];

        if (existingItem) {
          updatedItems = existingItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          updatedItems = [...existingItems, newItem];
        }

        const updatedUserCarts = userCarts.map((cart) =>
          cart.userId === activeUserId ? { ...cart, items: updatedItems } : cart
        );

        set({ userCarts: updatedUserCarts });
      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ userCarts: state.userCarts }),
    }
  )
);

export default useCartStore;
