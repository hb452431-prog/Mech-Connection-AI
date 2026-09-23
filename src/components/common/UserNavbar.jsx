import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { Home, Sparkles, User, AlertCircle, LogOut, Wrench } from 'lucide-react';
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
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          <BrandLogo size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <NavLink
              to="/user"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-xs border border-indigo-100 dark:border-indigo-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`
              }
            >
              <Home className="w-4 h-4" />
              Home
            </NavLink>

            <NavLink
              to="/user/ai-help"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-xs border border-indigo-100 dark:border-indigo-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`
              }
            >
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              AI Help
            </NavLink>

            <NavLink
              to="/user/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-xs border border-indigo-100 dark:border-indigo-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex items-center justify-around shadow-lg transition-colors duration-200">
        <NavLink
          to="/user"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/user/ai-help"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>AI Help</span>
        </NavLink>

        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60' : 'text-slate-500 dark:text-slate-400'
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
