"use client";

import { ReactNode } from "react";
import { MoreVertical, ChevronLast } from "lucide-react";

import useSidebarStore from "@/app/_stores/SidebarStore";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const { sidebarExpand, toggleSidebar } = useSidebarStore();

  return (
    <aside className="h-screen lg:static fixed top-0 bottom-0 left-0 z-30">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <ChevronLast
              className={`transition-transform ${
                sidebarExpand ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <div className="border-t flex p-3">
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                sidebarExpand ? "w-52 ml-3" : "w-0"
              }
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
