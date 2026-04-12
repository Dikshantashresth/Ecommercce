import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  login: (username: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (username: string) => {
        if (username === "user123") {
          set({ user: { username: "user123" } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "neuraforge-auth",
    },
  ),
);
