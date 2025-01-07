/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProducts } from "@/services/products";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await getAllProducts();
      if (!products) throw new Error("No products available.");
      return products;
    } catch (error: any) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.message || "Failed to fetch products.");
    }
  }
);
