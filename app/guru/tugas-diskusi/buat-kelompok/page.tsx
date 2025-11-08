"use client";

import { useState } from "react";
import { PlusCircle, User } from "lucide-react";
import TambahKelompok from "../comps/TambahKelompok";

export default function BuatKelompokPage() {
  const [showModal, setShowModal] = useState(false);

  const kelompokList = [
    {
      nama: "Kelompok 1",
      anggota: [
        { nama: "Ahmad Firdaus", ketua: true },
        { nama: "Rian Saputra", ketua: false },
        { nama: "Dewi Anggraini", ketua: false },
      ],
    },
    {
      nama: "Kelompok 2",
      anggota: [
        { nama: "Nabila Zahra", ketua: true },
        { nama: "Putri Salju", ketua: false },
        { nama: "Bagus Kurniawan", ketua: false },
      ],
    },
  ];

  return (
    <section className="w-full min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Daftar Kelompok</h1>
          <p className="text-sm text-gray-500">Kelas 12 MPLB 2</p>
        </div>

        <button onClick={() => setShowModal(true)} className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-md px-3 py-1.5 transition-all duration-200">
          <PlusCircle className="w-4 h-4" />
          Tambah Kelompok
        </button>
      </div>

      {/* List Kelompok */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-1">
        {kelompokList.map((kelompok, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-sm shadow-xs hover:shadow-md transition-all p-4">
            <h2 className="text-base font-semibold text-gray-800 mb-3">{kelompok.nama}</h2>
            <div className="space-y-2">
              {kelompok.anggota.map((anggota, j) => (
                <div key={j} className="flex items-center text-sm text-gray-700 pb-1">
                  <div className="flex items-center gap-2">
                    {/* Ikon Foto */}
                    <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                      <User className="w-4 h-4" />
                    </div>
                    <span>{anggota.nama}</span>
                  </div>

                  {anggota.ketua && <span className="text-[11px] bg-amber-400 text-gray-700 ml-2 px-2 py-0.5 rounded">Ketua</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah Kelompok */}
      {showModal && <TambahKelompok onClose={() => setShowModal(false)} />}
    </section>
  );
}
