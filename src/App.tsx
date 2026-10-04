import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import CartSidebar from './components/CartSidebar/CartSidebar.tsx';
import Toast, { type ToastMessage } from './components/Toast/Toast.tsx';
import AppRouter from './router/AppRouter.tsx';
import { type CartItemType } from './services/products.ts';
import { addToServerCart, removeFromServerCart } from './services/orders.ts';

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const [cart, setCart] = useState<CartItemType[]>(() => {
        const savedCart = localStorage.getItem('jb_shopping_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        if (token) {
            setTimeout(() => {
                setIsAuth(true);
            }, 0);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('jb_shopping_cart', JSON.stringify(cart));
    }, [cart]);

    const addToast = (text: string, type: 'success' | 'warning' | 'error' = 'success') => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, text, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    };

    const handleCloseToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('jb_shopping_cart');
        setIsAuth(false);
        setCart([]);
        addToast('Вы успешно вышли из аккаунта', 'warning');
    };

    const handleAddToCart = async (product: { id: number; name: string; price: number; image: string }) => {
        try {
            if (isAuth) {
                await addToServerCart(product.id);
            }

            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item.id === product.id);
                if (existingItem) {
                    return prevCart.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                }
                return [...prevCart, { ...product, quantity: 1 }];
            });
            addToast(`Товар "${product.name}" добавлен в корзину!`, 'success');
        } catch {
            addToast('Не удалось синхронизировать товар с сервером', 'error');
        }
    };

    const handleUpdateQuantity = async (id: number, action: 'increase' | 'decrease') => {
        try {
            if (isAuth) {
                if (action === 'increase') {
                    await addToServerCart(id);
                } else {
                    await removeFromServerCart(id);
                }
            }

            setCart((prevCart) =>
                prevCart
                    .map((item) => {
                        if (item.id === id) {
                            const newQty = action === 'increase' ? item.quantity + 1 : action === 'decrease' ? item.quantity - 1 : item.quantity;
                            return { ...item, quantity: newQty };
                        }
                        return item;
                    })
                    .filter((item) => item.quantity > 0)
            );
        } catch {
            addToast('Ошибка изменения количества на сервере', 'error');
        }
    };

    const handleRemoveFromCart = async (id: number) => {
        try {
            if (isAuth) {
                await removeFromServerCart(id);
            }
            const item = cart.find(i => i.id === id);
            setCart((prevCart) => prevCart.filter((item) => item.id !== id));
            if (item) addToast(`Товар "${item.name}" удален из корзины`, 'warning');
        } catch {
            addToast('Ошибка удаления товара на сервере', 'error');
        }
    };

    const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header
                    isAuth={isAuth}
                    onLogout={handleLogout}
                    onCartOpen={() => setIsCartOpen(true)}
                    cartCount={totalCartCount}
                    addToast={addToast}
                />

                <CartSidebar
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cartItems={cart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveFromCart={handleRemoveFromCart}
                    onClearCart={() => setCart([])}
                    addToast={addToast}
                />

                <AppRouter
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}
                    addToast={addToast}
                    handleAddToCart={handleAddToCart}
                />

            </div>

            <Toast toasts={toasts} onClose={handleCloseToast} />
        </BrowserRouter>
    );
}

export default App;
