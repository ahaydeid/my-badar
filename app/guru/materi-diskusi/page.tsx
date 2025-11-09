"use client";

import { Folders } from "lucide-react";
import Link from "next/link";

export default function MateriDanDiskusi() {
  const data = [
    {
      id: "12-mplb-1",
      nama: "12 MPLB 1",
      berjalan: { Video: 2, Modul: 1, Dokumen: "-" },
      selesai: { Video: 5, Modul: 2, Dokumen: 1 },
    },
    {
      id: "12-mplb-2",
      nama: "12 MPLB 2",
      berjalan: { Video: "-", Modul: "-", Dokumen: "-" },
      selesai: { Video: 3, Modul: 2, Dokumen: 2 },
    },
    {
      id: "12-mplb-3",
      nama: "12 MPLB 3",
      berjalan: { Video: 1, Modul: 1, Dokumen: 2 },
      selesai: { Video: 4, Modul: 2, Dokumen: 3 },
    },
    {
      id: "11-mplb-1",
      nama: "11 MPLB 1",
      berjalan: { Video: "-", Modul: 1, Dokumen: "-" },
      selesai: { Video: 2, Modul: 3, Dokumen: 2 },
    },
    {
      id: "10-mplb-1",
      nama: "10 MPLB 1",
      berjalan: { Video: "-", Modul: "-", Dokumen: "-" },
      selesai: { Video: 1, Modul: 1, Dokumen: 1 },
    },
  ];

  return (
    <section className="bg-gray-50 w-full rounded-2xl pb-18">
      {/* Judul Section */}
      <div className="mb-6 sticky p-3 shadow top-0 bg-gray-50 z-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Materi &amp; Diskusi</h2>
        <Link href="/guru/materi-diskusi/bank-materi">
          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-sm transition">
            <Folders className="w-4 h-4" />
            Bank Materi
          </button>
        </Link>
      </div>

      {/* Grid Card */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 px-4 gap-4">
        {data.map((kelas) => {
          const materiBerjalanEntries = Object.entries(kelas.berjalan);
          const materiAda = materiBerjalanEntries.some(([, jumlah]) => jumlah !== "-" && Number(jumlah) > 0);

          return (
            <Link key={kelas.nama} href={`/guru/materi-diskusi/${kelas.id}`} className="border border-gray-200 bg-white rounded-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
              <div>
                <div className=" py-1 text-white text-center rounded-t-sm bg-gray-900">
                  <span className="text-lg font-bold">{kelas.nama}</span>
                </div>
                <div className="p-4">
                  {/* Materi Aktif */}
                  <p className="text-[14px] font-semibold text-green-600 mb-2">Materi aktif</p>

                  {/* Jika ada materi */}
                  {materiAda ? (
                    <div className="flex flex-col gap-2 mb-3">
                      {materiBerjalanEntries
                        .filter(([, jumlah]) => jumlah !== "-" && Number(jumlah) > 0)
                        .map(([jenis, jumlah]) => (
                          <div key={jenis} className="flex justify-between items-center bg-violet-500 text-white text-[13px] rounded-sm pl-3 pr-1 py-1">
                            <span>{jenis}</span>
                            <span className="text-white/90 rounded-sm px-1.5 border py-px">{jumlah}</span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    // Jika tidak ada materi aktif
                    <div className="flex justify-between items-center bg-gray-200 text-gray-700 text-[13px] rounded-sm pl-3 pr-1 py-1 mb-3">
                      <span>Tidak ada materi aktif</span>
                    </div>
                  )}

                  {/* Materi Selesai */}
                  <p className="text-[14px] font-semibold text-gray-700 mb-2">Materi selesai</p>
                  <div className="flex flex-col gap-2">
                    {Object.entries(kelas.selesai).map(([jenis, jumlah]) => (
                      <div key={jenis} className="flex justify-between items-center bg-gray-200 text-gray-700 text-[13px] rounded-sm pl-3 pr-1 py-1">
                        <span>{jenis}</span>
                        <span className="text-gray-700 rounded-sm px-1.5 border border-gray-400 py-px">{jumlah}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
