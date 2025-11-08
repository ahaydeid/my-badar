"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Pin, MessageSquare, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function ListMateriKelas() {
  const [activeTab, setActiveTab] = useState("aktif");

  // Semua materi
  const materiList = [
    {
      id: "materi-4",
      kategori: "Video Pembelajaran",
      gambar: "/img/albadar.png",
      judul: "Materi 4: Etika Komunikasi Bisnis",
      deskripsi: "Pelajari prinsip komunikasi bisnis yang profesional dan efektif.",
      status: "aktif",
      stats: { lihat: 83, pin: 21, komentar: 36 },
    },
    {
      id: "materi-3",
      kategori: "Modul Pembelajaran",
      gambar: "/img/albadar.png",
      judul: "Materi 3: Dasar Administrasi Perkantoran",
      deskripsi: "Mengenal ruang lingkup dan fungsi administrasi perkantoran.",
      status: "selesai",
      stats: { lihat: 52, pin: 17, komentar: 24 },
    },
    {
      id: "materi-2",
      kategori: "Dokumen Pendukung",
      gambar: "",
      judul: "Materi 2: Surat Dinas & Arsip",
      deskripsi: "Panduan membuat surat dinas dan tata cara pengarsipan dokumen.",
      status: "selesai",
      stats: { lihat: 74, pin: 28, komentar: 41 },
    },
  ];

  // Filter berdasarkan tab aktif
  const filteredMateri = materiList.filter((m) => m.status === activeTab);

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
          <button
            onClick={() => setActiveTab("aktif")}
            className={`flex-1 py-2 text-center transition-all duration-200 ${activeTab === "aktif" ? "text-gray-800 border-b-2 border-gray-800 bg-white" : "text-gray-400 hover:text-gray-600"}`}
          >
            Sedang aktif
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
      <div className="py-4 px-2 space-y-6 pb-20">
        {filteredMateri.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-10">Tidak ada materi {activeTab === "aktif" ? "aktif" : "selesai"}.</p>
        ) : (
          filteredMateri.map((materi, index) => (
            <Link key={`${materi.judul}-${index}`} href={`/guru/materi-diskusi/detail/${materi.id}`} className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <h3 className="text-[14px] text-gray-800 px-3 py-2 bg-gray-50">
                <span className="bg-violet-500 text-white px-2 py-1">{materi.kategori}</span>
              </h3>

              <div className="p-3">
                {/* Gambar hanya muncul jika ada */}
                {materi.gambar && (
                  <div className="flex justify-center rounded p-3 mb-3">
                    <Image src={materi.gambar} alt={materi.judul} width={400} height={400} unoptimized className="rounded-md" />
                  </div>
                )}

                <h4 className="text-[14px] font-bold text-gray-800 mb-1">{materi.judul}</h4>
                <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{materi.deskripsi}</p>
              </div>

              <div className="flex justify-around text-gray-600 text-[13px] py-2">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-violet-500" /> {materi.stats.lihat}
                </div>
                <div className="flex items-center gap-1">
                  <Pin className="w-4 h-4 text-violet-500" /> {materi.stats.pin}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4 text-violet-500" /> {materi.stats.komentar}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
