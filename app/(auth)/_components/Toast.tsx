import { CheckCircle, CircleAlert, XCircle } from "lucide-react";

interface ToastInterface {
  type: "success" | "error" | "info" | "warning";
  message: string;
  desc?: string;
}

const Toast = ({ type, message, desc }: ToastInterface) => {
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

  return (
    <div
      className={`${color[type]} w-[200px] sm:w-[260px] rounded-md p-2 pr-5 text-white text-sm
      flex items-center gap-x-2`}
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
  );
};

export default Toast;
