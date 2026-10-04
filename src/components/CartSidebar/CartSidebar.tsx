import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.tsx';
import CartItem from '../CartItem/CartItem.tsx';
import { type CartItemType } from '../../services/products.ts';
import { createOrder } from '../../services/orders.ts';
import './CartSidebar.scss';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItemType[];
    onUpdateQuantity: (id: number, action: 'increase' | 'decrease') => void;
    onRemoveFromCart: (id: number) => void;
    onClearCart: () => void;
    addToast: (text: string, type?: 'success' | 'warning' | 'error') => void;
}

export default function CartSidebar({
                                        isOpen,
                                        onClose,
                                        cartItems,
                                        onUpdateQuantity,
                                        onRemoveFromCart,
                                        onClearCart,
                                        addToast
                                    }: CartSidebarProps) {

    const navigate = useNavigate();
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            await createOrder();

            addToast('Заказ успешно оформлен! Проверьте вкладку заказов.', 'success');

            onClearCart();
            onClose();
            navigate('/orders');
        } catch {
            addToast('Не удалось оформить заказ. Убедитесь, что корзина на сервере не пуста.', 'error');
        }
    };

    return (
        <div className={`cart-sidebar-wrapper ${isOpen ? 'cart-sidebar-wrapper--open' : ''}`}>
            <div className="cart-sidebar-overlay" onClick={onClose}></div>
            <div className="cart-sidebar">

                <div className="cart-sidebar__header">
                    <h3 className="cart-sidebar__title">Корзина</h3>
                    <button className="cart-sidebar__close-btn" onClick={onClose} title="Закрыть корзину">×</button>
                </div>

                <div className="cart-sidebar__content">
                    {cartItems.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#64748b', marginTop: '40px', fontSize: '14px' }}>
                            Ваша корзина пуста. Время добавить ароматного мыла!
                        </p>
                    ) : (
                        cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                quantity={item.quantity}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemoveFromCart={onRemoveFromCart}
                            />
                        ))
                    )}
                </div>

                <div className="cart-sidebar__footer">
                    <div className="cart-sidebar__total">
                        <span className="total-label">Итого к оплате:</span>
                        <span className="total-price">{totalPrice} ₽</span>
                    </div>
                    <Button
                        variant="accent"
                        className="cart-sidebar__checkout-btn"
                        disabled={cartItems.length === 0}
                        onClick={handleCheckout}
                    >
                        Оформить заказ
                    </Button>
                </div>

            </div>
        </div>
    );
}
