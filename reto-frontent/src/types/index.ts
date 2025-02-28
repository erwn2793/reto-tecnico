export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed';

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
}