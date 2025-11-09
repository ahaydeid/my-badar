"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

type MateriGambarProps = {
  judul: string;
  deskripsi: string;
  gambarList: string[];
  onOpenDetail?: () => void;
  showFullDesc?: boolean;
};

export default function MateriGambar({ judul, deskripsi, gambarList, onOpenDetail, showFullDesc = false }: MateriGambarProps) {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const total = gambarList.length;

  const nextImage = () => setIndex((prev) => (prev + 1) % total);
  const prevImage = () => setIndex((prev) => (prev - 1 + total) % total);

  const handleDownload = () => {
    const url = gambarList[index];
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || `gambar-${index + 1}.jpg`;
    link.click();
  };

  return (
    <div className="relative w-full bg-gray-100 flex flex-col items-center rounded-none">
      {/* Tombol Download */}
      <button onClick={handleDownload} className="absolute top-3 right-3 z-20 bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-md transition-colors" title="Download gambar">
        <Download size={20} />
      </button>

      {/* Gambar + Navigasi */}
      <div className="relative w-full bg-gray-200 h-[40vh] overflow-hidden">
        {/* Gambar */}
        <Image src={gambarList[index]} alt={`Gambar ${index + 1}`} width={1920} height={1080} className="w-full h-full object-cover cursor-pointer" priority sizes="100vw" onClick={() => setShowModal(true)} />

        {/* Navigasi Gambar */}
        {total > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/40 text-white p-2 rounded-full z-20">
              <ChevronLeft size={22} />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/40 text-white p-2 rounded-full z-20">
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Info */}
      <div className="w-full text-left bg-white px-4 pt-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800">{judul}</h3>
        <p className={`text-sm text-gray-700 transition-all duration-300 ${showFullDesc ? "line-clamp-none" : "line-clamp-2"}`}>{deskripsi}</p>

        <button onClick={onOpenDetail} className="mt-3 w-full bg-gray-100 text-gray-800 py-1 text-sm font-medium hover:bg-gray-50 transition-colors">
          {showFullDesc ? "Tutup deskripsi" : "Baca Deskripsi"}
        </button>
      </div>

      {/* Modal gambar penuh */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex justify-center items-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image src={gambarList[index]} alt={`Preview ${index + 1}`} fill className="object-contain" />
            <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition">
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
