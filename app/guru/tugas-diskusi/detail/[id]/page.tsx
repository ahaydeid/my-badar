"use client";

import Image from "next/image";
import { Eye, Pin, MessageSquare, PlusCircle } from "lucide-react";
import CommentInput from "../../comps/CommentInput";
import CommentList from "../../comps/CommentList";

export default function DetailTugasKelas() {
  const tugas = {
    kelas: "12 MPLB 2",
    kategori: "Tugas Kelompok",
    gambar: "/img/albadar.png",
    judul: "Tugas 4",
    deskripsi: "Ketentuan: 1. Tugas dikerjakan",
    stats: { lihat: 48, pin: 28, komentar: 47 },
  };

  return (
    <section className="w-full pb-10 bg-gray-50 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3 border-b border-gray-200">
        <h2 className="text-[16px] font-bold text-gray-800">{tugas.kelas}</h2>
        <button className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-md px-3 py-1.5 transition-all duration-200">
          <PlusCircle className="w-4 h-4" />
          Tambah tugas
        </button>
      </div>

      {/* Konten */}
      <div className="p-4">
        {/* Kategori */}
        <span className="inline-block text-[12px] font-semibold text-gray-800 bg-amber-400 rounded px-2 py-0.5">
          {tugas.kategori}
        </span>

        {/* Gambar */}
        {tugas.gambar && (
          <div className="flex justify-center bg-gray-100 rounded-lg p-3 my-3">
            <Image
              src={tugas.gambar}
              alt={tugas.judul}
              width={400}
              height={400}
              unoptimized
              className="rounded-md"
            />
          </div>
        )}

        {/* Deskripsi */}
        <h3 className="text-[15px] font-bold text-gray-800 mt-2 mb-1">
          {tugas.judul}
        </h3>
        <p className="text-sm text-gray-700 mb-3">{tugas.deskripsi}</p>

        {/* Tombol Note + Statistik */}
        <div className="flex flex-wrap items-center gap-3 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
          <button className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg px-3 py-1 hover:shadow-sm transition-all">
            <Pin className="w-4 h-4" />
            Note
          </button>

          <div className="flex items-center gap-4 ml-3">
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

        {/* Input Komentar */}
        <CommentInput />

        {/* Daftar Komentar */}
        <CommentList />
      </div>
    </section>
  );
}
