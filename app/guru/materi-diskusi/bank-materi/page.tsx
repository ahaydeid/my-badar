"use client";

import { useState } from "react";

type Materi = {
  id: number;
  judul: string;
  jenis: string;
  deskripsi: string;
};

// Dummy data (20 items)
const materiList: Materi[] = [
  { id: 1, judul: "Dasar Pemrograman", jenis: "Video", deskripsi: "Belajar logika dan konsep dasar pemrograman modern" },
  { id: 2, judul: "Algoritma dan Struktur Data", jenis: "Dokumen", deskripsi: "Pengenalan algoritma dasar dan struktur data umum" },
  { id: 3, judul: "Next.js untuk Pemula", jenis: "Artikel", deskripsi: "Langkah-langkah membangun web modern dengan Next.js" },
  { id: 4, judul: "Supabase Authentication", jenis: "Video", deskripsi: "Implementasi login dan register menggunakan Supabase" },
  { id: 5, judul: "Pemrograman Berorientasi Objek", jenis: "Video", deskripsi: "Konsep class, objek, dan inheritance dalam OOP" },
  { id: 6, judul: "Database Relasional", jenis: "Dokumen", deskripsi: "Dasar penggunaan SQL dan relasi antar tabel" },
  { id: 7, judul: "React Hooks Lanjutan", jenis: "Artikel", deskripsi: "Panduan memahami useEffect dan custom hooks" },
  { id: 8, judul: "Dasar TypeScript", jenis: "Video", deskripsi: "Mengenal tipe data, interface, dan generic di TypeScript" },
  { id: 9, judul: "Tailwind CSS Modern", jenis: "Dokumen", deskripsi: "Cara membangun UI cepat dengan Tailwind versi terbaru" },
  { id: 10, judul: "API dan Fetch Data", jenis: "Video", deskripsi: "Langkah membuat permintaan data ke server menggunakan fetch" },
  { id: 11, judul: "Authentication dengan JWT", jenis: "Artikel", deskripsi: "Konsep dan implementasi JSON Web Token untuk autentikasi" },
  { id: 12, judul: "Optimasi Performa Next.js", jenis: "Dokumen", deskripsi: "Strategi caching, ISR, dan code splitting di Next.js" },
  { id: 13, judul: "Desain Database Normalisasi", jenis: "Video", deskripsi: "Cara membuat database yang efisien dengan normalisasi" },
  { id: 14, judul: "Integrasi Supabase Storage", jenis: "Artikel", deskripsi: "Menyimpan file dan gambar menggunakan Supabase Storage" },
  { id: 15, judul: "React Server Components", jenis: "Video", deskripsi: "Memahami konsep RSC pada Next.js 14 ke atas" },
  { id: 16, judul: "State Management dengan Zustand", jenis: "Dokumen", deskripsi: "Mengelola state global tanpa Redux di aplikasi React" },
  { id: 17, judul: "Responsive Layout Modern", jenis: "Artikel", deskripsi: "Teknik layout fleksibel dengan CSS Grid dan Flexbox" },
  { id: 18, judul: "Pengantar CI/CD", jenis: "Video", deskripsi: "Mengenal pipeline otomatis untuk testing dan deployment" },
  { id: 19, judul: "Optimasi SEO Next.js", jenis: "Artikel", deskripsi: "Tips meningkatkan visibilitas situs Next.js di mesin pencari" },
  { id: 20, judul: "Analisis Kompleksitas Algoritma", jenis: "Dokumen", deskripsi: "Cara menghitung efisiensi algoritma dengan Big O Notation" },
];

export default function BankMateriPage() {
  const [search, setSearch] = useState("");
  const [jenis, setJenis] = useState("Semua");

  const handleRowClick = (materi: Materi) => {
    alert(`Kamu membuka materi: ${materi.judul}`);
  };

  // Filter hasil berdasarkan pencarian dan jenis
  const filteredMateri = materiList.filter((materi) => {
    const cocokJudul = materi.judul.toLowerCase().includes(search.toLowerCase()) || materi.deskripsi.toLowerCase().includes(search.toLowerCase());
    const cocokJenis = jenis === "Semua" || materi.jenis === jenis;
    return cocokJudul && cocokJenis;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-800">
            Bank Materi <span className="text-sm font-normal text-gray-500">(Tambahkan materi melalui dashboard guru)</span>
          </h1>
        </div>

        {/* FILTER STICKY */}
        <div className="w-full px-2 py-2 bg-white border-t border-gray-100 flex flex-row flex-wrap items-center justify-between sticky top-[52px] z-20">
          {/* Jenis materi */}
          <select value={jenis} onChange={(e) => setJenis(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
            <option value="Semua">Semua Jenis</option>
            <option value="Video">Video</option>
            <option value="Artikel">Artikel</option>
            <option value="Dokumen">Dokumen</option>
          </select>

          {/* Pencarian */}
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="Cari materi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-36 sm:w-72 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button onClick={() => {}} className="px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 transition-colors">
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
                <th className="sticky left-0 bg-gray-100 px-2 py-3 w-12 border-r border-gray-200" style={{ zIndex: 10 }}>
                  No.
                </th>
                <th className="px-2 py-3">Judul</th>
                <th className="py-3">Jenis Materi</th>
                <th className="px-2 py-3">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMateri.length > 0 ? (
                filteredMateri.map((materi, index) => (
                  <tr key={materi.id} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleRowClick(materi)}>
                    <td className="sticky left-0 bg-white px-4 py-3 text-gray-600 border-r border-gray-100" style={{ zIndex: 5 }}>
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap max-w-[150px] truncate">{limitWords(materi.judul, 5)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{materi.jenis}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{limitWords(materi.deskripsi, 5)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500 text-sm">
                    Tidak ada materi ditemukan
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

// Helper untuk batasi 5 kata per cell
function limitWords(text: string, limit: number): string {
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
}
