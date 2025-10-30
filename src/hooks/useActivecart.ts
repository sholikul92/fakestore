import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

export default function useActiveCart() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const userCarts = useCartStore((state) => state.userCarts);

  if (!currentUser) return [];
  const activeCarts = userCarts.find((c) => c.userId === currentUser.userId);
  return activeCarts ? activeCarts.items : [];
}
