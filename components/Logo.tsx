
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-48 h-48',
  };

  useEffect(() => {
    if (!logoRef.current) return;

    // Lively floating movement
    gsap.to(logoRef.current, {
      y: -5,
      rotation: 2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Attractive shining glint effect
    if (glintRef.current) {
      gsap.to(glintRef.current, {
        x: '300%',
        duration: 3,
        repeat: -1,
        repeatDelay: 1,
        ease: "power2.inOut"
      });
    }
  }, []);

  return (
    <div 
      ref={logoRef}
      className={`relative group cursor-pointer perspective-1000 ${sizeClasses[size]} ${className}`}
    >
      {/* Permanent High-Contrast Aura */}
      <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" />
      
      {/* Main Logo Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-[0_0_40px_rgba(34,211,238,0.3)] border-2 border-cyan-400/50 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50 to-slate-100" />
        {!imageError ? (
          <img 
            src="/logo.png" 
            alt="Delta7 Logo" 
            className="relative z-10 w-full h-full object-contain p-2 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
            onError={() => {
              // Only set error once to prevent infinite loops
              setImageError(true);
            }}
          />
        ) : (
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <span className="text-slate-900 font-black text-center z-10 select-none" style={{ fontSize: size === 'lg' || size === 'xl' ? '3rem' : size === 'md' ? '1.5rem' : '1rem' }}>
              Δ7
            </span>
          </div>
        )}

        {/* Shining Glint Effect */}
        <div 
          ref={glintRef}
          className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] pointer-events-none"
        />
      </div>

      {/* Shining Feastful Sparks (CSS only for performance) */}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 delay-300" />
    </div>
  );
};

export default Logo;
