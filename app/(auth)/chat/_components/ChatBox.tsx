"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { ArrowUp } from "lucide-react";

import { db } from "@/app/firebase";
import { MessageType } from "@/app/types";
import useUserStore from "@/app/_stores/UserStore";
import useMessageStore from "@/app/_stores/MessageStore";
import useToastStore from "@/app/_stores/ToastStore";
import ChatList from "@/app/(auth)/chat/_components/ChatList";
import LoadingScreen from "@/app/_components/LoadingScreen";
import Toast from "@/app/(auth)/_components/Toast";

const RecommendationPrompt = dynamic(
  () => import("@/app/(auth)/chat/_components/RecommendationPrompt"),
  {
    ssr: false,
  }
);

const ChatBox = () => {
  const [text, setText] = useState<string>("");
  const { messages, setMessages } = useMessageStore();
  const { showToast, toastList } = useToastStore();
  const { isLoaded } = useUser();
  const { email } = useUserStore();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const responseAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Adjust the height of the textarea based on its content
  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset the height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set to the scroll height

      if (responseAreaRef.current) {
        // Also adjust the height of the response area accordingly
        if (textAreaRef.current.scrollHeight > 200) {
          responseAreaRef.current.style.height = `calc(100svh - 270px)`;
        } else {
          responseAreaRef.current.style.height = `calc(100svh - ${
            textAreaRef.current.scrollHeight + 70
          }px)`;
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Focus the textarea when the parent div is clicked
  const handleParentClick = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  // Ensure the height adjusts when the text state changes
  useEffect(() => {
    adjustHeight();
  }, [text]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const submitQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      setText("");
    }

    const newQuery: MessageType = {
      id: (Math.random() + 1).toString(36).substring(7),
      text: text.trim(),
      role: "user",
    };

    const responseQuery: MessageType = {
      id: (Math.random() + 1).toString(36).substring(7),
      text: "Seems like the author ran out of credits to maintain this bot. Please try again later.",
      role: "bot",
    };

    setMessages([...messages, newQuery, responseQuery]);

    try {
      const userRef = doc(db, "users", email);
      // Check if the user exists
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // User exists, just update their courses
        await updateDoc(userRef, {
          messages: arrayUnion(newQuery, responseQuery),
        });
      } else {
        // User doesn't exist, create a new user and add the messages
        await setDoc(userRef, {
          email,
          courses: [],
          messages: [newQuery, responseQuery],
        });
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
          desc="Could not send query"
        />
      );
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-white">
      <div className="bg-white h-4" />

      <div
        className="overflow-y-auto w-full h-[calc(100svh-90px)]"
        ref={responseAreaRef}
      >
        <div className="max-w-3xl xl:max-w-4xl mx-auto px-0.5 lg:px-3 py-10">
          <ChatList />
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-col gap-y-5 fixed bottom-0 max-w-3xl xl:max-w-4xl px-12 bg-white w-full">
        <RecommendationPrompt />

        <div className="bg-white pb-3">
          <form
            className="bg-neutral-100 rounded-3xl w-full py-4 pl-6 pr-[52px] relative
            flex justify-between items-center cursor-text"
            onClick={handleParentClick} // Focus textarea when clicking the parent
            onSubmit={submitQuery}
          >
            <div className="flex-grow bg-inherit flex items-center">
              <textarea
                ref={textAreaRef}
                value={text}
                onChange={handleChange}
                autoFocus
                placeholder="Ask here..."
                className="w-full h-auto resize-none overflow-auto focus:outline-none
                text-gray-800 bg-inherit max-h-[200px] scrollbar-thin scrollbar-webkit"
                rows={1}
                onKeyPress={(e) => {
                  // Submit the form when Enter is pressed
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitQuery(e);
                  }
                }}
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white rounded-full size-8 flex items-center justify-center
              absolute right-3 bottom-3 disabled:opacity-15"
              disabled={text.trim().length === 0}
            >
              <ArrowUp />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
