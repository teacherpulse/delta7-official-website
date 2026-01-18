
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, MessageSquare, Send, Loader2, Binary, Cpu } from 'lucide-react';
import { getEduInsight } from '../services/geminiService';

const SmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: 'Delta7 Neural Interface Active. I am the AI Framework Architect. Inquiry requested: How shall we optimize your educational system today?'}
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const botResponse = await getEduInsight(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse || "Communication Error: Knowledge base unreachable." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="glass-card w-[380px] md:w-[450px] h-[600px] rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col border border-cyan-500/30 animate-in fade-in zoom-in duration-300">
          {/* Futuristic HUD Header */}
          <div className="p-6 bg-gradient-to-r from-slate-900 to-cyan-950 flex items-center justify-between border-b border-cyan-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 relative">
                <Cpu size={20} className="animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-white text-sm tracking-widest uppercase">Delta7 Core AI</span>
                <span className="text-[9px] mono text-cyan-500/70 font-bold uppercase tracking-[0.2em]">Neural Engine v3.1.5</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Message Interface */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/40 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`relative max-w-[85%] px-5 py-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_10px_30px_rgba(34,211,238,0.2)]' 
                    : 'glass-card border-white/10 text-slate-200'
                }`}>
                  {msg.text}
                  {msg.role === 'bot' && (
                    <div className="absolute -left-2 top-4 w-1 h-8 bg-cyan-500/30 rounded-full" />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="glass-card px-5 py-4 rounded-2xl text-cyan-400/70 flex items-center space-x-3 border-cyan-500/20">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] mono">Analyzing Architecture...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Module */}
          <div className="p-6 bg-slate-950/90 border-t border-white/5">
            <div className="flex space-x-3 p-1 glass-card rounded-2xl border-cyan-500/10 focus-within:border-cyan-500/50 transition-colors">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Inquire about HTMF/HSMF Protocols..."
                className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder-slate-600 outline-none mono"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="w-12 h-12 bg-cyan-500 text-slate-950 rounded-xl flex items-center justify-center hover:bg-white transition-all disabled:opacity-30 disabled:grayscale"
              >
                <Send size={20} fill="currentColor" />
              </button>
            </div>
            <div className="mt-3 flex justify-center items-center space-x-4">
               <span className="text-[8px] mono text-slate-700 uppercase tracking-widest">Privacy Protected Tunnel</span>
               <div className="w-1 h-1 rounded-full bg-slate-800" />
               <span className="text-[8px] mono text-slate-700 uppercase tracking-widest">End-to-End Encryption</span>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="relative group w-20 h-20 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-2 bg-cyan-500/10 rounded-full animate-pulse"></div>
          
          <div className="relative w-16 h-16 bg-cyan-500 text-slate-950 rounded-[1.5rem] flex items-center justify-center shadow-[0_10px_40px_rgba(34,211,238,0.4)] group-hover:scale-110 group-active:scale-95 transition-all duration-300 transform rotate-12 group-hover:rotate-0">
            <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-cyan-500">1</div>
          </div>
        </button>
      )}
    </div>
  );
};

export default SmartAssistant;
