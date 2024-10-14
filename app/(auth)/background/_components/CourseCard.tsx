"use client";

import { Trash2 } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { CourseType } from "@/app/types";
import { db } from "@/app/firebase";
import useUserStore from "@/app/_stores/UserStore";
import useCourseStore from "@/app/_stores/CourseStore";
import useToastStore from "@/app/_stores/ToastStore";
import Toast from "@/app/(auth)/_components/Toast";

const CourseCard = ({ code, name }: CourseType) => {
  const { email } = useUserStore();
  const { setCourses } = useCourseStore();
  const { showToast, toastList } = useToastStore();

  const deleteCourse = async () => {
    const userRef = doc(db, "users", email);

    try {
      // Fetch the user's document
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // Get the current courses array
        const userData = userDoc.data();
        const currentCourses = userData.courses || [];

        // Filter the courses to remove the one with matching course code
        const updatedCourses = currentCourses.filter(
          (course: CourseType) => !(course.code === code)
        );

        // Update the user's document with the new courses array
        await updateDoc(userRef, {
          courses: updatedCourses,
        });

        setCourses(updatedCourses);

        showToast(
          (Math.random() + 1).toString(36).substring(7),
          toastList,
          <Toast type="success" message="Success" desc="Course deleted" />
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast(
        (Math.random() + 1).toString(36).substring(7),
        toastList,
        <Toast type="error" message="Error" desc="Could not delete course" />
      );
    }
  };

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
        onClick={deleteCourse}
      >
        <Trash2 className="w-4 text-red-500" />
      </button>
    </div>
  );
};

export default CourseCard;
