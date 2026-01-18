
import React, { useState, useEffect } from 'react';
import { Menu, X, Triangle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#founder' },
    { name: 'HTMF', href: '#htmf' },
    { name: 'HSMF', href: '#hsmf' },
    { name: 'Innovation', href: '#tech' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2 group">
          <div className="relative">
            <Triangle className="w-8 h-8 text-teal-400 fill-teal-400/20 group-hover:rotate-180 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">Δ7</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">Delta7</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-teal-400 font-semibold">Edu-Frameworks</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-bold rounded-full transition-all duration-300 hover:scale-105"
          >
            Partner With Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 w-full glass-card transition-all duration-300 ${isOpen ? 'opacity-100 visible h-screen' : 'opacity-0 invisible h-0'} md:hidden overflow-hidden`}>
        <div className="flex flex-col items-center justify-center h-[80vh] space-y-8 px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold text-white hover:text-teal-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center px-8 py-4 bg-teal-500 text-slate-950 text-lg font-bold rounded-xl"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
