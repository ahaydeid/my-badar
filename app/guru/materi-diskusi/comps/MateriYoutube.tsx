"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MateriYoutubeProps = {
  judul: string;
  deskripsi: string;
  videoList: string[]; // daftar link YouTube (bisa link normal atau embed)
  onOpenDetail?: () => void;
  showFullDesc?: boolean;
};

export default function MateriYoutube({ judul, deskripsi, videoList, onOpenDetail, showFullDesc = false }: MateriYoutubeProps) {
  const [index, setIndex] = useState(0);
  const total = videoList.length;

  const nextVideo = () => setIndex((prev) => (prev + 1) % total);
  const prevVideo = () => setIndex((prev) => (prev - 1 + total) % total);

  // Ubah link normal ke embed agar iframe bisa memutar
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(/[?&]v=([^&]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="relative w-full bg-white flex flex-col items-center rounded-none">
      {/* Video */}
      <div className="relative w-full bg-black aspect-video overflow-hidden">
        <iframe src={getEmbedUrl(videoList[index])} title={`Video ${index + 1}`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>

      {/* Navigasi di bawah video */}
      {total > 1 && (
        <div className="flex justify-center items-center gap-4 my-1">
          <button onClick={prevVideo} className="bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition">
            <ChevronLeft size={22} />
          </button>
          <span className="text-gray-700 text-sm">
            {index + 1} / {total}
          </span>
          <button onClick={nextVideo} className="bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition">
            <ChevronRight size={22} />
          </button>
        </div>
      )}

      {/* Info */}
      <div className="w-full text-left bg-white px-4 pt-4 border-t border-gray-100">
        <h3 className="font-semibold text-gray-800">{judul}</h3>
        <p className={`text-sm text-gray-700 transition-all duration-300 ${showFullDesc ? "line-clamp-none" : "line-clamp-2"}`}>{deskripsi}</p>

        <button onClick={onOpenDetail} className="mt-3 w-full bg-gray-100 text-gray-800 py-1 text-sm font-medium hover:bg-gray-50 transition-colors">
          {showFullDesc ? "Tutup deskripsi" : "Baca Deskripsi"}
        </button>
      </div>
    </div>
  );
}
