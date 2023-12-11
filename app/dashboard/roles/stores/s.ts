import { create } from "zustand";

interface StoreState {
  data: Role[];
  setData: (newData: Role[]) => void;
}

export const useRolesStore = create<StoreState>((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
}));
