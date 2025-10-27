import { create } from "zustand";
import { persist } from "zustand/middleware"

import { basketAPI } from "@requests";

const useBasketStore = create(
  persist(
    (set, get) => ({
      items: [],
      userId: null,

      addItem: async (productId, quantity = 1) => {
        const { items, userId } = get();
        const existing = items.find(i => i.product === productId);

        let updated;
        if (existing) {
          updated = items.map(i =>
            i.product === productId ? { ...i, quantity: i.quantity + quantity } : i
          );
        } else {
          updated = [...items, { product: productId, quantity }];
        }

        set({ items: updated });

        if (userId) await basketAPI.addBasket(productId, quantity);
      },

      removeItem: (productId) => {
        const filtered = get().items.filter(i => i.product !== productId);
        set({ items: filtered });
      },

      mergeBasket: async () => {
        const localItems = get().items;
        const merged = await basketAPI.merge(localItems);
        set({ items: merged });
      },

      loadBasket: async () => {
        const serverBasket = await basketAPI.getBasket();
        set({ items: serverBasket });
      },

      clearBasket: () => set({ items: [] }),
    }),
    {
      name: "guest-basket",
      getStorage: () => localStorage,
    }
  )
);

export default useBasketStore;
