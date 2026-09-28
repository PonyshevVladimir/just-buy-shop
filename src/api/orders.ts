import { $http } from './http.ts';

export interface OrderProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: number;
    products: OrderProduct[];
    order_price: number;
}

export interface OrdersResponse {
    data: Order[];
}


export async function createOrder(cartItems: CartItemType[], totalPrice: number): Promise<{ data: { id: number; message: string } }> {
    const response = await $http.post('order', {
        products: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        order_price: totalPrice
    });
    return response.data;
}

export async function getOrders(): Promise<OrdersResponse> {
    const response = await $http.get<OrdersResponse>('order');
    return response.data;
}
