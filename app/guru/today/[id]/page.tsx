"use client";

import { CheckCircle2, X, Info, RefreshCcw, PlusCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TodayPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // Dummy data statis
  const card = {
    code: "Jam ke-2",
    title: "MPLB 1",
    subject: "Algoritma Pemrograman",
    range: "08:15 - 09:00",
    jp: "1 JP",
    prevNote: "Kemarin siswa kurang fokus di bagian looping.",
    detail: {
      guru: "Ahadi Hadi",
      ruangan: "Lab Komputer 1",
      jumlahSiswa: 28,
      durasi: "45 menit",
      topik: "Algoritma Pemrograman Dasar",
      deskripsi: "Fokus pada pengenalan struktur percabangan dan pengulangan menggunakan contoh kode sederhana di lingkungan pemrograman visual.",
      subtopik: ["Mengenal konsep algoritma dan logika dasar.", "Memahami struktur percabangan (if/else).", "Menerapkan struktur perulangan (for dan while).", "Latihan membuat flowchart sederhana."],
    },
  };

  const isOverdue = false;
  const isChecked = false;
  const absenExists = true;
  const keterangan = "Siswa aktif berdiskusi hari ini.";

  const attendance = {
    hadir: 25,
    sakit: 2,
    izin: 1,
    alfa: 0,
    total: 28,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pb-20">
      <div className="w-full max-w-md mt-3">
        <p className="text-sm md:text-lg font-bold text-gray-800 mb-2 text-center">Jumat, 7 November 2025</p>

        {/* ====== Section: Card utama ====== */}
        <section className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-3 mb-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">{isOverdue ? <span className="bg-red-600 text-white rounded px-2 p-1">Kelas terlewat</span> : <span className="bg-sky-500 text-white rounded p-1 px-2">{card.code}</span>}</h2>

            <h3 className="text-3xl font-extrabold text-gray-900">{card.title}</h3>

            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-black px-3 py-1.5 rounded-full text-lg">{card.range}</span>
              <span className="bg-gray-700 text-white px-3 py-1.5 rounded-full text-lg">{card.jp}</span>
            </div>
          </div>

          {/* ====== Section: Tombol Absen dan Nilai ====== */}
          <section className="mt-5 border-t border-gray-200 pt-4">
            {absenExists ? (
              <div className="p-2">
                <div className="flex items-center gap-3 mb-2">
                  {/* Tombol Absen Ulang */}
                  <Link href="#" className="block w-[50%]">
                    <span className="flex items-center justify-center gap-2 rounded-md py-3 shadow font-extrabold text-lg text-white transition bg-yellow-500 hover:bg-yellow-400">
                      <RefreshCcw className="w-5 h-5 shrink-0" />
                      Absen Ulang
                    </span>
                  </Link>

                  {/* Tombol Tambah Nilai Harian */}
                  <Link href="#" className="block w-[50%]">
                    <span className="flex items-center justify-center gap-2 rounded-md py-3 shadow font-extrabold text-lg text-white transition bg-sky-500 hover:bg-sky-600">
                      <PlusCircle className="w-5 h-5 shrink-0" />
                      Tambah Nilai
                    </span>
                  </Link>
                </div>

                {/* Keterangan kehadiran */}
                <div className="text-left text-gray-700 text-sm font-semibold mt-1 pl-1">
                  <p>Hadir = {attendance.hadir}</p>
                  <p>Sakit = {attendance.sakit}</p>
                  <p>Izin = {attendance.izin}</p>
                  <p>Alfa = {attendance.alfa}</p>
                  <p className="text-gray-500 mt-1 font-normal">Dari total {attendance.total} siswa</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                {/* Tombol Buka Absen */}
                <Link href="#" className="flex-1 block">
                  <span className="block bg-sky-500 text-white font-extrabold text-lg rounded py-3 text-center">Buka Absen</span>
                </Link>

                {/* Tombol Tambah Nilai Harian */}
                <Link href="#" className="flex-1 block">
                  <span className="flex items-center justify-center gap-2 rounded py-3 shadow font-extrabold text-lg text-white transition bg-sky-500 hover:bg-sky-600">
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    Tambah Nilai
                  </span>
                </Link>
              </div>
            )}
          </section>

          {/* ====== Section: Mapel + Detail ====== */}
          <section className="mt-5 border-t border-gray-200 pt-4 flex items-center justify-between">
            <div className="font-bold text-lg text-black">{card.subject}</div>
            <button onClick={() => setShowDetail(true)} className="text-sm bg-sky-500 hover:bg-sky-600 gap-1 flex items-center text-white font-semibold rounded-md px-3 py-1.5 shadow-sm">
              <Info /> Detail
            </button>
          </section>

          {/* ====== Section: Catatan sebelumnya ====== */}
          <section className="border border-gray-200 rounded-lg p-3 bg-white mt-3">
            <div className="mb-1 text-gray-700 font-bold underline">Catatan sebelumnya:</div>
            <div className="text-gray-900 whitespace-pre-wrap leading-tight text-justify">{card.prevNote}</div>
          </section>

          {/* ====== Section: Catatan input ====== */}
          <section className="mt-3 border-t border-gray-200 pt-3">
            <label className="block text-gray-700 font-semibold mb-1">Catatan:</label>
            <div className="bg-white p-1 border rounded">
              <textarea className="w-full focus:outline-none focus:ring-1 focus:ring-sky-400" rows={3} placeholder="Tambahkan catatan kelas hari ini..." defaultValue={keterangan} />
              <div className="text-right text-xs text-gray-500 mt-[-8]">{keterangan.length}/150</div>
            </div>
          </section>
        </section>

        {/* ====== Section: Tombol bawah ====== */}
        <section className="mt-5 border-t border-gray-200 pt-3">
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
        </section>
      </div>

      {/* ====== Modal Konfirmasi ====== */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowConfirm(false)} />
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

      {/* ====== Modal Detail ====== */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-300" onClick={() => setShowDetail(false)} />

          {/* Modal Box */}
          <div className="relative z-10 w-[90%] max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-7 animate-[fadeIn_0.2s_ease-out] overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
              <h3 className="text-xl font-bold text-gray-800">Panduan Ajar Hari Ini</h3>
            </div>

            {/* Body */}
            <div className="space-y-5 text-[15px] text-gray-700">
              {/* Info Kelas */}
              <div className="grid grid-cols-2 gap-y-1 text-sm">
                <p>
                  <span className="font-semibold">Guru:</span> {card.detail.guru}
                </p>
                <p>
                  <span className="font-semibold">Ruangan:</span> {card.detail.ruangan}
                </p>
                <p>
                  <span className="font-semibold">Jumlah Siswa:</span> {card.detail.jumlahSiswa}
                </p>
                <p>
                  <span className="font-semibold">Durasi:</span> {card.detail.durasi}
                </p>
              </div>

              {/* Topik */}
              <div>
                <h4 className="font-bold text-gray-800 text-base mb-1">Topik Pembelajaran:</h4>
                <p className="text-gray-700 leading-relaxed">{card.detail.topik}</p>
              </div>

              {/* Deskripsi */}
              <div>
                <h4 className="font-bold text-gray-800 text-base mb-1">Deskripsi Materi:</h4>
                <p className="leading-relaxed">{card.detail.deskripsi}</p>
              </div>

              {/* Subtopik / Panduan Langkah */}
              <div>
                <h4 className="font-bold text-gray-800 text-base mb-2">Langkah Pembelajaran:</h4>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  {card.detail.subtopik.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6 pt-3 border-t border-gray-200">
              <button onClick={() => setShowDetail(false)} className="px-5 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm flex items-center font-semibold shadow-sm transition-all active:scale-[0.98]">
                <X />
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
