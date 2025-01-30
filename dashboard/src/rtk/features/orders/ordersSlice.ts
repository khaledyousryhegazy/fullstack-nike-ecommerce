import { createSlice } from "@reduxjs/toolkit";
import { IOrderArray } from "@/interfaces/interfaces";
import { fetchOrders } from "./OrdersThunk";

interface OrdersState {
  orders: IOrderArray[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "error during get data";
      });
  },
});

export default ordersSlice.reducer;
