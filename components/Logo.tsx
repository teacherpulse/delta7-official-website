
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

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
      {/* Outer Glow */}
      <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
      
      {/* Main Logo Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card border border-white/10 shadow-2xl flex items-center justify-center">
        <img 
          src="/logo.png" 
          alt="Delta7 Logo" 
          className="w-full h-full object-contain p-1 transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            // Fallback if logo.png is missing
            (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/delta7-logo-placeholder.png';
          }}
        />

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
