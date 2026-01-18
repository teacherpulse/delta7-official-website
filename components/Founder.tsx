
import React, { useEffect, useState, useRef } from 'react';
import { Quote, Award, BookOpen, Microscope } from 'lucide-react';

const StatCounter: React.FC<{ value: string, label: string }> = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const target = parseInt(value);
        if (isNaN(target)) {
          setCount(0); // For non-numeric values
          return;
        }
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div ref={ref} className="flex flex-col border-l border-slate-800 pl-6 group">
      <span className="text-3xl font-bold text-cyan-400 tabular-nums group-hover:text-white transition-colors">
        {isNaN(parseInt(value)) ? value : count + suffix}
      </span>
      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{label}</span>
    </div>
  );
};

const Founder: React.FC = () => {
  const founderImage = encodeURI("/suram mohan kumar.jpg");

  return (
    <section id="founder" className="reveal-section py-32 relative overflow-hidden">
      <div className="absolute -left-20 top-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group">
              {/* Enhanced Multi-layered Architectural Glow with Color Depth */}
              <div className="absolute -inset-8 bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-purple-500/10 rounded-[3rem] blur-3xl group-hover:blur-[80px] group-hover:bg-gradient-to-br group-hover:from-cyan-500/25 group-hover:via-indigo-500/15 group-hover:to-purple-500/15 transition-all duration-1000"></div>
              <div className="absolute -inset-4 bg-cyan-500/5 rounded-[3rem] blur-xl"></div>
              
              {/* Enhanced Glass Card with Deeper Shadows */}
              <div className="relative glass-card p-6 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(34,211,238,0.1)] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(34,211,238,0.2)] group-hover:border-cyan-500/40 border-2 border-white/10 transition-all duration-700">
                <div className="relative overflow-hidden rounded-[2rem] aspect-[3/4] bg-gradient-to-b from-slate-900 to-slate-950">
                   <img 
                    src={founderImage} 
                    alt="Suram Mohan Kumar" 
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-[1500ms] transform group-hover:scale-110 group-hover:brightness-110"
                    style={{
                      filter: 'brightness(1.08) contrast(1.05) saturate(1.1)',
                      WebkitFilter: 'brightness(1.08) contrast(1.05) saturate(1.1)'
                    }}
                  />
                  
                  {/* Face Beautification Overlay - Brightens face and reduces under-eye darkness */}
                  <div className="absolute inset-0 bg-gradient-radial from-white/8 via-white/3 to-transparent" style={{
                    background: 'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 30%, transparent 60%)',
                    mixBlendMode: 'soft-light'
                  }}></div>
                  
                  {/* Subtle Glow Effect on Face */}
                  <div className="absolute inset-0 bg-gradient-radial from-cyan-400/5 via-transparent to-transparent" style={{
                    background: 'radial-gradient(ellipse 50% 60% at 50% 35%, rgba(34,211,238,0.08) 0%, transparent 50%)',
                    mixBlendMode: 'screen'
                  }}></div>
                  
                  {/* Enhanced Gradient Overlay with Multiple Layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-indigo-500/10 group-hover:from-cyan-500/10 group-hover:to-indigo-500/20 transition-all duration-1000"></div>
                  
                  {/* Enhanced Scanning Line Effect with Glow */}
                  <div className="absolute inset-0 scan-line opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(34,211,238,0.1)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700"></div>
                  
                  {/* Subtle Corner Accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-indigo-500/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>
              
              {/* Enhanced Hover Badge with Better Visual Hierarchy */}
              <div className="absolute -bottom-10 -right-10 glass-card px-12 py-10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(34,211,238,0.2)] border-l-4 border-cyan-500 backdrop-blur-3xl group-hover:translate-x-[-12px] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_50px_rgba(34,211,238,0.3)] transition-all duration-500 bg-slate-900/80">
                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-500">Suram Mohan Kumar</h3>
                <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mt-1 group-hover:text-cyan-300 transition-colors duration-500">Chief Architect & Reformer</p>
                <div className="mt-4 flex space-x-3 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <Award size={20} className="text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
                  <BookOpen size={20} className="text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
                  <Microscope size={20} className="text-indigo-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 lg:pl-12 order-1 lg:order-2">
            <header className="mb-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-px bg-cyan-500/50" />
                <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-[10px] mono">Leadership Profile</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold mb-0 leading-[1.1] tracking-tighter">
                Engineering <span className="text-cyan-400">Empathy</span> Into Education.
              </h2>
            </header>

            <div className="space-y-8 text-slate-400 text-xl leading-relaxed font-light max-w-2xl">
              <p>
                Suram Mohan Kumar represents the fusion of academic rigor and operational excellence. At <span className="text-white font-medium border-b border-cyan-500/30">Nalanda High School</span>, he architected the original prototypes for what would become Delta7.
              </p>
              <p>
                "Education is often treated as a series of random acts of kindness. We treat it as an <strong className="text-white font-bold">engineering challenge</strong>. If we can't measure it, we can't master it."
              </p>
            </div>
            
            <div className="mt-14 p-12 glass-card rounded-3xl relative border-t-2 border-cyan-500/20 bg-gradient-to-br from-white/[0.03] to-slate-950/50 shadow-[inset_0_2px_20px_rgba(0,0,0,0.3),0_10px_40px_rgba(34,211,238,0.1)] group/quote hover:shadow-[inset_0_2px_20px_rgba(0,0,0,0.3),0_15px_60px_rgba(34,211,238,0.2)] hover:border-cyan-500/30 transition-all duration-500">
              <Quote className="absolute -top-8 left-12 w-20 h-20 text-cyan-500/10 group-hover/quote:text-cyan-500/20 transition-colors duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
              <p className="text-2xl font-medium italic text-slate-200 leading-snug tracking-tight group-hover/quote:text-white transition-colors duration-500 relative z-10">
                "Solving complex educational challenges with precision frameworks that remain simple and adaptable for everyone"
              </p>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-tl-full blur-2xl opacity-0 group-hover/quote:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-10">
              <StatCounter value="25+" label="Years Performance" />
              <StatCounter value="50+" label="Global Deployments" />
              <StatCounter value="HTMF/HSMF" label="Proprietary IP" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
