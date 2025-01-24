export interface IProducts {
  _id?: string;
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
  gender: string;
  ageGroup: string;
}

export interface ICartItem {
  product: IProducts;
  quantity: number;
  _id: string;
}

export interface ICart {
  success: boolean;
  data: {
    _id: string;
    createdAt: string;
    items: ICartItem[];
    totalAmount: number;
    userId: string;
  };
}

export interface OrderItem {
  product: IProducts;
  quantity: number;
  _id: string;
}

export interface IOrderArray {
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
  orders: IOrderArray[];
}

export interface IOrder {
  shippingAddress: string;
  paymentMethod?: string;
}

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  createdAt: string;
}
