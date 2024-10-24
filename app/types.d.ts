export type CourseType = {
  name: string;
  code: string;
};

export type MessageType = {
  id: string;
  text: string;
  role: "bot" | "user";
}

export type ToastType = {
  id: string
  component: ReactNode
}
