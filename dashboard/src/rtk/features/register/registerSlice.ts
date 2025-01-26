import { IUser } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./registerThunk";

interface IRegister {
  loading: boolean;
  userInfo: IUser | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

const initialState: IRegister = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload?.token;
      state.success = true;
    });
    builder.addCase(createUser.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error.message || "error during get data";
    });
  },
});

export default registerSlice.reducer;
