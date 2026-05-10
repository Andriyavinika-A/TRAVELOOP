"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Filter, Star, Clock, DollarSign, Plus, Check } from "lucide-react";
import { MOCK_ACTIVITIES } from "@/lib/mockData";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const CATEGORIES = [
  { id: "all", label: "All", emoji: "🌍" },
  { id: "sightseeing", label: "Sightseeing", emoji: "🏛️" },
  { id: "food", label: "Food", emoji: "🍜" },
  { id: "adventure", label: "Adventure", emoji: "🧗" },
  { id: "nightlife", label: "Nightlife", emoji: "🎉" },
  { id: "nature", label: "Nature", emoji: "🌿" },
];

const EXTRA_ACTIVITIES = [
  { id: 7, name: "Halong Bay Kayaking", category: "adventure", cost: 95, duration: "Full day", rating: 4.9, city: "Halong Bay", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80" },
  { id: 8, name: "Parisian Café Hopping", category: "food", cost: 40, duration: "3 hours", rating: 4.7, city: "Paris", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80" },
  { id: 9, name: "Colosseum Night Tour", category: "sightseeing", cost: 75, duration: "2.5 hours", rating: 4.8, city: "Rome", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80" },
  { id: 10, name: "Northern Lights Tour", category: "nature", cost: 180, duration: "5 hours", rating: 5.0, city: "Tromsø", image: "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=400&q=80" },
  { id: 11, name: "Dubai Desert Safari", category: "adventure", cost: 120, duration: "6 hours", rating: 4.8, city: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { id: 12, name: "Barcelona Tapas Tour", category: "food", cost: 55, duration: "3 hours", rating: 4.6, city: "Barcelona", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&q=80" },
];

const ALL_ACTIVITIES = [...MOCK_ACTIVITIES, ...EXTRA_ACTIVITIES];

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  sightseeing: { bg: "rgba(59,130,246,0.15)", text: "#60a5fa" },
  food: { bg: "rgba(245,158,11,0.15)", text: "#fbbf24" },
  adventure: { bg: "rgba(16,185,129,0.15)", text: "#34d399" },
  nightlife: { bg: "rgba(139,92,246,0.15)", text: "#a78bfa" },
  nature: { bg: "rgba(34,197,94,0.15)", text: "#4ade80" },
};

export default function ActivitiesPage() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [maxCost, setMaxCost] = useState(200);
  const [added, setAdded] = useState<Set<number>>(new Set());

  const filtered = ALL_ACTIVITIES.filter(a => {
    const matchCat = category === "all" || a.category === category;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase());
    const matchCost = a.cost <= maxCost;
    return matchCat && matchSearch && matchCost;
  });

  const handleAdd = (id: number, name: string) => {
    setAdded(prev => { const n = new Set(prev); n.add(id); return n; });
    toast.success(`${name} added to itinerary!`);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-8">
      <motion.div variants={item}>
        <h1 className="text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Activity Discovery</h1>
        <p className="text-white/50 mt-1">Find and add amazing experiences to your trip</p>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="glass-card p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search activities or cities..."
            className="w-full pl-10 pr-4 py-2.5 input-glass text-sm" />
        </div>
        <div>
          <div className="flex justify-between text-xs text-white/50 mb-2">
            <span>Max Cost</span><span className="text-blue-400 font-medium">${maxCost}</span>
          </div>
          <input type="range" min={10} max={300} value={maxCost} onChange={e => setMaxCost(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(maxCost/300)*100}%, rgba(255,255,255,0.1) ${(maxCost/300)*100}%, rgba(255,255,255,0.1) 100%)` }} />
        </div>
      </motion.div>

      {/* Category tabs */}
      <motion.div variants={item} className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setCategory(cat.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={category === cat.id
              ? { background: "rgba(59,130,246,0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }
              : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
            }>
            {cat.emoji} {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(act => {
          const colors = CAT_COLORS[act.category] || { bg: "rgba(255,255,255,0.1)", text: "#fff" };
          const isAdded = added.has(act.id);
          return (
            <motion.div key={act.id} variants={item} className="glass-card overflow-hidden hover-lift group">
              <div className="relative h-44 overflow-hidden">
                <img src={act.image} alt={act.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="trip-card-overlay absolute inset-0" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs px-2 py-1 rounded-full font-medium capitalize"
                    style={{ background: colors.bg, color: colors.text, backdropFilter: "blur(8px)" }}>
                    {act.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs px-2 py-1 rounded-full text-white flex items-center gap-1"
                    style={{ background: "rgba(0,0,0,0.5)" }}>
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {act.rating}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-white font-semibold text-base leading-tight">{act.name}</h3>
                  <p className="text-white/40 text-xs mt-0.5">{act.city}</p>
                </div>
                <div className="flex gap-4 text-xs text-white/60">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{act.duration}</span>
                  <span className="flex items-center gap-1 text-green-400 font-medium"><DollarSign className="w-3 h-3" />${act.cost}</span>
                </div>
                <button onClick={() => !isAdded && handleAdd(act.id, act.name)}
                  className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  style={isAdded
                    ? { background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }
                    : { background: "var(--gradient-primary)", color: "white" }
                  }>
                  {isAdded ? <><Check className="w-3.5 h-3.5" /> Added</> : <><Plus className="w-3.5 h-3.5" /> Add to Itinerary</>}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
