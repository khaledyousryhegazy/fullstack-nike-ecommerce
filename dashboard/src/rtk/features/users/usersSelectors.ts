import { RootState } from "../../store";

export const selectUsers = (state: RootState) => state.user.users;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;
