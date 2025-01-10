import { StaticImageData } from "next/image";

export interface Products {
  _id: string;
  image: string | StaticImageData;
  title: string;
  description: string;
  price: number;
  category: string;
  gender: string;
  ageGroup: string;
}

export interface CartItem {
  product: Products;
  quantity: number;
  _id: string;
}

export interface ICart {
  success: boolean;
  data: {
    _id: string;
    createdAt: string;
    items: CartItem[];
    totalAmount: number;
    userId: string;
  };
}

export interface OrderItem {
  product: Products;
  quantity: number;
  _id: string;
}

export interface OrderArray {
  userId: string;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  _id: string;
  items: OrderItem[]; // Fixed type here
  createdAt: string;
  updatedAt: string;
}

export interface IOrderData {
  success: boolean;
  orders: OrderArray[];
}

export interface IOrder {
  shippingAddress: string;
  paymentMethod?: string;
}
