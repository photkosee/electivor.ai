"use client";

import { useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

import { db } from "@/app/firebase";
import useMessageStore from "@/app/_stores/MessageStore";
import useToastStore from "@/app/_stores/ToastStore";
import Toast from "@/app/(auth)/_components/Toast";
import LoadingScreen from "@/app/_components/LoadingScreen";
import ChatBubble from "@/app/(auth)/chat/_components/ChatBubble";

const ChatList = () => {
  const { user, isLoaded } = useUser();
  const { messages, setMessages } = useMessageStore();
  const { showToast, toastList } = useToastStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const greetings = "Hello there, how can I help you today?";

  useEffect(() => {
    const getMessagesFromUser = async (email: string) => {
      try {
        const userRef = doc(db, "users", email);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setMessages(userData.messages);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        const id = (Math.random() + 1).toString(36).substring(7);
        showToast(
          id,
          toastList,
          <Toast
            id={id}
            type="error"
            message="Error"
            desc="Could not fetch messages"
          />
        );
      }
    };

    if (isLoaded && user) {
      getMessagesFromUser(user.emailAddresses[0].emailAddress);
    }
  }, [isLoaded, setMessages, showToast, toastList, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col gap-y-3">
      <ChatBubble
        text={greetings}
        role="bot"
        noStreaming={messages.length > 1}
      />

      {messages.map((message, index: number) => (
        <ChatBubble
          text={message.text}
          key={index}
          role={message.role}
          noStreaming={index !== messages.length - 1}
        />
      ))}
    </div>
  );
};

export default ChatList;
