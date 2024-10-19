"use client";

import { useEffect, useState } from "react";
import { CheckCircle, CircleAlert, X, XCircle } from "lucide-react";

import useToastStore from "@/app/_stores/ToastStore";

interface ToastInterface {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  desc?: string;
}

const Toast = ({ id, type, message, desc }: ToastInterface) => {
  const { toastList, closeToast } = useToastStore();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeToast(id, toastList);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [closeToast, id, toastList]);

  const color = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  const icon = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    info: <CircleAlert size={20} />,
    warning: <CircleAlert size={20} />,
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      closeToast(id, toastList);
    }, 500);
  };

  return (
    <div
      key={id}
      className={`relative ${
        isAnimating ? "animate-fadeIn" : "animate-fadeOut"
      }`}
      role="button"
      onClick={handleClose}
    >
      <div
        className={`${color[type]} w-[200px] sm:w-[260px] rounded-md p-2 pr-5 text-white
        text-sm flex items-center gap-x-2`}
      >
        <div className="flex gap-x-2 items-center">
          <div className="flex-shrink-0">{icon[type]}</div>
          <div className="flex flex-col">
            <div className="font-semibold truncate w-[120px] sm:w-[180px]">
              {message}
            </div>
            {desc ? (
              <div className="text-sm truncate w-[120px] sm:w-[180px]">
                {desc}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <button
        onClick={handleClose}
        className="absolute top-1/2 -translate-y-1/2 right-2 p-1 rounded-full
            bg-neutral-200/20 text-white hover:bg-neutral-50/30 transition-all"
      >
        <X className="size-3" />
      </button>
    </div>
  );
};

export default Toast;
