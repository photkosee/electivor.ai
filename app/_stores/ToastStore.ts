import { ReactNode } from "react";
import { create } from "zustand";

import { ToastType } from "@/app/types";

type ToastStoreType = {
  toastList: ToastType[]
  showToast: (toastId: string, oldToastList: ToastType[], component: ReactNode) => void
  closeToast: (toastId: string, oldToastList: ToastType[]) => void
}

const useToastStore = create<ToastStoreType>((set) => ({
  toastList: [],
  showToast(toastId: string, oldToastList: ToastType[], component: ReactNode) {
    set({
      toastList: [...oldToastList, { id: toastId, component: component }],
    });
  },
  closeToast(toastId: string, oldToastList: ToastType[]) {
    set({
      toastList: oldToastList.filter((toast) => toast.id !== toastId)
    });
  }
}));

export default useToastStore;
