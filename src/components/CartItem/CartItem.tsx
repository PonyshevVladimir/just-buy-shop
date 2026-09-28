import Button from '../Button/Button.tsx';
import './CartItem.scss';

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    onUpdateQuantity: (id: number, action: 'increase' | 'decrease') => void; // 2. Пропсы-функции
    onRemoveFromCart: (id: number) => void;
}

export default function CartItem({
                                     id,
                                     name,
                                     price,
                                     image,
                                     quantity,
                                     onUpdateQuantity,
                                     onRemoveFromCart
                                 }: CartItemProps) {
    return (
        <div className="cart-item">
            <div className="cart-item__image-wrapper">
                <img src={image} alt={name} className="cart-item__image" />
            </div>

            <div className="cart-item__info">
                <h4 className="cart-item__name">{name}</h4>
                <span className="cart-item__price">{price * quantity} ₽</span>

                <div className="cart-item__quantity-controls">
                    <Button variant="outline" className="btn-qty" onClick={() => onUpdateQuantity(id, 'decrease')}>-</Button>
                    <span className="qty-number">{quantity}</span>
                    <Button variant="outline" className="btn-qty" onClick={() => onUpdateQuantity(id, 'increase')}>+</Button>
                </div>
            </div>

            <button className="cart-item__delete-btn" onClick={() => onRemoveFromCart(id)} title="Удалить товар">×</button>
        </div>
    );
}
