// registerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./registerThunk";

interface IRegister {
  loading: boolean;
  error: string | null;
}

const initialState: IRegister = {
  loading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear any previous errors
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export default registerSlice.reducer;
