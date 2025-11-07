"use client";

export default function DaftarKelas() {
  const kelasList = [
    { nama: "12 MPLB 1", siswa: 38, berjalan: 1, selesai: 5 },
    { nama: "12 MPLB 2", siswa: 37, berjalan: 2, selesai: 4 },
    { nama: "12 MPLB 3", siswa: 35, berjalan: 2, selesai: 4 },
    { nama: "11 RPL 1", siswa: 40, berjalan: 3, selesai: 6 },
    { nama: "11 RPL 2", siswa: 39, berjalan: 1, selesai: 2 },
  ];

  return (
    <section className="bg-gray-50 w-full p-5">
      {/* Judul Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Daftar kelas <span className="text-gray-500 text-sm font-normal">(yang diampu)</span>
        </h2>
      </div>

      {/* Grid Card */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {kelasList
          .sort((a, b) => a.nama.localeCompare(b.nama)) // urut berdasarkan abjad
          .map((kelas) => (
            <div key={kelas.nama} className="bg-white border border-gray-200 rounded shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-all duration-200">
              <div>
                <h3 className="text-base font-semibold text-gray-800">{kelas.nama}</h3>
                <p className="text-sm text-gray-500">{kelas.siswa} siswa</p>
              </div>

              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-700 mb-1">Tugas</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[13px] bg-sky-500 text-white font-semibold rounded-sm px-3 py-1 flex items-center gap-1 shadow-sm">
                    Berjalan <span className="bg-white/20 rounded px-2 py-px">{kelas.berjalan}</span>
                  </span>
                  <span className="text-[13px] bg-green-500 text-white font-semibold rounded-sm px-3 py-1 flex items-center gap-1 shadow-sm">
                    Selesai <span className="bg-white/20 rounded px-2 py-px">{kelas.selesai}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
