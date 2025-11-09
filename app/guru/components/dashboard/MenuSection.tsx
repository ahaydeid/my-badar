"use client";

import Link from "next/link";
import { BookOpen, MessagesSquare, BookOpenText, CalendarClock, Layers, Calendar, Megaphone } from "lucide-react";

type Menu = {
  title: string;
  icon: React.ReactNode;
  href: string;
  bgColor: string;
};

export default function MenuSection() {
  const menus: Menu[] = [
    { title: "Materi", icon: <BookOpenText className="w-7 h-7 text-blue-500" />, href: "/guru/materi-diskusi", bgColor: "bg-blue-50" },
    { title: "Tugas", icon: <MessagesSquare className="w-7 h-7 text-blue-500" />, href: "/guru/tugas-diskusi", bgColor: "bg-blue-50" },
    { title: "Kelas", icon: <BookOpen className="w-7 h-7 text-sky-600" />, href: "/guru/kelas", bgColor: "bg-sky-50" },
    { title: "Jadwal", icon: <Calendar className="w-7 h-7 text-amber-500" />, href: "/guru/schedule", bgColor: "bg-amber-50" },
    { title: "Log Absen & Nilai", icon: <CalendarClock className="w-7 h-7 text-rose-600" />, href: "/guru/log-absen-nilai", bgColor: "bg-rose-50" },
    { title: "Lihat Modul", icon: <Layers className="w-7 h-7 text-lime-600" />, href: "/guru/module", bgColor: "bg-lime-50" },
    { title: "Pengumuman", icon: <Megaphone className="w-7 h-7 text-gray-800" />, href: "/guru/pengumuman", bgColor: "bg-gray-100" },
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
