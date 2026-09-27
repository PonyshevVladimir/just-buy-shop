import Button from '../Button/Button.tsx';
import './CartItem.scss';

interface CartItemProps {
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export default function CartItem({ name, price, image, quantity }: CartItemProps) {
    return (
        <div className="cart-item">
            <div className="cart-item__image-wrapper">
                <img src={image} alt={name} className="cart-item__image" />
            </div>

            <div className="cart-item__info">
                <h4 className="cart-item__name">{name}</h4>
                <span className="cart-item__price">{price} ₽</span>

                <div className="cart-item__quantity-controls">
                    <Button variant="outline" className="btn-qty">-</Button>
                    <span className="qty-number">{quantity}</span>
                    <Button variant="outline" className="btn-qty">+</Button>
                </div>
            </div>

            <button className="cart-item__delete-btn" title="Удалить товар">×</button>
        </div>
    );
}
