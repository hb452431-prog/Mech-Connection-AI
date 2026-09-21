import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { Home, Sparkles, User, AlertCircle, LogOut, Wrench } from 'lucide-react';
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
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <BrandLogo size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <NavLink
              to="/user"
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
              to="/user/ai-help"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              AI Help
            </NavLink>

            <NavLink
              to="/user/profile"
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

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/user/emergency"
              className="btn-emergency px-3.5 py-2 text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5 shadow-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>SOS Rescue</span>
            </Link>

            <button
              onClick={handleLogout}
              className="hidden sm:flex p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-lg">
        <NavLink
          to="/user"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-[11px] font-bold transition-all ${
              isActive ? 'text-indigo-600 bg-indigo-50/80' : 'text-slate-500'
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
              isActive ? 'text-indigo-600 bg-indigo-50/80' : 'text-slate-500'
            }`
          }
        >
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>AI Help</span>
        </NavLink>

        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-[11px] font-bold transition-all ${
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

export default UserNavbar;
