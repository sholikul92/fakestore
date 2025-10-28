import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/register/page';
import LoginPage from './pages/login/page';
import App from './App';

export default function RouterProvider() {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}
