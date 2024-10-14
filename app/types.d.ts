export type CourseType = {
  name: string;
  code: string;
};

export type MessageType = {
  text: string;
  sender: "bot" | "user";
}

export type ToastType = {
  id: string
  component: ReactNode
}
