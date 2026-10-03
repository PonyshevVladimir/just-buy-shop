import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

export const API_URL = 'http://lifestealer86.ru/api-shop/';
export const $http = axios.create({
    baseURL: API_URL,
});

$http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('user_token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$http.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            const serverMessage = data?.error?.message || 'Произошла непредвиденная ошибка';

            switch (status) {
                case 401:
                    return Promise.reject(new Error('Неверный e-mail или пароль'));
                case 403:
                    return Promise.reject(new Error('Доступ запрещен. Залогиньтесь заново'));
                case 422:
                    return Promise.reject(data.error);
                case 404:
                    return Promise.reject(new Error('Запрашиваемый ресурс не найден на сервере'));
                default:
                    return Promise.reject(new Error(serverMessage));
            }
        }
        return Promise.reject(new Error('Ошибка сети. Проверьте подключение к интернету'));
    }
);
