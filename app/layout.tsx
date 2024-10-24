import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "@/app/globals.css";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electivor.ai",
  description: "Course Recommendation Chatbot for UNSW students",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
