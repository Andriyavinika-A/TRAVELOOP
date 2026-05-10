"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, MapPin, Star, DollarSign, Cloud, Plus, Globe } from "lucide-react";
import { MOCK_DESTINATIONS } from "@/lib/mockData";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const REGIONS = ["All", "Asia", "Europe", "Americas", "Middle East", "Africa", "Oceania"];
const WEATHER_COLORS: Record<string, string> = {
  "Sunny": "#fbbf24", "Mild": "#34d399", "Tropical": "#06b6d4",
  "Cool": "#93c5fd", "Hot": "#f87171", "Cold": "#a78bfa",
};

const EXTRA_CITIES = [
  { id: 7, name: "New York", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80", avg_cost: 280, rating: 4.7, weather: "Mild", trend: "+5%" },
  { id: 8, name: "Bangkok", country: "Thailand", image: "https://images.unsplash.com/photo-1508009603885-50cf7c8dd661?w=400&q=80", avg_cost: 65, rating: 4.6, weather: "Hot", trend: "+18%" },
  { id: 9, name: "Cape Town", country: "South Africa", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80", avg_cost: 90, rating: 4.8, weather: "Mild", trend: "+28%" },
  { id: 10, name: "Sydney", country: "Australia", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", avg_cost: 220, rating: 4.8, weather: "Sunny", trend: "+12%" },
  { id: 11, name: "Prague", country: "Czech Republic", image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&q=80", avg_cost: 85, rating: 4.7, weather: "Cool", trend: "+35%" },
  { id: 12, name: "Marrakech", country: "Morocco", image: "https://images.unsplash.com/photo-1597212720158-3f40e31fa2e0?w=400&q=80", avg_cost: 70, rating: 4.6, weather: "Hot", trend: "+22%" },
];

const ALL_CITIES = [...MOCK_DESTINATIONS, ...EXTRA_CITIES];

export default function CitiesPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = ALL_CITIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-8">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>City Explorer</h1>
        <p className="text-white/50 mt-1">Discover {ALL_CITIES.length}+ destinations worldwide</p>
      </motion.div>

      {/* Search & Filters */}
      <motion.div variants={item} className="glass-card p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search cities or countries..."
            className="w-full pl-10 pr-4 py-2.5 input-glass text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {REGIONS.map(r => (
            <button key={r} onClick={() => setRegion(r)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={region === r
                ? { background: "rgba(59,130,246,0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
              }>{r}</button>
          ))}
        </div>
      </motion.div>

      {/* City Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(city => (
          <motion.div key={city.id} variants={item} className="glass-card overflow-hidden hover-lift group cursor-pointer">
            <div className="relative h-52 overflow-hidden">
              <img src={city.image} alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="trip-card-overlay absolute inset-0" />
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="text-xs px-2 py-1 rounded-full text-white font-medium flex items-center gap-1"
                  style={{ background: "rgba(0,0,0,0.5)" }}>
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {city.rating}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="text-xs px-2 py-1 rounded-full font-semibold"
                  style={{ background: "rgba(0,0,0,0.5)", color: "#34d399" }}>{city.trend}</span>
              </div>
              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-xl font-bold">{city.name}</h3>
                <p className="text-white/60 text-sm flex items-center gap-1"><Globe className="w-3 h-3" />{city.country}</p>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <DollarSign className="w-3.5 h-3.5 mx-auto mb-1 text-green-400" />
                  <p className="text-white/50">Avg/Day</p>
                  <p className="text-white font-semibold">${city.avg_cost}</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <Cloud className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: WEATHER_COLORS[city.weather] }} />
                  <p className="text-white/50">Weather</p>
                  <p className="text-white font-semibold">{city.weather}</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <Star className="w-3.5 h-3.5 mx-auto mb-1 text-yellow-400" />
                  <p className="text-white/50">Rating</p>
                  <p className="text-white font-semibold">{city.rating}</p>
                </div>
              </div>
              <button onClick={() => toast.success(`${city.name} added to your trip!`)}
                className="w-full py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
                style={{ background: "var(--gradient-primary)" }}>
                <Plus className="w-3.5 h-3.5" /> Add to Trip
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
