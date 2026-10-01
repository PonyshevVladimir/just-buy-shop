import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.tsx';
import './Header.scss';

interface HeaderProps {
    isAuth: boolean;
    onLogout: () => void;
    onCartOpen: () => void;
    cartCount: number;
    addToast: (text: string, type?: 'success' | 'warning' | 'error') => void;
}

export default function Header({ isAuth, onLogout, onCartOpen, cartCount, addToast }: HeaderProps) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (isAuth) {
            addToast('Вы уже вошли в систему!', 'warning');
        } else {
            navigate('/login');
        }
    };

    const handleRegisterClick = () => {
        if (isAuth) {
            addToast('Вы уже зарегистрированы в системе!', 'warning');
        } else {
            navigate('/register');
        }
    };

    return (
        <header className="header">
            <div className="header__container">

                <div className="header__logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <span className="logo-text">JB-shop</span>
                </div>

                <div className="header__actions">
                    {isAuth ? (
                        <div className="header__user-menu">
                            <Button variant="link" onClick={() => navigate('/orders')}>
                                Оформленные заказы
                            </Button>
                            <Button variant="accent" onClick={onCartOpen}>
                                Корзина <span className="cart-count">{cartCount}</span>
                            </Button>
                            <Button variant="outline" onClick={onLogout}>Выйти</Button>
                        </div>
                    ) : (
                        <div className="header__guest-menu">
                            <Button variant="outline" onClick={handleRegisterClick}>
                                Зарегистрироваться
                            </Button>
                            <Button variant="accent" onClick={handleLoginClick}>
                                Войти
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}
