"use client";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DollarSign, TrendingDown, AlertTriangle, Sparkles, Plane, Hotel, UtensilsCrossed, Activity, Package } from "lucide-react";
import { MOCK_BUDGET } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const PIE_COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];

const CATEGORY_ICONS: Record<string, any> = {
  transport: Plane,
  accommodation: Hotel,
  food: UtensilsCrossed,
  activities: Activity,
  miscellaneous: Package,
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 text-sm">
        <p className="text-white font-medium">{payload[0].name}</p>
        <p className="text-blue-400">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function BudgetPage() {
  const pct = Math.round((MOCK_BUDGET.spent / MOCK_BUDGET.total) * 100);
  const remaining = MOCK_BUDGET.total - MOCK_BUDGET.spent;

  const pieData = Object.entries(MOCK_BUDGET.breakdown).map(([name, v]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: v.budget,
    spent: v.spent,
  }));

  const barData = Object.entries(MOCK_BUDGET.breakdown).map(([name, v]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    Budget: v.budget,
    Spent: v.spent,
  }));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-8">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Budget Tracker</h1>
          <p className="text-white/50 mt-1">Golden Triangle India</p>
        </div>
        <button onClick={() => toast.info("✨ AI suggests: Book train tickets early to save $80!")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="w-4 h-4" /> AI Optimize
        </button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Budget", val: formatCurrency(MOCK_BUDGET.total), color: "rgba(59,130,246,0.15)", icon: DollarSign, textColor: "#60a5fa" },
          { label: "Spent So Far", val: formatCurrency(MOCK_BUDGET.spent), color: "rgba(245,158,11,0.15)", icon: TrendingDown, textColor: "#fbbf24" },
          { label: "Remaining", val: formatCurrency(remaining), color: "rgba(16,185,129,0.15)", icon: DollarSign, textColor: "#34d399" },
          { label: "% Used", val: `${pct}%`, color: pct > 80 ? "rgba(239,68,68,0.15)" : "rgba(139,92,246,0.15)", icon: pct > 80 ? AlertTriangle : DollarSign, textColor: pct > 80 ? "#f87171" : "#a78bfa" },
        ].map(card => (
          <motion.div key={card.label} variants={item} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/50 text-sm">{card.label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: card.color }}>
                <card.icon className="w-4 h-4" style={{ color: card.textColor }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: card.textColor }}>{card.val}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div variants={item} className="glass-card p-5">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-white/60">Budget Used</span>
          <span className={pct > 80 ? "text-red-400" : "text-white"}>{pct}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full"
            style={{ background: pct > 80 ? "linear-gradient(90deg, #f59e0b, #ef4444)" : "var(--gradient-primary)" }} />
        </div>
        {pct > 70 && (
          <p className="text-yellow-400 text-xs mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Approaching budget limit — AI suggests some optimizations
          </p>
        )}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie */}
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4">Budget Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs text-white/60">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bar */}
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4">Budget vs Spent</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barSize={18}>
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Budget" fill="rgba(59,130,246,0.4)" radius={[4,4,0,0]} />
              <Bar dataKey="Spent" fill="#3b82f6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Daily spend */}
      <motion.div variants={item} className="glass-card p-6">
        <h3 className="text-base font-semibold text-white mb-4">Daily Spending Trend</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={MOCK_BUDGET.daily}>
            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2.5}
              dot={{ fill: "#3b82f6", r: 4 }} activeDot={{ r: 6, fill: "#60a5fa" }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category breakdown */}
      <motion.div variants={item} className="glass-card p-6">
        <h3 className="text-base font-semibold text-white mb-4">Category Breakdown</h3>
        <div className="space-y-4">
          {Object.entries(MOCK_BUDGET.breakdown).map(([cat, v], i) => {
            const Icon = CATEGORY_ICONS[cat] || DollarSign;
            const catPct = Math.round((v.spent / v.budget) * 100);
            return (
              <div key={cat}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-2 text-white/70 capitalize">
                    <Icon className="w-4 h-4" style={{ color: PIE_COLORS[i] }} /> {cat}
                  </span>
                  <span className="text-white/60">{formatCurrency(v.spent)} / {formatCurrency(v.budget)}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(catPct, 100)}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: PIE_COLORS[i] }} />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
