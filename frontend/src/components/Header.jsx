import React, { useState } from 'react';
import { Menu, X, Dumbbell, User, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-1.5 rounded-lg">
              <Dumbbell size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter">
              Fit<span className="text-blue-500">AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 text-sm font-medium">
              <a href="#dashboard" className="hover:text-blue-400 transition-colors">Dashboard</a>
              <a href="#workout" className="hover:text-blue-400 transition-colors">Workout Plan</a>
              <a href="#diet" className="hover:text-blue-400 transition-colors">Diet Chart</a>
              <a href="#analytics" className="hover:text-blue-400 transition-colors">Analytics</a>
            </div>
          </div>

          {/* Profile & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-slate-800 rounded-full transition" onClick={()=>navigate('/register')}>
              Register
            </button>
            <div className="flex items-center gap-2 bg-slate-800 py-1 px-3 rounded-full border border-slate-700">
             <button className="p-2 hover:bg-slate-800 rounded-full transition" onClick={()=>navigate('/login')}>
              Login
            </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Dashboard</a>
          <a href="#workout" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Workout Plan</a>
          <a href="#diet" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Diet Chart</a>
          <a href="#analytics" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Analytics</a>
        </div>
      )}
    </nav>
  );
};

export default Header;