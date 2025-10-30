import { FaShoppingCart } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import useActiveCart from '../hooks/useActivecart';

export default function ToggleCart() {
  const activeCart = useActiveCart();
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <div className='relative cursor-pointer'>
      {currentUser && (
        <div className='absolute -top-3 left-3 bg-accent text-dark-text rounded-full w-5 h-5 flex items-center justify-center'>
          {activeCart.length}
        </div>
      )}
      <FaShoppingCart className='text-2xl cursor-pointer' />
    </div>
  );
}
