import Link from "next/link";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center flex flex-col gap-y-7">
      <h1
        className="text-5xl xs:text-6xl font-extrabold bg-clip-text text-transparent
        bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600"
      >
        Electivor.ai
      </h1>

      <p className="text-xl xs:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
        <span
          className="underline decoration-wavy text-xl xs:text-2xl decoration-green-400
          text-green-400 font-bold underline-offset-4"
        >
          Chatbot
        </span>{" "}
        that can recommend the best course according to your{" "}
        <span
          className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text
          text-transparent font-bold"
        >
          Preferrence
        </span>{" "}
        , try this if you are a UNSW student!{" "}
      </p>

      <div>
        <button
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600
          hover:to-teal-600 text-white px-8 py-2 rounded-lg"
        >
          <Link
            href="/chat"
            className="flex items-center text-xl font-semibold"
          >
            Ask Now <ChevronRight />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
