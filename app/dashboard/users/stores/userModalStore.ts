import { create } from "zustand";

interface StoreState {
  isModalOpen: boolean;
  setIsModalOpen: Function;
}

export const useUserModalStore = create<StoreState>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
}));
