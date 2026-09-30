import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/auth.ts';

interface ValidationErrors {
  email?: string;
  password?: string;
}

export function useLoginForm(setIsAuth: (auth: boolean) => void) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

    const validateForm = (): boolean => {
    const tempErrors: ValidationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (!validateForm()) return;

    try {
      const response = await loginApi({ email, password });
      localStorage.setItem('user_token', response.data.user_token);
      setIsAuth(true);
      navigate('/');
    } catch (err) {
      const errorObject = err as { message?: string };
      setServerError(errorObject.message || 'Произошла ошибка при входе');
    }
  };

  return {
    email, setEmail,
    password, setPassword,
    serverError, errors,
    handleSubmit
  };
}
