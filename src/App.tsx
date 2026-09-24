import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Orders from './pages/Orders.tsx';

import Header from './components/Header/Header.tsx';



function App() {

    const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
      <BrowserRouter>

          <Header
              isAuth={isAuth}
              onLogout={() => setIsAuth(false)}
              onCartOpen={() => console.log('Открыть корзину')}
          />
          
        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

            <Route
                path="/orders"
                element={isAuth ? <Orders /> : <Navigate to="/" replace />}
            />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
