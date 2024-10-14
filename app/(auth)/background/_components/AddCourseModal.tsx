"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { PlusCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { CourseType } from "@/app/types";
import { db } from "@/app/firebase";
import useCourseStore from "@/app/_stores/CourseStore";
import useToastStore from "@/app/_stores/ToastStore";
import Modal from "@/app/_components/Modal";
import LoadingScreen from "@/app/_components/LoadingScreen";
import CourseList from "@/app/(auth)/background/_components/CourseList";
import Toast from "@/app/(auth)/_components/Toast";

const AddCourseModal = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { courses, setCourses } = useCourseStore();
  const [userId, setUserId] = useState("");
  const { user, isLoaded } = useUser();
  const { showToast, toastList } = useToastStore();
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoaded && user) {
      setUserId(user.emailAddresses[0].emailAddress);
      getCoursesFromUser(user.emailAddresses[0].emailAddress);
    }
  }, [isLoaded, user]);

  const getCoursesFromUser = async (email: string) => {
    try {
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setCourses(userData.courses);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast(
        (Math.random() + 1).toString(36).substring(7),
        toastList,
        <Toast type="error" message="Error" desc="Could not fetch courses" />
      );
    }
  };

  const addCourse = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const courseExists = courses.some((course) => course.code === code);

    if (courseExists) {
      setLoading(false);
      setOpen(false);
      showToast(
        (Math.random() + 1).toString(36).substring(7),
        toastList,
        <Toast type="warning" message="Warning" desc="Course already exists" />
      );
      return;
    }

    try {
      const newCourse: CourseType = {
        code: code,
        name: name,
      };
      const userRef = doc(db, "users", userId);
      // Check if the user exists
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // User exists, just update their courses
        await updateDoc(userRef, {
          courses: arrayUnion(newCourse),
        });

        showToast(
          (Math.random() + 1).toString(36).substring(7),
          toastList,
          <Toast type="success" message="Success" desc="Course added" />
        );
        setCourses([...courses, newCourse]);
      } else {
        // User doesn't exist, create a new user and add the course
        await setDoc(userRef, {
          name,
          userId,
          courses: [newCourse],
          messages: [],
          createdAt: serverTimestamp(),
        });

        showToast(
          (Math.random() + 1).toString(36).substring(7),
          toastList,
          <Toast type="success" message="Success" desc="Course added" />
        );
      }

      setOpen(false);
      setCode("");
      setName("");
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoading(false);

      showToast(
        (Math.random() + 1).toString(36).substring(7),
        toastList,
        <Toast type="error" message="Error" desc="Could not add course" />
      );
      return;
    }
  };

  useEffect(() => {
    if (open && codeInputRef.current) {
      setTimeout(() => {
        codeInputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  return (
    <>
      <button
        className="p-3 rounded-xl shadow-md flex items-center justify-center select-none
        gap-x-2 border border-neutral-100 transition-all hover:bg-neutral-100"
        onClick={() => setOpen(true)}
        type="button"
      >
        <PlusCircle />
        Add Course
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        {loading ? (
          <div className="p-10">
            <LoadingScreen />
          </div>
        ) : (
          <form
            className="select-none flex flex-col gap-y-3"
            onSubmit={addCourse}
          >
            <div className="mx-auto text-center">
              <h3 className="text-lg font-black text-gray-800">Add Course</h3>
            </div>

            <div className="w-full flex flex-col gap-y-2 items-start">
              <input
                ref={codeInputRef}
                type="text"
                placeholder="Course Code"
                className="w-full focus:outline-none px-3 py-2 border border-neutral-700 rounded-lg"
                onChange={(e) => setCode(e.target.value)}
                value={code}
                required
              />
              <input
                type="text"
                placeholder="Course Name"
                className="w-full focus:outline-none px-3 py-2 border border-neutral-700 rounded-lg"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            <div className="flex gap-x-2">
              <button
                className="w-full hover:bg-indigo-500 transition-all px-3 py-2 rounded-xl
                bg-indigo-600 text-white"
                type="submit"
              >
                Add
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

      {isLoaded ? <CourseList /> : <LoadingScreen />}
    </>
  );
};

export default AddCourseModal;
