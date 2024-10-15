"use client";

import useToastStore from "@/app/_stores/ToastStore";
import Toast from "@/app/(auth)/_components/Toast";

const ToastList = () => {
  const { toastList } = useToastStore();

  return (
    <div className="space-y-2 absolute top-2 right-2 overflow-hidden">
      {toastList.map(({ id, component }) => (
        <Toast
          key={id}
          id={id}
          type={component.props.type}
          message={component.props.message}
          desc={component.props.desc}
        />
      ))}
    </div>
  );
};

export default ToastList;
