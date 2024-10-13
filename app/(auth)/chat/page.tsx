import dynamic from "next/dynamic";

import LoadingScreen from "@/app/_components/LoadingScreen";

const ChatBox = dynamic(() => import("@/app/(auth)/chat/_components/ChatBox"), {
  loading: () => <LoadingScreen />,
  ssr: false,
});

const chatPage = () => {
  return <ChatBox />;
};

export default chatPage;
