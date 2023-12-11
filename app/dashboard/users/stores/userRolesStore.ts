import { create } from "zustand";

interface StoreState {
  data: string[];
  setData: (newData: string[]) => void;
}


export const useUserRolesStore = create<StoreState>((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
}));
