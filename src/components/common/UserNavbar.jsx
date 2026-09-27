import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { Home, Sparkles, User, AlertCircle, LogOut, Wrench, MapPin } from 'lucide-react';
import { SirenLight } from './SirenLight';
import { ThemeToggle } from './ThemeToggle';
import { authService } from '../../services/authService';

export const UserNavbar = () => {
  const navigate = useNavigate();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.userLogout();
    navigate('/');
  };

  return (
    <>
      {/* Top Desktop & Tablet Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#070B14]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <BrandLogo size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/user"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-cyan-300 shadow-xs border border-blue-200/80 dark:border-blue-800/80'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <Home className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              Home
            </NavLink>

            <NavLink
              to="/user/garages"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-cyan-300 shadow-xs border border-blue-200/80 dark:border-blue-800/80'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Find Garages
            </NavLink>

            <NavLink
              to="/user/ai-help"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-cyan-300 shadow-xs border border-blue-200/80 dark:border-blue-800/80'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <Sparkles className="w-4 h-4 text-brand-indigo dark:text-brand-indigo-light" />
              AI Help
            </NavLink>

            <NavLink
              to="/user/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-cyan-300 shadow-xs border border-blue-200/80 dark:border-blue-800/80'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <User className="w-4 h-4" />
              Profile
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* SOS Rescue Button */}
            <Link
              to="/user/emergency"
              className="btn-emergency px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5 sm:gap-2 shadow-md group"
              title="Request Emergency Mechanic Rescue"
            >
              <SirenLight size="xs" variant="sticker" animated={true} />
              <span className="font-extrabold tracking-wide drop-shadow-xs whitespace-nowrap">SOS Rescue</span>
            </Link>

            {/* Top Right Corner Sun / Moon Theme Toggle */}
            <ThemeToggle size="sm" />

            <button
              onClick={handleLogout}
              className="hidden sm:flex p-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#070B14]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex items-center justify-around shadow-lg transition-colors duration-200">
        <NavLink
          to="/user"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-950/60' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/user/garages"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-950/60' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <MapPin className="w-5 h-5" />
          <span>Garages</span>
        </NavLink>

        <NavLink
          to="/user/ai-help"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-950/60' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Sparkles className="w-5 h-5 text-brand-indigo dark:text-brand-indigo-light" />
          <span>AI Help</span>
        </NavLink>

        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-950/60' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  );
};

export default UserNavbar;
