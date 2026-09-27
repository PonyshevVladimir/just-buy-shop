import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

export const API_URL = 'http://localhost:3001/';

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
    (response: AxiosResponse) => {
        // Хак для json-server: если мы на локалке, заворачиваем ответ в структуру из ТЗ
        if (API_URL.includes('localhost') && (response.config.url === 'signup' || response.config.url === 'login')) {
            return {
                ...response,
                data: {
                    data: {
                        user_token: 'mock_bearer_token_warmarok_12345'
                    }
                }
            };
        }
        return response;
    },
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

