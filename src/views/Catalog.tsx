import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard.tsx';
import ProductSkeleton from '../components/ProductSkeleton/ProductSkeleton.tsx';
import Button from '../components/Button/Button.tsx';
import { getProducts, type Product } from '../services/products.ts';
import './Catalog.scss';

import soapPlaceholder from '../assets/images/cart-logo.png';

interface CatalogProps {
    isAuth: boolean;
    onAddToCart: (product: { id: number; name: string; price: number; image: string }) => void;
}

export default function Catalog({ isAuth, onAddToCart }: CatalogProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchProducts = async () => {
        setTimeout(async () => {
            try {
                setIsLoading(true);
                setError('');
                const response = await getProducts();

                if (response && response.data && Array.isArray(response.data)) {
                    setProducts(response.data);
                } else if (Array.isArray(response)) {
                    setProducts(response);
                }
            } catch (err) {
                const errorObject = err as { message?: string };
                setError(errorObject.message || 'Не удалось загрузить каталог товаров');
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 600);
            }
        }, 0);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <main className="main-page">
            <div className="main-page__container">
                <h1 className="main-page__title">Каталог товаров</h1>

                {!isLoading && (error || products.length === 0) ? (
                    <div className="catalog-empty-state" style={{
                        textAlign: 'center', padding: '60px 20px',
                        backgroundColor: '#ffffff', borderRadius: '12px',
                        boxShadow: '0 0 0 1px #e2e8f0', margin: '20px 0'
                    }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#0f172a' }}>
                            {error ? 'Каталог временно недоступен' : 'Каталог товаров пуст'}
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
                            {error || 'На сервере пока нет доступных сортов мыла. Пожалуйста, попробуйте обновить страницу.'}
                        </p>
                        <Button variant="accent" onClick={fetchProducts}>
                            Повторить загрузку
                        </Button>
                    </div>
                ) : (
                    <div className="main-page__grid">
                        {isLoading ? (

                            Array.from({ length: 8 }).map((_, index) => (
                                <ProductSkeleton key={index} />
                            ))
                        ) : (
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    price={product.price}
                                    description={product.description}
                                    image={soapPlaceholder}
                                    isAuth={isAuth}
                                    onAddToCart={() => onAddToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: soapPlaceholder
                                    })}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
