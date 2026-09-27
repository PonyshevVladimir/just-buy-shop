import './ProductSkeleton.scss';

export default function ProductSkeleton() {
    return (
        <div className="product-skeleton">
            <div className="product-skeleton__image"></div>
            <div className="product-skeleton__content">
                <div className="product-skeleton__line product-skeleton__line--title"></div>
                <div className="product-skeleton__line product-skeleton__line--text"></div>
                <div className="product-skeleton__footer">
                    <div className="product-skeleton__line product-skeleton__line--price"></div>
                    <div className="product-skeleton__line product-skeleton__line--btn"></div>
                </div>
            </div>
        </div>
    );
}
