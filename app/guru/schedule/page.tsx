"use client";

import React, { useEffect, useState, useMemo } from "react";
import JadwalHariCard from "./comps/JadwalHariCard";

type DayRow = { id: number; nama: string };
type RelOneOrMany<T> = T | T[] | null;

type RawJadwal = {
  id: number;
  hari_id?: number | null;
  jam_id?: number | null;
  kelas_id?: number | null;
  jp?: number | null;
  guru_id?: number | null;
  kelas?: RelOneOrMany<{ nama?: string }>;
  jam?: RelOneOrMany<{ nama?: string; mulai?: string; selesai?: string }>;
  jumlah_jam?: RelOneOrMany<{ nama?: string }>;
};

// === Fungsi bantu konversi waktu (untuk sorting) ===
const toMinutes = (time: string | null): number => {
  if (!time) return 9999;
  const [h = "0", m = "0"] = time.split(":");
  return Number(h) * 60 + Number(m);
};

export default function Page(): React.ReactElement {
  const [days, setDays] = useState<DayRow[]>([]);
  const [jadwals, setJadwals] = useState<RawJadwal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // === Simulasi ambil data dummy ===
  useEffect(() => {
    let mounted = true;

    const loadDummy = (): void => {
      setLoading(true);
      setError(null);

      try {
        if (!mounted) return;

        const dummyDays: DayRow[] = [
          { id: 1, nama: "Senin" },
          { id: 2, nama: "Selasa" },
          { id: 3, nama: "Rabu" },
          { id: 4, nama: "Kamis" },
          { id: 5, nama: "Jumat" },
          { id: 6, nama: "Sabtu" },
        ];

        const dummyJadwal: RawJadwal[] = [
          {
            id: 1,
            hari_id: 1,
            guru_id: 1,
            kelas_id: 2,
            jam_id: 1,
            kelas: { nama: "X TKJ 1" },
            jam: { nama: "Jam ke-1", mulai: "07:00:00", selesai: "07:45:00" },
            jumlah_jam: { nama: "1 JP" },
          },
          {
            id: 2,
            hari_id: 1,
            guru_id: 1,
            kelas_id: 2,
            jam_id: 2,
            kelas: { nama: "X TKJ 1" },
            jam: { nama: "Jam ke-2", mulai: "07:45:00", selesai: "08:30:00" },
            jumlah_jam: { nama: "1 JP" },
          },
          {
            id: 3,
            hari_id: 2,
            guru_id: 1,
            kelas_id: 3,
            jam_id: 3,
            kelas: { nama: "XI RPL 2" },
            jam: { nama: "Jam ke-3", mulai: "09:00:00", selesai: "09:45:00" },
            jumlah_jam: { nama: "1 JP" },
          },
          {
            id: 4,
            hari_id: 3,
            guru_id: 1,
            kelas_id: 4,
            jam_id: 4,
            kelas: { nama: "XII TKJ 2" },
            jam: { nama: "Jam ke-4", mulai: "10:00:00", selesai: "10:45:00" },
            jumlah_jam: { nama: "1 JP" },
          },
          {
            id: 5,
            hari_id: 4,
            guru_id: 1,
            kelas_id: 4,
            jam_id: 4,
            kelas: { nama: "XII TKJ 4" },
            jam: { nama: "Jam ke-4", mulai: "10:00:00", selesai: "10:45:00" },
            jumlah_jam: { nama: "1 JP" },
          },
        ];

        setDays(dummyDays);
        setJadwals(dummyJadwal);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadDummy();

    return () => {
      mounted = false;
    };
  }, []);

  // === Mapping jadwal per hari dan sorting ===
  const jadwalMap = useMemo(() => {
    const map = new Map<number, RawJadwal[]>();

    jadwals.forEach((j) => {
      const hid = j.hari_id ?? -1;
      if (!map.has(hid)) map.set(hid, []);
      map.get(hid)!.push(j);
    });

    map.forEach((list) => {
      list.sort((a, b) => {
        const mulaiA = Array.isArray(a.jam) ? a.jam[0]?.mulai ?? null : a.jam?.mulai ?? null;
        const mulaiB = Array.isArray(b.jam) ? b.jam[0]?.mulai ?? null : b.jam?.mulai ?? null;
        return toMinutes(mulaiA) - toMinutes(mulaiB);
      });
    });

    return map;
  }, [jadwals]);

  // === Normalize sebelum dikirim ke Card ===
  const normalizeRel = <T,>(rel: RelOneOrMany<T>): T | null => {
    if (!rel) return null;
    return Array.isArray(rel) ? rel[0] ?? null : rel;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-28">
        <h1 className="sticky top-0 z-20 bg-gray-50 text-center text-2xl md:text-[20px] font-extrabold py-3 mb-4 border-b border-gray-200">Jadwal Mengajar</h1>
      <div className="mx-auto w-full px-4 max-w-xl md:max-w-2xl lg:max-w-3xl">

        {loading ? (
          <div className="text-center text-gray-500">Memuat jadwal dummy...</div>
        ) : error ? (
          <div className="text-center text-red-600">Error: {error}</div>
        ) : (
          <div className="space-y-2">
            {days.map((day) => {
              const list = (jadwalMap.get(day.id) ?? []).map((j) => ({
                ...j,
                kelas: normalizeRel(j.kelas),
                jam: normalizeRel(j.jam),
                jumlah_jam: normalizeRel(j.jumlah_jam),
              }));
              return <JadwalHariCard key={day.id} day={day} list={list} />;
            })}
          </div>
        )}

        {days.length > 0 && jadwalMap.size === 0 && <div className="text-center text-white mt-8 p-4 bg-red-600 rounded-lg">Tidak ada jadwal dummy untuk ditampilkan.</div>}

        <div className="h-8" />
      </div>
    </div>
  );
}
