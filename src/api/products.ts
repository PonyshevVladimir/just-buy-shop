import { $http } from './http.ts';

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
