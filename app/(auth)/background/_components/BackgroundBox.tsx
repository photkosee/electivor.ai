// import { FileUp } from "lucide-react";

import AddCourseModal from "@/app/(auth)/background/_components/AddCourseModal";

const BackgroundBox = () => {
  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-y-3 bg-white py-10 px-5">
      <div className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-red-500 to-yellow-500 p-1">
        <div className="bg-white rounded-lg text-indigo-800 p-3 lg:p-5">
          <h5 className="font-bold">What is this for?</h5>
          <div>
            Adding courses you had done or planning to enrol will help you get a
            better recommendation and preventing our AI to recommend you the
            same course again.
          </div>
        </div>
      </div>

      {/* <button
        className="p-3 rounded-xl shadow-md flex items-center justify-center
        gap-x-2 border border-neutral-100 transition-all hover:bg-neutral-100"
        disabled
      >
        <FileUp className="flex-shrink-0" />
        Upload Academic Statement
      </button> */}

      <AddCourseModal />
    </div>
  );
};

export default BackgroundBox;
