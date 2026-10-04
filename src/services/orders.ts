import { $http } from '../api/http.ts';

export interface OrderProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: number;
    products: number[];
    order_price: number;
}

export interface OrdersResponse {
    data: Order[];
}

export async function createOrder(): Promise<{ data: { id: number; message: string } }> {
    const response = await $http.post('order');
    return response.data;
}

export async function getOrders(): Promise<OrdersResponse> {
    const response = await $http.get<OrdersResponse>('order');
    return response.data;
}

export async function addToServerCart(productId: number): Promise<void> {
    await $http.post(`cart/${productId}`);
}

export async function removeFromServerCart(cartRecordId: number): Promise<void> {
    await $http.delete(`cart/${cartRecordId}`);
}
