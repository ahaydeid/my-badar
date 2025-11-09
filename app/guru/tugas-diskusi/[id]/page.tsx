"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Pin, Users, MessageSquare, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ListTugasKelas() {
  const [activeTab, setActiveTab] = useState<"berjalan" | "selesai">("berjalan");
  const router = useRouter();

  // Semua tugas berdiri sendiri
  const tugasList = [
    {
      id: "tugas-1",
      kategori: "Quiz",
      jenis: "quiz",
      gambar: "",
      judul: "Quiz 1: Pengantar Bisnis",
      deskripsi: "Jawab 10 soal pilihan ganda tentang dasar-dasar komunikasi bisnis dan etika profesional.",
      status: "berjalan",
      dikerjakan: true,
      stats: { lihat: 42, pin: 15, komentar: 12 },
    },
    {
      id: "tugas-2",
      kategori: "Tugas Individu",
      jenis: "individu",
      gambar: "/img/albadar.png",
      judul: "Tugas 2: Laporan Aktivitas Harian",
      deskripsi: "Tuliskan laporan aktivitas kerja harian dengan format yang telah ditentukan.",
      status: "berjalan",
      dikerjakan: true,
      stats: { lihat: 60, pin: 21, komentar: 35 },
    },
    {
      id: "tugas-3",
      kategori: "Tugas Kelompok",
      jenis: "kelompok",
      gambar: "/img/albadar.png",
      judul: "Tugas 3: Studi Kasus Komunikasi Tim",
      deskripsi: "Diskusikan peran komunikasi dalam menyelesaikan konflik di lingkungan kerja kelompok.",
      status: "berjalan",
      dikerjakan: true,
      stats: { lihat: 35, pin: 12, komentar: 18 },
    },
    {
      id: "tugas-4",
      kategori: "Tugas Remedial",
      jenis: "remedial",
      gambar: "/img/albadar.png",
      judul: "Tugas Remedial: Penulisan Surat Dinas",
      deskripsi: "Perbaiki hasil tugas surat dinas sesuai catatan dari guru pembimbing.",
      status: "selesai",
      dikerjakan: true,
      stats: { lihat: 48, pin: 28, komentar: 47 },
    },
  ];

  // Filter berdasarkan tab aktif
  const filteredTasks = tugasList.filter((t) => t.status === activeTab);

  // Warna label kategori
  const kategoriColor = (jenis: string) => {
    switch (jenis) {
      case "quiz":
        return "bg-blue-500";
      case "individu":
        return "bg-violet-500";
      case "kelompok":
        return "bg-emerald-500";
      case "remedial":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <section className="w-full relative">
      {/* Header & Tabs Sticky */}
      <div className="sticky top-0 z-20">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-100">
          <h2 className="text-[16px] font-bold text-gray-800">12 MPLB 2</h2>

          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/guru/tugas-diskusi/buat-kelompok")} className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-md px-3 py-1.5 transition-all duration-200">
              <Users className="w-4 h-4" />
              Kelompok
            </button>

            <button className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-md px-3 py-1.5 transition-all duration-200">
              <PlusCircle className="w-4 h-4" />
              Tambah tugas
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 text-sm bg-white">
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
      <div className="py-2 px-2 space-y-2 pb-17">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-10">Tidak ada tugas {activeTab === "berjalan" ? "berjalan" : "selesai"}.</p>
        ) : (
          filteredTasks.map((tugas, index) => (
            <Link key={`${tugas.judul}-${index}`} href={`/guru/tugas-diskusi/detail/${tugas.id}`} className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Kategori dan Status */}
              <div className="flex justify-between items-center px-3 py-2 bg-gray-50 border-b border-gray-100">
                <span className={`${kategoriColor(tugas.jenis)} text-white text-[13px] px-2 py-1`}>{tugas.kategori}</span>

                {tugas.jenis === "quiz" && (
                  <span className={`text-xs font-semibold px-2 py-1 ${tugas.dikerjakan ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>{tugas.dikerjakan ? "Sudah dikerjakan" : "Belum dikerjakan"}</span>
                )}
              </div>

              {/* Konten utama */}
              <div className="p-3">
                {tugas.gambar && tugas.jenis !== "quiz" && (
                  <div className="relative w-full aspect-video mb-3 overflow-hidden rounded-md bg-gray-100">
                    <Image src={tugas.gambar} alt={tugas.judul} fill unoptimized className="object-cover" sizes="100vw" />
                  </div>
                )}

                <h4 className="text-[14px] font-bold text-gray-800 mb-1">{tugas.judul}</h4>
                <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{tugas.deskripsi}</p>
              </div>

              {/* Statistik */}
              <div className="flex justify-around text-gray-600 text-[13px] py-2 border-t border-gray-100">
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
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
