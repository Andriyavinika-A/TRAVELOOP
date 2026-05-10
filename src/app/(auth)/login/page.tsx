"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Plane } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error("Please fill all fields"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-base)" }}>

      {/* ── Left: Aurora Visual Panel ───────────────── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, #0D0028 0%, #06050F 40%, #001428 100%)"
        }} />
        {/* Aurora blobs */}
        <div className="absolute" style={{
          top: "10%", left: "15%", width: 420, height: 420,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.5) 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "drift1 10s ease-in-out infinite alternate"
        }} />
        <div className="absolute" style={{
          bottom: "15%", right: "10%", width: 360, height: 360,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.45) 0%, transparent 65%)",
          filter: "blur(50px)",
          animation: "drift2 13s ease-in-out infinite alternate"
        }} />
        <div className="absolute" style={{
          top: "45%", right: "25%", width: 280, height: 280,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(244,63,94,0.35) 0%, transparent 65%)",
          filter: "blur(45px)",
          animation: "drift3 16s ease-in-out infinite alternate"
        }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--grad-primary)" }}>
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>Traveloop</span>
          </div>

          {/* Hero text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
              <p className="text-white/50 text-sm font-medium mb-4 tracking-widest uppercase">AI-Powered Travel Planning</p>
              <h1 className="text-6xl font-black text-white leading-[1.05] mb-6"
                style={{ fontFamily: "Syne, sans-serif" }}>
                Your next<br />
                <span className="gradient-text-aurora">adventure</span><br />
                starts here.
              </h1>
              <p className="text-white/50 text-lg max-w-sm">
                AI-generated itineraries, smart budgets, and collaborative trip planning — all in one place.
              </p>
            </motion.div>

            {/* Floating stat cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex gap-4 mt-10">
              {[["10K+", "Trips Created"], ["150+", "Destinations"], ["98%", "Happy Travelers"]].map(([v, l]) => (
                <div key={l} className="glass-card px-4 py-3 text-center">
                  <p className="text-2xl font-black gradient-text" style={{ fontFamily: "Syne, sans-serif" }}>{v}</p>
                  <p className="text-white/40 text-xs mt-0.5">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Right: Auth Form ─────────────────────────── */}
      <div className="flex-1 lg:max-w-[440px] flex items-center justify-center p-8"
        style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--grad-primary)" }}>
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>Traveloop</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>Sign in</h2>
            <p className="text-white/40">Welcome back — your trips are waiting.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/50 mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input type="email" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="input-aurora pl-10 pr-4 py-3"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-white/50">Password</label>
                <Link href="/forgot-password"
                  className="text-sm font-medium transition-colors"
                  style={{ color: "var(--violet-light)" }}>Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input type={showPass ? "text" : "password"} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="input-aurora pl-10 pr-11 py-3"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 mt-2"
              style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in..." : <><ArrowRight className="w-4 h-4" /> Continue</>}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="divider-aurora" />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-xs text-white/30"
              style={{ background: "var(--bg-base)" }}>or</span>
          </div>

          {/* Google */}
          <button onClick={() => toast.info("Connect Supabase to enable Google OAuth")}
            className="btn-ghost w-full py-3.5 text-sm flex items-center justify-center gap-2">
            <span className="font-bold text-base leading-none">G</span> Continue with Google
          </button>

          <p className="text-center text-sm text-white/40 mt-8">
            No account?{" "}
            <Link href="/signup" className="font-semibold transition-colors"
              style={{ color: "var(--cyan-light)" }}>Create one free →</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
