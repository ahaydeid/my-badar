"use client";

export default function TugasDanDiskusi() {
  const data = [
    {
      nama: "12 MPLB 1",
      berjalan: { Individu: "-", Kelompok: 1, Quis: 1 },
      selesai: { Individu: 3, Kelompok: 2, Quis: 5 },
    },
    {
      nama: "12 MPLB 2",
      berjalan: { Individu: "-", Kelompok: 1, Quis: 1 },
      selesai: { Individu: 3, Kelompok: 2, Quis: 5 },
    },
  ];

  return (
    <section className="bg-white w-full rounded-2xl p-5">
      {/* Judul Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tugas &amp; Diskusi</h2>
      </div>

      {/* Grid Card */}
      <div className="grid grid-cols-2 gap-4">
        {data.map((kelas) => (
          <div key={kelas.nama} className="border border-gray-200 bg-white rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-3">{kelas.nama}</h3>

              {/* Tugas Berjalan */}
              <p className="text-[14px] font-semibold text-green-600 mb-2">Tugas berjalan</p>
              <div className="flex flex-col gap-2 mb-3">
                {Object.entries(kelas.berjalan).map(([jenis, jumlah]) => (
                  <div key={jenis} className="flex justify-between items-center bg-sky-500 text-white text-[13px] font-semibold rounded-md px-3 py-1">
                    <span>{jenis}</span>
                    <span className="bg-sky-600 text-white rounded-sm px-1.5 py-px font-bold">{jumlah}</span>
                  </div>
                ))}
              </div>

              {/* Tugas Selesai */}
              <p className="text-[14px] font-semibold text-gray-700 mb-2">Tugas selesai</p>
              <div className="flex flex-col gap-2">
                {Object.entries(kelas.selesai).map(([jenis, jumlah]) => (
                  <div key={jenis} className="flex justify-between items-center bg-gray-200 text-gray-700 text-[13px] font-semibold rounded-md px-3 py-1">
                    <span>{jenis}</span>
                    <span className="bg-gray-300 text-gray-800 rounded-sm px-1.5 py-px font-bold">{jumlah}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
