"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plus, MapPin, Calendar, TrendingUp, Globe,
  Star, ArrowRight, Sparkles, DollarSign,
  Users, Clock, ChevronRight
} from "lucide-react";
import { MOCK_USER, MOCK_TRIPS, MOCK_DESTINATIONS } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const StatCard = ({ icon: Icon, label, value, color, sub }: any) => (
  <motion.div variants={item} className="glass-card p-5 stat-card hover-lift">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-white/50 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {sub && <p className="text-xs text-emerald-400 mt-1">{sub}</p>}
      </div>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color }}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  </motion.div>
);

const TripCard = ({ trip }: { trip: typeof MOCK_TRIPS[0] }) => (
  <motion.div variants={item} className="glass-card overflow-hidden hover-lift group cursor-pointer">
    <Link href={`/trips/${trip.id}`}>
      <div className="relative h-44 overflow-hidden">
        <img src={trip.cover_image} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="trip-card-overlay absolute inset-0" />
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            trip.status === "upcoming" ? "badge-upcoming" :
            trip.status === "completed" ? "badge-completed" : "badge-planning"
          }`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white font-semibold text-base leading-tight">{trip.name}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-white/70 text-xs flex items-center gap-1">
              <MapPin className="w-3 h-3" />{trip.destination_count} cities
            </span>
            <span className="text-white/70 text-xs flex items-center gap-1">
              <Calendar className="w-3 h-3" />{formatDate(trip.start_date)}
            </span>
          </div>
        </div>
      </div>
      <div className="p-3 flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: "#60a5fa" }}>
          {formatCurrency(trip.estimated_budget)}
        </span>
        <span className="text-xs text-white/40 flex items-center gap-1">
          {trip.travelers} travelers <Users className="w-3 h-3" />
        </span>
      </div>
    </Link>
  </motion.div>
);

const DestCard = ({ dest }: { dest: typeof MOCK_DESTINATIONS[0] }) => (
  <motion.div variants={item} className="relative rounded-2xl overflow-hidden cursor-pointer group hover-lift" style={{ height: 200 }}>
    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    <div className="trip-card-overlay absolute inset-0" />
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-white font-bold text-lg leading-none">{dest.name}</p>
          <p className="text-white/60 text-sm">{dest.country}</p>
        </div>
        <div className="text-right">
          <p className="text-emerald-400 text-sm font-semibold">{dest.trend}</p>
          <p className="text-white/60 text-xs">${dest.avg_cost}/day</p>
        </div>
      </div>
    </div>
    <div className="absolute top-3 left-3">
      <span className="text-xs px-2 py-1 rounded-full text-white font-medium flex items-center gap-1"
        style={{ background: "rgba(0,0,0,0.5)" }}>
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{dest.rating}
      </span>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  const upcomingTrips = MOCK_TRIPS.filter(t => t.status === "upcoming");
  const recentTrips = MOCK_TRIPS.filter(t => t.status === "completed");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-8">
      {/* Welcome Hero */}
      <motion.div variants={item} className="relative rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(16,185,129,0.08) 100%)", border: "1px solid rgba(59,130,246,0.2)" }}>
        <div className="p-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✈️</span>
                <span className="text-white/50 text-sm">Good afternoon</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                Welcome back, <span className="gradient-text">{MOCK_USER.name.split(" ")[0]}</span>!
              </h1>
              <p className="text-white/60 text-base max-w-lg">
                You have <strong className="text-blue-400">{upcomingTrips.length} upcoming trips</strong> planned. Ready to explore new destinations?
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/create">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Sparkles className="w-4 h-4" /> AI Plan Trip
                </motion.button>
              </Link>
              <Link href="/trips">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-white/80 font-semibold text-sm"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  My Trips <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Profile mini stats */}
          <div className="flex gap-6 mt-6 pt-6 border-t border-white/10">
            {[
              { label: "Trips", val: MOCK_USER.trips_count },
              { label: "Countries", val: MOCK_USER.countries_visited },
              { label: "Upcoming", val: upcomingTrips.length },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.val}</p>
                <p className="text-white/40 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative orbs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
        <div className="absolute -bottom-10 right-1/3 w-40 h-40 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Globe} label="Total Trips" value="12" color="rgba(59,130,246,0.2)" sub="↑ 3 this year" />
        <StatCard icon={MapPin} label="Countries" value="8" color="rgba(139,92,246,0.2)" sub="4 continents" />
        <StatCard icon={DollarSign} label="Total Spent" value="$18.4K" color="rgba(16,185,129,0.2)" sub="Well within budget" />
        <StatCard icon={Clock} label="Travel Days" value="67" color="rgba(245,158,11,0.2)" sub="Across all trips" />
      </div>

      {/* Upcoming Trips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" /> Upcoming Trips
          </h2>
          <Link href="/trips" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
          {/* Add new trip CTA */}
          <motion.div variants={item}>
            <Link href="/create">
              <div className="glass-card h-full min-h-[240px] flex flex-col items-center justify-center gap-3 cursor-pointer hover-lift group"
                style={{ border: "2px dashed rgba(59,130,246,0.2)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: "rgba(59,130,246,0.1)" }}>
                  <Plus className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-white/60 font-medium text-sm">Plan a new trip</p>
                <span className="text-xs px-3 py-1 rounded-full text-blue-400"
                  style={{ background: "rgba(59,130,246,0.1)" }}>✨ AI-Powered</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Recent Trips */}
      {recentTrips.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" /> Recent Trips
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </div>
      )}

      {/* Trending Destinations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gold-400" style={{ color: "#fbbf24" }} /> Trending Destinations
          </h2>
          <Link href="/cities" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            Explore all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOCK_DESTINATIONS.map(dest => <DestCard key={dest.id} dest={dest} />)}
        </div>
      </div>
    </motion.div>
  );
}
