"use client";

import React from "react";
import { DM_Sans } from "next/font/google";

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

function Loading() {
  return (
    <div
      className={`${dmSans.variable} font-sans flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 z-0 pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center justify-center space-y-8">
        {/* Main loader animation */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-spin-slow"></div>
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 animate-pulse"></div>
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              HD
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white animate-pulse">
            Loading
          </h2>
          <div className="flex mt-2 space-x-1">
            <div
              className="w-2 h-2 rounded-full bg-white opacity-60 animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-white opacity-60 animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-white opacity-60 animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add style for custom animation */}
      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Loading;
