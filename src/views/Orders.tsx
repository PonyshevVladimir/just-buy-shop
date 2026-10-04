import { useState, useEffect } from 'react';
import { getOrders, type Order } from '../services/orders.ts';
import { getProducts, type Product } from '../services/products.ts';
import './Orders.scss';

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [catalog, setCatalog] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError('');

                const [ordersRes, productsRes] = await Promise.all([getOrders(), getProducts()]);

                const ordersData = Array.isArray(ordersRes) ? ordersRes : ordersRes.data;
                const productsData = Array.isArray(productsRes) ? productsRes : productsRes.data;

                setOrders(ordersData);
                setCatalog(productsData);
            } catch (err) {
                const errorObject = err as { message?: string };
                setError(errorObject.message || 'Не удалось загрузить историю заказов');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getFormattedDate = () => {
        const today = new Date();
        return today.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const renderOrderProducts = (productIds: number[]) => {
        if (!productIds || !Array.isArray(productIds)) return null;

        const counts = productIds.reduce((acc: Record<number, number>, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(counts).map(([idStr, quantity]) => {
            const productId = Number(idStr);
            const catalogItem = catalog.find((item) => item.id === productId);

            return (
                <div key={productId} className="order-card__product-row">
          <span className="prod-name">
            {catalogItem ? catalogItem.name : `Товар №${productId}`}
          </span>
                    <span className="prod-qty">{quantity} шт.</span>
                </div>
            );
        });
    };

    return (
        <div className="orders-page">
            <div className="orders-page__container">
                <h1 className="orders-page__title">Оформленные заказы</h1>

                {error && <div className="orders-page__error">{error}</div>}

                {isLoading ? (
                    <p className="orders-page__status">Загрузка истории покупок...</p>
                ) : orders.length === 0 ? (
                    <p className="orders-page__status">Вы еще не оформили ни одного заказа.</p>
                ) : (
                    <div className="orders-page__grid">
                        {orders.map((order) => (
                            <article key={order.id} className="order-card">

                                <div className="order-card__header">
                                    <span className="order-card__number">Заказ №{order.id}</span>
                                </div>

                                <div className="order-card__content">
                                    {renderOrderProducts(order.products)}
                                </div>

                                <div className="order-card__footer">
                                    <time className="order-card__date">{getFormattedDate()}</time>
                                    <div className="order-card__price-box">
                                        <span className="price-value">{order.order_price} ₽</span>
                                    </div>
                                </div>

                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
