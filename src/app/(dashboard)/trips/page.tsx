"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Filter, Search, MapPin, Calendar, Users, DollarSign, Eye, Edit3, Trash2, Share2 } from "lucide-react";
import { useState } from "react";
import { MOCK_TRIPS } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const STATUS_FILTERS = ["all", "upcoming", "completed", "planning"];
const TYPE_FILTERS = ["all", "Beach", "Cultural", "Adventure", "City Break", "Backpacking"];

export default function TripsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_TRIPS.filter(t => {
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchType = typeFilter === "all" || t.travel_type === typeFilter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.cities.some(c => c.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchType && matchSearch;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-8">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>My Trips</h1>
          <p className="text-white/50 mt-1">{MOCK_TRIPS.length} trips planned · {MOCK_TRIPS.filter(t => t.status === "upcoming").length} upcoming</p>
        </div>
        <Link href="/create">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold text-sm"
            style={{ background: "var(--gradient-primary)" }}>
            <Plus className="w-4 h-4" /> New Trip
          </motion.button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div variants={item} className="glass-card p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search trips or cities..."
            className="w-full pl-10 pr-4 py-2.5 input-glass text-sm" />
        </div>
        <div className="flex gap-6 flex-wrap">
          <div>
            <p className="text-xs text-white/40 mb-2">Status</p>
            <div className="flex gap-2 flex-wrap">
              {STATUS_FILTERS.map(f => (
                <button key={f} onClick={() => setStatusFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                  style={statusFilter === f
                    ? { background: "rgba(59,130,246,0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
                  }>{f}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-white/40 mb-2">Type</p>
            <div className="flex gap-2 flex-wrap">
              {TYPE_FILTERS.map(f => (
                <button key={f} onClick={() => setTypeFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                  style={typeFilter === f
                    ? { background: "rgba(139,92,246,0.2)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
                  }>{f}</button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trip Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(trip => (
          <motion.div key={trip.id} variants={item} className="glass-card overflow-hidden hover-lift group">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img src={trip.cover_image} alt={trip.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="trip-card-overlay absolute inset-0" />
              <div className="absolute top-3 right-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  trip.status === "upcoming" ? "badge-upcoming" :
                  trip.status === "completed" ? "badge-completed" : "badge-planning"
                }`}>{trip.status}</span>
              </div>
              <div className="absolute top-3 left-3">
                <span className="text-xs px-2 py-1 rounded-full text-white font-medium"
                  style={{ background: "rgba(0,0,0,0.5)" }}>{trip.travel_type}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-white text-base leading-tight">{trip.name}</h3>
                <p className="text-white/50 text-xs mt-1 line-clamp-1">{trip.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-white/60">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  {trip.destination_count} cities
                </div>
                <div className="flex items-center gap-1.5 text-white/60">
                  <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  {trip.travelers} travelers
                </div>
                <div className="flex items-center gap-1.5 text-white/60">
                  <Calendar className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  {formatDate(trip.start_date)}
                </div>
                <div className="flex items-center gap-1.5 text-white/60">
                  <DollarSign className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  {formatCurrency(trip.estimated_budget)}
                </div>
              </div>

              {/* Cities */}
              <div className="flex gap-1.5 flex-wrap">
                {trip.cities.map(city => (
                  <span key={city} className="text-xs px-2 py-0.5 rounded-full text-white/60"
                    style={{ background: "rgba(255,255,255,0.06)" }}>{city}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1 border-t border-white/5">
                <Link href={`/trips/${trip.id}`} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-white/80 hover:text-white transition-colors"
                    style={{ background: "rgba(59,130,246,0.1)" }}>
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                </Link>
                <Link href={`/trips/${trip.id}/itinerary`} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-white/80 hover:text-white transition-colors"
                    style={{ background: "rgba(139,92,246,0.1)" }}>
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                </Link>
                <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/share/${trip.share_token}`); toast.success("Share link copied!"); }}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-white/80 hover:text-white transition-colors"
                  style={{ background: "rgba(16,185,129,0.1)" }}>
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => toast.error("Trip deleted (demo)")}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                  style={{ background: "rgba(239,68,68,0.1)" }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div variants={item} className="text-center py-20">
          <p className="text-4xl mb-4">🗺️</p>
          <p className="text-white/60 text-lg">No trips found</p>
          <Link href="/create">
            <button className="mt-4 px-6 py-3 rounded-xl text-white font-semibold text-sm"
              style={{ background: "var(--gradient-primary)" }}>Plan Your First Trip</button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
