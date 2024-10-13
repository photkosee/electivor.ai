import { create } from "zustand"

import { CourseType } from "@/app/types";

type CourseStoreType = {
  courses: CourseType[]
  setCourses: (courses: CourseType[]) => void
  addCourse: (course: CourseType) => void
}

const useCourseStore = create<CourseStoreType>((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
  addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
}));

export default useCourseStore;
