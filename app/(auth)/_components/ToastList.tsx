"use client";

import useToastStore from "@/app/_stores/ToastStore";
import { X } from "lucide-react";

const ToastList = () => {
  const { toastList, closeToast } = useToastStore();

  // useEffect(() => {
  //   if (!isShown) {
  //     return;
  //   }

  //   const timeoutId = setTimeout(() => {
  //     closeToast(uniqueId, toastList);
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [uniqueId, isShown, closeToast]);

  return (
    <div className="space-y-2 absolute top-2 right-2">
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
