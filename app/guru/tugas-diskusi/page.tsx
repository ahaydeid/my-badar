"use client";

import Link from "next/link";

export default function TugasDanDiskusi() {
  const data = [
    {
      id: "12-mplb-1",
      nama: "12 MPLB 1",
      berjalan: { Individu: "-", Kelompok: 1, Quiz: 1 },
      selesai: { Individu: 3, Kelompok: 2, Quiz: 5 },
    },
    {
      id: "12-mplb-2",
      nama: "12 MPLB 2",
      berjalan: { Individu: "-", Kelompok: "-", Quiz: "-" },
      selesai: { Individu: 3, Kelompok: 2, Quiz: 5 },
    },
    {
      id: "12-mplb-3",
      nama: "12 MPLB 3",
      berjalan: { Individu: 2, Kelompok: 1, Quiz: "-" },
      selesai: { Individu: 4, Kelompok: 3, Quiz: 6 },
    },
    {
      id: "11-mplb-1",
      nama: "11 MPLB 1",
      berjalan: { Individu: 1, Kelompok: "-", Quiz: "-" },
      selesai: { Individu: 2, Kelompok: 4, Quiz: 3 },
    },
    {
      id: "10-mplb-1",
      nama: "10 MPLB 1",
      berjalan: { Individu: "-", Kelompok: "-", Quiz: "-" },
      selesai: { Individu: 1, Kelompok: 2, Quiz: 2 },
    },
  ];

  return (
    <section className="bg-gray-50 w-full rounded-2xl p-6 pb-20 shadow-sm">
      {/* Judul Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 tracking-tight">Tugas &amp; Diskusi</h2>
      </div>

      {/* Grid Card */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data.map((kelas) => {
          const tugasBerjalanEntries = Object.entries(kelas.berjalan);
          const tugasAda = tugasBerjalanEntries.some(([, jumlah]) => jumlah !== "-" && Number(jumlah) > 0);

          return (
            <Link key={kelas.nama} href={`/guru/tugas-diskusi/${kelas.id}`} className="group border border-gray-200 bg-white rounded-sm flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition-all duration-200">
              {/* Header */}
              <div className="py-1 text-white text-center rounded-t-sm bg-gray-900">
                <span className="text-base font-bold tracking-tight">{kelas.nama}</span>
              </div>

              {/* Content */}
              <div className="p-4 flex-1">
                {/* Tugas Berjalan */}
                <p className="text-[14px] font-semibold text-green-600 mb-2">Tugas berjalan</p>

                {/* Jika ada tugas */}
                {tugasAda ? (
                  <div className="flex flex-col gap-2 mb-4">
                    {tugasBerjalanEntries
                      .filter(([, jumlah]) => jumlah !== "-" && Number(jumlah) > 0)
                      .map(([jenis, jumlah]) => (
                        <div key={jenis} className="flex justify-between items-center bg-sky-500 text-white text-[13px] rounded-md px-3 py-1">
                          <span>{jenis}</span>
                          <span className="bg-sky-600 text-white rounded-sm px-1.5 py-px font-bold">{jumlah}</span>
                        </div>
                      ))}
                  </div>
                ) : (
                  // Jika tidak ada tugas berjalan
                  <div className="flex justify-between items-center bg-gray-200 text-gray-700 text-[13px] rounded-md px-3 py-1 mb-4">
                    <span>Tidak ada tugas</span>
                  </div>
                )}

                {/* Tugas Selesai */}
                <p className="text-[14px] font-semibold text-gray-700 mb-2">Tugas selesai</p>
                <div className="flex flex-col gap-2">
                  {Object.entries(kelas.selesai).map(([jenis, jumlah]) => (
                    <div key={jenis} className="flex justify-between items-center bg-gray-200 text-gray-700 text-[13px] rounded-md px-3 py-1">
                      <span>{jenis}</span>
                      <span className="bg-gray-300 text-gray-800 rounded-sm px-1.5 py-px font-bold">{jumlah}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
