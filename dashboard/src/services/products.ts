import { IProducts } from "@/interfaces/interfaces";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Get all products
export const getAllProducts = async (page: number, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { page, limit },
    });

    // Ensure the response data exists
    if (!response || !response.data) {
      console.warn("No response data received from the API.");
      return null;
    }

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      "Error fetching products get all products method:",
      errorMessage
    );
    return null;
  }
};

// create products
export const createProduct = async (data: IProducts) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, data);

    if (!response) {
      console.error("there's no response !!");
      return null;
    }
  } catch (error) {
    const responseError =
      error instanceof Error ? error.message : String(error);

    console.log("method create catch error =>", responseError);
    return null;
  }
};

// edit products
export const editProduct = async (id: string | undefined, data: IProducts) => {
  try {
    if (!id) {
      console.log("there's no id found");
      return;
    }

    const response = await axios.put(`${API_BASE_URL}/products/${id}`, data);

    if (!response) {
      console.error("there's no response !!");
      return null;
    }
  } catch (error) {
    const responseError =
      error instanceof Error ? error.message : String(error);

    console.log("method edit catch error =>", responseError);
    return null;
  }
};

// delete products
export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);

    if (!response) {
      console.error("there's no response !!");
      return null;
    }
  } catch (error) {
    const responseError =
      error instanceof Error ? error.message : String(error);

    console.log("method delete catch error =>", responseError);
    return null;
  }
};
