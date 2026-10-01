import { useState, useEffect } from 'react';
import { getOrders, type Order } from '../api/orders.ts';
import './Orders.scss';

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);
                const response = await getOrders();
                const ordersData = Array.isArray(response) ? response : response.data;
                setOrders(ordersData);
            } catch (err) {
                const errorObject = err as { message?: string };
                setError(errorObject.message || 'Не удалось загрузить историю заказов');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getFormattedDate = () => {
        const today = new Date();
        return today.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
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

                                {/* Верхняя часть: Номер заказа */}
                                <div className="order-card__header">
                                    <span className="order-card__number">Заказ №{order.id}</span>
                                </div>

                                <div className="order-card__content">
                                    {order.products && order.products.map((prod) => (
                                        <div key={prod.id} className="order-card__product-row">
                                            <span className="prod-name">{prod.name}</span>
                                            <span className="prod-qty">{prod.quantity} шт.</span>
                                        </div>
                                    ))}
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
