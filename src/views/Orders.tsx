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

    return (
        <div className="orders-page">
            <div className="orders-page__container">
                <h1 className="orders-page__title">Мои заказы</h1>

                {error && <div style={{ color: '#ef4444', marginBottom: '20px' }}>{error}</div>}

                {isLoading ? (
                    <p style={{ color: '#64748b' }}>Загрузка истории покупок...</p>
                ) : orders.length === 0 ? (
                    <p style={{ color: '#64748b', fontSize: '15px' }}>Вы еще не оформили ни одного заказа.</p>
                ) : (
                    <div className="orders-page__list">
                        {orders.map((order) => (
                            <div key={order.id} className="order-block">

                                <div className="order-block__header">
                                    <span className="order-block__number">Заказ №{order.id}</span>
                                    <span className="order-block__price">{order.order_price} ₽</span>
                                </div>

                                <div className="order-block__products-list">
                                    {order.products.map((prod) => (
                                        <div key={prod.id} className="order-product-row">
                                            <span className="prod-name">{prod.name}</span>
                                            <span className="prod-meta">
                        {prod.quantity} шт. × {prod.price} ₽
                      </span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
