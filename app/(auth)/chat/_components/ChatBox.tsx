"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ChatBox = () => {
  const [text, setText] = useState<string>("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Adjust the height of the textarea based on its content
  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset the height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set to the scroll height
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      console.log("Message sent:", text); // Replace with your submission logic
      setText(""); // Clear the input after submission
    }
  };

  // Ensure the height adjusts when the text state changes
  useEffect(() => {
    adjustHeight();
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col justify-between bg-white">
      <div className="bg-white h-4" />

      <div className="bg-white pb-3">
        <form
          className="bg-neutral-100 rounded-3xl w-full py-4 pl-6 pr-16 relative
          flex justify-between items-center cursor-text"
          onClick={handleParentClick} // Focus textarea when clicking the parent
          onSubmit={handleSubmit}
        >
          <div className="flex-grow bg-inherit flex items-center">
            <textarea
              ref={textAreaRef}
              value={text}
              onChange={handleChange}
              placeholder="Ask here..."
              className="w-full h-auto resize-none overflow-auto focus:outline-none
              text-gray-800 bg-inherit max-h-[calc(30vh)] scrollbar-thin scrollbar-webkit"
              rows={1}
              onKeyPress={(e) => {
                // Submit the form when Enter is pressed
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
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
  );
};

export default ChatBox;
