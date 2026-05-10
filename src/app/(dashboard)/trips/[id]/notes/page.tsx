"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, StickyNote, Calendar, Clock, Hotel, Phone, Trash2, Edit3, Bell } from "lucide-react";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const INITIAL_NOTES = [
  { id: "n1", day: "Dec 20", title: "Delhi Arrival Notes", content: "Flight lands at 14:30 at IGI Terminal 3. Hotel The Leela Palace is 45 mins from airport. Pre-booked cab with driver Rajesh (+91-98765-43210). Check-in is at 3pm.", category: "checkin", timestamp: "2024-11-15 10:30" },
  { id: "n2", day: "Dec 21", title: "Red Fort & Chandni Chowk Tips", content: "Red Fort opens at 7am. Go early to avoid crowds. Try the famous paranthe wali gali for breakfast. Hire a local guide for Red Fort (₹500 for 2 hours, worth it!).", category: "general", timestamp: "2024-11-15 11:00" },
  { id: "n3", day: "Dec 22", title: "Emergency Contacts", content: "Embassy: +91-11-2419-8000\nLocal hospital: Max Hospital Delhi +91-11-2651-5050\nTravel Insurance: 1800-XXX-XXXX (24/7)\nDriver Rajesh: +91-98765-43210", category: "emergency", timestamp: "2024-11-16 09:00" },
  { id: "n4", day: "Dec 22", title: "Agra Hotel Check-in", content: "Oberoi Amarvilas — Taj East Gate Road. Check-in from 2pm. We have a Taj-view room booked. Room rate: $380/night. Breakfast included. Pool is on the 2nd floor.", category: "checkin", timestamp: "2024-11-16 10:00" },
  { id: "n5", day: "Dec 23", title: "Taj Mahal Tips", content: "Sunrise visit at 6am is magical! Buy tickets online (₹1100 for foreigners). No food or large bags allowed. Hire official guide at main gate (₹800 for 2 hours). Photography allowed but no tripod.", category: "reminder", timestamp: "2024-11-17 08:00" },
];

const CAT_CONFIG: Record<string, { color: string; bg: string; icon: any; label: string }> = {
  general: { color: "#60a5fa", bg: "rgba(59,130,246,0.1)", icon: StickyNote, label: "General" },
  checkin: { color: "#34d399", bg: "rgba(16,185,129,0.1)", icon: Hotel, label: "Check-in" },
  emergency: { color: "#f87171", bg: "rgba(239,68,68,0.1)", icon: Phone, label: "Emergency" },
  reminder: { color: "#fbbf24", bg: "rgba(245,158,11,0.1)", icon: Bell, label: "Reminder" },
};

export default function NotesPage() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", day: "", category: "general" });

  const filtered = filter === "all" ? notes : notes.filter(n => n.category === filter);

  const handleAdd = () => {
    if (!newNote.title.trim()) { toast.error("Please enter a title"); return; }
    setNotes(prev => [{
      id: `n${Date.now()}`,
      ...newNote,
      timestamp: new Date().toLocaleString(),
    }, ...prev]);
    setNewNote({ title: "", content: "", day: "", category: "general" });
    setShowAdd(false);
    toast.success("Note added!");
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-8">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Trip Journal</h1>
          <p className="text-white/50 mt-1">Notes & important details for Golden Triangle India</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: "var(--gradient-primary)" }}>
          <Plus className="w-4 h-4" /> Add Note
        </button>
      </motion.div>

      {/* Category Filter */}
      <motion.div variants={item} className="flex gap-2 flex-wrap">
        <button onClick={() => setFilter("all")}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={filter === "all" ? { background: "rgba(59,130,246,0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" } : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
          All Notes
        </button>
        {Object.entries(CAT_CONFIG).map(([key, val]) => (
          <button key={key} onClick={() => setFilter(key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={filter === key
              ? { background: val.bg, color: val.color, border: `1px solid ${val.color}40` }
              : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
            }>
            <val.icon className="w-3 h-3" /> {val.label}
          </button>
        ))}
      </motion.div>

      {/* Add Note Form */}
      {showAdd && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 space-y-3">
          <h3 className="text-base font-semibold text-white">New Note</h3>
          <div className="grid grid-cols-2 gap-3">
            <input value={newNote.title} onChange={e => setNewNote(n => ({ ...n, title: e.target.value }))}
              placeholder="Note title..." className="px-3 py-2 input-glass text-sm" />
            <input value={newNote.day} onChange={e => setNewNote(n => ({ ...n, day: e.target.value }))}
              placeholder="Day (e.g. Dec 20)..." className="px-3 py-2 input-glass text-sm" />
          </div>
          <select value={newNote.category} onChange={e => setNewNote(n => ({ ...n, category: e.target.value }))}
            className="w-full px-3 py-2 input-glass text-sm">
            {Object.entries(CAT_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <textarea value={newNote.content} onChange={e => setNewNote(n => ({ ...n, content: e.target.value }))}
            placeholder="Write your note..." rows={3}
            className="w-full px-3 py-2 input-glass text-sm resize-none" />
          <div className="flex gap-2">
            <button onClick={handleAdd}
              className="flex-1 py-2 rounded-xl text-white font-semibold text-sm"
              style={{ background: "var(--gradient-primary)" }}>Save Note</button>
            <button onClick={() => setShowAdd(false)}
              className="px-4 py-2 rounded-xl text-white/60 text-sm"
              style={{ background: "rgba(255,255,255,0.05)" }}>Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(note => {
          const cat = CAT_CONFIG[note.category] || CAT_CONFIG.general;
          return (
            <motion.div key={note.id} variants={item} className="glass-card p-5 space-y-3 hover-lift group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: cat.bg }}>
                    <cat.icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background: cat.bg, color: cat.color }}>{cat.label}</span>
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg text-white/40 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)" }}>
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => { setNotes(prev => prev.filter(n => n.id !== note.id)); toast.success("Note deleted"); }}
                    className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 transition-colors"
                    style={{ background: "rgba(239,68,68,0.08)" }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{note.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed whitespace-pre-line">{note.content}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-white/30">
                {note.day && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{note.day}</span>}
                <span className="flex items-center gap-1 ml-auto"><Clock className="w-3 h-3" />{note.timestamp}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
