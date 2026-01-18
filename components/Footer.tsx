
import React from 'react';
import { Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import Logo from './Logo.tsx';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center space-x-3 mb-6">
              <Logo size="sm" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white leading-none">Delta7</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-teal-400 font-semibold">Edu-Frameworks</span>
              </div>
            </a>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
              Replacing chaotic, ad-hoc teaching with data-driven, research-based educational architectures since 1998.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-400 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Frameworks</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Teacher Pulse (HTMF)</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Vidya Pulse (HSMF)</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Classroom Mastery</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">5-Level Behavioral Scale</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">About Suram Mohan Kumar</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Partner Schools</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-slate-600 text-xs gap-4">
          <p>© 2024 Delta7 Edu-Frameworks Private Limited. All Rights Reserved.</p>
          <p>Designed with Innovation & Empathy for the Indian Education System.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
