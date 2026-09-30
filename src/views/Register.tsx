import Button from '../components/Button/Button.tsx';
import { useRegisterForm } from '../hooks/useRegisterForm.ts';
import { useNavigate } from 'react-router-dom';
import './AuthPages.scss';

interface RegisterProps {
    setIsAuth: (auth: boolean) => void;
}

export default function Register({ setIsAuth }: RegisterProps) {
    const navigate = useNavigate();

    const {
        surname, setSurname,
        name, setName,
        patronymic, setPatronymic,
        login, setLogin,
        email, setEmail,
        password, setPassword,
        serverError, errors,
        handleSubmit
    } = useRegisterForm(setIsAuth);

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-container__title">Регистрация</h2>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>

                    {serverError && <div className="auth-server-error-banner">{serverError}</div>}

                    <div className={`auth-field ${errors.surname ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Фамилия</label>
                        <input type="text" className="auth-field__input" value={surname} onChange={(e) => setSurname(e.target.value)} />
                        <span className="auth-field__error-text">{errors.surname}</span>
                    </div>

                    <div className={`auth-field ${errors.name ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Имя</label>
                        <input type="text" className="auth-field__input" value={name} onChange={(e) => setName(e.target.value)} />
                        <span className="auth-field__error-text">{errors.name}</span>
                    </div>

                    <div className="auth-field">
                        <label className="auth-field__label">Отчество</label>
                        <input type="text" className="auth-field__input" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
                    </div>

                    <div className={`auth-field ${errors.login ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Логин</label>
                        <input type="text" className="auth-field__input" value={login} onChange={(e) => setLogin(e.target.value)} />
                        <span className="auth-field__error-text">{errors.login}</span>
                    </div>

                    <div className={`auth-field ${errors.email ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Электронная почта</label>
                        <input type="email" className="auth-field__input" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span className="auth-field__error-text">{errors.email}</span>
                    </div>

                    <div className={`auth-field ${errors.password ? 'auth-field--error' : ''}`}>
                        <label className="auth-field__label">Пароль</label>
                        <input type="password" className="auth-field__input" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span className="auth-field__error-text">{errors.password}</span>
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
