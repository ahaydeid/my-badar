"use client";

import { Eye, Pin, MessageSquare, ArrowLeft, X, User } from "lucide-react";
import { useState } from "react";
import CommentInput from "../../comps/CommentInput";
import CommentList from "../../comps/CommentList";
import MateriGambar from "../../comps/MateriGambar";
import MateriPdf from "../../comps/MateriPdf";
import MateriYoutube from "../../comps/MateriYoutube"; // ✅ import komponen baru

// ======== TYPES ========
type MateriGambarType = {
  jenis: "gambar";
  kelas: string;
  kategori: string;
  judul: string;
  deskripsi: string;
  stats: { lihat: number; pin: number; komentar: number };
  gambarList: string[];
};

type MateriPdfType = {
  jenis: "pdf";
  kelas: string;
  kategori: string;
  judul: string;
  deskripsi: string;
  stats: { lihat: number; pin: number; komentar: number };
  fileUrl: string;
};

type MateriVideoType = {
  jenis: "video";
  kelas: string;
  kategori: string;
  judul: string;
  deskripsi: string;
  stats: { lihat: number; pin: number; komentar: number };
  videoList: string[];
};

type Materi = MateriGambarType | MateriPdfType | MateriVideoType;

// ======== MAIN COMPONENT ========
export default function DetailMateriKelas() {
  const tipe = "pdf" as "gambar" | "pdf" | "video";

  let materi: Materi;

  switch (tipe) {
    case "gambar":
      materi = {
        jenis: "gambar",
        kelas: "12 MPLB 2",
        kategori: "Modul Pembelajaran",
        judul: "Materi 4: Komunikasi Bisnis",
        deskripsi:
          "Pelajari dasar-dasar komunikasi bisnis yang efektif dan profesional di lingkungan kerja. Materi ini membahas cara menyampaikan pesan dengan jelas, sopan, dan meyakinkan, baik secara lisan maupun tulisan. Dapatkan pemahaman tentang etika komunikasi, hubungan kerja profesional, serta strategi membangun interaksi bisnis yang produktif dan harmonis.",
        stats: { lihat: 83, pin: 21, komentar: 36 },
        gambarList: ["/img/albadar.png", "/img/albadar-2.png"],
      };
      break;

    case "pdf":
      materi = {
        jenis: "pdf",
        kelas: "12 MPLB 2",
        kategori: "Modul Pembelajaran",
        judul: "Materi 5: Panduan CSS Lengkap",
        deskripsi:
          "Pelajari seluruh konsep penting CSS dari dasar hingga lanjutan dalam panduan ini. Bahasannya mencakup selektor, layout fleksibel, animasi, transisi, dan responsive design. Panduan ini dirancang agar kamu memahami prinsip visual yang konsisten, struktur stylesheet yang efisien, serta teknik modern dalam membangun antarmuka web yang menarik.",
        stats: { lihat: 124, pin: 45, komentar: 17 },
        fileUrl: "/file/CSS-Full.pdf",
      };
      break;

    case "video":
      materi = {
        jenis: "video",
        kelas: "12 MPLB 2",
        kategori: "Modul Pembelajaran",
        judul: "Materi 6: Pengantar Next.js",
        deskripsi:
          "Video pembelajaran ini akan membantu kamu memahami konsep dasar Next.js, framework modern untuk React. Bahasannya meliputi routing, data fetching, hingga optimasi performa. Disajikan dengan pendekatan praktis agar mudah dipahami oleh siswa dan pengembang web pemula.",
        stats: { lihat: 200, pin: 52, komentar: 28 },
        videoList: ["https://www.youtube.com/embed/0-qel-dM0tQ", "https://www.youtube.com/embed/TBzQjduO8jo"],
      };
      break;

    default:
      throw new Error("Jenis materi tidak dikenal");
  }

  const [showModal, setShowModal] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const siswaNotes = [
    "Putri Salju",
    "Rian Saputra",
    "Budi Santoso",
    "Siti Rahma",
    "Andi Pratama",
    "Laila Nurul",
    "Ahmad Firdaus",
    "Nabila Zahra",
    "Fajar Nugraha",
    "Dewi Anggraini",
    "Reza Pahlevi",
    "Intan Maharani",
    "Doni Saputra",
    "Rizky Maulana",
    "Tania Oktaviani",
    "Galih Prakoso",
    "Anisa Rahmadani",
    "Bagus Kurniawan",
    "Citra Lestari",
    "Yusuf Alamsyah",
    "Lutfi Ramadhan",
  ];

  const renderMateri = (m: Materi) => {
    if (m.jenis === "gambar") {
      return <MateriGambar judul={m.judul} deskripsi={m.deskripsi} gambarList={m.gambarList} onOpenDetail={() => setShowFullDesc(!showFullDesc)} showFullDesc={showFullDesc} />;
    }
    if (m.jenis === "pdf") {
      return <MateriPdf judul={m.judul} deskripsi={m.deskripsi} fileUrl={m.fileUrl} onOpenDetail={() => setShowFullDesc(!showFullDesc)} showFullDesc={showFullDesc} />;
    }
    if (m.jenis === "video") {
      return <MateriYoutube judul={m.judul} deskripsi={m.deskripsi} videoList={m.videoList} onOpenDetail={() => setShowFullDesc(!showFullDesc)} showFullDesc={showFullDesc} />;
    }
  };

  return (
    <section className="w-full pb-10 bg-gray-50 shadow-sm border border-gray-200 overflow-clip">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={() => window.history.back()} className="text-gray-700 hover:text-violet-600 transition-colors" aria-label="Kembali">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-[16px] font-bold text-gray-800 text-center flex-1">{materi.judul}</h2>
        <div className="w-5" />
      </div>

      {/* Konten */}
      <div className="px-4 pb-4">
        <div className="-mx-4">{renderMateri(materi)}</div>

        {/* Statistik dan note */}
        <div className="flex flex-wrap items-center gap-3 bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 mt-4">
          <button className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg px-4 py-1 hover:shadow-sm transition-all">
            <Pin className="w-4 h-4" />
            Note
          </button>

          <div className="flex items-center gap-4 ml-3">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {materi.stats.lihat}
            </div>

            <div className="flex items-center gap-1 cursor-pointer hover:text-violet-600 transition-colors" onClick={() => setShowModal(true)}>
              <Pin className="w-4 h-4" /> {materi.stats.pin}
            </div>

            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" /> {materi.stats.komentar}
            </div>
          </div>
        </div>

        <CommentInput />
        <CommentList />
      </div>

      {/* Modal daftar siswa Note */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center z-50 px-3">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition" aria-label="Tutup">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-center text-lg font-semibold text-gray-800 mb-3">Siswa yang memberi Note</h2>

            <div className="space-y-2 max-h-100 overflow-y-auto">
              {siswaNotes.map((nama, i) => (
                <div key={i} className="flex items-center gap-3 px-1 py-2 hover:bg-violet-50 transition">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <User className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-800 font-medium">{nama}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
