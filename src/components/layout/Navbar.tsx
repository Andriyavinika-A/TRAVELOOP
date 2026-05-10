"use client";
import { Bell, Search, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Image from "next/image";
import { MOCK_USER } from "@/lib/mockData";

interface NavbarProps {
  title?: string;
}

export default function Navbar({ title = "Dashboard" }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center gap-4 px-6 shrink-0"
      style={{ background: "rgba(5, 13, 26, 0.5)" }}>
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search trips, cities, activities..."
            className="w-full pl-10 pr-4 py-2 text-sm input-glass"
            style={{ fontSize: "0.875rem" }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors relative"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500" />
        </motion.button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500/30 group-hover:border-blue-500/60 transition-colors">
            <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white leading-none">{MOCK_USER.name}</p>
            <p className="text-xs text-white/40 mt-0.5">{MOCK_USER.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
