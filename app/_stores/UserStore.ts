import { create } from "zustand"

type UserStoreType = {
  email: string | ""
  setEmail: (email: string) => void
}

const useUserStore = create<UserStoreType>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
}));

export default useUserStore;
