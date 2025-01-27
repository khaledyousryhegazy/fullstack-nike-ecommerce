import { login } from "@/services/users";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ILogin {
  email: string;
  password: string;
}

export const loginToDashboard = createAsyncThunk(
  "login/loginToDashboard",
  async (data: ILogin, { rejectWithValue }) => {
    try {
      const response = await login(data);
      if (!response.success) {
        throw new Error(response.msg || "Login failed");
      }
      return response;
    } catch (error) {
      const loginError = error instanceof Error ? error.message : String(error);
      return rejectWithValue(loginError);
    }
  }
);
