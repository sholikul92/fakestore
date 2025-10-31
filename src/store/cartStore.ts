import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import useAuthStore from './authStore';

export type Cart = {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  totalPrice: number;
  quantity: number;
};

export type UserCart = {
  userId: number;
  items: Cart[];
};

type CartAction = {
  userCarts: UserCart[];
  addToCart: (newItem: Cart) => void;
  increaseQuantityItem: (id: number) => void;
  decreaseQuantityItem: (id: number) => void;
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
          updatedItems = existingItems.map((item) => {
            const newQuantity = item.quantity + newItem.quantity;
            return item.id === newItem.id
              ? {
                  ...item,
                  quantity: newQuantity,
                  totalPrice: item.price * newQuantity,
                }
              : item;
          });
        } else {
          updatedItems = [...existingItems, newItem];
        }

        const updatedUserCarts = userCarts.map((cart) =>
          cart.userId === activeUserId ? { ...cart, items: updatedItems } : cart
        );

        set({ userCarts: updatedUserCarts });
      },

      increaseQuantityItem: (id) => {
        const currentUser = useAuthStore.getState().currentUser!;
        const rightCart = get().userCarts.find(
          (uc) => uc.userId === currentUser.userId
        )!;

        const addSelectedItem = rightCart.items.map((cart) => {
          const newQuantity = cart.quantity + 1;
          return cart.id === id
            ? {
                ...cart,
                quantity: newQuantity,
                totalPrice: cart.price * newQuantity,
              }
            : cart;
        });

        const cartUpdateWithAddQuantity = get().userCarts.map((uc) =>
          uc.userId === currentUser.userId
            ? { ...uc, items: addSelectedItem }
            : uc
        );

        set({ userCarts: cartUpdateWithAddQuantity });
      },

      decreaseQuantityItem: (id) => {
        const currentUser = useAuthStore.getState().currentUser!;
        const rightCart = get().userCarts.find(
          (uc) => uc.userId === currentUser.userId
        )!;

        const reduceSelectedItem = rightCart.items.map((cart) => {
          const newQuantity = cart.quantity - 1;
          return cart.id === id
            ? {
                ...cart,
                quantity: newQuantity,
                totalPrice: cart.price * newQuantity,
              }
            : cart;
        });

        const cartUpdateWithReducedQuantity = get().userCarts.map((uc) =>
          uc.userId === currentUser.userId
            ? { ...uc, items: reduceSelectedItem }
            : uc
        );

        set({ userCarts: cartUpdateWithReducedQuantity });
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
