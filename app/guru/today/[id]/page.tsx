"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TodayPage() {
  const [showConfirm, setShowConfirm] = useState(false);

  // Dummy data statis
  const card = {
    code: "Jam ke-2",
    title: "MPLB 1",
    subject: "Algoritma Pemrograman",
    range: "08:15 - 09:00",
    jp: "1 JP",
    prevNote: "Kemarin siswa kurang fokus di bagian looping.",
  };

  const isOverdue = false;
  const isChecked = false;
  const absenExists = true;
  const keterangan = "Siswa aktif berdiskusi hari ini.";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pb-20">
      <div className="w-full max-w-md mt-3">
        <p className="text-sm md:text-lg font-bold text-gray-800 mb-2 text-center">Jumat, 7 November 2025</p>

        {/* Card utama */}
        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-3 mb-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">{isOverdue ? <span className="bg-red-600 text-white rounded px-2 p-1">Kelas terlewat</span> : <span className="bg-sky-500 text-white rounded p-1 px-2">{card.code}</span>}</h2>

            <h3 className="text-3xl font-extrabold text-gray-900">{card.title}</h3>

            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-black px-3 py-1.5 rounded-full text-lg">{card.range}</span>
              <span className="bg-gray-700 text-white font-semibold px-3 py-1.5 rounded-full text-lg">{card.jp}</span>
            </div>

            <div className="font-bold text-lg text-black">{card.subject}</div>

            <div className="border border-gray-200 rounded-lg p-3 bg-white">
              <div className="mb-1 text-gray-700 font-bold underline">Catatan sebelumnya:</div>
              <div className="text-gray-900 whitespace-pre-wrap leading-tight text-justify">{card.prevNote}</div>
            </div>
          </div>

          {/* Tombol Absen dan Nilai */}
          <div className="mt-5 space-y-3">
            {absenExists ? (
              <div className="flex items-center p-2 gap-3">
                <div className="w-[70%]">
                  <div className="text-gray-800 font-extrabold italic text-lg py-3 text-center">Sudah diabsen</div>
                </div>
                <div className="w-[30%]">
                  <Link href="#" className="block">
                    <span className="block bg-yellow-500 text-white font-extrabold text-lg rounded-sm py-3 shadow text-center">Ulangi</span>
                  </Link>
                </div>
              </div>
            ) : (
              <Link href="#" className="block">
                <span className="block bg-sky-500 text-white font-extrabold text-lg rounded-xl py-3 text-center">Buka Absen</span>
              </Link>
            )}

            <Link href="#" className="block">
              <span className="block bg-yellow-500 hover:bg-yellow-400 text-white font-extrabold text-lg rounded-xl py-3 text-center shadow">Tambah Nilai Harian</span>
            </Link>
          </div>

          {/* Catatan input */}
          <div className="mt-3">
            <label className="block text-gray-700 font-semibold mb-1">Catatan:</label>
            <div className="bg-white p-1 border rounded">
              <textarea className="w-full focus:outline-none focus:ring-1 focus:ring-sky-400" rows={3} placeholder="Tambahkan catatan kelas hari ini..." defaultValue={keterangan} />
              <div className="text-right text-xs text-gray-500 mt-[-8]">{keterangan.length}/150</div>
            </div>
          </div>
        </div>

        {/* Tombol bawah */}
        <div className="mt-5">
          {isChecked ? (
            <div className="w-full bg-gray-100 text-center font-bold text-lg rounded-xl py-3 text-gray-800">Kelas sudah selesai</div>
          ) : (
            <>
              <button onClick={() => setShowConfirm(true)} className="w-full font-bold text-lg rounded-xl py-3 flex items-center justify-center gap-2 shadow bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle2 className="w-6 h-6" />
                Selesaikan Kelas
              </button>

              {!absenExists && <p className="mt-2 text-sm text-gray-400 italic text-center">Isi absen sebelum menyelesaikan kelas</p>}
            </>
          )}
        </div>
      </div>

      {/* Popup konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowConfirm(false)} />
          {/* Modal Box */}
          <div className="relative z-10 w-[90%] max-w-md bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg text-center font-bold mb-4">Selesaikan kelas?</h3>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded-md border border-red-600 bg-red-500 text-white hover:bg-gray-50 text-sm">
                Batal
              </button>
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-semibold">
                Selesaikan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
