import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/products/productSlice";
import usersSlice from "./features/users/UsersSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: usersSlice,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
