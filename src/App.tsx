import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import CartSidebar from './components/CartSidebar/CartSidebar.tsx';
import Toast, { type ToastMessage } from './components/Toast/Toast.tsx';
import Catalog from './views/Catalog.tsx';
import Login from './views/Login.tsx';
import Register from './views/Register.tsx';
import Orders from './views/Orders.tsx';
import NotFound from './views/NotFound.tsx';
import { type CartItemType } from './api/products.ts';

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [cart, setCart] = useState<CartItemType[]>([]);

    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        if (token) {
            setTimeout(() => {
                setIsAuth(true);
            }, 0);
        }
    }, []);

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
        setIsAuth(false);
        setCart([]);
        addToast('Вы успешно вышли из аккаунта', 'warning');
    };

    const handleAddToCart = (product: { id: number; name: string; price: number; image: string }) => {
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
    };

    const handleUpdateQuantity = (id: number, action: 'increase' | 'decrease') => {
        setCart((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.id === id) {
                        const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                        return { ...item, quantity: newQty };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0)
        );
    };

    const handleRemoveFromCart = (id: number) => {
        const item = cart.find(i => i.id === id);
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        if (item) addToast(`Товар "${item.name}" удален из корзины`, 'warning');
    };

    const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <BrowserRouter>
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


            <Routes>
                <Route path="/" element={<Catalog isAuth={isAuth} onAddToCart={handleAddToCart} />} />

                <Route
                    path="/login"
                    element={isAuth ? <Navigate to="/" replace /> : <Login setIsAuth={setIsAuth} />}
                />
                <Route
                    path="/register"
                    element={isAuth ? <Navigate to="/" replace /> : <Register setIsAuth={setIsAuth} />}
                />

                <Route path="/orders" element={isAuth ? <Orders /> : <Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
            </Routes>


            <Toast toasts={toasts} onClose={handleCloseToast} />
        </BrowserRouter>
    );
}

export default App;
