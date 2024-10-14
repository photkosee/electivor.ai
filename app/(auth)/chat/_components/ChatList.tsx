"use client";

import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

import { db } from "@/app/firebase";
import useMessageStore from "@/app/_stores/MessageStore";
import useToastStore from "@/app/_stores/ToastStore";
import QueryBubble from "@/app/(auth)/chat/_components/QueryBubble";
import Toast from "@/app/(auth)/_components/Toast";

const ChatList = () => {
  const { user, isLoaded } = useUser();
  const { messages, setMessages } = useMessageStore();
  const { showToast, toastList } = useToastStore();

  useEffect(() => {
    if (isLoaded && user) {
      getMessagesFromUser(user.emailAddresses[0].emailAddress);
    }
  }, [isLoaded, user]);

  const getMessagesFromUser = async (email: string) => {
    try {
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setMessages(userData.messages);
      }
    } catch (error) {
      showToast(
        (Math.random() + 1).toString(36).substring(7),
        toastList,
        <Toast type="error" message="Error" desc="Could not fetch messages" />
      );
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      {messages.map((message, index: number) => (
        <QueryBubble text={message.text} key={index} />
      ))}
    </div>
  );
};

export default ChatList;
