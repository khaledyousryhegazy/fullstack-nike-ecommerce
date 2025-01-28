import { IUser } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface IState {
  isLoggedIn: boolean;
  user: IUser | null;
}

const isLoggedIn = () => {
  return Cookies.get("token") ? true : false;
};

const userFromCookies = (): IUser | null => {
  const userInfo = Cookies.get("userInfo");
  if (userInfo) {
    try {
      return JSON.parse(userInfo) as IUser;
    } catch (error) {
      console.error("Failed to parse userInfo from cookies:", error);
      return null;
    }
  }
  return null;
};

const initialState: IState = {
  isLoggedIn: isLoggedIn(),
  user: userFromCookies(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer for login
    authLogin: (state, action) => {
      const { user, token } = action.payload;
      console.log("🚀 ~  token:", token);
      console.log("🚀 ~ user:", user);
      state.isLoggedIn = true;
      state.user = user;
      Cookies.set("token", token);
      Cookies.set("userInfo", JSON.stringify(user));
    },
    // Reducer for logging out
    authLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      Cookies.remove("token");
      Cookies.remove("userInfo");
    },
  },
});

// Export actions
export const { authLogin, authLogout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
