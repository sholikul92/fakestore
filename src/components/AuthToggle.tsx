import { FiLogOut, FiLogIn } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

export default function AuthToggle() {
  const { currentUser, logout } = useAuthStore(
    useShallow((state) => ({
      currentUser: state.currentUser,
      logout: state.logout,
    }))
  );
  const navigate = useNavigate();

  const handleToggleLogIn = () => {
    navigate('/login');
  };

  return currentUser ? (
    <FiLogOut onClick={logout} className='cursor-pointer text-xl font-bold' />
  ) : (
    <FiLogIn onClick={handleToggleLogIn} className='cursor-pointer text-xl' />
  );
}
