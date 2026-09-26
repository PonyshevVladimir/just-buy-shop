import Button from '../Button/Button.tsx';
import './ProductCard.scss';


interface ProductCardProps {
    name: string;
    price: number;
    image: string;
    description: string;
}

export default function ProductCard({ name, price, image, description}: ProductCardProps) {
    return (
        <article className="product-card">

            <div className="product-card__image-wrapper">
                <img src={image} alt={name} className="product-card__image" />
            </div>


            <div className="product-card__content">
                <h3 className="product-card__name">{name}</h3>
                <p className="product-card__description">{description}</p>
                <div className="product-card__footer">
                    <span className="product-card__price">{price} p.</span>
                    <Button variant="outline" className="product-card__btn">В корзину</Button>
                </div>
            </div>
        </article>
    );
}