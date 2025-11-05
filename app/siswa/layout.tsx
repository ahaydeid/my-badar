import Link from "next/link";

export const metadata = {
  title: "Siswa | Sistem Absensi",
};

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900">
      {/* Navbar Siswa */}
      <nav className="flex items-center justify-between bg-green-600 px-6 py-4 text-white">
        <h1 className="font-semibold">Dashboard Siswa</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/siswa" className="hover:underline">
            Beranda
          </Link>
          <Link href="/siswa/jadwal" className="hover:underline">
            Jadwal
          </Link>
          <Link href="/siswa/absen" className="hover:underline">
            Absensi
          </Link>
          <Link href="/siswa/pengaturan" className="hover:underline">
            Pengaturan
          </Link>
        </div>
      </nav>

      <main className="flex-1 p-6">{children}</main>

      <footer className="p-4 text-center text-sm text-zinc-500 border-t dark:border-zinc-700">© {new Date().getFullYear()} Panel Siswa</footer>
    </div>
  );
}
