import Link from "next/link";

export const metadata = {
  title: "Admin | Sistem Absensi",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900">
      {/* Navbar Admin */}
      <nav className="flex items-center justify-between bg-gray-800 px-6 py-4 text-white">
        <h1 className="font-semibold">Panel Admin</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/admin" className="hover:underline">
            Beranda
          </Link>
          <Link href="/admin/guru" className="hover:underline">
            Data Guru
          </Link>
          <Link href="/admin/siswa" className="hover:underline">
            Data Siswa
          </Link>
          <Link href="/admin/jadwal" className="hover:underline">
            Jadwal
          </Link>
          <Link href="/admin/absen" className="hover:underline">
            Absensi
          </Link>
          <Link href="/admin/pengaturan" className="hover:underline">
            Pengaturan
          </Link>
        </div>
      </nav>

      <main className="flex-1 p-6">{children}</main>

      <footer className="p-4 text-center text-sm text-zinc-500 border-t dark:border-zinc-700">
        © {new Date().getFullYear()} Panel Admin
      </footer>
    </div>
  );
}
