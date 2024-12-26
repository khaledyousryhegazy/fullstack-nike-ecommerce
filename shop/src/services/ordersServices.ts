import axios from "axios";
import Alert from "@/components/Alert";
import { IOrder } from "@/interfaces/interfaces";
import { user } from "@/utils/user";

const API_URL = "http://localhost:8000/orders";

export const getUserOrders = async () => {
  try {
    if (!user) {
      Alert({
        title: "please login to access the cart",
        icon: "info",
      });
      return;
    }

    const response = await axios.get(`${API_URL}/user/${user._id}`);

    if (!response.data) {
      Alert({
        title: "Nor Orders Found",
        icon: "error",
      });
      return;
    }

    return response.data;
  } catch (error) {
    const errors = error instanceof Error ? error.message : String(error);

    Alert({
      title: errors,
      icon: "error",
    });
  }
};

export const createOrder = async (data: IOrder) => {
  try {
    if (!user) {
      Alert({
        title: "please login to access the cart",
        icon: "info",
      });
      return;
    }

    const response = await axios.post(`${API_URL}/checkout`, {
      userId: user._id,
      shippingAddress: data?.shippingAddress,
      paymentMethod: data?.paymentMethod || "cash",
    });

    if (!response.data) {
      Alert({
        title: "Nor Orders Found",
        icon: "error",
      });
      return;
    }

    return response.data;
  } catch (error) {
    const errors = error instanceof Error ? error.message : String(error);

    Alert({
      title: errors,
      icon: "error",
    });
  }
};
