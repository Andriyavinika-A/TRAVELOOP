"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { User, Mail, Lock, Globe, Camera, Trash2, BookmarkCheck, LogOut, Save } from "lucide-react";
import { MOCK_USER } from "@/lib/mockData";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const TABS = ["Profile", "Security", "Preferences", "Saved Places"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Japanese", "Hindi", "Arabic"];
const SAVED_DESTINATIONS = [
  { name: "Santorini", country: "Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200&q=80" },
  { name: "Kyoto", country: "Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&q=80" },
  { name: "Iceland", country: "Iceland", img: "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=200&q=80" },
];

export default function ProfilePage() {
  const [tab, setTab] = useState("Profile");
  const [profile, setProfile] = useState({ name: MOCK_USER.name, email: MOCK_USER.email, bio: MOCK_USER.bio });
  const [lang, setLang] = useState("English");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl space-y-6 pb-8">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Profile & Settings</h1>
        <p className="text-white/50 mt-1">Manage your account and preferences</p>
      </motion.div>

      {/* Avatar Card */}
      <motion.div variants={item} className="glass-card p-6 flex items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-blue-500/30">
            <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg flex items-center justify-center text-white"
            style={{ background: "var(--gradient-primary)" }}>
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{MOCK_USER.name}</h2>
          <p className="text-white/50 text-sm">{MOCK_USER.email}</p>
          <div className="flex gap-4 mt-2 text-sm text-white/40">
            <span><strong className="text-white">{MOCK_USER.trips_count}</strong> trips</span>
            <span><strong className="text-white">{MOCK_USER.countries_visited}</strong> countries</span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item} className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
            style={tab === t
              ? { background: "rgba(59,130,246,0.2)", color: "#60a5fa" }
              : { color: "rgba(255,255,255,0.5)" }
            }>{t}</button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div variants={item} className="glass-card p-6 space-y-5">
        {tab === "Profile" && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-2 flex items-center gap-2"><User className="w-4 h-4" /> Full Name</label>
              <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 input-glass text-sm" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 flex items-center gap-2"><Mail className="w-4 h-4" /> Email Address</label>
              <input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                type="email" className="w-full px-4 py-3 input-glass text-sm" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Bio</label>
              <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                rows={3} className="w-full px-4 py-3 input-glass text-sm resize-none" />
            </div>
            <button onClick={() => toast.success("Profile updated!")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
              style={{ background: "var(--gradient-primary)" }}>
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        )}
        {tab === "Security" && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-2 flex items-center gap-2"><Lock className="w-4 h-4" /> Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 input-glass text-sm" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 input-glass text-sm" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Confirm New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 input-glass text-sm" />
            </div>
            <button onClick={() => toast.success("Password updated!")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
              style={{ background: "var(--gradient-primary)" }}>
              <Lock className="w-4 h-4" /> Update Password
            </button>
            <div className="pt-4 border-t border-white/5">
              <button onClick={() => toast.error("Account deletion requires confirmation email (demo)")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-red-400 font-medium text-sm"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <Trash2 className="w-4 h-4" /> Delete Account
              </button>
            </div>
          </div>
        )}
        {tab === "Preferences" && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-3 flex items-center gap-2"><Globe className="w-4 h-4" /> Language</label>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className="py-2 px-3 rounded-xl text-sm font-medium transition-all"
                    style={lang === l
                      ? { background: "rgba(59,130,246,0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }
                      : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }
                    }>{l}</button>
                ))}
              </div>
            </div>
            <button onClick={() => toast.success("Preferences saved!")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
              style={{ background: "var(--gradient-primary)" }}>
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>
        )}
        {tab === "Saved Places" && (
          <div className="space-y-3">
            <p className="text-white/50 text-sm">{SAVED_DESTINATIONS.length} saved destinations</p>
            {SAVED_DESTINATIONS.map(d => (
              <div key={d.name} className="flex items-center gap-3 p-3 rounded-xl group"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <img src={d.img} alt={d.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{d.name}</p>
                  <p className="text-white/40 text-xs">{d.country}</p>
                </div>
                <button onClick={() => toast.success(`${d.name} removed from saved`)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400/60 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
