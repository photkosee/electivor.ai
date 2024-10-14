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
import ChatList from "@/app/(auth)/chat/_components/ChatList";
import LoadingScreen from "@/app/_components/LoadingScreen";

const RecommendationPrompt = dynamic(
  () => import("@/app/(auth)/chat/_components/RecommendationPrompt"),
  {
    ssr: false,
  }
);

const ChatBox = () => {
  const [text, setText] = useState<string>("");
  const { messages, setMessages } = useMessageStore();
  const { isLoaded } = useUser();
  const { email } = useUserStore();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const responseAreaRef = useRef<HTMLDivElement>(null);

  // Adjust the height of the textarea based on its content
  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset the height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set to the scroll height

      if (responseAreaRef.current) {
        // Also adjust the height of the response area accordingly
        console.log(textAreaRef.current.scrollHeight);
        if (textAreaRef.current.scrollHeight > 200) {
          responseAreaRef.current.style.height = `calc(100vh - 270px)`;
        } else {
          responseAreaRef.current.style.height = `calc(100vh - ${
            textAreaRef.current.scrollHeight + 90
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

  const submitQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      console.log("Message sent:", text); // Replace with your submission logic
      setText(""); // Clear the input after submission
    }

    const newQuery: MessageType = {
      text: text.trim(),
      sender: "user",
    };
    setMessages([...messages, newQuery]);

    try {
      const userRef = doc(db, "users", email);
      // Check if the user exists
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // User exists, just update their courses
        await updateDoc(userRef, {
          messages: arrayUnion(newQuery),
        });
      } else {
        // User doesn't exist, create a new user and add the course
        await setDoc(userRef, {
          email,
          courses: [],
          messages: [newQuery],
        });
      }
    } catch (error) {
      console.error(error);
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

      <div className="overflow-y-auto w-full" ref={responseAreaRef}>
        <div className="max-w-4xl mx-auto lg:pr-3 lg:pl-9 py-10">
          <ChatList />
        </div>
      </div>

      <div className="flex flex-col gap-y-5 fixed bottom-0 max-w-4xl px-12 bg-white w-full">
        <RecommendationPrompt />

        <div className="bg-white pb-3">
          <form
            className="bg-neutral-100 rounded-3xl w-full py-4 pl-6 pr-16 relative
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
