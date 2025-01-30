import axios from "axios";

const API_BASE_URL = "http://localhost:8000/orders";

export const getAllOrders = async (page: number, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`, {
      params: { page, limit },
    });

    // Ensure the response data exists
    if (!response) {
      throw Error("No response from api data");
    }

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, msg: errorMessage };
  }
};

// Update order status
export const updateOrderStatus = async (id: string, status: string) => {
  try {
    await axios.post(`${API_BASE_URL}/update-status`, {
      orderId: id,
      status: status,
    });
  } catch (err) {
    // Handle errors
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    console.error("🚀 ~ updateOrderStatus ~ error:", errorMessage);
    throw new Error(errorMessage); // Re-throw the error for the caller to handle
  }
};
