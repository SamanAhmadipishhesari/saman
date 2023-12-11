import { create } from "zustand";

interface StoreState {
  data: UserDetail;
  setData: (newData: UserDetail) => void;
}

function getUserInit(){
  return  {
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    isActive: false,
    avatar: "",
    description: "",
    creationDate: "",
  };
}

export const useUserDetailStore = create<StoreState>((set) => ({
  data: getUserInit(),
  setData: (newData) => set({ data: newData }),
}));
