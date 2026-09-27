import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button.tsx';
import { login as loginApi } from '../api/auth.ts';
import './AuthPages.scss';

interface LoginProps {
    setIsAuth: (auth: boolean) => void;
}

export default function Login({ setIsAuth }: LoginProps) {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginApi({ email, password });
            const token = response.data.user_token;

            localStorage.setItem('user_token', token);
            setIsAuth(true);
            navigate('/');
        } catch (err) {
            const errorObject = err as { message?: string };
            setError(errorObject.message || 'Произошла ошибка при входе');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-container__title">Вход на сайт</h2>

                <form className="auth-form" onSubmit={handleSubmit}>

                    {error && (
                        <div style={{
                            backgroundColor: '#fef2f2',
                            color: '#ef4444',
                            padding: '12px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 500,
                            textAlign: 'center',
                            border: '1px solid #fee2e2'
                        }}>
                            {error}
                        </div>
                    )}

                    <div className={`auth-field ${error ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Электронная почта</label>
                        <input
                            type="email"
                            className="auth-field__input"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Записываем текст в стейт
                            required
                        />
                    </div>

                    <div className={`auth-field ${error ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Пароль</label>
                        <input
                            type="password"
                            className="auth-field__input"
                            placeholder="Введите ваш пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button variant="accent" className="auth-form__submit-btn" type="submit">
                        Войти
                    </Button>

                    <p className="auth-form__switch">
                        Ещё нет аккаунта? <span className="auth-form__link" onClick={() => navigate('/register')}>Зарегистрироваться</span>
                    </p>

                </form>
            </div>
        </div>
    );
}
