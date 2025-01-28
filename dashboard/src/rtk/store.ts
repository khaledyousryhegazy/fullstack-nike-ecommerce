import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/products/productSlice";
import usersSlice from "./features/users/UsersSlice";
import registerSlice from "./features/register/registerSlice";
import loginSlice from "./features/login/loginSlice";
import authSlice from "./features/protect-routes/auth";

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: usersSlice,
    register: registerSlice,
    login: loginSlice,
    auth: authSlice,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
