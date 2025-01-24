import { IUser } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./UsersThunk";

interface UserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: true,
  error: "",
};

export const usersSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "error during get data";
      });
  },
});
export default usersSlice.reducer;
