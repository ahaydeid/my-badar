"use client";

// import React from "react";
import { User2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-white rounded-b-4xl shadow-md pt-6 pb-14 z-10 overflow-visible">
      <div className="flex items-center justify-between px-6">
        {/* Left side - Greeting */}
        <div>
          <h1 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            Selamat Pagi <span className="text-2xl">🌤️</span>
          </h1>
        </div>

        {/* Right side - User info */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-base font-extrabold text-gray-900 leading-tight">Ahadi Hadi</p>
            <p className="text-gray-500 text-sm font-medium">Coding</p>
          </div>
          <div className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
            <User2 className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
