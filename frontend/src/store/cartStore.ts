import { ICart, IOrder, IOrderData } from "@/interfaces/interfaces";
import {
  addToCart,
  decrementQuantity,
  getCart,
  removeFromCart,
} from "@/services/cartServices";
import { createOrder, getUserOrders } from "@/services/ordersServices";

import { create } from "zustand";

type storeType = {
  cart: ICart | null;
  orders: IOrderData[] | null;
  getAllOrders: () => Promise<void>;
  createOrder: (data: IOrder) => Promise<void>;
  getAllProducts: () => Promise<void>;
  addProduct: (productId: string) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  decrementQuantity: (productId: string) => Promise<void>;
};

export const useCart = create<storeType>((set) => ({
  cart: null,
  orders: null,

  // cart functions
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

  //orders function
  getAllOrders: async () => {
    const orders = await getUserOrders();
    set({ orders: orders });
  },

  createOrder: async (data) => {
    await createOrder(data);
    const updatedCart = await getCart();
    set({ cart: updatedCart });
  },
}));
