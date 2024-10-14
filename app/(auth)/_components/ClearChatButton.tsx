"use client";

import { MessageSquareX } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/app/firebase";
import useMessageStore from "@/app/_stores/MessageStore";
import useSidebarStore from "@/app/_stores/SidebarStore";
import useUserStore from "@/app/_stores/UserStore";

const ClearChatButton = () => {
  const { sidebarExpand } = useSidebarStore();
  const { setMessages } = useMessageStore();
  const { email } = useUserStore();

  const clearChat = async () => {
    const userRef = doc(db, "users", email);

    try {
      await updateDoc(userRef, {
        messages: [],
      });
      setMessages([]);
    } catch (error) {
      console.error("Error clearing chat: ", error);
    }
  };

  return (
    <button
      className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md
      transition-colors group hover:bg-red-50 text-red-500"
      onClick={clearChat}
    >
      <div className="flex-shrink-0">
        <MessageSquareX />
      </div>

      <span
        className={`overflow-hidden transition-all text-nowrap text-start ${
          sidebarExpand ? "w-52 ml-3" : "w-0"
        }`}
      >
        Clear Chat
      </span>

      {!sidebarExpand && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-red-100 text-red-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          Clear Chat
        </div>
      )}
    </button>
  );
};

export default ClearChatButton;
