"use client";

import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function CommentInput() {
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () => {
    if (!comment.trim()) return;
    alert(`Komentar dikirim: ${comment}`);
    setComment("");
  };

  // Fokus otomatis ke textarea saat dibuka
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="flex items-end gap-2 border-t border-gray-200 pt-3 mt-3">
      <TextareaAutosize
        ref={textareaRef}
        minRows={1}
        maxRows={6}
        placeholder="Tulis komentar..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 resize-none bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={!comment.trim()}
        className={`p-2.5 rounded-full shadow-md transition-all ${comment.trim() ? "bg-sky-500 hover:bg-sky-600 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
