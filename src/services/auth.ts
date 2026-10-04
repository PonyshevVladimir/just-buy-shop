import { $http } from '../api/http.ts';

export interface RegisterData {
    fio: string;
    login: string;
    email: string;
    password: string;
}

export interface LoginData {
    email?: string;
    login?: string;
    password: string;
}

export interface AuthResponse {
    data: {
        user_token: string;
    };
}

export async function signup(data: RegisterData): Promise<AuthResponse> {
    const response = await $http.post<AuthResponse>('signup', data);
    return response.data;
}

export async function login(data: LoginData): Promise<AuthResponse> {
    const response = await $http.post<AuthResponse>('login', data);
    return response.data;
}
