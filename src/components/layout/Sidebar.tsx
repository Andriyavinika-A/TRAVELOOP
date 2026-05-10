"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Map, Plus, Compass, Activity,
  Wallet, Package, StickyNote, Users, Settings,
  LogOut, Plane, ChevronLeft, ChevronRight, Sparkles
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard",    href: "/dashboard",  icon: LayoutDashboard },
  { label: "My Trips",     href: "/trips",       icon: Map },
  { label: "Create Trip",  href: "/create",      icon: Plus, badge: "AI" },
  { label: "Cities",       href: "/cities",      icon: Compass },
  { label: "Activities",   href: "/activities",  icon: Activity },
];
const toolItems = [
  { label: "Budget",  href: "/trips/trip-1/budget",   icon: Wallet },
  { label: "Packing", href: "/trips/trip-1/packing",  icon: Package },
  { label: "Notes",   href: "/trips/trip-1/notes",    icon: StickyNote },
];
const bottomItems = [
  { label: "Profile", href: "/profile", icon: Settings },
  { label: "Admin",   href: "/admin",   icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 236 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-screen shrink-0 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(13,11,20,0.97) 0%, rgba(6,5,9,0.98) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Top gradient line */}
      <div className="h-0.5 w-full" style={{ background: "var(--grad-primary)" }} />

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 animate-pulse-ring"
          style={{ background: "var(--grad-primary)" }}>
          <Plane className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }}
              className="font-black text-xl text-white overflow-hidden whitespace-nowrap"
              style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.03em" }}
            >
              Traveloop
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 z-20 w-6 h-6 rounded-full flex items-center justify-center"
        style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3 text-white/50" />
          : <ChevronLeft className="w-3 h-3 text-white/50" />}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2.5 pb-2 space-y-0.5">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest px-3 pt-2 pb-1.5">
            Main Menu
          </p>
        )}
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}
            title={collapsed ? item.label : undefined}
            className={cn("nav-item", isActive(item.href) && "active", collapsed && "justify-center px-0")}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 flex-1 overflow-hidden">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="badge badge-ai text-[9px] px-1.5 py-0.5">{item.badge}</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        ))}

        <div className="my-3">
          <div className="divider-aurora" />
        </div>

        {!collapsed && (
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest px-3 pb-1.5">
            Trip Tools
          </p>
        )}
        {toolItems.map((item) => (
          <Link key={item.href} href={item.href}
            title={collapsed ? item.label : undefined}
            className={cn("nav-item", pathname.includes(item.label.toLowerCase()) && "active", collapsed && "justify-center px-0")}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2.5 pb-4 space-y-0.5 border-t border-white/5 pt-2">
        {bottomItems.map((item) => (
          <Link key={item.href} href={item.href}
            title={collapsed ? item.label : undefined}
            className={cn("nav-item", isActive(item.href) && "active", collapsed && "justify-center px-0")}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
        <button
          title={collapsed ? "Logout" : undefined}
          className={cn("nav-item w-full", collapsed && "justify-center px-0")}
          style={{ color: "rgba(244,63,94,0.7)" }}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
