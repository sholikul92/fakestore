import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';
import ToggleCart from './ToggleCart';
import AuthToggle from './AuthToggle';

export default function Header() {
  return (
    <header className='bg-background dark:bg-dark-background text-text dark:text-dark-text p-6 fixed left-0 right-0 border-b border-b-gray-200'>
      <nav className='flex justify-between mx-8'>
        <ul className='flex gap-4 text-xl'>
          <li>
            <Link to='/'>Beranda</Link>
          </li>
          <li>Produk</li>
        </ul>
        <div className='flex gap-6 items-center'>
          <ToggleTheme />
          <ToggleCart />
          <AuthToggle />
        </div>
      </nav>
    </header>
  );
}
