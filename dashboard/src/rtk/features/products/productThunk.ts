import { getAllProducts } from "@/services/products";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (page: number) => {
    try {
      const products = await getAllProducts(page);
      if (!products) throw new Error("No products available.");
      return products;
    } catch (error) {
      const fetchError = error instanceof Error ? error.message : String(error);
      console.error("Error fetching products:", fetchError);
    }
  }
);
