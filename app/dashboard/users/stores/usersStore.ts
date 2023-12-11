import { create } from "zustand";

interface StoreState {
  data: User[];
  setData: (newData: User[]) => void;
}

export const useUsersStore = create<StoreState>((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
}));
