"use client";

import { useState } from "react";
import { Download, X } from "lucide-react";

type MateriPdfProps = {
  judul: string;
  deskripsi: string;
  fileUrl: string;
  onOpenDetail?: () => void;
  showFullDesc?: boolean;
};

export default function MateriPdf({ judul, deskripsi, fileUrl, onOpenDetail, showFullDesc = false }: MateriPdfProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop() || "materi.pdf";
    link.click();
  };

  return (
    <>
      <div onClick={() => setOpenModal(true)} className="relative w-full bg-gray-100 flex flex-col items-center cursor-pointer hover:bg-gray-200 transition rounded-none">
        {/* Tombol download */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="absolute top-3 right-3 z-5 bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-md transition-colors"
          title="Download PDF"
        >
          <Download size={20} />
        </button>

        {/* Tampilan konten PDF */}
        <div className="w-full flex flex-col justify-center items-center pt-10 px-4 pb-2 bg-white border-y border-gray-200">
          <div className="w-16 h-16 bg-red-100 flex items-center justify-center rounded-lg mb-3">
            <span className="text-red-500 font-bold text-xl">PDF</span>
          </div>
          <h3 className="font-semibold text-gray-800">{judul}</h3>
          <p className={`text-sm text-gray-700 transition-all duration-300 ${showFullDesc ? "line-clamp-none" : "line-clamp-2"}`}>{deskripsi}</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail?.();
            }}
            className="mt-5 w-full mb-3 bg-gray-100 text-gray-800 py-1 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            {showFullDesc ? "Tutup deskripsi" : "Baca Deskripsi"}
          </button>
        </div>
      </div>

      {/* Modal Viewer */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/70 flex flex-col">
          <div className="flex justify-between items-center bg-gray-800 text-white p-3">
            <h2 className="font-semibold text-sm">{judul}</h2>
            <button onClick={() => setOpenModal(false)} className="hover:text-red-400 transition" aria-label="Tutup">
              <X size={22} />
            </button>
          </div>
          <div className="flex-1 bg-black">
            <iframe src={fileUrl} title={judul} className="w-full h-full" style={{ border: "none" }} />
          </div>
        </div>
      )}
    </>
  );
}
