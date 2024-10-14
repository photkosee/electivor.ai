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
import Modal from "@/app/_components/Modal";
import LoadingScreen from "@/app/_components/LoadingScreen";
import CourseList from "@/app/(auth)/background/_components/CourseList";

const AddCourseModal = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { courses, setCourses } = useCourseStore();
  const [userId, setUserId] = useState("");
  const { user, isLoaded } = useUser();
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
        console.log("User Data:", userData);
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.error("Error getting user data: ", error);
    }
  };

  const addCourse = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const courseExists = courses.some((course) => course.code === code);

    if (courseExists) {
      console.log(`Course with ID: already exists. Cannot add duplicate.`);
      setLoading(false);
      setOpen(false);
      return; // Prevent duplicate course addition
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
        console.log("Course added to existing user!");
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
        console.log("User created and course added!");
      }

      setOpen(false);
      setCode("");
      setName("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      return "";
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
