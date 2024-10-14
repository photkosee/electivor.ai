"use client";

import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

import { db } from "@/app/firebase";
import useMessageStore from "@/app/_stores/MessageStore";
import QueryBubble from "@/app/(auth)/chat/_components/QueryBubble";

const ChatList = () => {
  const { messages, setMessages } = useMessageStore();
  const { user, isLoaded } = useUser();

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
        console.log("User Data:", userData);
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.error("Error getting user data: ", error);
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
