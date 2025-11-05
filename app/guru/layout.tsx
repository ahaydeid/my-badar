// import Link from "next/link";

export const metadata = {
  title: "Guru | Sistem Absensi",
};

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900">
      <main className="flex-1">{children}</main>
    </div>
  );
}
