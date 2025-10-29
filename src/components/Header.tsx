import { IoMdPerson } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import { MdLightMode, MdNightlightRound } from 'react-icons/md';
import useThemeStore from '../store/themeStore';
import useAuthStore from '../store/authStore';
import { useEffect } from 'react';

export default function Header() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);
  const currentUser = useAuthStore((state) => state.currentUser);

  const handleToggleTheme: React.MouseEventHandler<SVGElement> = () => {
    toggleTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <header className='bg-background dark:bg-dark-background text-text dark:text-dark-text p-6 fixed left-0 right-0 border-b border-b-gray-200'>
      <nav className='flex justify-between mx-8'>
        <ul className='flex gap-4 text-xl'>
          <li>Beranda</li>
          <li>Produk</li>
        </ul>
        <div className='flex gap-6 items-center'>
          {theme === 'light' ? (
            <MdLightMode
              className='text-2xl cursor-pointer'
              onClick={handleToggleTheme}
            />
          ) : (
            <MdNightlightRound
              className='text-2xl cursor-pointer'
              onClick={handleToggleTheme}
            />
          )}

          <FaShoppingCart className='text-2xl cursor-pointer' />
          <IoMdPerson className='text-2xl cursor-pointer' />

          {currentUser && (
            <p className='border dark:border-white rounded-xl p-2'>
              {currentUser.name}
            </p>
          )}
        </div>
      </nav>
    </header>
  );
}
