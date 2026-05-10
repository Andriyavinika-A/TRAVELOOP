"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Calendar, Hotel, Plus, GripVertical, ChevronDown, ChevronUp, Clock, DollarSign, StickyNote, Sparkles, Loader2, Trash2 } from "lucide-react";
import { MOCK_ITINERARY } from "@/lib/mockData";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const CATEGORY_COLORS: Record<string, string> = {
  sightseeing: "rgba(59,130,246,0.15)",
  food: "rgba(245,158,11,0.15)",
  adventure: "rgba(16,185,129,0.15)",
  nightlife: "rgba(139,92,246,0.15)",
  nature: "rgba(34,197,94,0.15)",
};
const CATEGORY_TEXT: Record<string, string> = {
  sightseeing: "#60a5fa",
  food: "#fbbf24",
  adventure: "#34d399",
  nightlife: "#a78bfa",
  nature: "#4ade80",
};

export default function ItineraryBuilderPage() {
  const [stops, setStops] = useState(MOCK_ITINERARY.stops);
  const [expandedStop, setExpandedStop] = useState<string | null>("stop-1");
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const handleAIFillDay = async (stopId: string) => {
    setAiLoading(stopId);
    await new Promise(r => setTimeout(r, 1800));
    toast.success("✨ AI filled activities for the day!");
    setAiLoading(null);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-8">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Itinerary Builder</h1>
          <p className="text-white/50 mt-1">Golden Triangle India · {stops.length} stops</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 rounded-xl text-sm font-medium text-white/70"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            Calendar View
          </button>
          <button onClick={() => toast.success("Itinerary saved!")}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--gradient-primary)" }}>
            Save Itinerary
          </button>
        </div>
      </motion.div>

      {/* Stops */}
      <div className="space-y-4">
        {stops.map((stop, idx) => (
          <motion.div key={stop.id} variants={item} className="glass-card overflow-hidden">
            {/* Stop Header */}
            <div
              className="p-5 flex items-start gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
              onClick={() => setExpandedStop(expandedStop === stop.id ? null : stop.id)}
            >
              {/* Drag handle */}
              <div className="mt-1 text-white/20 cursor-grab active:cursor-grabbing">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* Stop number */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-white text-sm"
                style={{ background: "var(--gradient-primary)" }}>
                {idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" /> {stop.city}, {stop.country}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-green-400 font-medium">${stop.estimated_cost}</span>
                    {expandedStop === stop.id ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-white/50">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {stop.arrival} → {stop.departure}</span>
                  <span className="flex items-center gap-1"><Hotel className="w-3 h-3" /> {stop.hotel}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-yellow-400" /> ${stop.hotel_cost}/night</span>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedStop === stop.id && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                className="border-t border-white/5 p-5 space-y-4">

                {/* Notes */}
                {stop.notes && (
                  <div className="flex gap-2 p-3 rounded-lg text-sm text-white/60"
                    style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
                    <StickyNote className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span>{stop.notes}</span>
                  </div>
                )}

                {/* Activities */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-white/80">Activities</h4>
                    <div className="flex gap-2">
                      <button onClick={() => handleAIFillDay(stop.id)} disabled={aiLoading === stop.id}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-blue-300 font-medium transition-colors"
                        style={{ background: "rgba(59,130,246,0.1)" }}>
                        {aiLoading === stop.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                        AI Fill Day
                      </button>
                      <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-white/60 font-medium"
                        style={{ background: "rgba(255,255,255,0.05)" }}>
                        <Plus className="w-3 h-3" /> Add Activity
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {stop.activities.map((act, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-3 p-3 rounded-xl group"
                        style={{ background: CATEGORY_COLORS[act.category] || "rgba(255,255,255,0.04)" }}>
                        <div className="flex items-center gap-1.5 text-xs text-white/40 w-14 shrink-0">
                          <Clock className="w-3 h-3" /> {act.time}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{act.name}</p>
                          <p className="text-xs text-white/40">{act.duration}</p>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                          style={{ color: CATEGORY_TEXT[act.category], background: "rgba(0,0,0,0.2)" }}>
                          {act.category}
                        </span>
                        <span className="text-xs text-green-400 font-medium w-12 text-right">${act.cost}</span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400/60 hover:text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Add Stop */}
        <motion.div variants={item}>
          <button onClick={() => toast.info("Add city feature coming soon!")}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium text-white/50 hover:text-white/80 transition-colors"
            style={{ border: "2px dashed rgba(255,255,255,0.1)" }}>
            <Plus className="w-4 h-4" /> Add Another City
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
