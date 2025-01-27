// registerThunk.js
import { register } from "@/services/users";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IRegister {
  username: string;
  email: string;
  password: string;
  role: string;
}

export const createUser = createAsyncThunk(
  "register/createUser",
  async (data: IRegister, { rejectWithValue }) => {
    try {
      const user = await register(data);
      return user; // On success, return the user info
    } catch (error) {
      const fetchError = error instanceof Error ? error.message : String(error);
      return rejectWithValue(fetchError); // Return the error message if failed
    }
  }
);
