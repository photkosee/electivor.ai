"use client";

import { ReactNode, useEffect } from "react";
import { ChevronLast } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

import useSidebarStore from "@/app/_stores/SidebarStore";
import useUserStore from "@/app/_stores/UserStore";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const { sidebarExpand, toggleSidebar } = useSidebarStore();
  const { setEmail } = useUserStore();
  const { user } = useUser();

  useEffect(() => {
    setEmail(user?.emailAddresses[0]?.emailAddress || "");
  }, [user]);

  return (
    <aside className="h-[100svh] lg:static fixed top-0 bottom-0 left-0 z-30">
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
          <div className="flex items-center justify-center pl-2">
            <UserButton />
          </div>

          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                sidebarExpand ? "w-52 ml-3 truncate" : "w-0"
              }
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">
                {user?.firstName} {user?.lastName}
              </h4>
              <span className="text-xs text-gray-600">
                {user?.emailAddresses[0]?.emailAddress}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
