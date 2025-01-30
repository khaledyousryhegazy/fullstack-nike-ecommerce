import { IOrderData } from "@/interfaces/interfaces";
import { getAllOrders } from "@/services/orders";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all products
export const fetchOrders = createAsyncThunk<IOrderData, number>(
  "orders/fetchOrders",
  async (page: number) => {
    try {
      const orders = await getAllOrders(page);
      if (!orders) throw new Error("No orders available.");
      return orders;
    } catch (error) {
      const fetchError = error instanceof Error ? error.message : String(error);
      console.error("Error fetching Orders:", fetchError);
    }
  }
);
