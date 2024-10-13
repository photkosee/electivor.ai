import { create } from "zustand"

type SidebarStoreType = {
  sidebarExpand: boolean
  toggleSidebar: () => void
}

const useSidebarStore = create<SidebarStoreType>((set) => ({
  sidebarExpand: false,
  toggleSidebar: () => set((state) => ({ sidebarExpand: !state.sidebarExpand })),
}));

export default useSidebarStore;
