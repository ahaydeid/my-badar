"use client";

import { useState, useRef } from "react";
import { User, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

interface Comment {
  id: number;
  nama: string;
  role: string;
  waktu: string;
  isi: string;
  like: number;
  reply: string;
}

interface Reply {
  id: number;
  nama: string;
  isi: string;
}

interface CommentReplyProps {
  comment: Comment;
  onClose: () => void;
}

export default function CommentReply({ comment, onClose }: CommentReplyProps) {
  const replies: Reply[] = [
    {
      id: 1,
      nama: "Putra Saputra",
      isi: "Saya setuju banget, ini memang hal yang sering terjadi di kelompok kita.",
    },
    {
      id: 2,
      nama: "Risa Febrianti",
      isi: "@Putra Saputra benar! Saya juga pernah mengalami hal serupa kemarin.",
    },
  ];

  const [replyText, setReplyText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleReplyClick = (nama: string) => {
    setReplyText(`@${nama} `);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleMainReplyClick = () => {
    setReplyText("");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleCommentReply = () => {
    if (!replyText.trim()) return;
    alert(`Komentar terkirim: ${replyText}`);
    setReplyText("");
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-[2px] flex justify-center items-center z-50 px-3">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl relative flex flex-col max-h-screen overflow-hidden">
        {/* Tombol tutup */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition" aria-label="Tutup">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-5 pb-2 shadow">
          <h2 className="text-center text-lg font-semibold text-gray-800">Balasan komentar</h2>
        </div>

        {/* Area scroll mencakup komentar utama + semua balasan */}
        <div className="flex-1 overflow-y-auto px-5 space-y-4">
          {/* Komentar utama */}
          <div className="flex items-start gap-3 pt-5">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-sm">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="font-semibold text-gray-800 text-sm">{comment.nama}</p>
                <p className="text-sm text-gray-700 mt-1 leading-snug">{comment.isi}</p>
              </div>

              {/* Tombol aksi */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                <button type="button" className="inline-flex items-center gap-1 border border-gray-400 px-2 py-0.5 rounded-lg hover:bg-sky-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M12 19V6M5 12l7-7 7 7" />
                  </svg>
                  <span className="font-medium text-gray-600">24</span>
                </button>

                <button type="button" className="cursor-pointer hover:text-sky-600 font-medium" onClick={handleMainReplyClick}>
                  Balas
                </button>
              </div>
            </div>
          </div>

          {/* Balasan komentar */}
          {replies.map((r) => (
            <div key={r.id} className="flex items-start gap-3 pl-10 rounded-lg transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-sky-50 text-sky-600 mt-1">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-2">
                  <p className="font-semibold text-gray-800 text-sm">{r.nama}</p>
                  <p className="text-sm text-gray-700 mt-0.5 leading-snug">
                    {r.isi.split(/(@\w+(?:\s\w+)?)/g).map((part, i) =>
                      part.startsWith("@") ? (
                        <span key={i} className="text-sky-600 font-medium">
                          {part}
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </p>
                </div>
                <div className="mt-1">
                  <button type="button" className="text-xs text-gray-500 hover:text-sky-600 font-medium" onClick={() => handleReplyClick(r.nama)}>
                    Balas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input sticky di bawah */}
        <div className="sticky bottom-0 left-0 w-full rounded-b-xl bg-white border-t border-gray-200 px-5 py-3 flex items-end gap-2">
          <TextareaAutosize
            ref={textareaRef}
            minRows={1}
            maxRows={6}
            placeholder="Tulis balasan..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 resize-none text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="button"
            disabled={!replyText.trim()}
            onClick={handleCommentReply}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${replyText.trim() ? "bg-sky-600 text-white hover:bg-sky-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
