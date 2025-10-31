import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/register/page';
import LoginPage from './pages/login/page';
import DetailProduct from './pages/detailProduct/DetailProduct';
import App from './App';
import MainLayout from './layout/MainLayout';
import CartPage from './pages/cart/CartPage';

export default function RouterProvider() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<App />} />
        <Route path='/product/:id' element={<DetailProduct />} />
        <Route path='/cart' element={<CartPage />} />
      </Route>

      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}
