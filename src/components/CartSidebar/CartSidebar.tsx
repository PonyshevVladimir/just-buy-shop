import Button from '../Button/Button.tsx';
import CartItem from '../CartItem/CartItem.tsx';
import './CartSidebar.scss';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
    return (
        <div className={`cart-sidebar-wrapper ${isOpen ? 'cart-sidebar-wrapper--open' : ''}`}>

            <div className="cart-sidebar-overlay" onClick={onClose}></div>

            <div className="cart-sidebar">

                <div className="cart-sidebar__header">
                    <h3 className="cart-sidebar__title">Корзина</h3>
                    <button className="cart-sidebar__close-btn" onClick={onClose} title="Закрыть корзину">
                        ×
                    </button>
                </div>

                <div className="cart-sidebar__content">
                    <CartItem
                        name="Фигурное мыло «Лаванда»"
                        price={350}
                        quantity={1}
                        image="https://placehold.co"
                    />
                    <CartItem
                        name="Подарочный набор «Кофе и Шоколад»"
                        price={1200}
                        quantity={2}
                        image="https://placehold.co"
                    />
                </div>

                <div className="cart-sidebar__footer">
                    <div className="cart-sidebar__total">
                        <span className="total-label">Итого к оплате:</span>
                        <span className="total-price">2750 ₽</span>
                    </div>
                    <Button variant="accent" className="cart-sidebar__checkout-btn">
                        Оформить заказ
                    </Button>
                </div>

            </div>
        </div>
    );
}
