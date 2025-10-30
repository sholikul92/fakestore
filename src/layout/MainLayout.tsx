import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen bg-background dark:bg-dark-background'>
      <Header />
      <main className='flex-1 pt-28 p-2 md:p-14'>
        <Outlet />
      </main>
    </div>
  );
}
