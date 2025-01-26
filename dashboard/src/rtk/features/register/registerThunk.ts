import { register } from "@/services/users";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "register/createUser",
  async (data: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) => {
    // Include role
    try {
      const user = await register(data);
      return user;
    } catch (error) {
      const fetchError = error instanceof Error ? error.message : String(error);
      console.error("Error creating user:", fetchError);
    }
  }
);
