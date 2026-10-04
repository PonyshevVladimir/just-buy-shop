import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../services/auth.ts';

interface ValidationErrors {
    surname?: string;
    name?: string;
    login?: string;
    email?: string;
    password?: string;
}

export function useRegisterForm(
    setIsAuth: (auth: boolean) => void,
    addToast: (text: string, type?: 'success' | 'warning' | 'error') => void
) {
    const navigate = useNavigate();

    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [serverError, setServerError] = useState('');
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateForm = (): boolean => {
        const tempErrors: ValidationErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!surname.trim()) tempErrors.surname = 'Обязательное поле для заполнения';
        if (!name.trim()) tempErrors.name = 'Обязательное поле для заполнения';

        if (!login.trim()) {
            tempErrors.login = 'Обязательное поле для заполнения';
        } else if (login.trim().length < 3) {
            tempErrors.login = 'Логин должен быть не менее 3 символов';
        }

        if (!email.trim()) {
            tempErrors.email = 'Обязательное поле для заполнения';
        } else if (!emailRegex.test(email)) {
            tempErrors.email = 'Введите корректный адрес электронной почты';
        }

        if (!password) {
            tempErrors.password = 'Обязательное поле для заполнения';
        } else if (password.length < 6) {
            tempErrors.password = 'Пароль должен быть не менее 6 символов';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError('');
        setErrors({});

        if (!validateForm()) {
            addToast('Пожалуйста, проверьте корректность заполнения всех полей формы', 'warning');
            return;
        }

        const combinedFio = `${surname} ${name} ${patronymic}`.trim();

        try {
            const response = await signupApi({ fio: combinedFio, login, email, password });
            localStorage.setItem('user_token', response.data.user_token);
            setIsAuth(true);
            addToast(`Добро пожаловать, ${name}! Регистрация успешна.`, 'success');
            navigate('/');
        } catch (err) {
            const errorObject = err as { message?: string };
            setServerError(errorObject.message || 'Произошла ошибка при регистрации');
            addToast('Не удалось зарегистрироваться', 'error');
        }
    };



    return {
        surname, setSurname,
        name, setName,
        patronymic, setPatronymic,
        login, setLogin,
        email, setEmail,
        password, setPassword,
        serverError, errors,
        handleSubmit
    };
}
