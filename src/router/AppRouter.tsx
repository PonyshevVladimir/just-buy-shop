import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import Catalog from '../views/Catalog.tsx';
import Login from '../views/Login.tsx';
import Register from '../views/Register.tsx';
import Orders from '../views/Orders.tsx';
import NotFound from '../views/NotFound.tsx';

interface AppRouterProps {
    isAuth: boolean;
    setIsAuth: (auth: boolean) => void;
    addToast: (text: string, type?: 'success' | 'warning' | 'error') => void;
    handleAddToCart: (product: { id: number; name: string; price: number; image: string }) => void;
}

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 12,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -12,
        transition: {
            duration: 0.2,
        },
    },
};

export default function AppRouter({ isAuth, setIsAuth, addToast, handleAddToCart }: AppRouterProps) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

                <Route path="/" element={
                                     <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                        <Catalog isAuth={isAuth} onAddToCart={handleAddToCart} />
                                    </motion.div>
                                } />

                <Route path="/login" element={
                                         isAuth ? <Navigate to="/" replace /> : (
                                             <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                                 <Login setIsAuth={setIsAuth} addToast={addToast} />
                                             </motion.div>
                                         )
                                     } />

                <Route path="/register" element={
                                            isAuth ? <Navigate to="/" replace /> : (
                                                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                                    <Register setIsAuth={setIsAuth} addToast={addToast} />
                                                </motion.div>
                                            )
                                        } />

                <Route path="/orders" element={
                                          isAuth ? (
                                              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                                  <Orders />
                                              </motion.div>
                                          ) : <Navigate to="/" replace />
                                      } />

                <Route path="*" element={
                                     <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                        <NotFound />
                                    </motion.div>
                                } />

            </Routes>
        </AnimatePresence>
    );
}
