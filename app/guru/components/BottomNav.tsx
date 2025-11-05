"use client";

import { ReactElement, useState, useRef, useEffect, MouseEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, CalendarDays, Fingerprint, Info, User, LogOut } from "lucide-react";

type Item = "home" | "jadwal" | "absen" | "info" | "profile";

interface NavItem {
  id: Item;
  label: string;
  icon: ReactElement;
  href: string;
}

export default function BottomNav(): ReactElement | null {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  // === CLOSE DROPDOWN on click outside ===
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
    return () => document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
  }, []);

  // === HIDE on /login or special pages ===
  if (typeof pathname === "string" && pathname.startsWith("/login")) return null;
  const hideOnPaths = ["/some-fullscreen-page"];
  if (hideOnPaths.includes(pathname ?? "/")) return null;

  // === NAV ITEMS ===
  const items: NavItem[] = [
    { id: "home", label: "Home", icon: <Home className="w-6 h-6" />, href: "/guru" },
    { id: "jadwal", label: "Jadwal", icon: <CalendarDays className="w-6 h-6" />, href: "/guru/schedule" },
    { id: "absen", label: "Absen", icon: <Fingerprint className="w-6 h-6" />, href: "/guru/guru-attendance" },
    { id: "info", label: "Info", icon: <Info className="w-6 h-6" />, href: "/guru/info" },
    { id: "profile", label: "Profile", icon: <User className="w-6 h-6" />, href: "/guru/profile" },
  ];

  const handleProfileClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsProfileDropdownOpen((prev) => !prev);
  };

  // === Dummy Logout ===
  const handleLogout = async (e?: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e?.preventDefault();
    setIsProfileDropdownOpen(false);
    if (isSigningOut) return;
    setIsSigningOut(true);

    try {
      // simulasi delay logout
      await new Promise((r) => setTimeout(r, 600));
      console.log("User logged out (dummy)");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Gagal logout (dummy).");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="max-w-full mx-auto flex justify-between items-center h-15 px-4">
        {items.map((it) => {
          const isActive = pathname === it.href || (it.href === "/guru" && pathname === "/guru") || pathname?.startsWith(`${it.href}/`);

          if (it.id === "profile") {
            return (
              <div
                key={it.id}
                ref={profileRef}
                className={`flex-1 flex flex-col items-center justify-center text-xs py-2 transition relative cursor-pointer ${isActive || isProfileDropdownOpen ? "text-gray-900 font-medium" : "text-gray-500"}`}
                onClick={handleProfileClick}
              >
                <div>{it.icon}</div>
                <span className="mt-1">{it.label}</span>

                {isProfileDropdownOpen && (
                  <div className="absolute bottom-full mb-2 w-40 bg-white rounded-lg shadow-xl ring-opacity-5 overflow-hidden z-20 transform -translate-x-1/2 left-1/2">
                    <a href={it.href} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setIsProfileDropdownOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Profil Saya
                    </a>

                    <button onClick={handleLogout} disabled={isSigningOut} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-150 ease-in-out">
                      <LogOut className="w-4 h-4 mr-2" />
                      {isSigningOut ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                )}
              </div>
            );
          }

          return (
            <a key={it.id} href={it.href} className={`flex-1 flex flex-col items-center justify-center text-xs py-2 transition ${isActive ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"}`}>
              <div>{it.icon}</div>
              <span className="mt-1">{it.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
