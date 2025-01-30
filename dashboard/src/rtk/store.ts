import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/products/productSlice";
import usersSlice from "./features/users/UsersSlice";
import registerSlice from "./features/register/registerSlice";
import loginSlice from "./features/login/loginSlice";
import authSlice from "./features/protect-routes/auth";
import ordersSlice from "./features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: usersSlice,
    register: registerSlice,
    login: loginSlice,
    auth: authSlice,
    orders: ordersSlice,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
