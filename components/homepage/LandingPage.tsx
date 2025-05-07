"use client";
import React from "react";
import { DM_Sans } from "next/font/google";
import TextPressure from "../ui/TextPressure/TextPressure";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export default function LandingPage() {
  const router = useRouter();

  function SolRedirect() {
    router.push("/solana");
  }

  function EthRedirect() {
    router.push("/ethereum");
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-center items-center relative overflow-hidden px-4 sm:px-6">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-20 w-32 sm:w-64 h-32 sm:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 z-0"></div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center justify-center gap-8 sm:gap-16 max-w-full">
        {/* Welcome text */}
        <div className="relative w-full">
          <div className="hidden sm:block">
            <TextPressure
              text="Hierarchical   Deterministic   Wallet"
              flex={true}
              alpha={false}
              stroke={true}
              width={true}
              weight={true}
              italic={false}
              textColor="#ffffff"
              strokeColor="rgba(138, 43, 226, 0.5)"
              minFontSize={54}
            />
          </div>
          <div className="sm:hidden">
            <TextPressure
              text="HD Wallet"
              flex={true}
              alpha={false}
              stroke={true}
              width={true}
              weight={true}
              italic={false}
              textColor="#ffffff"
              strokeColor="rgba(138, 43, 226, 0.5)"
              minFontSize={36}
            />
          </div>
          <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            Generate and manage hierarchical deterministic wallets for multiple
            blockchains
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-2xl">
          <Button
            className={`${dmSans.variable} cursor-pointer relative overflow-hidden group bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-light tracking-wide rounded-md border border-blue-400/20 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 w-full sm:w-auto`}
            onClick={SolRedirect}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
            <span className="relative flex items-center justify-center gap-2">
              <Image
                src="/solanaLogoMark.svg"
                alt="Solana"
                width={16}
                height={16}
                className="sm:w-[18px] sm:h-[18px]"
              />
              Solana
            </span>
          </Button>

          <Button
            className={`${dmSans.variable} cursor-pointer relative overflow-hidden group bg-gradient-to-r from-purple-500/90 to-purple-600/90 text-white px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-light tracking-wide rounded-md border border-purple-400/20 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 w-full sm:w-auto`}
            onClick={EthRedirect}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
            <span className="relative flex items-center justify-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-[18px] sm:h-[18px]"
              >
                <path
                  d="M12 2L5 12L12 9L12 2Z"
                  fill="white"
                  fillOpacity="0.6"
                />
                <path d="M12 2L19 12L12 9L12 2Z" fill="white" />
                <path
                  d="M12 22V16L5 13L12 22Z"
                  fill="white"
                  fillOpacity="0.6"
                />
                <path d="M12 22V16L19 13L12 22Z" fill="white" />
                <path
                  d="M12 15L5 12L12 9L19 12L12 15Z"
                  fill="white"
                  fillOpacity="0.2"
                />
              </svg>
              Ethereum
            </span>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 sm:bottom-6 text-gray-500 text-xs sm:text-sm z-10 text-center px-4">
        Secure, client-side wallet generation • Data stored only in your browser
      </div>
    </div>
  );
}
