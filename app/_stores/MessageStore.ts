import { create } from "zustand"

import { MessageType } from "@/app/types";

type MessagesStoreType = {
  messages: MessageType[]
  setMessages: (courses: MessageType[]) => void
  addMessage: (course: MessageType) => void
}

const useMessageStore = create<MessagesStoreType>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));

export default useMessageStore;
