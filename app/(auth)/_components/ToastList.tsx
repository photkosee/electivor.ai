"use client";

import { X } from "lucide-react";

import useToastStore from "@/app/_stores/ToastStore";

const ToastList = () => {
  const { toastList, closeToast } = useToastStore();

  return (
    <div className="space-y-2 absolute top-2 right-2 overflow-hidden">
      {toastList.map(({ id, component }) => (
        <div key={id} className="relative">
          <button
            onClick={() => closeToast(id, toastList)}
            className="absolute top-1/2 -translate-y-1/2 right-2 p-1 rounded-full
            bg-neutral-200/20 text-white hover:bg-neutral-50/30 transition-all"
          >
            <X className="size-3" />
          </button>
          {component}
        </div>
      ))}
    </div>
  );
};

export default ToastList;
