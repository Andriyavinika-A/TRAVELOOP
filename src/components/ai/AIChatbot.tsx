"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2 } from "lucide-react";

const INITIAL_MSGS = [
  { role: "assistant", content: "👋 Hi! I'm your AI travel assistant. Ask me anything about your trip — best places, hotels, food, weather, or transport!" },
];

const QUICK_PROMPTS = [
  "Best places in Goa?", "Cheap hotels in Delhi?", "Food to try in Tokyo",
  "Weather in Bali in Feb?", "Transport tips for Europe",
];

const AI_RESPONSES: Record<string, string> = {
  "Best places in Goa?": "🏖️ **Top places in Goa:**\n1. **Baga Beach** — Best for nightlife & water sports\n2. **Old Goa** — UNESCO heritage churches\n3. **Arambol** — Peaceful hippie vibe\n4. **Palolem** — Pristine crescent beach\n5. **Dudhsagar Falls** — Stunning waterfall trek\n\nBest visited Nov–Feb for perfect weather! 🌞",
  "Cheap hotels in Delhi?": "🏨 **Budget hotels in Delhi ($20-50/night):**\n1. **Zostel Delhi** — Great hostel, ₹600/bed\n2. **The Madpackers Hostel** — Super social, Paharganj\n3. **Hotel Namaskar** — Clean & central, near metro\n4. **OYO Rooms** — App-based budget options\n\n💡 Tip: Book near a Metro station to save on transport!",
  "Food to try in Tokyo": "🍜 **Must-try Tokyo foods:**\n1. **Ramen** — Try Ichiran for solo dining experience\n2. **Sushi** — Tsukiji Outer Market for fresh breakfast sushi\n3. **Yakitori** — Grilled skewers under the train tracks in Yurakucho\n4. **Tempura** — Tendon Tenya for affordable quality\n5. **Matcha desserts** — Yanaka Ginza shopping street\n\nBudget: ¥800–2000 per meal (~$6–15) 💰",
  default: "That's a great question! 🌍 Based on your trip details, I'd recommend researching local travel blogs and checking Tripadvisor reviews. Would you like me to help with something more specific — like budget, activities, or transport options?",
};

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MSGS);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setTyping(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const reply = AI_RESPONSES[text] || AI_RESPONSES.default;
    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    setTyping(false);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl animate-pulse-glow"
        style={{ background: "var(--gradient-primary)", display: open ? "none" : "flex" }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full text-xs flex items-center justify-center text-white font-bold">AI</span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 flex flex-col rounded-2xl overflow-hidden"
            style={{ height: 520, background: "rgba(5,13,26,0.98)", border: "1px solid rgba(59,130,246,0.2)", boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.1)" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">AI Travel Assistant</p>
                <p className="text-emerald-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />Online
                </p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "var(--gradient-primary)" }}>
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "text-white rounded-tr-sm"
                      : "text-white/90 rounded-tl-sm"
                  }`} style={{
                    background: msg.role === "user" ? "var(--gradient-primary)" : "rgba(255,255,255,0.07)",
                  }}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-blue-500/20">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="px-3 py-2.5 rounded-2xl rounded-tl-sm" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div className="flex gap-1">
                      {[0,1,2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400"
                          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto">
              {QUICK_PROMPTS.map(p => (
                <button key={p} onClick={() => send(p)}
                  className="text-xs px-2.5 py-1.5 rounded-full whitespace-nowrap text-blue-300 shrink-0 transition-colors"
                  style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                  {p}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5">
              <div className="flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send(input)}
                  placeholder="Ask about travel, hotels, food..."
                  className="flex-1 px-3 py-2 input-glass text-xs" />
                <button onClick={() => send(input)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                  style={{ background: "var(--gradient-primary)" }}>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)} }`}</style>
    </>
  );
}
