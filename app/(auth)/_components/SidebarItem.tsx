"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import useSidebarStore from "@/app/_stores/SidebarStore";

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  alert?: boolean;
  link: string;
}

const SidebarItem = ({ icon, text, alert, link }: SidebarItemProps) => {
  const path = usePathname();
  const { sidebarExpand } = useSidebarStore();

  return (
    <Link
      href={link}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          path === link
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      <div className="flex-shrink-0">{icon}</div>

      <span
        className={`overflow-hidden transition-all text-nowrap ${
          sidebarExpand ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            sidebarExpand ? "" : "top-2"
          }`}
        />
      )}

      {!sidebarExpand && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </Link>
  );
};

export default SidebarItem;
