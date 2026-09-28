import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard.tsx';
import ProductSkeleton from '../components/ProductSkeleton/ProductSkeleton.tsx';
import { getProducts, type Product } from '../api/products.ts';
import './Catalog.scss';

import lavenderSoap from '../assets/images/lavander-soap.png';
import citrusSoap from '../assets/images/citrus-soap.png';
import coffeeSoap from '../assets/images/coffee-soap.png';
import oatSoap from '../assets/images/oat-soap.png';
import bearSoap from '../assets/images/bear-soap.png';
import oceanSoap from '../assets/images/ocean-soap.png';

interface CatalogProps {
    isAuth: boolean;
    onAddToCart: (product: { id: number; name: string; price: number; image: string }) => void;
}

export default function Catalog({ isAuth, onAddToCart }: CatalogProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await getProducts();
                const productsData = Array.isArray(response) ? response : response.data;
                setProducts(productsData);
            } catch (err) {
                const errorObject = err as { message?: string };
                setError(errorObject.message || 'Не удалось загрузить каталог товаров');
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };

        fetchProducts();
    }, []);

    const getProductImage = (id: number) => {
        const images = [lavenderSoap, citrusSoap, coffeeSoap, oatSoap, bearSoap, oceanSoap];
        return images[(id - 1) % images.length];
    };

    return (
        <main className="main-page">
            <div className="main-page__container">
                <h1 className="main-page__title">Каталог товаров</h1>

                {error && <div className="catalog-error">{error}</div>}

                <div className="main-page__grid">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <ProductSkeleton key={index} />
                        ))
                    ) : (
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                description={product.description}
                                image={getProductImage(product.id)}
                                isAuth={isAuth}
                                onAddToCart={() => onAddToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: getProductImage(product.id)
                                })}
                            />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
