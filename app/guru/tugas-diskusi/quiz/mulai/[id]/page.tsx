"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const dummyQuiz = {
  id: "quiz-1",
  judul: "Quiz 1: Etika Komunikasi Bisnis",
  durasi: 1,
  soal: [
    {
      id: 1,
      pertanyaan: "Apa tujuan utama komunikasi bisnis?",
      pilihan: ["Meningkatkan hubungan sosial", "Meningkatkan efektivitas kerja dan pemahaman informasi", "Meningkatkan hiburan di kantor", "Mengurangi interaksi antar divisi"],
      jawabanBenar: "Meningkatkan efektivitas kerja dan pemahaman informasi",
    },
    {
      id: 2,
      pertanyaan: "Yang termasuk komunikasi formal adalah?",
      pilihan: ["Rapat divisi", "Ngobrol di kantin", "Chat pribadi", "Gosip antar karyawan"],
      jawabanBenar: "Rapat divisi",
    },
    {
      id: 3,
      pertanyaan: "Salah satu prinsip komunikasi efektif adalah?",
      pilihan: ["Bersifat pasif", "Tidak sopan", "Jelas dan sopan", "Menghindari kejujuran"],
      jawabanBenar: "Jelas dan sopan",
    },
  ],
};

export default function QuizPage() {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(dummyQuiz.durasi * 60);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);
  const [unanswered, setUnanswered] = useState<number[]>([]);
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  const handleAutoSubmit = useCallback(() => {
    if (autoSubmitted) return;
    setAutoSubmitted(true);
    setShowTimeoutModal(true);
    alert("Waktu habis, jawaban sudah tersimpan otomatis!");
  }, [autoSubmitted]);

  useEffect(() => {
    if (timeLeft <= 0) {
      const timeout = setTimeout(() => handleAutoSubmit(), 0);
      return () => clearTimeout(timeout);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleAutoSubmit]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const pesan = "Kamu hanya punya kesempatan 1x, yakin ingin keluar?";
      e.preventDefault();
      Object.defineProperty(e, "returnValue", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: pesan,
      });
      return pesan;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleSelect = (id: number, jawaban: string) => {
    setAnswers((prev) => ({ ...prev, [id]: jawaban }));
  };

  const handleFinish = () => {
    const kosong = dummyQuiz.soal.filter((s) => !answers[s.id]).map((s) => s.id);
    setUnanswered(kosong);
    setShowConfirmFinish(true);
  };

  // ...
  const confirmFinish = () => {
    setShowConfirmFinish(false);

    // Hitung jawaban benar dan salah
    let benar = 0;
    const detailHasil: string[] = [];

    dummyQuiz.soal.forEach((s) => {
      if (answers[s.id]) {
        if (answers[s.id] === s.jawabanBenar) {
          benar++;
          detailHasil.push(`Soal ${s.id}: Benar`);
        } else {
          detailHasil.push(`Soal ${s.id}: Salah`);
        }
      } else {
        detailHasil.push(`Soal ${s.id}: Tidak dijawab`);
      }
    });

    const total = dummyQuiz.soal.length;
    const skor = Math.round((benar / total) * 100);

    alert(`Hasil Quiz:\n\nTotal Soal: ${total}\nBenar: ${benar}\n\nSkor: ${skor}`);

    router.push(`/guru/tugas-diskusi/detail/${dummyQuiz.id}`);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section className="min-h-screen bg-gray-50 pb-18">
      <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center z-50">
        <h2 className="text-sm font-semibold text-gray-800">{dummyQuiz.judul}</h2>
        <span className={`font-semibold ${timeLeft <= 180 ? "text-red-500" : "text-gray-700"}`}>{formatTime(timeLeft)}</span>
      </header>

      <div className="space-y-2">
        {dummyQuiz.soal.map((s, i) => (
          <div key={s.id} className="bg-white p-4 border-y border-gray-300">
            <p className="font-medium text-gray-800 mb-3">
              {i + 1}. {s.pertanyaan}
            </p>
            <div className="space-y-2">
              {s.pilihan.map((p, idx) => (
                <label key={idx} className={`block text-sm border rounded-md px-3 py-1 cursor-pointer transition ${answers[s.id] === p ? "border-sky-500 bg-sky-50" : "border-gray-200 hover:bg-gray-50"}`}>
                  <input type="radio" name={`soal-${s.id}`} value={p} checked={answers[s.id] === p} onChange={() => handleSelect(s.id, p)} className="hidden" />
                  {p}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-2 mt-3 flex justify-center">
        <button onClick={handleFinish} className="w-full max-w-sm bg-sky-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition">
          Selesai
        </button>
      </div>

      {showTimeoutModal && (
        <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Waktu habis</h3>
            <p className="text-sm text-gray-600 mb-4">Jawabanmu telah tersimpan otomatis.</p>
            <button onClick={() => setShowTimeoutModal(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
              Oke
            </button>
          </div>
        </div>
      )}

      {showConfirmFinish && (
        <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Yakin ingin menyelesaikan?</h3>
            {unanswered.length > 0 ? <p className="text-sm text-gray-600 mb-4">Soal {unanswered.join(", ")} belum terisi.</p> : <p className="text-sm text-gray-600 mb-4">Semua soal sudah dijawab.</p>}
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowConfirmFinish(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Batal
              </button>
              <button onClick={confirmFinish} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
                Ya, selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
