"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Plus, Search, MapPin, Calendar, Users, DollarSign, Eye, Edit3, Trash2, Share2, Filter } from "lucide-react";
import { MOCK_TRIPS } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const i = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const STATUS = ["all", "upcoming", "completed", "planning"];
const TYPES  = ["all", "Beach", "Cultural", "Adventure", "City Break", "Backpacking"];

export default function TripsPage() {
  const [status, setStatus] = useState("all");
  const [type,   setType]   = useState("all");
  const [q,      setQ]      = useState("");

  const filtered = MOCK_TRIPS.filter(t =>
    (status === "all" || t.status === status) &&
    (type   === "all" || t.travel_type === type) &&
    (t.name.toLowerCase().includes(q.toLowerCase()) || t.cities.some(c => c.toLowerCase().includes(q.toLowerCase())))
  );

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="space-y-8 pb-10">

      {/* Header */}
      <motion.div variants={i} className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>My Trips</h1>
          <p className="text-white/40 mt-1 text-sm">{MOCK_TRIPS.length} trips · {MOCK_TRIPS.filter(t => t.status === "upcoming").length} upcoming</p>
        </div>
        <Link href="/create">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="btn-primary flex items-center gap-2 px-5 py-3 text-sm">
            <Plus className="w-4 h-4" /> New Trip
          </motion.button>
        </Link>
      </motion.div>

      {/* Filter bar */}
      <motion.div variants={i} className="glass-card p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search trips or cities..."
            className="input-aurora pl-10 pr-4 py-2.5 text-sm" />
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-xs text-white/30 font-semibold uppercase tracking-wider mb-2">Status</p>
            <div className="flex gap-1.5 flex-wrap">
              {STATUS.map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                  style={status === s
                    ? { background: "rgba(6,182,212,0.15)", color: "var(--cyan-light)", border: "1px solid rgba(6,182,212,0.3)" }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)" }
                  }>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-white/30 font-semibold uppercase tracking-wider mb-2">Type</p>
            <div className="flex gap-1.5 flex-wrap">
              {TYPES.map(t => (
                <button key={t} onClick={() => setType(t)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                  style={type === t
                    ? { background: "rgba(124,58,237,0.15)", color: "var(--violet-light)", border: "1px solid rgba(124,58,237,0.3)" }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.07)" }
                  }>{t}</button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(trip => (
          <motion.div key={trip.id} variants={i} className="hover-lift group rounded-2xl overflow-hidden"
            style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img src={trip.cover_image} alt={trip.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="card-overlay absolute inset-0" />
              <div className="absolute top-3 right-3">
                <span className={`badge ${trip.status === "upcoming" ? "badge-upcoming" : trip.status === "completed" ? "badge-completed" : "badge-planning"}`}>
                  {trip.status}
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <span className="text-xs px-2 py-1 rounded-full text-white font-medium"
                  style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}>
                  {trip.travel_type}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-black text-white text-base leading-snug" style={{ fontFamily: "Syne, sans-serif" }}>
                  {trip.name}
                </h3>
                <p className="text-white/40 text-xs mt-0.5 line-clamp-1">{trip.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { icon: MapPin, val: `${trip.destination_count} cities`, color: "var(--cyan)" },
                  { icon: Users,  val: `${trip.travelers} travelers`,       color: "var(--violet-light)" },
                  { icon: Calendar, val: formatDate(trip.start_date),       color: "var(--emerald)" },
                  { icon: DollarSign, val: formatCurrency(trip.estimated_budget), color: "var(--gold)" },
                ].map(({ icon: Ic, val, color }) => (
                  <div key={val} className="flex items-center gap-1.5 text-white/50">
                    <Ic className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                    <span className="truncate">{val}</span>
                  </div>
                ))}
              </div>

              {/* Cities */}
              <div className="flex gap-1.5 flex-wrap">
                {trip.cities.map(city => (
                  <span key={city} className="text-xs px-2 py-0.5 rounded-full text-white/50"
                    style={{ background: "rgba(255,255,255,0.05)" }}>{city}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <Link href={`/trips/${trip.id}`} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{ background: "rgba(6,182,212,0.1)", color: "var(--cyan-light)", border: "1px solid rgba(6,182,212,0.15)" }}>
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                </Link>
                <Link href={`/trips/${trip.id}/itinerary`} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{ background: "rgba(124,58,237,0.1)", color: "var(--violet-light)", border: "1px solid rgba(124,58,237,0.15)" }}>
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                </Link>
                <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/share/${trip.share_token}`); toast.success("Link copied!"); }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{ background: "rgba(16,185,129,0.1)", color: "var(--emerald-light)", border: "1px solid rgba(16,185,129,0.15)" }}>
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => toast.error("Trip deleted (demo)")}
                  className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{ background: "rgba(244,63,94,0.08)", color: "var(--rose-light)", border: "1px solid rgba(244,63,94,0.15)" }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div variants={i} className="text-center py-24">
          <div className="text-5xl mb-4">🗺️</div>
          <p className="text-white/50 text-lg">No trips found</p>
          <Link href="/create">
            <button className="btn-primary mt-5 px-8 py-3 text-sm">Plan Your First Trip</button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
