import { IUser } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { loginToDashboard } from "./loginThunk";

interface ILogin {
  loading: boolean;
  userInfo: IUser | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

const initialState: ILogin = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginToDashboard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginToDashboard.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload?.user;
      state.userToken = payload?.token;
    });
    builder.addCase(loginToDashboard.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload as string;
    });
  },
});
export default loginSlice.reducer;
