"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Loader2, MapPin, Calendar, Users, DollarSign, Camera, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const TRAVEL_TYPES = ["Beach", "Mountain", "Cultural", "Adventure", "City Break", "Backpacking", "Luxury", "Budget"];
const BUDGET_LEVELS = ["Budget ($50-100/day)", "Mid-range ($100-250/day)", "Luxury ($250+/day)"];
const STEPS = ["Trip Basics", "AI Generation", "Preferences", "Review"];

const AI_DEMO_RESPONSE = {
  name: "5-Day Goa Beach & Culture Experience",
  cities: ["Panaji", "North Goa", "South Goa"],
  days: 5,
  estimated_budget: 650,
  highlights: [
    "Explore Old Goa's UNESCO churches",
    "Sunrise yoga at Arambol Beach",
    "Spice plantation tour in Ponda",
    "Sunset cruise on Mandovi River",
    "Street food tour at Anjuna Market",
  ],
  accommodation: "3-star beach resort (~$45/night)",
  best_time: "November to February",
};

export default function CreateTripPage() {
  const [step, setStep] = useState(0);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<typeof AI_DEMO_RESPONSE | null>(null);
  const [form, setForm] = useState({
    name: "", startDate: "", endDate: "", description: "",
    travelType: "", budgetLevel: "", travelers: "2",
  });

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) { toast.error("Please enter a trip prompt"); return; }
    setAiLoading(true);
    // Simulate AI call
    await new Promise(r => setTimeout(r, 2200));
    setAiResult(AI_DEMO_RESPONSE);
    setForm(f => ({ ...f, name: AI_DEMO_RESPONSE.name, description: AI_DEMO_RESPONSE.highlights.join(". ") }));
    setAiLoading(false);
    toast.success("✨ AI itinerary generated!");
    setStep(2);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            i < step ? "text-white" : i === step ? "text-white" : "text-white/30"
          }`} style={{
            background: i < step ? "var(--gradient-primary)" : i === step ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.05)",
            border: i === step ? "2px solid rgba(59,130,246,0.5)" : "2px solid transparent",
          }}>
            {i < step ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div className="w-12 h-0.5 rounded" style={{ background: i < step ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.08)" }} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto pb-8">
      <motion.div variants={item} className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
          Create Your <span className="gradient-text">Perfect Trip</span>
        </h1>
        <p className="text-white/50">Let AI build your personalized itinerary in seconds</p>
      </motion.div>

      <StepIndicator />

      <motion.div variants={item} className="glass-card p-8">
        {/* Step 0 - Basics */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <h2 className="text-xl font-bold text-white mb-6">Trip Basics</h2>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Trip Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Golden Triangle India, Bali Escape..."
                className="w-full px-4 py-3 input-glass text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/60 mb-2 block">Start Date</label>
                <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                  className="w-full px-4 py-3 input-glass text-sm" />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">End Date</label>
                <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                  className="w-full px-4 py-3 input-glass text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Travelers</label>
              <input type="number" min="1" max="50" value={form.travelers}
                onChange={e => setForm(f => ({ ...f, travelers: e.target.value }))}
                className="w-full px-4 py-3 input-glass text-sm" />
            </div>
            <button onClick={() => setStep(1)}
              className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
              style={{ background: "var(--gradient-primary)" }}>
              Next: AI Generate <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Step 1 - AI */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-float"
                style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">AI Itinerary Generator</h2>
              <p className="text-white/50 text-sm">Describe your dream trip and let AI plan everything</p>
            </div>
            <div className="relative">
              <textarea
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="e.g. '5-day budget trip to Goa for 2 people, love beaches and local food'"
                rows={4}
                className="w-full px-4 py-3 input-glass text-sm resize-none"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {["5-day Goa budget trip", "10-day Europe tour", "Week in Bali", "Tokyo adventure"].map(s => (
                  <button key={s} onClick={() => setAiPrompt(s)}
                    className="text-xs px-3 py-1.5 rounded-lg text-blue-300 transition-colors"
                    style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {aiResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl space-y-3"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <p className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
                  <Check className="w-4 h-4" /> AI Generated Plan
                </p>
                <p className="text-white font-medium">{aiResult.name}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-white/60">Cities: <span className="text-white">{aiResult.cities.join(", ")}</span></div>
                  <div className="text-white/60">Duration: <span className="text-white">{aiResult.days} days</span></div>
                  <div className="text-white/60">Budget: <span className="text-emerald-400">${aiResult.estimated_budget}</span></div>
                </div>
                <ul className="text-xs text-white/60 space-y-1">
                  {aiResult.highlights.map(h => <li key={h} className="flex gap-2"><span className="text-blue-400">→</span>{h}</li>)}
                </ul>
              </motion.div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(0)}
                className="px-4 py-3 rounded-xl text-white/70 font-medium flex items-center gap-2 text-sm"
                style={{ background: "rgba(255,255,255,0.05)" }}>
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={handleAIGenerate} disabled={aiLoading}
                className="flex-1 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                style={{ background: "var(--gradient-primary)", opacity: aiLoading ? 0.7 : 1 }}>
                {aiLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate with AI</>}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2 - Preferences */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-2">Trip Preferences</h2>
            <div>
              <label className="text-sm text-white/60 mb-3 block">Travel Type</label>
              <div className="grid grid-cols-4 gap-2">
                {TRAVEL_TYPES.map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, travelType: t }))}
                    className="py-2.5 px-3 rounded-xl text-xs font-medium transition-all"
                    style={form.travelType === t
                      ? { background: "rgba(59,130,246,0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.4)" }
                      : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
                    }>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-white/60 mb-3 block">Budget Level</label>
              <div className="space-y-2">
                {BUDGET_LEVELS.map(b => (
                  <button key={b} onClick={() => setForm(f => ({ ...f, budgetLevel: b }))}
                    className="w-full py-3 px-4 rounded-xl text-sm font-medium text-left transition-all"
                    style={form.budgetLevel === b
                      ? { background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }
                      : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }
                    }>{b}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-4 py-3 rounded-xl text-white/70 font-medium text-sm flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.05)" }}>
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                style={{ background: "var(--gradient-primary)" }}>
                Review Trip <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 - Review */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-white">Review & Create</h2>
            <div className="space-y-3">
              {[
                { label: "Trip Name", val: form.name || aiResult?.name || "Untitled Trip" },
                { label: "Duration", val: `${form.startDate} → ${form.endDate}` },
                { label: "Travelers", val: `${form.travelers} people` },
                { label: "Travel Type", val: form.travelType || "—" },
                { label: "Budget", val: form.budgetLevel || "—" },
                { label: "Est. Cost", val: aiResult ? `$${aiResult.estimated_budget}` : "—" },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span className="text-white/50 text-sm">{row.label}</span>
                  <span className="text-white text-sm font-medium">{row.val}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-4 py-3 rounded-xl text-white/70 font-medium text-sm flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.05)" }}>
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => toast.success("🎉 Trip created! Redirecting to itinerary...")}
                className="flex-1 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                style={{ background: "var(--gradient-primary)" }}>
                <Check className="w-4 h-4" /> Create Trip
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
