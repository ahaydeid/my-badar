"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Camera, MapPin, Check, LogOut, Loader2 } from "lucide-react";

const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

export default function AbsenGuruPage() {
  const [currentTime, setCurrentTime] = useState<string>("--:--:--");
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [waktuMasuk, setWaktuMasuk] = useState<string>("");
  const [waktuKeluar, setWaktuKeluar] = useState<string>("");
  const [isTerlambat, setIsTerlambat] = useState<boolean>(false);
  const [sudahMasuk, setSudahMasuk] = useState<boolean>(false);
  const [isDetecting, setIsDetecting] = useState<boolean>(false); // 👈 tambahan untuk spinner

  // Jadwal dummy (2 kelas)
  const jadwalHariIni = [
    { id: 1, kelas: "12 MPLB 1", mulai: "07:30", selesai: "09:00" },
    { id: 2, kelas: "11 AKL 2", mulai: "09:15", selesai: "11:15" },
  ];

  const jamMulaiPertama = jadwalHariIni[0].mulai;
  const jamSelesaiTerakhir = jadwalHariIni[jadwalHariIni.length - 1].selesai;

  // Waktu realtime
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

  const handleDetectLocation = (): void => {
    setIsDetecting(true); // mulai deteksi
    if (!navigator.geolocation) {
      alert("Browser tidak mendukung geolokasi.");
      setIsDetecting(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setIsDetecting(false); // selesai deteksi
      },
      () => {
        alert("Gagal mendeteksi lokasi.");
        setIsDetecting(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleOpenCamera = () => {
    alert("Fitur kamera akan dibuka (dummy).");
  };

  const handleAbsenMasuk = () => {
    const now = new Date();
    const waktuSekarang = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setWaktuMasuk(waktuSekarang);

    const [jamMulai, menitMulai] = jamMulaiPertama.split(":").map(Number);
    const jamSekarang = now.getHours();
    const menitSekarang = now.getMinutes();

    if (jamSekarang > jamMulai || (jamSekarang === jamMulai && menitSekarang > menitMulai)) {
      setIsTerlambat(true);
    } else {
      setIsTerlambat(false);
    }

    setSudahMasuk(true);
  };

  const handleAbsenKeluar = () => {
    const now = new Date();
    const waktuSekarang = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setWaktuKeluar(waktuSekarang);
    alert("Absen keluar dicatat (dummy).");
  };

  const bolehKeluar = (() => {
    const [jamAkhir, menitAkhir] = jamSelesaiTerakhir.split(":").map(Number);
    const now = new Date();
    const jamNow = now.getHours();
    const menitNow = now.getMinutes();
    return jamNow > jamAkhir || (jamNow === jamAkhir && menitNow >= menitAkhir);
  })();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <h1 className="sticky top-0 z-20 bg-white text-center text-[20px] font-extrabold py-3 border-b border-gray-200 shadow-sm">Absen Guru</h1>

      {/* Jam Digital */}
      <div className="flex flex-col items-center justify-center py-6 bg-[#009BFF] text-white shadow-md">
        <div className="text-[48px] md:text-[56px] font-mono font-extrabold tracking-widest drop-shadow-sm">{currentTime}</div>
        <p className="mt-2 text-sm opacity-90">waktu saat ini</p>
      </div>

      {/* Peta */}
      <div className="max-w-md mx-auto mt-4 px-2">
        {/* Peta */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
          <div className="h-[280px] relative flex items-center justify-center">
            {isDetecting ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 text-sm">
                <Loader2 className="w-8 h-8 mb-2 animate-spin text-sky-600" />
                <p>Mendeteksi lokasi...</p>
              </div>
            ) : position ? (
              <MapView lat={position[0]} lng={position[1]} />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 text-sm">
                <p>Deteksi lokasi untuk mendapat titik koordinat</p>
              </div>
            )}
          </div>
        </div>

        {/* Tombol aksi atas */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className={`flex-1 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition ${isDetecting ? "bg-sky-300 cursor-not-allowed text-white" : "bg-[#009BFF] hover:bg-sky-600 text-white"}`}
          >
            <MapPin className="w-5 h-5" />
            {isDetecting ? "Mendeteksi..." : "Deteksi Lokasi"}
          </button>

          {/* Tombol Kamera hanya muncul sebelum absen masuk */}
          {!sudahMasuk && (
            <button onClick={handleOpenCamera} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg border flex items-center justify-center gap-2 transition">
              <Camera className="w-5 h-5" />
              Kamera
            </button>
          )}
        </div>

        {/* --- Tombol Absen Masuk & Keluar --- */}
        <div className="mt-5 flex gap-2">
          {/* Masuk */}
          <div className="flex-1 bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3">
              <div className="text-center flex-1">
                <p className="text-[18px] font-bold text-gray-800">{jamMulaiPertama}</p>
                <p className="text-[12px] text-gray-500">Mulai</p>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-center flex-1">
                <p className="text-[18px] font-bold text-gray-800">{waktuMasuk || "--:--"}</p>
                <p className="text-[12px] text-gray-500">Masuk</p>
              </div>
            </div>

            <button
              onClick={handleAbsenMasuk}
              disabled={sudahMasuk}
              className={`w-full py-2 rounded-b-xl text-white text-lg font-semibold transition flex items-center justify-center gap-2 ${sudahMasuk ? (isTerlambat ? "bg-red-600" : "bg-green-500") : "bg-green-500 hover:bg-green-700"}`}
            >
              {sudahMasuk ? isTerlambat ? "Terlambat!" : <Check className="w-6 h-6 text-white" /> : "Masuk"}
            </button>
          </div>

          {/* Keluar */}
          <div className="flex-1 bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3">
              <div className="text-center flex-1">
                <p className="text-[18px] font-bold text-gray-800">{jamSelesaiTerakhir}</p>
                <p className="text-[12px] text-gray-500">Selesai</p>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-center flex-1">
                <p className="text-[18px] font-bold text-gray-800">{waktuKeluar || "--:--"}</p>
                <p className="text-[12px] text-gray-500">Keluar</p>
              </div>
            </div>

            <button
              onClick={handleAbsenKeluar}
              disabled={!sudahMasuk || !bolehKeluar}
              className={`w-full py-2 rounded-b-xl text-white text-lg font-semibold transition flex items-center justify-center gap-2 ${!sudahMasuk || !bolehKeluar ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
            >
              <LogOut className="w-5 h-5" />
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
