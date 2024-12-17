export interface Products {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
  gender: string;
  ageGroup: string;
}

interface CartItem {
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