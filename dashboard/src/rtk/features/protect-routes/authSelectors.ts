import { RootState } from "../../store";

export const authIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const authUserInfo = (state: RootState) => state.auth.user;
