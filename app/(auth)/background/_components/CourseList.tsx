import { CourseType } from "@/app/types";
import CourseCard from "@/app/(auth)/background/_components/CourseCard";
import useCourseStore from "@/app/_stores/CourseStore";

const CourseList = () => {
  const { courses } = useCourseStore();

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2">
      {courses.map((course: CourseType, index: number) => (
        <CourseCard key={index} code={course.code} name={course.name} />
      ))}
    </div>
  );
};

export default CourseList;
