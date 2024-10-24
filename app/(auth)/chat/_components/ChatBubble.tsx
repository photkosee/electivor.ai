"use client";

import useStreamText from "@/app/_hooks/useStreamText";

interface ChatBubbleProps {
  text: string;
  role: "user" | "bot";
  noStreaming?: boolean;
}

const ChatBubble = ({ text, role, noStreaming }: ChatBubbleProps) => {
  const streamText = useStreamText(text);

  return (
    <div
      className={`flex w-full ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className="max-w-[220px] xs:max-w-sm sm:max-w-lg w-auto bg-neutral-100 text-black
        px-5 py-3 sm:px-7 sm:py-5 break-words rounded-3xl text-sm sm:text-base"
      >
        <p>{role === "bot" && !noStreaming ? streamText : text}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
