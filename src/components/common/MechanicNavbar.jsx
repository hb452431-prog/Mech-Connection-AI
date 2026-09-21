import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { Home, Inbox, CheckCircle2, User, LogOut, Wrench } from 'lucide-react';
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
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 rounded-lg">
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
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <User className="w-4 h-4" />
              Profile
            </NavLink>
          </nav>

          {/* Logout Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-orange-700 hover:bg-orange-50 rounded-xl border border-orange-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <NavLink
          to="/mechanic"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-indigo-600 bg-indigo-50/80' : 'text-slate-500'
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
              isActive ? 'text-indigo-600 bg-indigo-50/80' : 'text-slate-500'
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
              isActive ? 'text-indigo-600 bg-indigo-50/80' : 'text-slate-500'
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
              isActive ? 'text-indigo-600 bg-indigo-50/80' : 'text-slate-500'
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
