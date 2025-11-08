"use client";

import { useState } from "react";
import { User, ArrowBigUp } from "lucide-react";
import CommentReply from "./CommentReply";

interface Comment {
  id: number;
  nama: string;
  role: string;
  waktu: string;
  isi: string;
  like: number;
  reply: string;
}

export default function CommentList() {
  const comments: Comment[] = [
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
      reply: "Risa Febrianti dan 5 orang lainnya membalas...",
    },
  ];

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  // Tentukan warna berdasarkan nomor kelompok
  const getBadgeColor = (role: string): string => {
    if (role.includes("1")) return "bg-sky-600";
    if (role.includes("2")) return "bg-green-600";
    if (role.includes("3")) return "bg-amber-600";
    if (role.includes("4")) return "bg-purple-600";
    if (role.includes("5")) return "bg-pink-600";
    return "bg-gray-600";
  };

  return (
    <div className="mt-5">
      <h3 className="text-base font-semibold text-gray-800 mb-3">Diskusi</h3>

      {comments.map((c) => (
        <div key={c.id} className="flex items-start gap-3 mb-5">
          {/* Avatar */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-sm">
            <User className="w-5 h-5" />
          </div>

          {/* Konten Komentar */}
          <div className="flex-1">
            <div className="bg-gray-200 rounded-lg p-3">
              <p className="font-semibold text-gray-800 text-sm">
                {c.nama} <span className={`text-[11px] ${getBadgeColor(c.role)} text-white px-2 py-0.5 rounded-md ml-1`}>{c.role}</span>
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
              <button type="button" className="cursor-pointer hover:text-sky-600 font-medium" onClick={() => setSelectedComment(c)}>
                Balas
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2 italic cursor-pointer hover:text-sky-600" onClick={() => setSelectedComment(c)}>
              {c.reply}
            </p>
          </div>
        </div>
      ))}

      {selectedComment && <CommentReply comment={selectedComment} onClose={() => setSelectedComment(null)} />}
    </div>
  );
}
