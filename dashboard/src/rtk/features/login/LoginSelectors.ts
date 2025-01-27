import { RootState } from "../../store";

export const selectLoginLoading = (state: RootState) => state.login.loading;
export const selectLoginSuccess = (state: RootState) => state.login.success;
export const selectLoginUserInfo = (state: RootState) => state.login.userInfo;
export const selectLoginUserToken = (state: RootState) => state.login.userToken;
export const selectLoginError = (state: RootState) => state.login.error;
