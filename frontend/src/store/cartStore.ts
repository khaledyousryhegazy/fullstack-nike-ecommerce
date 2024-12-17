import { ICart } from "@/interfaces/interfaces";
import {
  addToCart,
  decrementQuantity,
  getCart,
  removeFromCart,
} from "@/services/cartServices";

import { create } from "zustand";

type storeType = {
  cart: ICart | null;
  getAllProducts: () => Promise<void>;
  addProduct: (productId: string) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  decrementQuantity: (productId: string) => Promise<void>;
};

export const useCart = create<storeType>((set) => ({
  cart: null,

  getAllProducts: async () => {
    const data = await getCart();
    set({ cart: data });
  },

  addProduct: async (productId) => {
    await addToCart(productId);
    const updatedCart = await getCart();
    set({ cart: updatedCart });
  },

  removeProduct: async (productId) => {
    await removeFromCart(productId);
    const updatedCart = await getCart();
    set({ cart: updatedCart });
  },
  decrementQuantity: async (productId) => {
    await decrementQuantity(productId);
    const updatedCart = await getCart();
    set({ cart: updatedCart });
  },
}));
