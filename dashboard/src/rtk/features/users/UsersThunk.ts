import { getAllUsers } from "@/services/users";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (page: number) => {
    try {
      const users = await getAllUsers(page);
      if (!users) throw new Error("No products available.");
      return users;
    } catch (error) {
      const fetchError = error instanceof Error ? error.message : String(error);
      console.error("Error fetching users:", fetchError);
    }
  }
);
