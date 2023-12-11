import { create } from "zustand";

interface StoreState {
  data: string;
  setData: (newData: string) => void;
}

export const useUserIdStore = create<StoreState>((set) => ({
  data: "",
  setData: (newData) => set({ data: newData }),
}));
