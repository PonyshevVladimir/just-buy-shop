import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './views/Catalog.tsx';
import Login from './views/Login.tsx';
import Register from './views/Register.tsx';
import Orders from './views/Orders.tsx';


import Header from './components/Header/Header.tsx';
import CartSidebar from "./components/CartSidebar/CartSidebar.tsx";


function App() {

    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('user_token');

        if (token) {
            setTimeout(() => {
                setIsAuth(true);
            }, 0);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        setIsAuth(false);
    };

    return (
      <BrowserRouter>

          <Header
              isAuth={isAuth}
              onLogout={handleLogout}
              onCartOpen={() => setIsCartOpen(true)}
          />
          <CartSidebar
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
          />

          <Routes>
              <Route path="/" element={<Catalog isAuth={isAuth}/>} />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
              <Route path="/register" element={<Register setIsAuth={setIsAuth} />} />
              <Route path="/orders" element={isAuth ? <Orders /> : <Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

      </BrowserRouter>
  );
}

export default App;
