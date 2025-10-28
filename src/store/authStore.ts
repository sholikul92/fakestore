import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type User = {
  name: string;
  email: string;
  password: string;
};

type ReturnAuthValue = {
  success: boolean;
  message: string;
};

type UsersAction = {
  users: User[];
  currentUser: User | null;
  register: (user: User) => ReturnAuthValue;
};

const useAuthStore = create<UsersAction>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      register: (user) => {
        const existingUser = get().users.find((u) => u.email === user.email);
        if (existingUser)
          return { success: false, message: 'Email sudah terdaftar!' };

        set({ users: [...get().users, user] });
        return { success: true, message: 'Registrasi berhasil!' };
      },
    }),
    {
      name: 'users',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ users: state.users }),
    }
  )
);

export default useAuthStore;
