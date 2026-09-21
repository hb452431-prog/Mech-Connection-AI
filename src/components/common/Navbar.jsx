import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { 
  Wrench, 
  Cpu, 
  AlertCircle, 
  MapPin, 
  Calculator, 
  Car, 
  User, 
  LogOut, 
  PhoneCall, 
  Menu, 
  X, 
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, isDriver, isMechanic, switchRole, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleToggle = () => {
    const newRole = isDriver ? 'mechanic' : 'driver';
    switchRole(newRole);
    if (newRole === 'mechanic') {
      navigate('/partner-portal');
    } else {
      navigate('/dashboard');
    }
  };

  const navLinks = [
    { name: 'AI Diagnostics', path: '/diagnose', icon: Cpu, badge: 'AI Pro' },
    { name: 'Emergency SOS', path: '/sos', icon: AlertCircle, isEmergency: true },
    { name: 'Find Mechanics', path: '/mechanics', icon: MapPin },
    { name: 'Cost Estimator', path: '/cost-estimator', icon: Calculator },
    { name: 'Digital Garage', path: '/dashboard', icon: Car, requiresAuth: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-navy-950/80 backdrop-blur-xl">
      {/* Top micro alert strip */}
      <div className="bg-gradient-to-r from-navy-900 via-cyan-950/50 to-navy-900 border-b border-cyan-500/10 py-1 px-4 text-xs">
        <div className="container-custom flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-emerald-400">1,420+ Certified Mechanics Online</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">Average Emergency Response: <strong className="text-white">4.2 mins</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors">
              <PhoneCall className="w-3 h-3 text-cyan-400" />
              <span className="font-mono font-semibold">24/7 Hotline: 1-800-MECH-AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <BrandLogo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            if (link.isEmergency) {
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                        : 'text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 border border-rose-500/30'
                    }`
                  }
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  <Icon className="w-4 h-4 text-rose-400" />
                  {link.name}
                </NavLink>
              );
            }

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-slate-400" />
                {link.name}
                {link.badge && (
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Partner Portal Switch */}
          <NavLink
            to="/partner-portal"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ml-2 ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-amber-400 hover:bg-amber-500/10 border border-amber-500/20'
              }`
            }
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            Mechanic Portal
          </NavLink>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Switch Role Quick Switcher */}
          <button
            onClick={handleRoleToggle}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-700/60 rounded-md transition-colors"
            title="Toggle between Driver and Mechanic Partner view"
          >
            <span className="text-slate-500">Mode:</span>
            <span className={isDriver ? 'text-cyan-400 font-bold' : 'text-amber-400 font-bold'}>
              {isDriver ? 'Driver' : 'Mechanic Partner'}
            </span>
          </button>

          {/* User Profile / Login */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all text-left"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-7 h-7 rounded-lg object-cover border border-cyan-500/30"
                />
                <div className="hidden md:flex flex-col">
                  <span className="text-xs font-bold text-slate-100 leading-tight">
                    {currentUser.displayName}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight">
                    {currentUser.membership || currentUser.businessName || 'Active'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-navy-900 border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white">{currentUser.displayName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                  </div>
                  
                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    <Car className="w-4 h-4 text-cyan-400" />
                    My Digital Garage
                  </Link>

                  <Link
                    to="/partner-portal"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:bg-amber-500/10 hover:text-amber-300"
                  >
                    <Wrench className="w-4 h-4 text-amber-400" />
                    Mechanic Partner Dashboard
                  </Link>

                  <div className="border-t border-slate-800 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary-glow px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              Sign In
            </Link>
          )}

          {/* Quick SOS Trigger */}
          <Link
            to="/sos"
            className="btn-emergency-glow px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-rose-900/40"
          >
            <AlertCircle className="w-4 h-4 animate-spin-slow" />
            SOS
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-navy-950/95 backdrop-blur-2xl px-4 py-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Platform Mode</span>
            <button
              onClick={handleRoleToggle}
              className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-800 border border-slate-700 text-cyan-400"
            >
              {isDriver ? 'Driver Mode' : 'Mechanic Mode'}
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium ${
                    link.isEmergency
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : 'text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${link.isEmergency ? 'text-rose-400' : 'text-cyan-400'}`} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              to="/partner-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20"
            >
              <Wrench className="w-5 h-5 text-amber-400" />
              Mechanic Partner Portal
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900">
                <div className="flex items-center gap-2">
                  <img src={currentUser.avatar} alt="User" className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold text-white">{currentUser.displayName}</p>
                    <p className="text-[10px] text-slate-400">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-rose-400 hover:text-rose-300"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-primary-glow text-center py-2.5 rounded-xl text-sm font-bold"
              >
                Sign In / Register
              </Link>
            )}

            <Link
              to="/sos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-emergency-glow text-center py-3 rounded-xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              1-Tap Emergency SOS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
