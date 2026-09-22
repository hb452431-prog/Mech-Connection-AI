import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { Home, Inbox, CheckCircle2, User, LogOut, Wrench } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { authService } from '../../services/authService';

export const MechanicNavbar = () => {
  const navigate = useNavigate();
  const mechanic = authService.getMechanic();

  const handleLogout = () => {
    authService.mechanicLogout();
    navigate('/');
  };

  return (
    <>
      {/* Top Desktop & Tablet Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Mechanic Portal
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <NavLink
              to="/mechanic"
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
              to="/mechanic/requests"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-xs border border-indigo-100 dark:border-indigo-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`
              }
            >
              <Inbox className="w-4 h-4" />
              Requests
            </NavLink>

            <NavLink
              to="/mechanic/completed"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-xs border border-indigo-100 dark:border-indigo-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`
              }
            >
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </NavLink>

            <NavLink
              to="/mechanic/profile"
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

          {/* Top Right Action: Theme Toggle & Logout */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle size="sm" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-900/60 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-lg transition-colors duration-200">
        <NavLink
          to="/mechanic"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/mechanic/requests"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Inbox className="w-5 h-5" />
          <span>Requests</span>
        </NavLink>

        <NavLink
          to="/mechanic/completed"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Completed</span>
        </NavLink>

        <NavLink
          to="/mechanic/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
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

export default MechanicNavbar;
