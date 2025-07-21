import { create } from 'zustand';
import { User } from '@/data/users';

type SessionState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
})); 