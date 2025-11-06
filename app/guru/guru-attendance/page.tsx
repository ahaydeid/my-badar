"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Camera, LogIn, LogOut } from "lucide-react";

const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

const Page = () => {
  const [currentTime, setCurrentTime] = useState<string>("--:--:--");
  const [isPresent, setIsPresent] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);

  // === Update jam setiap detik ===
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(formatted);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAbsenMasuk = () => {
    setIsPresent(true);
    alert("Absen Masuk dicatat (dummy).");
  };

  const handleAbsenKeluar = () => {
    setIsPresent(false);
    alert("Absen Keluar dicatat (dummy).");
  };

  const handleOpenCamera = () => {
    alert("Fitur kamera akan dibuka (dummy).");
  };

  const handleDetectLocation = (): void => {
    if (!navigator.geolocation) {
      alert("Browser tidak mendukung geolokasi.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      () => alert("Gagal mendeteksi lokasi."),
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <h1 className="sticky top-0 z-20 bg-white text-center text-2xl font-extrabold py-3 border-b border-gray-200 shadow-sm">Absen Guru</h1>

      {/* Jam Digital */}
      <div className="flex flex-col items-center justify-center py-6 bg-sky-500 text-white shadow-md">
        <div className="text-6xl font-mono font-bold tracking-wider drop-shadow-md">{currentTime}</div>
        <p className="mt-2 text-sm opacity-90">Waktu saat ini</p>
      </div>

      {/* Kontainer utama */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Kiri - Map */}
        <div className="bg-white shadow-md border border-gray-200 p-1 pb-4 flex flex-col rounded-xl">
          <div className="flex-1">
            <div className="w-full h-72">
              {position ? <MapView lat={position[0]} lng={position[1]} /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">Peta akan muncul setelah lokasi terdeteksi</div>}
            </div>
          </div>
          <button onClick={handleDetectLocation} className="mt-4 bg-sky-600 hover:bg-sky-700 text-white mx-5 py-2 rounded-lg transition">
            Deteksi Lokasi
          </button>
        </div>

        {/* Kanan - Kamera dan Aksi Kehadiran */}
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg mb-3 text-sky-700">Bukti Kehadiran</h2>
            <button onClick={handleOpenCamera} className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
              <Camera className="w-5 h-5" />
              Buka Kamera
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-lg mb-3 text-sky-700">Aksi Kehadiran</h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAbsenMasuk}
                disabled={isPresent}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg text-white transition ${isPresent ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
              >
                <LogIn className="w-5 h-5" />
                Absen Masuk
              </button>
              <button
                onClick={handleAbsenKeluar}
                disabled={!isPresent}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg text-white transition ${!isPresent ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
              >
                <LogOut className="w-5 h-5" />
                Absen Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
