"use client";

import { User, ArrowBigUp } from "lucide-react";

export default function CommentList() {
  const comments = [
    {
      id: 1,
      nama: "Putri Salju",
      role: "kelompok 4",
      waktu: "2 jam",
      isi: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      like: 26,
      reply: "Putra Saputra dan 14 orang lainnya membalas...",
    },
    {
      id: 2,
      nama: "Rian Saputra",
      role: "kelompok 2",
      waktu: "3 jam",
      isi: "Setuju, menurut saya juga begitu!",
      like: 14,
      reply: "5 orang lainnya membalas...",
    },
  ];

  return (
    <div className="mt-5">
      <h3 className="text-base font-semibold text-gray-800 mb-3">Diskusi</h3>

      {comments.map((c) => (
        <div key={c.id} className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-sm">
            <User className="w-5 h-5" />
          </div>

          {/* Konten Komentar */}
          <div className="flex-1">
            <div className="bg-gray-200 rounded-lg p-3">
              <p className="font-semibold text-gray-800 text-sm">
                {c.nama} <span className="text-[11px] bg-green-600 text-white px-2 py-0.5 rounded-md ml-1">{c.role}</span>
              </p>
              <p className="text-sm text-gray-700 mt-1 leading-snug">{c.isi}</p>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
              <span>{c.waktu}</span>

              {/* Naik (upvote) */}
              <button type="button" aria-label="Naikkan komentar" className="inline-flex items-center gap-1 text-gray-500 border border-gray-500 px-2 py-0.5 rounded-xl hover:bg-sky-600 hover:text-white transition-colors">
                <ArrowBigUp className="w-4 h-4" />
                <span className="font-medium">{c.like}</span>
              </button>

              {/* Balas */}
              <button type="button" className="cursor-pointer hover:text-sky-600 font-medium">
                Balas
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-1 italic">{c.reply}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
