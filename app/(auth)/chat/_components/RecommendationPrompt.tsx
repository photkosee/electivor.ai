"use client";

import useMessageStore from "@/app/_stores/MessageStore";
import Link from "next/link";

const RecommendationPrompt = () => {
  const { messages } = useMessageStore();

  return (
    <div
      className={`px-5 flex flex-col sm:flex-row gap-3 ${
        messages.length > 0 ? "hidden" : ""
      }`}
    >
      <div
        className="bg-neutral-100 rounded-lg w-full text-black p-3 shadow-md
        flex flex-col gap-y-2 select-none"
      >
        <div className="font-semibold">
          Let us recommend the best course for you.
        </div>
        <div className="text-neutral-500 text-sm">
          Let me know what kind of career you are looking for. What are the
          topics you are interested in? Or what technology you want to learn. I
          will recommend you the best course for you.
        </div>
      </div>

      <div
        className="bg-neutral-100 rounded-lg w-full text-black p-3 shadow-md
        flex flex-col gap-y-2 select-none"
      >
        <div className="font-semibold">
          Add your background to improve our recommendation.
        </div>
        <div className="text-neutral-500 text-sm">
          Add courses you have done or planning to do so that we know your
          experience and can give you more accurate recommendations.
        </div>
        <Link
          href="/background"
          className="bg-indigo-600 text-white py-2 px-3 rounded-lg
              hover:bg-indigo-500 transition-all flex items-center justify-center"
        >
          Add here
        </Link>
      </div>
    </div>
  );
};

export default RecommendationPrompt;
