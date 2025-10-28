import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Theme } from '../types/theme';

type ThemeAction = {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
};

const useThemeStore = create<ThemeAction>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useThemeStore;
