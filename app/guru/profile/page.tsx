"use client";

import { User, KeyRound, Bell, HelpCircle, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

  const handleLogout = () => {
    alert("Anda telah logout (dummy).");
    router.push("/login");
  };

  const menus = [
    { id: 1, name: "Profil Saya", icon: <User className="w-5 h-5 text-gray-600" />, action: () => router.push("/guru/profile/detail") },
    { id: 2, name: "Ganti Kata Sandi", icon: <KeyRound className="w-5 h-5 text-gray-600" />, action: () => router.push("/guru/profile/change-password") },
    { id: 3, name: "Notifikasi", icon: <Bell className="w-5 h-5 text-gray-600" />, action: () => router.push("/guru/profile/notifications") },
    { id: 4, name: "Pengaturan", icon: <Settings className="w-5 h-5 text-gray-600" />, action: () => router.push("/guru/profile/settings") },
    { id: 5, name: "Bantuan", icon: <HelpCircle className="w-5 h-5 text-gray-600" />, action: () => router.push("/guru/profile/help") },
    { id: 6, name: "Logout", icon: <LogOut className="w-5 h-5 text-red-600" />, action: handleLogout },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white text-center text-2xl md:text-[22px] font-extrabold py-4 border-b border-gray-200 shadow-sm">Profile</header>

      {/* Profile summary section */}
      <section className="w-full flex flex-col md:flex-row md:items-center bg-white border-b border-gray-200 py-3 px-3 md:px-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 text-2xl font-bold">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Guru Pengajar</h2>
            <p className="text-sm text-gray-600">SMK Al Badar Dangdeur</p>
          </div>
        </div>
        <div className="hidden md:block mt-4 md:mt-0 text-sm text-gray-400">Terakhir login: 06 Nov 2025</div>
      </section>

      {/* Main content (menu list) */}
      <main className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <button key={menu.id} onClick={menu.action} className={`flex items-center justify-between w-full text-left px-5 py-4 bg-white hover:bg-gray-50 transition ${menu.name === "Logout" ? "hover:bg-red-50" : ""}`}>
              <div className="flex items-center gap-3">
                {menu.icon}
                <span className={`text-base ${menu.name === "Logout" ? "text-red-600" : "text-gray-800 font-medium"}`}>{menu.name}</span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
