
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10',      // 32px -> 40px (25% increase)
    md: 'w-16 h-16',      // 48px -> 64px (33% increase, closest Tailwind size)
    lg: 'w-[120px] h-[120px]',  // 96px -> 120px (25% increase - custom size)
    xl: 'w-60 h-60',      // 192px -> 240px (25% increase)
  };

  useEffect(() => {
    if (!logoRef.current) return;

    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
      });
    }

    const logoElement = logoRef.current;
    let hoverAnimation: gsap.core.Tween | null = null;

    // Lively floating movement
    gsap.to(logoElement, {
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

    // Extremely live hover pop-out effect (300%)
    const handleMouseEnter = () => {
      // Kill any existing animation
      if (hoverAnimation) hoverAnimation.kill();
      
      hoverAnimation = gsap.to(logoElement, {
        scale: 3, // 300% pop-out
        zIndex: 9999,
        duration: 0.6,
        ease: "back.out(1.7)", // Bouncy elastic effect for extra liveliness
        onUpdate: function() {
          // Ensure it stays on top during animation
          logoElement.style.zIndex = '9999';
        }
      });

      // Enhance the aura glow on hover
      const aura = logoElement.querySelector('.logo-aura');
      if (aura) {
        gsap.to(aura, {
          opacity: 0.5,
          scale: 2,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      // Kill any existing animation
      if (hoverAnimation) hoverAnimation.kill();
      
      hoverAnimation = gsap.to(logoElement, {
        scale: 1,
        zIndex: 'auto',
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: function() {
          logoElement.style.zIndex = '';
        }
      });

      // Reset the aura glow
      const aura = logoElement.querySelector('.logo-aura');
      if (aura) {
        gsap.to(aura, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    };

    logoElement.addEventListener('mouseenter', handleMouseEnter);
    logoElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      logoElement.removeEventListener('mouseenter', handleMouseEnter);
      logoElement.removeEventListener('mouseleave', handleMouseLeave);
      if (hoverAnimation) hoverAnimation.kill();
    };
  }, []);

  return (
    <div 
      ref={logoRef}
      className={`relative group cursor-pointer perspective-1000 ${sizeClasses[size]} ${className}`}
    >
      {/* Permanent High-Contrast Aura - Enhanced for hover effect */}
      <div className="logo-aura absolute -inset-4 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" />
      
      {/* Main Logo Container - Transparent Background */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-transparent shadow-[0_0_40px_rgba(34,211,238,0.3)] border-2 border-cyan-400/50 flex items-center justify-center">
        {!imageError ? (
          <video
            ref={videoRef}
            src="/Lively_Triangle_Logo_Animation_Prompt.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="relative z-10 w-full h-full object-contain p-2 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
            style={{
              mixBlendMode: 'multiply',
              opacity: 1,
              filter: 'contrast(1.1) brightness(0.95)',
              WebkitFilter: 'contrast(1.1) brightness(0.95)'
            }}
            onError={() => {
              // Fallback to image if video fails
              setImageError(true);
            }}
          />
        ) : (
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Delta7 Logo" 
              className="w-full h-full object-contain p-2 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
              onError={() => {
                // Final fallback to text
              }}
            />
            <span className="absolute text-cyan-400 font-black text-center z-10 select-none drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]" style={{ fontSize: size === 'xl' ? '3.75rem' : size === 'lg' ? '3rem' : size === 'md' ? '1.875rem' : '1.25rem' }}>
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
