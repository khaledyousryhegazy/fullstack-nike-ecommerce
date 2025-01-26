import { RootState } from "../../store";

export const selectLoading = (state: RootState) => state.register.loading;
export const selectSuccess = (state: RootState) => state.register.success;
export const selectUserInfo = (state: RootState) => state.register.userInfo;
export const selectUserToken = (state: RootState) => state.register.userToken;
export const selectError = (state: RootState) => state.register.error;
