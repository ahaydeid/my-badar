"use client";

import Link from "next/link";
import { BookOpen, MessagesSquare, CalendarClock, NotebookPen, FileBarChart, Layers, Calendar, Megaphone } from "lucide-react";

type Menu = {
  title: string;
  icon: React.ReactNode;
  href: string;
  bgColor: string;
};

export default function MenuSection() {
  const menus: Menu[] = [
    { title: "Kelas", icon: <BookOpen className="w-7 h-7 text-sky-600" />, href: "/kelas", bgColor: "bg-sky-50" },
    { title: "Tugas & Diskusi", icon: <MessagesSquare className="w-7 h-7 text-blue-500" />, href: "/tugas", bgColor: "bg-blue-50" },
    { title: "Log Absen", icon: <CalendarClock className="w-7 h-7 text-rose-600" />, href: "/log-absen", bgColor: "bg-rose-50" },
    { title: "Log Nilai", icon: <NotebookPen className="w-7 h-7 text-indigo-500" />, href: "/log-nilai", bgColor: "bg-indigo-50" },
    { title: "Export Laporan", icon: <FileBarChart className="w-7 h-7 text-cyan-500" />, href: "/laporan", bgColor: "bg-cyan-50" },
    { title: "Lihat Modul", icon: <Layers className="w-7 h-7 text-lime-600" />, href: "/modul", bgColor: "bg-lime-50" },
    { title: "Jadwal", icon: <Calendar className="w-7 h-7 text-amber-500" />, href: "/jadwal", bgColor: "bg-amber-50" },
    { title: "Pengumuman", icon: <Megaphone className="w-7 h-7 text-gray-800" />, href: "/pengumuman", bgColor: "bg-gray-100" },
  ];

  return (
    <section className="relative z-20 bg-white rounded-2xl p-5 grid grid-cols-4 gap-5 -mt-10 mx-4 border border-gray-200 shadow-xs">
      {menus.map((menu) => (
        <Link key={menu.title} href={menu.href} aria-label={menu.title} className="flex flex-col items-center text-center text-sm text-gray-700 hover:opacity-80 transition-all duration-200">
          <div className={`w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm ${menu.bgColor}`}>{menu.icon}</div>
          <span className="mt-2 text-[13px] font-medium">{menu.title}</span>
        </Link>
      ))}
    </section>
  );
}
