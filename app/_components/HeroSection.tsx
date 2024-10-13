import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-around w-full max-w-7xl mx-auto p-5 gap-x-10">
      <div className="flex flex-col gap-y-3 text-center max-w-lg select-none">
        <div
          className="flex justify-center items-center text-4xl xs:text-5xl sm:text-7xl
          text-transparent font-extrabold gap-x-2 sm:gap-x-3"
        >
          <h1 className="bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text">
            UniPath
          </h1>
          <h1 className="bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text">
            UNSW
          </h1>
        </div>

        <h2 className="text-xl lg:text-2xl font-medium">
          Course Recommendation Chatbot
          <br />
          for UNSW students
        </h2>

        <h3 className="text-neutral-300">
          Are you feeling confused and overwhelmed by the choices you have?
          <br /> Not knowing which course to take for your career?
        </h3>

        <Link
          href="/chat"
          className="bg-gradient-to-r from-[#217bfe] to-[#e55571] px-6 py-3
          rounded-full w-auto font-semibold text-lg hover:opacity-90 transition-all"
        >
          Ask Here
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
