"use client";

import { MessageSquareX } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/app/firebase";
import useMessageStore from "@/app/_stores/MessageStore";
import useSidebarStore from "@/app/_stores/SidebarStore";
import useUserStore from "@/app/_stores/UserStore";
import Modal from "@/app/_components/Modal";
import { useEffect, useRef, useState } from "react";
import LoadingScreen from "@/app/_components/LoadingScreen";

const ClearChatButton = () => {
  const { sidebarExpand } = useSidebarStore();
  const { setMessages } = useMessageStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const buttonSubmitRef = useRef<HTMLButtonElement>(null);
  const { email } = useUserStore();

  const clearChat = async () => {
    setLoading(true);
    const userRef = doc(db, "users", email);

    try {
      await updateDoc(userRef, {
        messages: [],
      });
      setMessages([]);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (open && buttonSubmitRef.current) {
      setTimeout(() => {
        buttonSubmitRef.current?.focus();
      }, 50);
    }
  }, [open]);

  return (
    <>
      <button
        className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md
        transition-colors group hover:bg-red-50 text-red-500"
        onClick={() => setOpen(true)}
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

      <Modal open={open} onClose={() => setOpen(false)}>
        {loading ? (
          <div className="p-10">
            <LoadingScreen />
          </div>
        ) : (
          <form
            className="select-none flex flex-col gap-y-5 py-6"
            onSubmit={clearChat}
          >
            <div className="mx-auto text-center">
              <h3 className="text-lg font-black text-gray-800">
                Clear All Messages
              </h3>
            </div>

            <div className="flex gap-x-2">
              <button
                className="w-full hover:bg-red-500 transition-all px-3 py-2 rounded-xl
                bg-red-600 text-white"
                type="submit"
                autoFocus
                ref={buttonSubmitRef}
              >
                Clear
              </button>

              <button
                className="w-full hover:bg-neutral-100 transition-all px-3 py-2 rounded-xl"
                onClick={() => setOpen(false)}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default ClearChatButton;
