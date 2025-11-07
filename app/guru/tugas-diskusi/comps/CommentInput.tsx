"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export default function CommentInput() {
  const [comment, setComment] = useState("");

  return (
    <div className="flex items-center gap-2 border-t border-gray-200 pt-3 mt-3">
      <textarea
        value={comment}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
        placeholder="Tulis komentar..."
        className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
      ></textarea>

      <button type="button" className="bg-sky-500 hover:bg-sky-600 text-white p-2.5 rounded-full shadow-md transition-all">
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
