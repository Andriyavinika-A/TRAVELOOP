"use client";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { DollarSign, TrendingDown, AlertTriangle, Sparkles, Plane, Hotel, UtensilsCrossed, Activity, Package } from "lucide-react";
import { MOCK_BUDGET } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const i = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const PALETTE = ["#7C3AED", "#06B6D4", "#F59E0B", "#10B981", "#F43F5E"];

const Tip = ({ active, payload }: any) => active && payload?.length
  ? <div className="glass-card px-3 py-2 text-xs"><p className="text-white font-semibold">{payload[0].name}</p><p style={{ color: "var(--cyan-light)" }}>${payload[0].value}</p></div>
  : null;

export default function BudgetPage() {
  const pct       = Math.round((MOCK_BUDGET.spent / MOCK_BUDGET.total) * 100);
  const remaining = MOCK_BUDGET.total - MOCK_BUDGET.spent;

  const pieData = Object.entries(MOCK_BUDGET.breakdown).map(([name, v]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1), value: v.budget,
  }));
  const barData = Object.entries(MOCK_BUDGET.breakdown).map(([name, v]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1), Budget: v.budget, Spent: v.spent,
  }));

  const CAT_ICONS: Record<string, any> = {
    transport: Plane, accommodation: Hotel, food: UtensilsCrossed, activities: Activity, miscellaneous: Package,
  };

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="space-y-7 pb-10">

      {/* Header */}
      <motion.div variants={i} className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>Budget Tracker</h1>
          <p className="text-white/40 mt-1 text-sm">Golden Triangle India</p>
        </div>
        <button onClick={() => toast.info("✨ AI: Book trains early to save $80!")}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm">
          <Sparkles className="w-4 h-4" /> AI Optimize
        </button>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Budget", val: formatCurrency(MOCK_BUDGET.total), accent: "var(--violet)", icon: DollarSign },
          { label: "Spent",        val: formatCurrency(MOCK_BUDGET.spent), accent: "var(--gold)",   icon: TrendingDown },
          { label: "Remaining",    val: formatCurrency(remaining),          accent: "var(--emerald)", icon: DollarSign },
          { label: "Used",         val: `${pct}%`, accent: pct > 80 ? "var(--rose)" : "var(--cyan)", icon: pct > 80 ? AlertTriangle : DollarSign },
        ].map(card => (
          <motion.div key={card.label} variants={i} className="glass-card p-5 relative overflow-hidden hover-lift"
            style={{ borderTop: `2px solid ${card.accent}` }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">{card.label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${card.accent}20` }}>
                <card.icon className="w-4 h-4" style={{ color: card.accent }} />
              </div>
            </div>
            <p className="text-3xl font-black" style={{ fontFamily: "Syne, sans-serif", color: card.accent }}>{card.val}</p>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-10"
              style={{ background: `radial-gradient(circle, ${card.accent}, transparent)` }} />
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div variants={i} className="glass-card p-6">
        <div className="flex justify-between text-sm mb-4">
          <span className="text-white/50 font-medium">Budget Utilization</span>
          <span className="font-black" style={{ fontFamily: "Syne, sans-serif", color: pct > 80 ? "var(--rose)" : "var(--cyan-light)" }}>
            {pct}%
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: pct > 80 ? "linear-gradient(90deg, var(--gold), var(--rose))" : "var(--grad-primary)" }} />
        </div>
        {pct > 70 && (
          <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: "var(--gold)" }}>
            <AlertTriangle className="w-3.5 h-3.5" /> Approaching limit — AI has optimization suggestions
          </div>
        )}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={i} className="glass-card p-6">
          <p className="text-base font-black text-white mb-5" style={{ fontFamily: "Syne, sans-serif" }}>Distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                {pieData.map((_, idx) => <Cell key={idx} fill={PALETTE[idx % PALETTE.length]} />)}
              </Pie>
              <Tooltip content={<Tip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {pieData.map((d, idx) => (
              <div key={d.name} className="flex items-center gap-2 text-xs text-white/50">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: PALETTE[idx] }} />
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={i} className="glass-card p-6">
          <p className="text-base font-black text-white mb-5" style={{ fontFamily: "Syne, sans-serif" }}>Budget vs Spent</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barSize={14}>
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="Budget" fill="rgba(124,58,237,0.3)" radius={[4,4,0,0]} />
              <Bar dataKey="Spent"  fill="#7C3AED" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Daily trend */}
      <motion.div variants={i} className="glass-card p-6">
        <p className="text-base font-black text-white mb-5" style={{ fontFamily: "Syne, sans-serif" }}>Daily Spending Trend</p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={MOCK_BUDGET.daily}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tip />} />
            <Line type="monotone" dataKey="amount" stroke="var(--cyan)" strokeWidth={2.5}
              dot={{ fill: "var(--cyan)", r: 4 }} activeDot={{ r: 6, fill: "var(--cyan-light)" }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category bars */}
      <motion.div variants={i} className="glass-card p-6">
        <p className="text-base font-black text-white mb-5" style={{ fontFamily: "Syne, sans-serif" }}>Category Breakdown</p>
        <div className="space-y-4">
          {Object.entries(MOCK_BUDGET.breakdown).map(([cat, v], idx) => {
            const Icon = CAT_ICONS[cat] || DollarSign;
            const catPct = Math.round((v.spent / v.budget) * 100);
            return (
              <div key={cat}>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 text-sm text-white/60 capitalize">
                    <Icon className="w-4 h-4" style={{ color: PALETTE[idx] }} /> {cat}
                  </span>
                  <span className="text-xs text-white/40">{formatCurrency(v.spent)} / {formatCurrency(v.budget)}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(catPct, 100)}%` }}
                    transition={{ duration: 0.9, delay: idx * 0.1 }}
                    className="h-full rounded-full" style={{ background: PALETTE[idx] }} />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
