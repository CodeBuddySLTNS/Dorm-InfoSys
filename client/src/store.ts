import { create } from "zustand";
import type { User } from "./types/data.types";

interface MainStore {
  user: User | null;
  loggedIn: boolean;

  setUser: (user: User) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useMainStore = create<MainStore>((set) => ({
  loggedIn: false,
  user: null,
  setUser: (user: User) => set({ user }),
  setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
}));
