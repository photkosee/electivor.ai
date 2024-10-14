export type CourseType = {
  name: string;
  code: string;
};

export type MessageType = {
  text: string;
  sender: "bot" | "user";
}