"use client";

import Image from "next/image";
import { Eye, Pin, MessageSquare, ArrowLeft, X, User } from "lucide-react";
import { useState } from "react";
import CommentInput from "../../comps/CommentInput";
import CommentList from "../../comps/CommentList";

export default function DetailMateriKelas() {
  const materi = {
    kelas: "12 MPLB 2",
    kategori: "Modul Pembelajaran",
    gambar: "/img/albadar.png",
    judul: "Materi 4: Komunikasi Bisnis",
    deskripsi: "Pelajari dasar-dasar komunikasi bisnis yang efektif dan profesional di lingkungan kerja.",
    stats: { lihat: 83, pin: 21, komentar: 36 },
  };

  const [showModal, setShowModal] = useState(false);

  const siswaNotes = [
    "Putri Salju",
    "Rian Saputra",
    "Budi Santoso",
    "Siti Rahma",
    "Andi Pratama",
    "Laila Nurul",
    "Ahmad Firdaus",
    "Nabila Zahra",
    "Fajar Nugraha",
    "Dewi Anggraini",
    "Reza Pahlevi",
    "Intan Maharani",
    "Doni Saputra",
    "Rizky Maulana",
    "Tania Oktaviani",
    "Galih Prakoso",
    "Anisa Rahmadani",
    "Bagus Kurniawan",
    "Citra Lestari",
    "Yusuf Alamsyah",
    "Lutfi Ramadhan",
  ];

  return (
    <section className="w-full pb-10 bg-gray-50 shadow-sm border border-gray-200 overflow-clip">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        {/* Tombol Back (rata kiri) */}
        <button onClick={() => window.history.back()} className="text-gray-700 hover:text-violet-600 transition-colors" aria-label="Kembali">
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Judul (rata tengah) */}
        <h2 className="text-[16px] font-bold text-gray-800 text-center flex-1">{materi.judul}</h2>

        {/* Spacer agar tombol kanan seimbang */}
        <div className="w-5" />
      </div>

      {/* Konten */}
      <div className="p-4">
        {/* Kategori */}
        <span className="inline-block text-sm bg-violet-500 text-white px-2 py-0.5">{materi.kategori}</span>

        {/* Gambar */}
        {materi.gambar && (
          <div className="flex justify-center p-3 my-3">
            <Image src={materi.gambar} alt={materi.judul} width={400} height={400} unoptimized className="rounded-md" />
          </div>
        )}

        {/* Deskripsi */}
        <h3 className="text-[15px] font-bold text-gray-800 mt-2 mb-1">{materi.judul}</h3>
        <p className="text-sm text-gray-700 mb-3">{materi.deskripsi}</p>

        {/* Tombol Note + Statistik */}
        <div className="flex flex-wrap items-center gap-3 bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700">
          <button className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg px-4 py-1 hover:shadow-sm transition-all">
            <Pin className="w-4 h-4" />
            Note
          </button>

          <div className="flex items-center gap-4 ml-3">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {materi.stats.lihat}
            </div>

            {/* Bagian klik modal */}
            <div className="flex items-center gap-1 cursor-pointer hover:text-violet-600 transition-colors" onClick={() => setShowModal(true)}>
              <Pin className="w-4 h-4" /> {materi.stats.pin}
            </div>

            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" /> {materi.stats.komentar}
            </div>
          </div>
        </div>

        {/* Input Komentar */}
        <CommentInput />

        {/* Daftar Komentar */}
        <CommentList />
      </div>

      {/* Modal daftar siswa Note */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center z-50 px-3">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 relative">
            {/* Tombol tutup */}
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition" aria-label="Tutup">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-center text-lg font-semibold text-gray-800 mb-3">Siswa yang memberi Note</h2>

            <div className="space-y-2 max-h-100 overflow-y-auto">
              {siswaNotes.map((nama, i) => (
                <div key={i} className="flex items-center gap-3 px-1 py-2 hover:bg-violet-50 transition">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <User className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-800 font-medium">{nama}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
