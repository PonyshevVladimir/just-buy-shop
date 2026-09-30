import Button from '../components/Button/Button.tsx';
import { useLoginForm } from '../hooks/useLoginForm.ts'; // Импортируем наш контроллер
import { useNavigate } from 'react-router-dom';
import './AuthPages.scss';

interface LoginProps {
    setIsAuth: (auth: boolean) => void;
}

export default function Login({ setIsAuth }: LoginProps) {
    const navigate = useNavigate();

    const {
        email, setEmail,
        password, setPassword,
        serverError, errors,
        handleSubmit
    } = useLoginForm(setIsAuth);

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-container__title">Вход на сайт</h2>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>

                    {serverError && (
                        <div style={{
                            backgroundColor: '#fef2f2', color: '#ef4444', padding: '12px',
                            borderRadius: '8px', fontSize: '14px', fontWeight: 500,
                            textAlign: 'center', border: '1px solid #fee2e2'
                        }}>
                            {serverError}
                        </div>
                    )}

                    <div className={`auth-field ${errors.email ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Электронная почта</label>
                        <input
                            type="email"
                            className="auth-field__input"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="auth-field__error-text">{errors.email}</span>
                    </div>

                    <div className={`auth-field ${errors.password ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Пароль</label>
                        <input
                            type="password"
                            className="auth-field__input"
                            placeholder="Введите ваш пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="auth-field__error-text">{errors.password}</span>
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
