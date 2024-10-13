import dynamic from "next/dynamic";

import LoadingScreen from "@/app/_components/LoadingScreen";

const BackgroundBox = dynamic(
  () => import("@/app/(auth)/background/_components/BackgroundBox"),
  {
    loading: () => <LoadingScreen />,
    ssr: false,
  }
);

const BackgroundPage = () => {
  return (
    <div>
      <BackgroundBox />
    </div>
  );
};

export default BackgroundPage;
