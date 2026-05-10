"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Map, Plus, Compass, Activity,
  Wallet, Package, StickyNote, Users, Settings,
  Globe, LogOut, Plane, ChevronLeft, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Trips", href: "/trips", icon: Map },
  { label: "Create Trip", href: "/create", icon: Plus },
  { label: "Cities", href: "/cities", icon: Compass },
  { label: "Activities", href: "/activities", icon: Activity },
];

const tripItems = [
  { label: "Budget", href: "/trips/trip-1/budget", icon: Wallet },
  { label: "Packing", href: "/trips/trip-1/packing", icon: Package },
  { label: "Notes", href: "/trips/trip-1/notes", icon: StickyNote },
];

const bottomItems = [
  { label: "Profile", href: "/profile", icon: Settings },
  { label: "Admin", href: "/admin", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col h-screen glass border-r border-white/5 overflow-hidden shrink-0"
      style={{ background: "rgba(5, 13, 26, 0.7)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "var(--gradient-primary)" }}>
          <Plane className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="font-bold text-xl text-white" style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Traveloop
          </motion.span>
        )}
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 z-10 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        style={{ background: "rgba(15,32,68,0.9)" }}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {/* Main nav */}
        <div className="mb-4">
          {!collapsed && <p className="text-xs text-white/30 px-2 mb-2 font-medium tracking-wider uppercase">Navigation</p>}
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}
                className={cn("sidebar-item", active && "active", collapsed && "justify-center px-2")}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {item.label === "Create Trip" && !collapsed && (
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded-md"
                    style={{ background: "rgba(59,130,246,0.2)", color: "#60a5fa" }}>AI</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Trip tools */}
        <div className="mb-4">
          {!collapsed && <p className="text-xs text-white/30 px-2 mb-2 font-medium tracking-wider uppercase">Trip Tools</p>}
          {tripItems.map((item) => {
            const active = pathname.includes(item.href.split("/trip-1")[1]);
            return (
              <Link key={item.href} href={item.href}
                className={cn("sidebar-item", active && "active", collapsed && "justify-center px-2")}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/5 space-y-1">
        {bottomItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={cn("sidebar-item", active && "active", collapsed && "justify-center px-2")}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
        <button className={cn("sidebar-item w-full text-red-400 hover:bg-red-400/10", collapsed && "justify-center px-2")}
          title={collapsed ? "Logout" : undefined}>
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
