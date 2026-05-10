"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Plane, Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error("Please fill all fields"); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    toast.success("Account created! Welcome to Traveloop 🎉");
    window.location.href = "/dashboard";
  };

  const perks = ["AI itinerary generation", "Smart budget tracking", "Collaborative trip planning", "Packing assistant"];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80"
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
            <h2 className="text-4xl font-black text-white mb-4">Everything you need<br />to <span className="gradient-text">travel smarter</span></h2>
            <div className="space-y-3 mt-6">
              {perks.map(p => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)" }}>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-white/80">{p}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 lg:max-w-md flex flex-col justify-center p-8 lg:p-12">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-sm mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Create your account</h1>
            <p className="text-white/50">Start planning smarter trips today — it's free</p>
          </div>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Alex Johnson" className="w-full pl-10 pr-4 py-3 input-glass text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com" className="w-full pl-10 pr-4 py-3 input-glass text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type={showPass ? "text" : "password"} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="At least 6 characters" className="w-full pl-10 pr-10 py-3 input-glass text-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2"
              style={{ background: "var(--gradient-primary)", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Creating account..." : <><ArrowRight className="w-4 h-4" /> Create Free Account</>}
            </motion.button>
          </form>
          <p className="text-center text-sm text-white/50 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
