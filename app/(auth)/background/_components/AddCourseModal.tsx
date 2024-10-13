"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { PlusCircle } from "lucide-react";

import Modal from "@/app/_components/Modal";

const AddCourseModal = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const codeInputRef = useRef<HTMLInputElement>(null);

  const addCourse = (e: FormEvent) => {
    e.preventDefault();
    // TODO: add a course to database/backend
    setOpen(false);
    setCode("");
    setName("");
  };

  useEffect(() => {
    if (open && codeInputRef.current) {
      setTimeout(() => {
        codeInputRef.current?.focus();
      }, 50);
    }
    console.log("focus");
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
      </Modal>
    </>
  );
};

export default AddCourseModal;
