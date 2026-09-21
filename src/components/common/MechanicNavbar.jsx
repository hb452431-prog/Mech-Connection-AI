import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { Home, Inbox, CheckCircle2, User, LogOut, Wrench } from 'lucide-react';
import { authService } from '../../services/authService';

export const MechanicNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.mechanicLogout();
    navigate('/');
  };

  return (
    <>
      {/* Top Desktop Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 rounded-md">
              Mechanic Portal
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/mechanic"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-700'
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
                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-700'
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
                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-700'
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
                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-700'
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
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <NavLink
          to="/mechanic"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2 text-xs font-semibold ${
              isActive ? 'text-sky-600' : 'text-slate-500'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/mechanic/requests"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2 text-xs font-semibold ${
              isActive ? 'text-sky-600' : 'text-slate-500'
            }`
          }
        >
          <Inbox className="w-5 h-5" />
          <span>Requests</span>
        </NavLink>

        <NavLink
          to="/mechanic/completed"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2 text-xs font-semibold ${
              isActive ? 'text-sky-600' : 'text-slate-500'
            }`
          }
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Completed</span>
        </NavLink>

        <NavLink
          to="/mechanic/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2 text-xs font-semibold ${
              isActive ? 'text-sky-600' : 'text-slate-500'
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
