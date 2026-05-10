"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Plane, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
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
    setLoading(false);
    toast.success("Welcome back! Redirecting...");
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Imagery */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
          alt="Travel" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,13,26,0.85) 0%, rgba(5,13,26,0.4) 100%)" }} />
        <div className="relative flex flex-col justify-end p-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Traveloop</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-4 leading-tight">
              Plan your next<br /><span className="gradient-text">adventure</span> with AI
            </h2>
            <p className="text-white/60 text-lg">AI-generated itineraries, smart budgets, and collaborative trip planning.</p>
            <div className="flex gap-6 mt-8">
              {[["10K+", "Trips Planned"], ["150+", "Countries"], ["98%", "Happy Travelers"]].map(([val, lab]) => (
                <div key={lab}>
                  <p className="text-2xl font-bold text-white">{val}</p>
                  <p className="text-white/50 text-sm">{lab}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 lg:max-w-md flex flex-col justify-center p-8 lg:p-12">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-sm mx-auto">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Traveloop</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Welcome back</h1>
            <p className="text-white/50">Sign in to continue planning your trips</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com" className="w-full pl-10 pr-4 py-3 input-glass text-sm" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-white/60">Password</label>
                <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type={showPass ? "text" : "password"} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••" className="w-full pl-10 pr-10 py-3 input-glass text-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 mt-2"
              style={{ background: "var(--gradient-primary)", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in..." : <><ArrowRight className="w-4 h-4" /> Sign In</>}
            </motion.button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-xs text-white/30" style={{ background: "hsl(var(--background))" }}>or continue with</span>
            </div>
          </div>

          <button onClick={() => toast.info("Google OAuth — connect Supabase to enable")}
            className="w-full py-3 rounded-xl text-white/80 font-medium text-sm flex items-center justify-center gap-2 mb-6"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="text-base">G</span> Continue with Google
          </button>

          <p className="text-center text-sm text-white/50">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">Create one free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
