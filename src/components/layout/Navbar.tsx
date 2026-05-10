"use client";
import { Bell, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { MOCK_USER } from "@/lib/mockData";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 flex items-center gap-4 px-6 shrink-0"
      style={{
        background: "rgba(6,5,9,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(255,255,255,0.25)" }} />
          <input
            type="text"
            placeholder="Search trips, cities, activities..."
            className="input-aurora pl-10 pr-4 py-2 text-sm w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5 ml-auto">
        {/* Theme toggle */}
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>

        {/* Notifications */}
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          className="w-9 h-9 rounded-xl flex items-center justify-center relative"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "var(--grad-rose)" }} />
        </motion.button>

        {/* Divider */}
        <div className="w-px h-6" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* User */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl overflow-hidden"
              style={{ border: "2px solid rgba(124,58,237,0.4)" }}>
              <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-full h-full object-cover" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: "#10B981", borderColor: "var(--bg-base)" }} />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-white leading-none">{MOCK_USER.name}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{MOCK_USER.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
