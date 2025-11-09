"use client";

import { useState } from "react";

type Tugas = {
  id: number;
  judul: string;
  jenis: "Quiz" | "Tugas Individu" | "Tugas Kelompok" | "Tugas Remedial";
  deskripsi: string;
  status: "Berjalan" | "Selesai";
};

// Dummy data tugas (20 items)
const tugasList: Tugas[] = [
  { id: 1, judul: "Quiz 1: Pengantar Bisnis", jenis: "Quiz", deskripsi: "Jawab soal tentang dasar komunikasi bisnis dan etika profesional", status: "Berjalan" },
  { id: 2, judul: "Tugas Individu: Laporan Aktivitas Harian", jenis: "Tugas Individu", deskripsi: "Tuliskan laporan aktivitas kerja harian sesuai format", status: "Berjalan" },
  { id: 3, judul: "Tugas Kelompok: Studi Kasus Komunikasi Tim", jenis: "Tugas Kelompok", deskripsi: "Diskusikan peran komunikasi dalam penyelesaian konflik kerja", status: "Berjalan" },
  { id: 4, judul: "Tugas Remedial: Surat Dinas", jenis: "Tugas Remedial", deskripsi: "Perbaiki hasil tugas surat dinas sesuai catatan guru", status: "Selesai" },
  { id: 5, judul: "Quiz 2: Etika Komunikasi", jenis: "Quiz", deskripsi: "Uji pemahaman tentang prinsip komunikasi efektif", status: "Berjalan" },
  { id: 6, judul: "Tugas Individu: Analisis Bisnis", jenis: "Tugas Individu", deskripsi: "Analisis studi kasus bisnis sesuai instruksi", status: "Selesai" },
  { id: 7, judul: "Tugas Kelompok: Rencana Bisnis", jenis: "Tugas Kelompok", deskripsi: "Susun proposal rencana bisnis sederhana bersama tim", status: "Berjalan" },
  { id: 8, judul: "Quiz 3: Manajemen Waktu", jenis: "Quiz", deskripsi: "Tes pemahaman konsep efisiensi waktu dan produktivitas", status: "Selesai" },
  { id: 9, judul: "Tugas Individu: Resume Diri", jenis: "Tugas Individu", deskripsi: "Buat resume profesional dengan format baku", status: "Berjalan" },
  { id: 10, judul: "Tugas Kelompok: Presentasi Produk", jenis: "Tugas Kelompok", deskripsi: "Presentasikan ide produk baru secara kreatif", status: "Selesai" },
];

export default function BankTugasPage() {
  const [search, setSearch] = useState("");
  const [jenis, setJenis] = useState("Semua");
  const [status, setStatus] = useState("Semua");

  const handleRowClick = (tugas: Tugas) => {
    alert(`Kamu membuka tugas: ${tugas.judul}`);
  };

  // Filter hasil berdasarkan pencarian, jenis, dan status
  const filteredTugas = tugasList.filter((tugas) => {
    const cocokJudul =
      tugas.judul.toLowerCase().includes(search.toLowerCase()) ||
      tugas.deskripsi.toLowerCase().includes(search.toLowerCase());
    const cocokJenis = jenis === "Semua" || tugas.jenis === jenis;
    const cocokStatus = status === "Semua" || tugas.status === status;
    return cocokJudul && cocokJenis && cocokStatus;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-800">
            Bank Tugas{" "}
            <span className="text-sm font-normal text-gray-500">
              (Tambahkan tugas melalui dashboard guru)
            </span>
          </h1>
        </div>

        {/* FILTER STICKY */}
        <div className="w-full px-2 py-2 bg-white border-t border-gray-100 flex flex-row flex-wrap items-center justify-between sticky top-[52px] z-20 gap-2">
          {/* Jenis tugas */}
          <select
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Semua">Semua Jenis</option>
            <option value="Quiz">Quiz</option>
            <option value="Tugas Individu">Tugas Individu</option>
            <option value="Tugas Kelompok">Tugas Kelompok</option>
            <option value="Tugas Remedial">Tugas Remedial</option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Semua">Semua Status</option>
            <option value="Berjalan">Sedang Berjalan</option>
            <option value="Selesai">Selesai</option>
          </select>

          {/* Pencarian */}
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="Cari tugas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-36 sm:w-72 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 transition-colors"
            >
              Cari
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 overflow-x-auto">
        <div className="min-w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-220px)] relative border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 text-sm sticky top-0 z-10">
              <tr>
                <th
                  className="sticky left-0 bg-gray-100 px-2 py-3 w-12 border-r border-gray-200"
                  style={{ zIndex: 10 }}
                >
                  No.
                </th>
                <th className="px-2 py-3">Judul</th>
                <th className="py-3">Jenis Tugas</th>
                <th className="py-3">Status</th>
                <th className="px-2 py-3">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTugas.length > 0 ? (
                filteredTugas.map((tugas, index) => (
                  <tr
                    key={tugas.id}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(tugas)}
                  >
                    <td
                      className="sticky left-0 bg-white px-4 py-3 text-gray-600 border-r border-gray-100"
                      style={{ zIndex: 5 }}
                    >
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap max-w-[150px] truncate">
                      {limitWords(tugas.judul, 5)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{tugas.jenis}</td>
                    <td
                      className={`px-4 py-2 whitespace-nowrap ${
                        tugas.status === "Selesai"
                          ? "text-gray-400 bg-gray-100"
                          : "text-white bg-green-600"
                      }`}
                    >
                      {tugas.status}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {limitWords(tugas.deskripsi, 5)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    Tidak ada tugas ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// Helper untuk batasi kata
function limitWords(text: string, limit: number): string {
  const words = text.split(" ");
  return words.length > limit
    ? words.slice(0, limit).join(" ") + "..."
    : text;
}
