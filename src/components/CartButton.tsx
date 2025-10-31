import { AiOutlineShoppingCart } from 'react-icons/ai';
import useCartStore, { type Cart } from '../store/cartStore';
import useAuthStore from '../store/authStore';
import type { Product } from '../types/product';
import { useNavigate } from 'react-router-dom';

export default function CartButton(product: Product) {
  const addToCart = useCartStore((state) => state.addToCart);
  const currentUser = useAuthStore((state) => state.currentUser);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!currentUser) return navigate('/login');

    const newCart: Cart = {
      id: product.id,
      title: product.title,
      imageUrl: product.images[0],
      price: product.price,
      totalPrice: product.price,
      quantity: 1,
    };

    addToCart(newCart);
  };

  return (
    <button
      onClick={handleAddToCart}
      className='flex items-center gap-2 text-dark-text bg-accent hover:bg-accentHover dark:bg-dark-accent px-4  py-2 rounded-xl cursor-pointer'
    >
      <AiOutlineShoppingCart />
      Add Cart
    </button>
  );
}
