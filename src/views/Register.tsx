import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button.tsx';
import { signup as signupApi } from '../api/auth.ts';
import './AuthPages.scss';

interface RegisterProps {
    setIsAuth: (auth: boolean) => void;
}

export default function Register({ setIsAuth }: RegisterProps) {
    const navigate = useNavigate();

    // Стейты для всех 6 полей из вашей Figma
    const [surname, setSurname] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [patronymic, setPatronymic] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const combinedFio = `${surname} ${name} ${patronymic}`.trim();

        try {
            const response = await signupApi({
                fio: combinedFio,
                login,
                email,
                password
            });

            const token = response.data.user_token;
            localStorage.setItem('user_token', token);

            setIsAuth(true);

            navigate('/');
        } catch (err) {
            const errorObject = err as { message?: string };
            setError(errorObject.message || 'Произошла ошибка при регистрации');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-container__title">Регистрация</h2>

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

                    <div className="auth-field">
                        <label className="auth-field__label">Фамилия</label>
                        <input
                            type="text"
                            className="auth-field__input"
                            placeholder="Введите фамилию"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-field__label">Имя</label>
                        <input
                            type="text"
                            className="auth-field__input"
                            placeholder="Введите имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-field__label">Отчество</label>
                        <input
                            type="text"
                            className="auth-field__input"
                            placeholder="Введите отчество (при наличии)"
                            value={patronymic}
                            onChange={(e) => setPatronymic(e.target.value)}
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-field__label">Логин</label>
                        <input
                            type="text"
                            className="auth-field__input"
                            placeholder="Придумайте логин"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-field__label">Электронная почта</label>
                        <input
                            type="email"
                            className="auth-field__input"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-field__label">Пароль</label>
                        <input
                            type="password"
                            className="auth-field__input"
                            placeholder="Минимум 6 symbols"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button variant="accent" className="auth-form__submit-btn" type="submit">
                        Зарегистрироваться
                    </Button>

                    <p className="auth-form__switch">
                        Уже есть аккаунт? <span className="auth-form__link" onClick={() => navigate('/login')}>Войти</span>
                    </p>

                </form>
            </div>
        </div>
    );
}
