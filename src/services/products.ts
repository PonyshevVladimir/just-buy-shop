import { $http } from '../api/http.ts';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface ProductsResponse {
    data: Product[];
}

export async function getProducts(): Promise<ProductsResponse> {
    const response = await $http.get<ProductsResponse>('products');
    return response.data;
}

export interface CartItemType {
    id: number;
    product_id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

