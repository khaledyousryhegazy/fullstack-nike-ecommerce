import axios from "axios";
import Alert from "@/components/Alert";

const API_URL = "http://localhost:8000/cart";

// get userId from localStorage if exist
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

// get all products from the cart based on userId
export const getCart = async () => {
  try {
    if (!user) {
      Alert({
        title: "please login to access the cart",
        icon: "info",
      });
      return;
    }

    const response = await axios.get(`${API_URL}/${user?._id}`);

    if (!response.data?.success) {
      Alert({
        title: "your cart is empty please add some products",
        icon: "info",
      });
      return;
    }

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    Alert({
      title: errorMessage,
      icon: "error",
    });
  }
};

// add new product to the cart
export const addToCart = async (productId: string) => {
  try {
    if (!productId) {
      Alert({
        title: "please provide a product",
        icon: "error",
      });
      return;
    }
    if (!user) {
      Alert({
        title: "please login to access the cart",
        icon: "info",
      });
      return;
    }

    const response = await axios.post(`${API_URL}/add`, {
      productId: productId,
      userId: user._id,
    });

    if (response.data) {
      Alert({
        title: "Successful operation",
        icon: "success",
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    Alert({
      title: errorMessage,
      icon: "error",
    });
  }
};

// remove product from the cart
export const removeFromCart = async (productId: string) => {
  try {
    if (!productId) {
      Alert({
        title: "please provide a product",
        icon: "error",
      });
      return;
    }

    const response = await axios.delete(`${API_URL}/remove`, {
      data: { productId },
    });

    if (response.data) {
      Alert({
        title: "Successful operation",
        icon: "success",
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    Alert({
      title: errorMessage,
      icon: "error",
    });
  }
};

// remove product from the cart
export const decrementQuantity = async (productId: string) => {
  try {
    if (!productId) {
      Alert({
        title: "please provide a product",
        icon: "error",
      });
      return;
    }

    const response = await axios.post(`${API_URL}/decrement`, {
      productId: productId,
      userId: user._id,
    });

    if (response.data) {
      Alert({
        title: "Successful operation",
        icon: "success",
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    Alert({
      title: errorMessage,
      icon: "error",
    });
  }
};
