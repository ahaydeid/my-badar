"use client";

import Link from "next/link";

export default function MateriDanDiskusi() {
  const data = [
    {
      id: "12-mplb-1",
      nama: "12 MPLB 1",
      berjalan: { Video: 2, Modul: 1, "Dokumen": "-" },
      selesai: { Video: 5, Modul: 2, "Dokumen": 1 },
    },
    {
      id: "12-mplb-2",
      nama: "12 MPLB 2",
      berjalan: { Video: "-", Modul: "-", "Dokumen": "-" },
      selesai: { Video: 3, Modul: 2, "Dokumen": 2 },
    },
    {
      id: "12-mplb-3",
      nama: "12 MPLB 3",
      berjalan: { Video: 1, Modul: 1, "Dokumen": 2 },
      selesai: { Video: 4, Modul: 2, "Dokumen": 3 },
    },
    {
      id: "11-mplb-1",
      nama: "11 MPLB 1",
      berjalan: { Video: "-", Modul: 1, "Dokumen": "-" },
      selesai: { Video: 2, Modul: 3, "Dokumen": 2 },
    },
    {
      id: "10-mplb-1",
      nama: "10 MPLB 1",
      berjalan: { Video: "-", Modul: "-", "Dokumen": "-" },
      selesai: { Video: 1, Modul: 1, "Dokumen": 1 },
    },
  ];

  return (
    <section className="bg-white w-full rounded-2xl p-5 pb-18">
      {/* Judul Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Materi &amp; Diskusi</h2>
      </div>

      {/* Grid Card */}
      <div className="grid grid-cols-2 gap-4">
        {data.map((kelas) => {
          const materiBerjalanEntries = Object.entries(kelas.berjalan);
          const materiAda = materiBerjalanEntries.some(([, jumlah]) => jumlah !== "-" && Number(jumlah) > 0);

          return (
            <Link key={kelas.nama} href={`/guru/materi-diskusi/${kelas.id}`} className="border border-gray-200 bg-white rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-3">{kelas.nama}</h3>

                {/* Materi Aktif */}
                <p className="text-[14px] font-semibold text-green-600 mb-2">Materi aktif</p>

                {/* Jika ada materi */}
                {materiAda ? (
                  <div className="flex flex-col gap-2 mb-3">
                    {materiBerjalanEntries
                      .filter(([, jumlah]) => jumlah !== "-" && Number(jumlah) > 0)
                      .map(([jenis, jumlah]) => (
                        <div key={jenis} className="flex justify-between items-center bg-violet-500 text-white text-[13px] rounded-md px-3 py-1">
                          <span>{jenis}</span>
                          <span className="bg-violet-600 text-white rounded-sm px-1.5 py-px font-bold">{jumlah}</span>
                        </div>
                      ))}
                  </div>
                ) : (
                  // Jika tidak ada materi aktif
                  <div className="flex justify-between items-center bg-gray-200 text-gray-700 text-[13px] rounded-md px-3 py-1 mb-3">
                    <span>Tidak ada materi aktif</span>
                  </div>
                )}

                {/* Materi Selesai */}
                <p className="text-[14px] font-semibold text-gray-700 mb-2">Materi selesai</p>
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
