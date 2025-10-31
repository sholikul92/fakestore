import { FaShoppingCart } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import useActiveCart from '../hooks/useActivecart';
import { useNavigate } from 'react-router-dom';

export default function ToggleCart() {
  const activeCart = useActiveCart();
  const currentUser = useAuthStore((state) => state.currentUser);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!currentUser) return navigate('/login');

    navigate('/cart');
  };

  return (
    <div className='relative cursor-pointer'>
      {currentUser && (
        <div className='absolute -top-3 left-3 bg-accent text-dark-text rounded-full w-5 h-5 flex items-center justify-center'>
          {activeCart.length}
        </div>
      )}
      <FaShoppingCart
        className='text-2xl cursor-pointer'
        onClick={handleNavigate}
      />
    </div>
  );
}
