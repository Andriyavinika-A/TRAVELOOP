"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Loader2, ChevronRight, ChevronLeft, Check, MapPin, Calendar, Users, Zap } from "lucide-react";
import { toast } from "sonner";

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const i = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const STEPS = ["Basics", "AI Generate", "Preferences", "Review"];
const TRAVEL_TYPES = ["🏖️ Beach", "⛰️ Mountain", "🏛️ Cultural", "🧗 Adventure", "🌆 City Break", "🎒 Backpacking", "💎 Luxury", "💰 Budget"];
const BUDGET_LEVELS = [
  { label: "Budget",    sub: "$50–100/day",  icon: "🎒", color: "var(--emerald)" },
  { label: "Mid-range", sub: "$100–250/day", icon: "✈️", color: "var(--cyan)" },
  { label: "Luxury",    sub: "$250+/day",    icon: "💎", color: "var(--gold)" },
];

const AI_RESULT = {
  name: "5-Day Goa Beach & Culture Experience",
  cities: ["Panaji", "North Goa", "South Goa"],
  days: 5,
  budget: 650,
  highlights: ["UNESCO Old Goa churches", "Sunrise yoga at Arambol", "Spice plantation tour", "Sunset Mandovi cruise", "Anjuna flea market"],
};

export default function CreateTripPage() {
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<typeof AI_RESULT | null>(null);
  const [form, setForm] = useState({ name: "", start: "", end: "", travelers: "2", travelType: "", budget: "" });

  const runAI = async () => {
    if (!prompt.trim()) { toast.error("Enter a trip description"); return; }
    setAiLoading(true);
    await new Promise(r => setTimeout(r, 2200));
    setAiResult(AI_RESULT);
    setForm(f => ({ ...f, name: AI_RESULT.name }));
    setAiLoading(false);
    toast.success("✨ Itinerary generated!");
    setStep(2);
  };

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="max-w-2xl mx-auto pb-10">
      {/* Header */}
      <motion.div variants={i} className="text-center mb-10">
        <h1 className="text-5xl font-black text-white mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
          Plan Your <span className="gradient-text">Perfect Trip</span>
        </h1>
        <p className="text-white/40">Let AI build your personalized itinerary in seconds</p>
      </motion.div>

      {/* Step indicator */}
      <motion.div variants={i} className="flex items-center justify-center gap-2 mb-8">
        {STEPS.map((s, idx) => (
          <div key={s} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={idx < step
                  ? { background: "var(--grad-primary)", color: "white" }
                  : idx === step
                  ? { background: "rgba(124,58,237,0.2)", color: "var(--violet-light)", border: "2px solid rgba(124,58,237,0.5)" }
                  : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.08)" }
                }>
                {idx < step ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span className="text-[10px] font-medium hidden sm:block"
                style={{ color: idx === step ? "var(--violet-light)" : "rgba(255,255,255,0.25)" }}>{s}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className="w-10 h-0.5 mb-5 rounded"
                style={{ background: idx < step ? "var(--grad-primary)" : "rgba(255,255,255,0.08)" }} />
            )}
          </div>
        ))}
      </motion.div>

      {/* Card */}
      <motion.div variants={i} className="glass-card p-8">

        {/* Step 0 — Basics */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "Syne, sans-serif" }}>Trip Basics</h2>
            <div>
              <label className="text-sm font-medium text-white/50 mb-2 block">Trip Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Bali Escape, Golden Triangle India..."
                className="input-aurora px-4 py-3" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white/50 mb-2 block">Start Date</label>
                <input type="date" value={form.start} onChange={e => setForm(f => ({ ...f, start: e.target.value }))}
                  className="input-aurora px-4 py-3" />
              </div>
              <div>
                <label className="text-sm font-medium text-white/50 mb-2 block">End Date</label>
                <input type="date" value={form.end} onChange={e => setForm(f => ({ ...f, end: e.target.value }))}
                  className="input-aurora px-4 py-3" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-white/50 mb-2 block">Travelers</label>
              <input type="number" min="1" max="50" value={form.travelers}
                onChange={e => setForm(f => ({ ...f, travelers: e.target.value }))}
                className="input-aurora px-4 py-3" />
            </div>
            <button onClick={() => setStep(1)}
              className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 mt-2">
              Next: AI Generate <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Step 1 — AI */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center animate-float"
                style={{ background: "var(--grad-primary)" }}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>AI Itinerary Generator</h2>
              <p className="text-white/40 text-sm">Describe your trip and let AI plan everything</p>
            </div>

            <div>
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
                placeholder="e.g. '5-day budget trip to Goa for 2, love beaches and local food'"
                rows={4} className="input-aurora px-4 py-3 resize-none" />
              <div className="flex flex-wrap gap-2 mt-2">
                {["5-day Goa trip", "10-day Europe tour", "Week in Bali", "Tokyo adventure"].map(s => (
                  <button key={s} onClick={() => setPrompt(s)}
                    className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                    style={{ background: "rgba(124,58,237,0.1)", color: "var(--violet-light)", border: "1px solid rgba(124,58,237,0.2)" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {aiResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl space-y-3"
                style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <p className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                  <Check className="w-4 h-4" /> AI Generated Plan
                </p>
                <p className="text-white font-black text-base" style={{ fontFamily: "Syne, sans-serif" }}>{aiResult.name}</p>
                <div className="flex gap-4 text-xs text-white/50">
                  <span>Cities: <strong className="text-white">{aiResult.cities.join(", ")}</strong></span>
                  <span>Days: <strong className="text-white">{aiResult.days}</strong></span>
                  <span>Est: <strong style={{ color: "var(--emerald-light)" }}>${aiResult.budget}</strong></span>
                </div>
                <ul className="text-xs text-white/50 space-y-1">
                  {aiResult.highlights.map(h => (
                    <li key={h} className="flex gap-2">
                      <span style={{ color: "var(--cyan)" }}>→</span>{h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-ghost px-4 py-3 text-sm flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={runAI} disabled={aiLoading}
                className="btn-primary flex-1 py-3.5 text-sm flex items-center justify-center gap-2"
                style={{ opacity: aiLoading ? 0.7 : 1 }}>
                {aiLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate with AI</>}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2 — Preferences */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>Preferences</h2>
            <div>
              <label className="text-sm font-medium text-white/50 mb-3 block">Travel Type</label>
              <div className="grid grid-cols-4 gap-2">
                {TRAVEL_TYPES.map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, travelType: t }))}
                    className="py-3 px-2 rounded-xl text-xs font-medium text-center transition-all"
                    style={form.travelType === t
                      ? { background: "rgba(124,58,237,0.2)", color: "var(--violet-light)", border: "1px solid rgba(124,58,237,0.4)" }
                      : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
                    }>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-white/50 mb-3 block">Budget Level</label>
              <div className="space-y-2">
                {BUDGET_LEVELS.map(b => (
                  <button key={b.label} onClick={() => setForm(f => ({ ...f, budget: b.label }))}
                    className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                    style={form.budget === b.label
                      ? { background: `${b.color}15`, border: `1px solid ${b.color}40` }
                      : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
                    }>
                    <span className="text-2xl">{b.icon}</span>
                    <div>
                      <p className="text-white font-semibold text-sm">{b.label}</p>
                      <p className="text-white/40 text-xs">{b.sub}</p>
                    </div>
                    {form.budget === b.label && <Check className="w-4 h-4 ml-auto" style={{ color: b.color }} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost px-4 py-3 text-sm flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3.5 text-sm flex items-center justify-center gap-2">
                Review <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>Review & Create</h2>
            <div className="space-y-0 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              {[
                ["Trip Name", form.name || aiResult?.name || "Untitled Trip"],
                ["Duration", form.start && form.end ? `${form.start} → ${form.end}` : "Not set"],
                ["Travelers", `${form.travelers} people`],
                ["Travel Type", form.travelType || "—"],
                ["Budget", form.budget || "—"],
                ["Est. Cost", aiResult ? `$${aiResult.budget}` : "—"],
              ].map(([label, val], idx) => (
                <div key={label} className="flex justify-between items-center px-5 py-3.5"
                  style={{ background: idx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderBottom: idx < 5 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span className="text-white/40 text-sm">{label}</span>
                  <span className="text-white text-sm font-semibold">{val}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-ghost px-4 py-3 text-sm flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => toast.success("🎉 Trip created! Redirecting to itinerary...")}
                className="btn-primary flex-1 py-3.5 text-sm flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Create Trip
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
