"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Package, Shirt, Smartphone, FileText, Pill, Check, Plus, Sparkles, Loader2, Trash2 } from "lucide-react";
import { MOCK_PACKING } from "@/lib/mockData";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const CATEGORIES = [
  { id: "all", label: "All Items", icon: Package, color: "#60a5fa" },
  { id: "clothing", label: "Clothing", icon: Shirt, color: "#a78bfa" },
  { id: "electronics", label: "Electronics", icon: Smartphone, color: "#34d399" },
  { id: "documents", label: "Documents", icon: FileText, color: "#fbbf24" },
  { id: "medicine", label: "Medicine", icon: Pill, color: "#f87171" },
];

export default function PackingPage() {
  const [items, setItems] = useState(MOCK_PACKING);
  const [activeCategory, setActiveCategory] = useState("all");
  const [aiLoading, setAiLoading] = useState(false);
  const [newItem, setNewItem] = useState("");

  const filtered = activeCategory === "all" ? items : items.filter(i => i.category === activeCategory);
  const packedCount = items.filter(i => i.packed).length;
  const pct = Math.round((packedCount / items.length) * 100);

  const togglePacked = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, packed: !i.packed } : i));
  };
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast.success("Item removed");
  };
  const addItem = () => {
    if (!newItem.trim()) return;
    setItems(prev => [...prev, { id: `p${Date.now()}`, name: newItem, category: activeCategory === "all" ? "clothing" : activeCategory, packed: false }]);
    setNewItem("");
    toast.success("Item added!");
  };
  const handleAISuggest = async () => {
    setAiLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    const suggestions = [
      { id: `ai-1`, name: "Sunglasses", category: "clothing", packed: false },
      { id: `ai-2`, name: "Portable Charger", category: "electronics", packed: false },
      { id: `ai-3`, name: "Mosquito Repellent", category: "medicine", packed: false },
      { id: `ai-4`, name: "Travel Adapter", category: "electronics", packed: false },
    ];
    setItems(prev => [...prev, ...suggestions]);
    setAiLoading(false);
    toast.success("✨ AI added 4 suggestions for India trip!");
  };

  const catStats = CATEGORIES.slice(1).map(cat => ({
    ...cat,
    total: items.filter(i => i.category === cat.id).length,
    packed: items.filter(i => i.category === cat.id && i.packed).length,
  }));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-8">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Packing Checklist</h1>
          <p className="text-white/50 mt-1">{packedCount} of {items.length} items packed</p>
        </div>
        <button onClick={handleAISuggest} disabled={aiLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: "var(--gradient-primary)", opacity: aiLoading ? 0.7 : 1 }}>
          {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          AI Suggest
        </button>
      </motion.div>

      {/* Progress */}
      <motion.div variants={item} className="glass-card p-5">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-white/60">Packing Progress</span>
          <span className="text-white font-semibold">{pct}% Complete</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }}
            className="h-full rounded-full"
            style={{ background: pct === 100 ? "linear-gradient(90deg, #10b981, #34d399)" : "var(--gradient-primary)" }} />
        </div>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {catStats.map(cat => (
            <div key={cat.id} className="text-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
              <cat.icon className="w-4 h-4 mx-auto mb-1" style={{ color: cat.color }} />
              <p className="text-xs text-white/50">{cat.label}</p>
              <p className="text-sm font-bold text-white">{cat.packed}/{cat.total}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div variants={item} className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all"
            style={activeCategory === cat.id
              ? { background: "rgba(59,130,246,0.2)", color: cat.color, border: `1px solid ${cat.color}40` }
              : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
            }>
            <cat.icon className="w-3.5 h-3.5" /> {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Add item */}
      <motion.div variants={item} className="flex gap-2">
        <input value={newItem} onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addItem()}
          placeholder="Add new item..."
          className="flex-1 px-4 py-2.5 input-glass text-sm" />
        <button onClick={addItem}
          className="px-4 py-2.5 rounded-xl text-white font-medium text-sm flex items-center gap-1.5"
          style={{ background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.3)" }}>
          <Plus className="w-4 h-4" /> Add
        </button>
      </motion.div>

      {/* Items List */}
      <div className="space-y-2">
        {filtered.map(packItem => {
          const cat = CATEGORIES.find(c => c.id === packItem.category);
          return (
            <motion.div key={packItem.id} variants={item}
              className="flex items-center gap-3 p-3.5 rounded-xl group transition-all"
              style={{ background: packItem.packed ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <button onClick={() => togglePacked(packItem.id)}
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all"
                style={{ background: packItem.packed ? "#10b981" : "rgba(255,255,255,0.08)", border: `1px solid ${packItem.packed ? "#10b981" : "rgba(255,255,255,0.12)"}` }}>
                {packItem.packed && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
              <div className="flex-1">
                <p className={`text-sm font-medium transition-all ${packItem.packed ? "line-through text-white/30" : "text-white"}`}>
                  {packItem.name}
                </p>
              </div>
              {cat && (
                <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={{ background: "rgba(255,255,255,0.06)", color: cat.color }}>
                  <cat.icon className="w-3 h-3" /> {cat.label}
                </span>
              )}
              <button onClick={() => removeItem(packItem.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400/60 hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
