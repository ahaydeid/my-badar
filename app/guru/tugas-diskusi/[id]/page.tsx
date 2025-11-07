"use client";

import Image from "next/image";
import { Eye, Pin, MessageSquare, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function DetailTugasKelas() {
  const [activeTab, setActiveTab] = useState("berjalan");

  // Semua tugas berdiri sendiri
  const tugasList = [
    {
      kategori: "Tugas Kelompok",
      gambar: "/img/albadar.png",
      judul: "Tugas 4",
      deskripsi: "Ketentuan: 1. Tugas dikerjakan...",
      status: "berjalan",
      stats: { lihat: 48, pin: 28, komentar: 47 },
    },
    {
      kategori: "Tugas Kelompok",
      gambar: "/img/albadar.png",
      judul: "Tugas 3",
      deskripsi: "Ketentuan: 1. Tugas dikerjakan...",
      status: "selesai",
      stats: { lihat: 35, pin: 12, komentar: 18 },
    },
    {
      kategori: "Tugas Individu",
      gambar: "",
      judul: "Tugas 1",
      deskripsi: "Ketentuan: 1. Tugas dikerjakan...",
      status: "selesai",
      stats: { lihat: 52, pin: 31, komentar: 50 },
    },
  ];

  // Filter berdasarkan tab aktif
  const filteredTasks = tugasList.filter((t) => t.status === activeTab);

  return (
    <section className="w-full relative">
      {/* Header & Tabs Sticky */}
      <div className="sticky top-0 z-20">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-100">
          <h2 className="text-[16px] font-bold text-gray-800">12 MPLB 2</h2>
          <button className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-md px-3 py-1.5 transition-all duration-200">
            <PlusCircle className="w-4 h-4" />
            Tambah tugas
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 text-sm font-semibold bg-white">
          <button
            onClick={() => setActiveTab("berjalan")}
            className={`flex-1 py-2 text-center transition-all duration-200 ${activeTab === "berjalan" ? "text-sky-600 border-b-2 border-sky-500 bg-white" : "text-gray-400 hover:text-gray-600"}`}
          >
            Sedang berjalan
          </button>
          <button
            onClick={() => setActiveTab("selesai")}
            className={`flex-1 py-2 text-center transition-all duration-200 ${activeTab === "selesai" ? "text-sky-600 border-b-2 border-sky-500 bg-white" : "text-gray-400 hover:text-gray-600"}`}
          >
            Selesai
          </button>
        </div>
      </div>

      {/* Konten */}
      <div className="py-4 px-2 space-y-6 pb-20">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-10">Tidak ada tugas {activeTab === "berjalan" ? "berjalan" : "selesai"}.</p>
        ) : (
          filteredTasks.map((tugas, index) => (
            <div key={`${tugas.judul}-${index}`} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <h3 className="text-[14px] text-gray-800 border-b border-gray-200 px-3 py-2 bg-gray-50">
                <span className="bg-amber-400 px-2 py-1">{tugas.kategori}</span>
              </h3>

              <div className="p-3 border-b border-gray-200">
                {/* Gambar hanya muncul jika ada */}
                {tugas.gambar && (
                  <div className="flex justify-center rounded p-3 mb-3">
                    <Image src={tugas.gambar} alt={tugas.judul} width={400} height={400} unoptimized className="rounded-md" />
                  </div>
                )}

                <h4 className="text-[14px] font-bold text-gray-800 mb-1">{tugas.judul}</h4>
                <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{tugas.deskripsi}</p>
              </div>

              <div className="flex justify-around text-gray-600 text-[13px] py-2">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {tugas.stats.lihat}
                </div>
                <div className="flex items-center gap-1">
                  <Pin className="w-4 h-4" /> {tugas.stats.pin}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> {tugas.stats.komentar}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
