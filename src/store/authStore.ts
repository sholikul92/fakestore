import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type {
  User,
  RegisterPayload,
  LoginPayload,
  ReturnAuthValue,
} from '../types/auth';

type UsersAction = {
  users: User[];
  currentUser: User | null;
  register: (user: RegisterPayload) => ReturnAuthValue;
  login: (payload: LoginPayload) => ReturnAuthValue;
};

const useAuthStore = create<UsersAction>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      register: (payload) => {
        const existingUser = get().users.find((u) => u.email === payload.email);
        if (existingUser)
          return { success: false, message: 'Email sudah terdaftar!' };

        const generateUserId = +new Date();

        const user: User = { ...payload, userId: generateUserId };

        set({ users: [...get().users, user] });
        return { success: true, message: 'Registrasi berhasil!' };
      },
      login: (payload) => {
        const user = get().users.find((u) => u.email === payload.email);

        if (!user) return { success: false, message: 'Email tidak terdaftar!' };
        if (user.password !== payload.password)
          return { success: false, message: 'Password Salah!' };

        set({ currentUser: user });
        return { success: true, message: 'Login berhasil!' };
      },
    }),
    {
      name: 'users',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser,
      }),
    }
  )
);

export default useAuthStore;
