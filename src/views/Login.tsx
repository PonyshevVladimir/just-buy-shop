import Button from '../components/Button/Button.tsx';
import { useLoginForm } from '../hooks/useLoginForm.ts';
import { useNavigate } from 'react-router-dom';
import './AuthPages.scss';

interface LoginProps {
    setIsAuth: (auth: boolean) => void;
    addToast: (text: string, type?: 'success' | 'warning' | 'error') => void;
}

export default function Login({ setIsAuth, addToast }: LoginProps) {
    const navigate = useNavigate();

    const {
        email, setEmail,
        password, setPassword,
        serverError, errors,
        handleSubmit
    } = useLoginForm(setIsAuth, addToast);

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-container__title">Вход на сайт</h2>
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {serverError && <div style={{ color: '#ef4444', marginBottom: '12px' }}>{serverError}</div>}

                    <div className={`auth-field ${errors.email ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Электронная почта</label>
                        <input type="email" className="auth-field__input" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span className="auth-field__error-text">{errors.email}</span>
                    </div>

                    <div className={`auth-field ${errors.password ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Пароль</label>
                        <input type="password" className="auth-field__input" placeholder="Введите ваш пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span className="auth-field__error-text">{errors.password}</span>
                    </div>

                    <Button variant="accent" className="auth-form__submit-btn" type="submit">Войти</Button>
                    <p className="auth-form__switch">
                        Ещё нет аккаунта? <span className="auth-form__link" onClick={() => navigate('/register')}>Зарегистрироваться</span>
                    </p>
                </form>
            </div>
        </div>
    );
}
