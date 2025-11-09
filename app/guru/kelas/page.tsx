"use client";

import { useState, useRef, useEffect } from "react";
import { Megaphone, BookOpen, ClipboardList, Bell } from "lucide-react";

export default function DaftarKelas() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const kelasList = [
    { nama: "12 MPLB 1", siswa: 38, tugasBerjalan: 1, tugasSelesai: 5, materiBerjalan: 2, materiSelesai: 4 },
    { nama: "12 MPLB 2", siswa: 37, tugasBerjalan: 2, tugasSelesai: 4, materiBerjalan: 1, materiSelesai: 5 },
    { nama: "12 MPLB 3", siswa: 35, tugasBerjalan: 2, tugasSelesai: 4, materiBerjalan: 3, materiSelesai: 3 },
    { nama: "11 RPL 1", siswa: 40, tugasBerjalan: 3, tugasSelesai: 6, materiBerjalan: 2, materiSelesai: 5 },
    { nama: "11 RPL 2", siswa: 39, tugasBerjalan: 1, tugasSelesai: 2, materiBerjalan: 1, materiSelesai: 3 },
  ];

  // Klik luar untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="bg-gray-50 w-full pb-18 relative">
      {/* Judul Section */}
      <div className="mb-4 sticky top-0 bg-gray-50 z-10 p-4 shadow flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Daftar kelas <span className="text-gray-500 text-sm font-normal">(yang diampu)</span>
        </h2>

        {/* Tombol Broadcast */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setShowDropdown((prev) => !prev)} className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-md px-3 py-1.5 transition-all duration-200">
            <Megaphone className="w-4 h-4" />
            Broadcast
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30 overflow-hidden animate-fadeIn">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-all text-sm"
                onClick={() => {
                  setShowDropdown(false);
                  alert("Broadcast Materi 📚");
                }}
              >
                <BookOpen className="w-4 h-4" /> Materi
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-all text-sm"
                onClick={() => {
                  setShowDropdown(false);
                  alert("Broadcast Tugas 📝");
                }}
              >
                <ClipboardList className="w-4 h-4" /> Tugas
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-all text-sm"
                onClick={() => {
                  setShowDropdown(false);
                  alert("Broadcast Pengumuman 🔔");
                }}
              >
                <Bell className="w-4 h-4" /> Pengumuman
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid Card */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
        {kelasList
          .sort((a, b) => a.nama.localeCompare(b.nama)) // urut berdasarkan abjad
          .map((kelas) => (
            <div key={kelas.nama} className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200">
              {/* Heading bergaya Materi & Diskusi */}
              <div className="py-1 text-white mb-3 text-center rounded-t-sm bg-gray-900">
                <span className="text-lg font-bold">{kelas.nama}</span>
              </div>
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-500 mb-2">{kelas.siswa} siswa</p>

                {/* Bagian Tugas */}
                <p className="text-sm font-semibold text-gray-700 mb-1">Tugas</p>
                <div className="flex gap-2 flex-wrap mb-3">
                  <span className="text-[13px] bg-green-500 text-white font-semibold rounded-xs px-3 py-1 flex items-center gap-1">Berjalan ({kelas.tugasBerjalan})</span>
                  <span className="text-[13px] bg-gray-300 text-white font-semibold rounded-xs px-3 py-1 flex items-center gap-1">Selesai ({kelas.tugasSelesai})</span>
                </div>

                {/* Bagian Materi */}
                <p className="text-sm font-semibold text-gray-700 mb-1">Materi</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[13px] bg-violet-500 text-white font-semibold rounded-xs px-3 py-1 flex items-center gap-1">Berjalan ({kelas.materiBerjalan})</span>
                  <span className="text-[13px] bg-gray-300 text-white font-semibold rounded-xs px-3 py-1 flex items-center gap-1">Selesai ({kelas.materiSelesai})</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
