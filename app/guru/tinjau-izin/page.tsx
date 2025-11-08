"use client";

const dummyIzin = [
  {
    id: 1,
    nama: "Ahmad Firdaus",
    kelas: "XII IPA 3",
    tanggal: "2025-11-07",
    jenis: "Izin",
    alasan: "Ada acara keluarga di luar kota.",
  },
  {
    id: 2,
    nama: "Siti Rahma",
    kelas: "XI IPS 1",
    tanggal: "2025-11-08",
    jenis: "Sakit",
    alasan: "Demam tinggi dan perlu istirahat.",
  },
  {
    id: 3,
    nama: "Budi Santoso",
    kelas: "X TKJ 2",
    tanggal: "2025-11-09",
    jenis: "Izin",
    alasan: "Mengikuti lomba robotik tingkat provinsi.",
  },
];

const Page = () => {
  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 pb-18">
      <h1 className="text-center text-3xl font-bold mb-6">Tinjau Izin</h1>

      <div className="space-y-4">
        {dummyIzin.map((izin) => (
          <div key={izin.id} className="bg-white shadow-xs rounded border border-gray-200 p-5 transition hover:shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800">{izin.nama}</h2>
              <span className={`px-3 py-1 text-sm font-medium ${izin.jenis === "Sakit" ? "bg-yellow-300 text-gray-700" : "bg-blue-500 text-white"}`}>{izin.jenis}</span>
            </div>

            <p className="text-sm text-gray-800 mb-1">Kelas: {izin.kelas}</p>
            <p className="text-sm text-gray-800 mb-1">Tanggal: {izin.tanggal}</p>

            <div className="mt-3">
              <p className="font-bold text-gray-900">Alasan:</p>
              <p className="text-gray-600 text-sm bg-gray-50 border border-gray-200 rounded-md p-3 mt-1">{izin.alasan}</p>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-4 py-2 text-sm font-semibold text-white rounded-md border border-gray-300 bg-red-400 hover:bg-red-500">Tolak</button>
              <button className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md">Terima</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
