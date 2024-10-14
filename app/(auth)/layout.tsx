import { MessageSquareQuote, School } from "lucide-react";

import Sidebar from "@/app/(auth)/_components/Sidebar";
import SidebarItem from "@/app/(auth)/_components/SidebarItem";
import ClearChatButton from "@/app/(auth)/_components/ClearChatButton";
import ToastList from "@/app/(auth)/_components/ToastList";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-[100svh] h-full flex justify-start bg-secondary relative">
      <Sidebar>
        <SidebarItem icon={<School />} text="Background" link="/background" />
        <SidebarItem
          icon={<MessageSquareQuote />}
          text="Ask a Question"
          link="/chat"
        />

        <div className="h-[1px] w-full bg-neutral-200" />

        <ClearChatButton />
      </Sidebar>

      <div className="pl-20 lg:pl-3 pr-3 w-full flex justify-center bg-white">
        {children}
      </div>

      <ToastList />
    </div>
  );
};

export default AuthLayout;
