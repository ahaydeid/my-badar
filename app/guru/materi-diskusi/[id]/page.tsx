"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Pin, MessageSquare, PlusCircle, FileText, PlayCircle } from "lucide-react";
import { useState } from "react";

export default function ListMateriKelas() {
  const [activeTab, setActiveTab] = useState<"aktif" | "selesai">("aktif");

  // Semua materi, sesuai struktur di DetailMateriKelas
  const materiList = [
    {
      id: "materi-6",
      jenis: "video",
      kelas: "12 MPLB 2",
      kategori: "Video",
      judul: "Materi 6: Pengantar Next.js",
      deskripsi: "Video pembelajaran ini akan membantu kamu memahami konsep dasar Next.js, framework modern untuk React. Bahasannya meliputi routing, data fetching, hingga optimasi performa dengan cara yang mudah dipahami.",
      status: "aktif",
      stats: { lihat: 200, pin: 52, komentar: 28 },
      videoList: ["https://www.youtube.com/embed/0-qel-dM0tQ", "https://www.youtube.com/embed/TBzQjduO8jo"],
    },
    {
      id: "materi-5",
      jenis: "pdf",
      kelas: "12 MPLB 2",
      kategori: "Modul",
      judul: "Materi 5: Panduan CSS Lengkap",
      deskripsi: "Pelajari seluruh konsep penting CSS dari dasar hingga lanjutan. Bahasannya mencakup selektor, layout fleksibel, animasi, transisi, dan responsive design untuk membangun antarmuka web yang menarik.",
      status: "aktif",
      stats: { lihat: 124, pin: 45, komentar: 17 },
      fileUrl: "/file/CSS-Full.pdf",
    },
    {
      id: "materi-4",
      jenis: "gambar",
      kelas: "12 MPLB 2",
      kategori: "Gambar",
      judul: "Materi 4: Komunikasi Bisnis",
      deskripsi: "Pelajari dasar-dasar komunikasi bisnis yang efektif dan profesional di lingkungan kerja. Dapatkan pemahaman tentang etika komunikasi, hubungan kerja, dan strategi interaksi produktif.",
      status: "selesai",
      stats: { lihat: 83, pin: 21, komentar: 36 },
      gambarList: ["/img/albadar.png", "/img/albadar-2.png"],
    },
  ];

  // Filter berdasarkan tab aktif
  const filteredMateri = materiList.filter((m) => m.status === activeTab);

  // Warna label kategori berdasarkan jenis
  const kategoriColor = (jenis: string) => {
    switch (jenis) {
      case "pdf":
        return "bg-red-500";
      case "video":
        return "bg-blue-500";
      case "gambar":
        return "bg-violet-500";
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
            <button className="flex items-center gap-1 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-md px-3 py-1.5 transition-all duration-200">
              <PlusCircle className="w-4 h-4" />
              Tambah materi
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 text-sm bg-white">
          <button onClick={() => setActiveTab("aktif")} className={`flex-1 py-2 text-center transition-all duration-200 ${activeTab === "aktif" ? "text-gray-800 border-b-2 border-gray-800 bg-white" : "text-gray-400 hover:text-gray-600"}`}>
            Sedang berjalan
          </button>
          <button
            onClick={() => setActiveTab("selesai")}
            className={`flex-1 py-2 text-center transition-all duration-200 ${activeTab === "selesai" ? "text-gray-800 border-b-2 border-gray-800 bg-white" : "text-gray-400 hover:text-gray-600"}`}
          >
            Selesai
          </button>
        </div>
      </div>

      {/* Konten */}
      <div className="py-3 px-3 space-y-3 pb-20">
        {filteredMateri.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-10">Tidak ada materi {activeTab === "aktif" ? "aktif" : "selesai"}.</p>
        ) : (
          filteredMateri.map((materi, index) => (
            <Link key={`${materi.judul}-${index}`} href={`/guru/materi-diskusi/detail/${materi.id}`} className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Kategori */}
              <h3 className="text-[14px] text-gray-800 px-3 py-2 bg-gray-50">
                <span className={`${kategoriColor(materi.jenis)} text-white px-2 py-1`}>{materi.kategori}</span>
              </h3>

              {/* Konten utama */}
              <div className="">
                {/* Media preview */}
                {materi.jenis === "gambar" && materi.gambarList && (
                  <div className="relative w-full aspect-video mb-3 overflow-hidden rounded bg-gray-100">
                    <Image src={materi.gambarList[0]} alt={materi.judul} fill unoptimized className="object-cover" sizes="100vw" />
                  </div>
                )}

                {materi.jenis === "pdf" && (
                  <div className="flex justify-center items-center bg-red-50 rounded px-6 py-10 mb-3">
                    <FileText className="w-10 h-10 text-red-500" />
                  </div>
                )}

                {materi.jenis === "video" && (
                  <div className="flex justify-center items-center bg-blue-50 rounded px-6 py-10 mb-3">
                    <PlayCircle className="w-10 h-10 text-blue-500" />
                  </div>
                )}

                {/* Info teks */}
                <h4 className="text-[14px] font-bold text-gray-800 mb-1 px-3">{materi.judul}</h4>
                <p className="text-[13px] text-gray-600 leading-snug line-clamp-2 px-3 mb-2">{materi.deskripsi}</p>
              </div>

              {/* Statistik */}
              <div className="flex justify-around text-gray-600 text-[13px] py-2 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {materi.stats.lihat}
                </div>
                <div className="flex items-center gap-1">
                  <Pin className="w-4 h-4" /> {materi.stats.pin}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> {materi.stats.komentar}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
