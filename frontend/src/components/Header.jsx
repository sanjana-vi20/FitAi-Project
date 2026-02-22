import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, Activity, Cpu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Workouts', href: '#workout' },
    { name: 'Diet AI', href: '#diet' },
    { name: 'Analytics', href: '#analytics' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-200 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-lime-400 p-2 rounded-xl shadow-[0_0_15px_rgba(163,230,53,0.4)] group-hover:rotate-12 transition-transform">
              <Dumbbell size={22} className="text-black" strokeWidth={3} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              FIT<span className="text-lime-400">AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="relative text-sm font-semibold text-slate-300 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-bold text-slate-300 hover:text-white transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-lime-400 hover:scale-105 transition-all shadow-lg active:scale-95"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-slate-950 border-l border-slate-800 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden z-50 shadow-2xl`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-end mb-8">
            <X size={28} className="text-slate-400 cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          
          <div className="flex flex-col space-y-6 grow">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-white hover:text-lime-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-900">
            <button 
              onClick={() => { navigate('/login'); setIsOpen(false); }}
              className="w-full py-3 text-slate-400 font-bold"
            >
              Log in
            </button>
            <button 
              onClick={() => { navigate('/register'); setIsOpen(false); }}
              className="w-full py-3 bg-lime-400 text-black font-bold rounded-xl"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Header;