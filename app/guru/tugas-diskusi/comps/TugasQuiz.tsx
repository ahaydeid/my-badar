"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TugasQuizProps = {
  judul: string;
  deskripsi: string;
  durasi: number; // menit
  showFullDesc?: boolean;
  onOpenDetail?: () => void;
  statusDikerjakan?: "sudah" | "belum";
  skor?: number; // skor jika sudah dikerjakan
};

export default function TugasQuiz({ judul, deskripsi, durasi, showFullDesc = false, onOpenDetail, statusDikerjakan = "belum", skor }: TugasQuizProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleMulaiQuiz = () => {
    setShowModal(false);
    router.push(`/guru/tugas-diskusi/quiz/mulai/quiz-1`);
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      {/* Label Quiz + Status (hanya tampil jika belum dikerjakan) */}
      <div className="flex justify-between items-center">
        <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1">Quiz</span>

        {statusDikerjakan === "belum" && <span className="text-xs font-semibold px-2 py-1 bg-gray-200 text-gray-700">Belum dikerjakan</span>}
      </div>

      <h3 className="text-base font-bold text-gray-800 mt-3 mb-1">{judul}</h3>
      <p className={`text-sm text-gray-700 ${showFullDesc ? "" : "line-clamp-2"}`}>{deskripsi}</p>

      {/* Tombol toggle deskripsi */}
      <button onClick={onOpenDetail} className="mt-3 w-full bg-gray-100 text-gray-800 py-1 text-sm font-medium hover:bg-gray-50 transition-colors rounded">
        {showFullDesc ? "Tutup deskripsi" : "Baca Deskripsi"}
      </button>

      {/* Tombol Mulai atau Label Sudah Dikerjakan */}
      {statusDikerjakan === "belum" ? (
        <button onClick={() => setShowModal(true)} className="mt-4 w-full bg-sky-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors">
          Mulai
        </button>
      ) : (
        <div className="mt-4 w-full flex flex-col items-center">
          <div className="bg-green-100 text-green-700 font-semibold py-2 rounded-md text-center text-sm w-full">Sudah dikerjakan</div>
          {skor !== undefined && <div className="text-lg font-bold text-white px-3 bg-sky-600 mt-2">Skor: {skor}</div>}
        </div>
      )}

      {/* Modal Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Mulai Quiz?</h2>
            <p className="text-gray-600 text-sm mb-4">
              Kamu punya <b>kesempatan 1 kali</b> untuk mengerjakan.
              <br />
              Waktu mengerjakan: <b>{durasi} menit</b>.
            </p>

            <div className="flex justify-center gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Batal
              </button>
              <button onClick={handleMulaiQuiz} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Oke, mulai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
