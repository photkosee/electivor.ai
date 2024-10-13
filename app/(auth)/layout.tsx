import { MessageSquareQuote, School } from "lucide-react";

import Sidebar from "@/app/(auth)/_components/Sidebar";
import SidebarItem from "@/app/(auth)/_components/SidebarItem";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen h-full flex justify-start bg-secondary">
      <Sidebar>
        <SidebarItem icon={<School />} text="Background" link="/background" />
        <SidebarItem
          icon={<MessageSquareQuote />}
          text="Ask a Question"
          link="/chat"
        />

        <div className="h-[1px] w-full bg-neutral-200" />
      </Sidebar>

      <div className="pl-[87px] lg:pl-3 pr-3 w-full flex justify-center bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
