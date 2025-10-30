import { MdLightMode, MdNightlightRound } from 'react-icons/md';
import useThemeStore from '../store/themeStore';
import { useEffect } from 'react';

export default function ToggleTheme() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleToggleTheme: React.MouseEventHandler<SVGElement> = () => {
    toggleTheme(theme === 'light' ? 'dark' : 'light');
  };

  return theme === 'light' ? (
    <MdLightMode
      className='text-2xl cursor-pointer'
      onClick={handleToggleTheme}
    />
  ) : (
    <MdNightlightRound
      className='text-2xl cursor-pointer'
      onClick={handleToggleTheme}
    />
  );
}
