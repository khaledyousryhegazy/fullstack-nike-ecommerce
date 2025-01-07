import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
