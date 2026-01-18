
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Founder from './components/Founder';
import HTMFSection from './components/HTMFSection';
import HSMFSection from './components/HSMFSection';
import TechInnovation from './components/TechInnovation';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SmartAssistant from './components/SmartAssistant';
import BackgroundAnimation from './components/BackgroundAnimation';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3747187a-d8aa-46a4-806e-deb4927df6d2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:18',message:'App component rendered',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal animations for all sections
    const sections = gsap.utils.toArray('.reveal-section');
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#080c14]">
      <BackgroundAnimation />
      <Navbar />
      <Hero />
      <Founder />
      <HTMFSection />
      <HSMFSection />
      <TechInnovation />
      <ContactForm />
      <Footer />
      <SmartAssistant />
    </div>
  );
};

export default App;
