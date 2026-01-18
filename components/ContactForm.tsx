
import React from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

const ContactForm: React.FC = () => {
  return (
    <section id="contact" className="reveal-section py-24">
      <div className="container mx-auto px-6">
        <div className="glass-card rounded-[3rem] overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 md:p-16 bg-gradient-to-br from-teal-500 to-blue-600 text-slate-950">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Ready to transform your school's architecture?</h2>
              <p className="text-slate-900/80 text-lg mb-12">
                Join the network of schools pioneering the next generation of teaching and student mastery.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="font-bold">support@delta7.co.in</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="font-bold">+91-9133573344</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Gajwel, Siddipet, Telangana</span>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-black/10 flex items-center space-x-6">
                <span className="text-sm font-bold opacity-60">TRUSTED BY</span>
                <div className="flex items-center space-x-2 grayscale opacity-80 font-black text-xl">
                  NALANDA HIGH SCHOOL
                </div>
              </div>
            </div>

            <div className="p-12 md:p-16">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 focus:border-teal-500 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">School Name</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 focus:border-teal-500 outline-none transition-all" placeholder="Global Academy" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 focus:border-teal-500 outline-none transition-all" placeholder="john@school.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Message</label>
                  <textarea rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 focus:border-teal-500 outline-none transition-all" placeholder="Tell us about your school's goals..." />
                </div>
                <button className="w-full group py-5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl transition-all flex items-center justify-center text-lg">
                  Submit Inquiry
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
