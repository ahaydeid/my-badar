"use client";

import React from "react";

type DayRow = { id: number; nama: string };
type Jadwal = {
  id: number;
  kelas?: { nama?: string } | null;
  jam?: { nama?: string; mulai?: string; selesai?: string } | null;
  jumlah_jam?: { nama?: string } | null;
};

interface Props {
  day: DayRow;
  list: Jadwal[];
}

// Ambil nama hari saat ini
const getTodayName = (): string => {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return hari[new Date().getDay()]!;
};

export default function JadwalHariCard({ day, list }: Props): React.ReactElement {
  const today = getTodayName();
  const isToday = day.nama === today;

  const containerClass = isToday ? "bg-[#009ed6] border-sky-400" : "bg-white text-gray-800 border-gray-100";

  const headerClass = isToday ? "text-white" : "text-gray-800";
  const emptyClass = isToday ? "text-white/90" : "text-gray-500";

  return (
    <section key={day.id} className="mb-4">
      <div className={`rounded-xl border shadow-xs p-2 py-3 md:p-4 flex flex-row gap-4 transition duration-300 ${containerClass}`}>
        {/* Kolom Hari */}
        <div className="w-1/5 shrink-0 flex items-center justify-center">
          <h2 className={`text-center text-xl md:text-[16px] font-extrabold ${headerClass}`}>{day.nama}</h2>
        </div>

        {/* Kolom Jadwal */}
        <div className="flex-1 min-h-0">
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {list.length === 0 ? (
              <div className={`text-sm text-center py-3 ${emptyClass}`}>Tidak ada jadwal.</div>
            ) : (
              list.map((j) => (
                <div key={j.id} className={`flex flex-row items-center justify-between rounded-lg px-3 py-2 ${isToday ? "bg-gray-50 text-gray-800" : "bg-gray-50 border border-gray-200 text-gray-700"}`}>
                  {/* Kolom kiri: detail kelas, JP, waktu */}
                  <div className="flex flex-col">
                    <div className={`font-semibold ${isToday ? "text-gray-800 border bg-amber-300 px-4 border-amber-400 text-lg mb-1 rounded" : "text-gray-800"}`}>{j.kelas?.nama ?? "Kelas tidak diketahui"}</div>

                    {/* JP */}
                    <div className={`text-sm ${isToday ? "text-gray-800 py-0.5" : "text-gray-600"}`}>{j.jumlah_jam?.nama ?? "1 JP"}</div>

                    {/* Waktu mulai–selesai */}
                    <div className={`text-sm ${isToday ? "text-gray-800" : "text-gray-600"}`}>
                      {j.jam?.mulai?.slice(0, 5)} - {j.jam?.selesai?.slice(0, 5)}
                    </div>
                  </div>

                  {/* Kolom kanan: badge jam ke- */}
                  <div className={`text-xs rounded-md px-3 py-5 ml-auto ${isToday ? "bg-sky-400 text-white font-semibold" : "bg-white text-gray-800 border border-gray-300"}`}>{j.jam?.nama ?? "Jam ke-?"}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
