"use client";
import { motion } from "framer-motion";
import { ADMIN_STATS } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { Users, Map, TrendingUp, DollarSign, Search, Trash2, Shield } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts";
import { useState } from "react";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const MOCK_USERS_LIST = [
  { id: "u1", name: "Sarah Connor", email: "sarah@example.com", trips: 8, joined: "2024-01-15", status: "active" },
  { id: "u2", name: "James Rodriguez", email: "james@example.com", trips: 14, joined: "2023-11-20", status: "active" },
  { id: "u3", name: "Priya Sharma", email: "priya@example.com", trips: 3, joined: "2024-03-10", status: "inactive" },
  { id: "u4", name: "Luca Ferrari", email: "luca@example.com", trips: 21, joined: "2023-06-05", status: "active" },
  { id: "u5", name: "Yuki Tanaka", email: "yuki@example.com", trips: 7, joined: "2024-02-22", status: "active" },
];

const monthlyData = ADMIN_STATS.monthly_signups.map((val, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  signups: val,
}));

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_USERS_LIST.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-8">
      {/* Header */}
      <motion.div variants={item} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.15)" }}>
          <Shield className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Admin Dashboard</h1>
          <p className="text-white/50 mt-0.5">Platform analytics and user management</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", val: ADMIN_STATS.total_users.toLocaleString(), icon: Users, color: "rgba(59,130,246,0.2)", textColor: "#60a5fa" },
          { label: "Trips Created", val: ADMIN_STATS.total_trips.toLocaleString(), icon: Map, color: "rgba(139,92,246,0.2)", textColor: "#a78bfa" },
          { label: "Active Today", val: ADMIN_STATS.active_today.toLocaleString(), icon: TrendingUp, color: "rgba(16,185,129,0.2)", textColor: "#34d399" },
          { label: "Revenue (est.)", val: formatCurrency(ADMIN_STATS.revenue), icon: DollarSign, color: "rgba(245,158,11,0.2)", textColor: "#fbbf24" },
        ].map(s => (
          <motion.div key={s.label} variants={item} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/50 text-sm">{s.label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.color }}>
                <s.icon className="w-4 h-4" style={{ color: s.textColor }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: s.textColor }}>{s.val}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4">Monthly Signups</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barSize={16}>
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(15,32,68,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="signups" fill="#3b82f6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4">Popular Destinations</h3>
          <div className="space-y-3">
            {ADMIN_STATS.popular_destinations.map((dest, i) => (
              <div key={dest}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">{dest}</span>
                  <span className="text-white/40">{100 - i * 12}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${100 - i * 12}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: ["#3b82f6","#8b5cf6","#10b981","#f59e0b","#ef4444"][i] }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* User Management */}
      <motion.div variants={item} className="glass-card overflow-hidden">
        <div className="p-5 border-b border-white/5 flex items-center justify-between gap-4">
          <h3 className="text-base font-semibold text-white">User Management</h3>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search users..." className="w-full pl-10 pr-4 py-2 input-glass text-sm" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-white/40 uppercase tracking-wider border-b border-white/5">
                {["User", "Email", "Trips", "Joined", "Status", "Action"].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-white text-sm font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-white/50 text-sm">{user.email}</td>
                  <td className="px-5 py-3.5 text-white text-sm">{user.trips}</td>
                  <td className="px-5 py-3.5 text-white/50 text-sm">{user.joined}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user.status === "active" ? "badge-upcoming" : "text-white/30 bg-white/5"
                    }`}>{user.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toast.error(`User ${user.name} removed (demo)`)}
                      className="text-red-400/60 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
