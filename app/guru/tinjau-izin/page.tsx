"use client";

import { useState, useMemo } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const dummyIzin = [
  {
    id: 1,
    nama: "Ahmad Firdaus",
    kelas: "XII IPA 3",
    tanggal: "2025-11-07",
    jenis: "Izin",
    alasan: "Ada acara keluarga di luar kota.",
    status: "Menunggu",
  },
  {
    id: 2,
    nama: "Siti Rahma",
    kelas: "XI IPS 1",
    tanggal: "2025-11-08",
    jenis: "Sakit",
    alasan: "Demam tinggi dan perlu istirahat.",
    status: "Menunggu",
  },
  {
    id: 3,
    nama: "Budi Santoso",
    kelas: "X TKJ 2",
    tanggal: "2025-11-08",
    jenis: "Izin",
    alasan: "Mengikuti lomba robotik tingkat provinsi.",
    status: "Diterima",
  },
  {
    id: 4,
    nama: "Laila Nurul",
    kelas: "XII IPS 2",
    tanggal: "2025-11-08",
    jenis: "Sakit",
    alasan: "Kontrol dokter rutin di luar kota.",
    status: "Ditolak",
  },
];

export default function Page() {
  const [tab, setTab] = useState<"hari-ini" | "menunggu" | "selesai">("hari-ini");
  const [filterStatus, setFilterStatus] = useState<"Semua" | "Diterima" | "Ditolak">("Semua");

  const filteredData = useMemo(() => {
    let data = [...dummyIzin];
    const today = new Date().toISOString().split("T")[0];

    if (tab === "hari-ini") {
      data = data.filter((i) => i.tanggal === today && i.status === "Menunggu");
    } else if (tab === "menunggu") {
      data = data.filter((i) => i.status === "Menunggu");
    } else if (tab === "selesai") {
      data = data.filter((i) => i.status === "Diterima" || i.status === "Ditolak");
    }

    if (tab === "selesai" && filterStatus !== "Semua") data = data.filter((i) => i.status === filterStatus);

    return data;
  }, [tab, filterStatus]);

  return (
    <div className="max-w-3xl mx-auto pb-10 py-3">
      {/* Judul */}
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-4 tracking-tight">Tinjau Izin Siswa</h1>

      {/* Tabs */}
      <div className="mb-1 flex w-full max-w-md mx-auto border border-gray-200 bg-blue-50 overflow-hidden">
        {[
          { id: "hari-ini", label: "Hari Ini" },
          { id: "menunggu", label: "Menunggu" },
          { id: "selesai", label: "Selesai" },
        ].map((t) => {
          const count =
            t.id === "hari-ini" ? dummyIzin.filter((i) => i.tanggal === new Date().toISOString().split("T")[0] && i.status === "Menunggu").length : t.id === "menunggu" ? dummyIzin.filter((i) => i.status === "Menunggu").length : null;

          return (
            <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={`flex-1 py-2.5 text-sm font-medium transition-all ${tab === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {t.label}
              {count !== null && <span className="ml-1 text-xs text-gray-500">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="w-full max-w-md mx-auto px-4 mb-4 border-b border-gray-300 pb-5">
        {/* Status Filter hanya untuk tab 'Selesai' */}
        {tab === "selesai" && (
          <div className="flex w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            {["Semua", "Diterima", "Ditolak"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s as typeof filterStatus)}
                className={`flex-1 py-1 text-sm font-medium transition-all ${filterStatus === s ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Daftar izin */}
      <div className="space-y-3 px-2">
        {filteredData.length > 0 ? (
          [...filteredData]
            .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
            .map((izin) => (
              <div key={izin.id} className="group relative overflow-hidden rounded border border-gray-200 bg-linear-to-b from-white to-gray-50 shadow-xs hover:shadow-lg transition-all">
                {/* Aksen kiri */}
                {/* <div className={`absolute left-0 top-0 h-full w-1.5 ${izin.jenis === "Sakit" ? "bg-amber-400" : "bg-blue-500"}`} /> */}

                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="px-4 pt-4">
                      <h2 className="text-lg font-semibold text-gray-900 tracking-tight">{izin.nama}</h2>
                      <p className="text-sm text-gray-500">
                        {izin.kelas} &middot;{" "}
                        {new Date(izin.tanggal).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 font-medium ${izin.jenis === "Sakit" ? "bg-amber-400 text-gray-700" : "bg-blue-400 text-white"}`}>{izin.jenis}</span>
                </div>

                {/* Isi */}
                <div className="mt-4 border-t border-gray-100 pt-5 m-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-medium text-gray-800">Alasan:</span> {izin.alasan}
                  </p>
                </div>

                {/* Footer */}
                {tab === "selesai" ? (
                  <div
                    className={`mt-5 w-full text-center py-2 text-sm font-semibold flex items-center justify-center gap-2 ${
                      izin.status === "Diterima" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    {izin.status === "Diterima" ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Diterima</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Ditolak</span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="mt-5 p-4 flex justify-between items-center">
                    <div className="text-xs text-gray-400">ID Pengajuan: #{izin.id.toString().padStart(3, "0")}</div>
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Tolak</button>
                      <button className="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700 transition">Terima</button>
                    </div>
                  </div>
                )}
              </div>
            ))
        ) : (
          <div className="text-center text-gray-500 text-sm py-10">Tidak ada data izin.</div>
        )}
      </div>
    </div>
  );
}
