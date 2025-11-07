"use client";

import Image from "next/image";
import { Eye, Pin, MessageSquare, ArrowLeft } from "lucide-react";
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
    <section className="w-full pb-10 bg-gray-50 shadow-sm border border-gray-200 overflow-clip">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        {/* Tombol Back (rata kiri) */}
        <button onClick={() => window.history.back()} className="text-gray-700 hover:text-sky-600 transition-colors" aria-label="Kembali">
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Judul (rata tengah) */}
        <h2 className="text-[16px] font-bold text-gray-800 text-center flex-1">{tugas.judul}</h2>

        {/* Spacer agar tombol kanan seimbang */}
        <div className="w-5" />
      </div>

      {/* Konten */}
      <div className="p-4">
        {/* Kategori */}
        <span className="inline-block text-[12px] text-gray-800 bg-amber-400 px-2 py-0.5">{tugas.kategori}</span>

        {/* Gambar */}
        {tugas.gambar && (
          <div className="flex justify-center p-3 my-3">
            <Image src={tugas.gambar} alt={tugas.judul} width={400} height={400} unoptimized className="rounded-md" />
          </div>
        )}

        {/* Deskripsi */}
        <h3 className="text-[15px] font-bold text-gray-800 mt-2 mb-1">{tugas.judul}</h3>
        <p className="text-sm text-gray-700 mb-3">{tugas.deskripsi}</p>

        {/* Tombol Note + Statistik */}
        <div className="flex flex-wrap items-center gap-3 bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700">
          <button className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg px-4 py-1 hover:shadow-sm transition-all">
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
