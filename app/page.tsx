import BenefitSection from "@/app/_components/BenifitSection";
import HeroSection from "@/app/_components/HeroSection";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden
      flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gray-900">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
          bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        />
      </div>

      <div className="relative z-10">
        <main className="container mx-auto px-4 py-16 max-w-7xl flex flex-col gap-y-28 justify-center items-center">
          <HeroSection />
          <BenefitSection />
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
