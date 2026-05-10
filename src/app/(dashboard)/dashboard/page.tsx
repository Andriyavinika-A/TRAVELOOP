"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plus, MapPin, Calendar, TrendingUp, Globe,
  Star, ArrowRight, Sparkles, DollarSign,
  Users, Clock, ChevronRight, Zap, Flame
} from "lucide-react";
import { MOCK_USER, MOCK_TRIPS, MOCK_DESTINATIONS } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const i = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } } };

/* ── Stat Card ─────────────────────────────── */
function StatCard({ label, value, sub, icon: Icon, accent }: any) {
  return (
    <motion.div variants={i} className="glass-card p-5 relative overflow-hidden hover-lift"
      style={{ borderTop: `2px solid ${accent}` }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">{label}</p>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}20` }}>
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
      </div>
      <p className="text-3xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>{value}</p>
      {sub && <p className="text-xs mt-1.5" style={{ color: accent }}>{sub}</p>}
      {/* Decorative */}
      <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-10"
        style={{ background: `radial-gradient(circle, ${accent}, transparent)` }} />
    </motion.div>
  );
}

/* ── Trip Card ─────────────────────────────── */
function TripCard({ trip }: { trip: typeof MOCK_TRIPS[0] }) {
  return (
    <motion.div variants={i} className="hover-lift group cursor-pointer overflow-hidden rounded-2xl"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
      <Link href={`/trips/${trip.id}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img src={trip.cover_image} alt={trip.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="card-overlay absolute inset-0" />
          {/* Status pill */}
          <div className="absolute top-3 right-3">
            <span className={`badge ${trip.status === "upcoming" ? "badge-upcoming" : trip.status === "completed" ? "badge-completed" : "badge-planning"}`}>
              {trip.status}
            </span>
          </div>
          {/* Type tag */}
          <div className="absolute top-3 left-3">
            <span className="text-xs px-2 py-1 rounded-full text-white font-medium"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
              {trip.travel_type}
            </span>
          </div>
          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-black text-lg leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>
              {trip.name}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-white/60">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{trip.destination_count} cities</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(trip.start_date)}</span>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="px-4 py-3 flex items-center justify-between"
          style={{ background: "var(--bg-card)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="font-black text-base gradient-text" style={{ fontFamily: "Syne, sans-serif" }}>
            {formatCurrency(trip.estimated_budget)}
          </span>
          <span className="text-xs text-white/40 flex items-center gap-1">
            <Users className="w-3 h-3" /> {trip.travelers} travelers
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Destination Card ──────────────────────── */
function DestCard({ dest }: { dest: typeof MOCK_DESTINATIONS[0] }) {
  return (
    <motion.div variants={i} className="relative rounded-2xl overflow-hidden cursor-pointer group hover-lift" style={{ height: 220 }}>
      <img src={dest.image} alt={dest.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="card-overlay absolute inset-0" />
      {/* Trend badge */}
      <div className="absolute top-3 right-3">
        <span className="text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1"
          style={{ background: "rgba(244,63,94,0.8)", color: "white", backdropFilter: "blur(8px)" }}>
          <Flame className="w-2.5 h-2.5" /> {dest.trend}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-black text-xl leading-none" style={{ fontFamily: "Syne, sans-serif" }}>{dest.name}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-white/60 text-xs">{dest.country}</span>
          <span className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: "var(--gold-light)" }}>
            <Star className="w-3 h-3 fill-current" /> {dest.rating}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-white/40">${dest.avg_cost}/day</span>
          <span className="text-xs text-white/40">{dest.weather}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const upcoming = MOCK_TRIPS.filter(t => t.status === "upcoming");
  const recent   = MOCK_TRIPS.filter(t => t.status === "completed");

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="space-y-10 pb-10">

      {/* ── Hero Banner ─────────────────────────── */}
      <motion.div variants={i} className="relative rounded-3xl overflow-hidden p-8 md:p-10"
        style={{
          background: "var(--grad-hero)",
          border: "1px solid rgba(124,58,237,0.2)",
        }}>
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 65%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 65%)", transform: "translateY(40%)" }} />

        <div className="relative z-10 flex items-start justify-between flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✈️</span>
              <span className="text-white/50 text-sm font-medium">Good afternoon</span>
            </div>
            <h1 className="text-5xl font-black text-white leading-tight mb-3"
              style={{ fontFamily: "Syne, sans-serif" }}>
              Hey, <span className="gradient-text">{MOCK_USER.name.split(" ")[0]}</span> 👋
            </h1>
            <p className="text-white/50 text-base max-w-lg">
              You have{" "}
              <strong style={{ color: "var(--cyan-light)" }}>{upcoming.length} upcoming trips</strong>{" "}
              and have visited{" "}
              <strong style={{ color: "var(--violet-light)" }}>{MOCK_USER.countries_visited} countries</strong>.
              Ready for the next chapter?
            </p>

            {/* Mini stats */}
            <div className="flex gap-8 mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {[["12", "Total Trips"], ["8", "Countries"], ["67", "Travel Days"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>{v}</p>
                  <p className="text-xs text-white/40 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/create">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center gap-2 px-6 py-3 text-sm">
                <Sparkles className="w-4 h-4" /> AI Plan Trip
              </motion.button>
            </Link>
            <Link href="/trips">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="btn-ghost flex items-center gap-2 px-6 py-3 text-sm">
                My Trips <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Stats Row ───────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Globe}     label="Total Trips"   value="12"     sub="↑ 3 this year"       accent="var(--violet)" />
        <StatCard icon={MapPin}    label="Countries"     value="8"      sub="4 continents"         accent="var(--cyan)" />
        <StatCard icon={DollarSign} label="Total Spent"  value="$18.4K" sub="Within budget ✓"      accent="var(--emerald)" />
        <StatCard icon={Clock}     label="Travel Days"   value="67"     sub="Across all trips"     accent="var(--gold)" />
      </div>

      {/* ── Upcoming Trips ──────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(6,182,212,0.15)" }}>
              <Calendar className="w-4 h-4" style={{ color: "var(--cyan)" }} />
            </div>
            <h2 className="text-xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>Upcoming Trips</h2>
          </div>
          <Link href="/trips">
            <button className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: "var(--violet-light)" }}>
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcoming.map(trip => <TripCard key={trip.id} trip={trip} />)}
          {/* CTA Card */}
          <motion.div variants={i}>
            <Link href="/create">
              <div className="rounded-2xl h-[248px] flex flex-col items-center justify-center gap-4 cursor-pointer group hover-lift"
                style={{ border: "2px dashed rgba(124,58,237,0.25)", background: "rgba(124,58,237,0.04)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: "var(--grad-primary)" }}>
                  <Plus className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-white/70 font-semibold text-sm">Plan a new adventure</p>
                  <p className="badge badge-ai mt-2 mx-auto">✨ AI-Powered</p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Recent Trips ────────────────────────── */}
      {recent.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.15)" }}>
              <Clock className="w-4 h-4" style={{ color: "var(--gold)" }} />
            </div>
            <h2 className="text-xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>Recent Trips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recent.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </div>
      )}

      {/* ── Trending Destinations ───────────────── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(244,63,94,0.15)" }}>
              <TrendingUp className="w-4 h-4" style={{ color: "var(--rose)" }} />
            </div>
            <h2 className="text-xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>Trending Now</h2>
          </div>
          <Link href="/cities">
            <button className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--rose-light)" }}>
              Explore all <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOCK_DESTINATIONS.map(dest => <DestCard key={dest.id} dest={dest} />)}
        </div>
      </div>
    </motion.div>
  );
}
