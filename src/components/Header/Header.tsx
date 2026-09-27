import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.tsx';
import './Header.scss';

interface HeaderProps {
    isAuth: boolean;
    onLogout: () => void;
    onCartOpen: () => void;
}

export default function Header({ isAuth, onLogout, onCartOpen }: HeaderProps) {
    const navigate = useNavigate();

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
                                Корзина <span className="cart-count">3</span>
                            </Button>
                            <Button variant="outline" onClick={onLogout}>Выйти</Button>
                        </div>
                    ) : (
                        <div className="header__guest-menu">
                            <Button variant="outline" onClick={() => navigate('/register')}>
                                Зарегистрироваться
                            </Button>
                            <Button variant="accent" onClick={() => navigate('/login')}>
                                Войти
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}
