"use client";

import { Eye, Pin, MessageSquare, ArrowLeft, X, User } from "lucide-react";
import { useState } from "react";
import CommentInput from "../../comps/CommentInput";
import CommentList from "../../comps/CommentList";
import TugasQuiz from "../../comps/TugasQuiz";

type BaseTugas = {
  kelas: string;
  kategori: "Quiz" | "Tugas Individu" | "Tugas Kelompok" | "Tugas Remedial";
  judul: string;
  deskripsi: string;
  stats: { lihat: number; pin: number; komentar: number };
  statusDikerjakan?: "sudah" | "belum";
  skor?: number;
  durasi: number;
};

export default function DetailTugasKelas() {
  const tipe = "Quiz" as BaseTugas["kategori"];

  const tugas: BaseTugas = {
    kelas: "12 MPLB 2",
    kategori: tipe,
    judul: "Quiz 1: Etika Komunikasi Bisnis",
    deskripsi: "Kerjakan quiz ini untuk menguji pemahamanmu tentang prinsip komunikasi bisnis yang efektif dan profesional di lingkungan kerja. Pastikan menjawab semua soal dengan cermat sebelum waktu berakhir.",
    stats: { lihat: 83, pin: 21, komentar: 36 },
    statusDikerjakan: "sudah",
    skor: 85,
    durasi: 3,
  };

  const [showModal, setShowModal] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

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

  const renderTugas = (t: BaseTugas) => {
    switch (t.kategori) {
      case "Quiz":
        return (
          <TugasQuiz
            judul={t.judul}
            deskripsi={t.deskripsi}
            durasi={t.durasi}
            showFullDesc={showFullDesc}
            onOpenDetail={() => setShowFullDesc(!showFullDesc)}
            statusDikerjakan={t.statusDikerjakan}
            skor={t.skor}
          />
        );
      default:
        return <div className="p-6 text-center text-gray-500">Jenis tugas belum didukung.</div>;
    }
  };

  return (
    <section className="w-full pb-10 bg-gray-50 shadow-sm border border-gray-200 overflow-clip">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={() => window.history.back()} className="text-gray-700 hover:text-sky-600 transition-colors" aria-label="Kembali">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-[16px] font-bold text-gray-800 text-center flex-1">{tugas.judul}</h2>
        <div className="w-5" />
      </div>

      {/* Konten */}
      <div className="px-4 pb-4">
        <div className="-mx-4">{renderTugas(tugas)}</div>

        {/* Statistik */}
        <div className="flex flex-wrap items-center gap-3 bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 mt-4">
          <button className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg px-4 py-1 hover:shadow-sm transition-all">
            <Pin className="w-4 h-4" />
            Note
          </button>

          <div className="flex items-center gap-4 ml-3">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {tugas.stats.lihat}
            </div>

            <div className="flex items-center gap-1 cursor-pointer hover:text-sky-600 transition-colors" onClick={() => setShowModal(true)}>
              <Pin className="w-4 h-4" /> {tugas.stats.pin}
            </div>

            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" /> {tugas.stats.komentar}
            </div>
          </div>
        </div>

        {/* Komentar */}
        <CommentInput />
        <CommentList />
      </div>

      {/* Modal daftar siswa Note */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center z-50 px-3">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition" aria-label="Tutup">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-center text-lg font-semibold text-gray-800 mb-3">Siswa yang memberi Note</h2>
            <div className="space-y-2 max-h-100 overflow-y-auto">
              {siswaNotes.map((nama, i) => (
                <div key={i} className="flex items-center gap-3 px-1 py-2 hover:bg-sky-50 transition">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-100 text-sky-600">
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
