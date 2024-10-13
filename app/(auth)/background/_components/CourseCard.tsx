import { Trash2 } from "lucide-react";

interface CourseCardProps {
  code: string;
  name: string;
}

const CourseCard = ({ code, name }: CourseCardProps) => {
  return (
    <div
      className="relative select-none w-full rounded-md bg-white p-3 shadow-md
      border border-neutral-100"
    >
      <p className="font-bold pr-10">{code}</p>
      <p>{name}</p>

      <button
        className="absolute top-0.5 right-0.5 size-7 p-1 rounded-full flex items-center
        justify-center hover:bg-neutral-100 transition-all"
      >
        <Trash2 className="w-4 text-red-500" />
      </button>
    </div>
  );
};

export default CourseCard;
