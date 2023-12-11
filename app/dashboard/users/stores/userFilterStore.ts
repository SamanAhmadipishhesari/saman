import { create } from "zustand";

interface StoreState {
  data: UserFilter;
  setData: (newData: UserFilter) => void;
}

export const useUserFilterStore = create<StoreState>((set) => ({
  data: { isActive: false, term: "" },
  setData: (newData) => set({ data: newData }),
}));
