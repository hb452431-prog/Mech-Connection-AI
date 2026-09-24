import React, { useState, useEffect } from 'react';
import { Sparkles, Cpu, Wrench, ShieldCheck } from 'lucide-react';

/**
 * MechLoader: BigBasket-Style Fullscreen / Inline Violet Loading Screen
 * Features revolving 3D-styled Nut, Bolt, and Spanner (Wrench) in harmonic orbital motion.
 */
export const MechLoader = ({
  message = 'Loading MECH CONNECT AI...',
  subMessage = 'Connecting Automotive Intelligence Network',
  isAi = false,
  fullScreen = true,
  className = ''
}) => {
  const [aiStep, setAiStep] = useState(0);

  const aiSteps = [
    'Parsing vehicle symptom prompt...',
    'Scanning OBD-II fault code databases...',
    'Analyzing powertrain & electrical telemetry...',
    'Synthesizing 3-step AI repair protocol...'
  ];

  useEffect(() => {
    if (!isAi) return;
    const interval = setInterval(() => {
      setAiStep((prev) => (prev + 1) % aiSteps.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAi]);

  const displayMessage = isAi ? aiSteps[aiStep] : message;

  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center select-none ${
        fullScreen
          ? 'fixed inset-0 z-[9999] w-screen h-screen min-h-[100dvh]'
          : 'w-full min-h-[380px] py-12 rounded-3xl'
      } bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#3B0764] text-white ${className}`}
      style={{
        background: 'radial-gradient(circle at 50% 45%, #6D28D9 0%, #5B21B6 40%, #4C1D95 75%, #2E1065 100%)'
      }}
    >
      {/* Background Animated Ambient Auras & Cyber Light Rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Pulsing Central Violet Aura */}
        <div className="w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-violet-400/20 blur-3xl animate-pulse" />
        
        {/* Subtle Cyber Grid / Radial Circles */}
        <div className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full border border-violet-400/20 animate-spin-slow pointer-events-none" />
        <div className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full border border-dashed border-violet-300/15 animate-spin-reverse-slow pointer-events-none" />
      </div>

      {/* Centerpiece: Revolving Nut, Bolt & Spanner System */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
          
          {/* Orbital Track 1: Outer Glowing Ring */}
          <div className="absolute inset-0 rounded-full border border-violet-300/30 shadow-[0_0_25px_rgba(167,139,250,0.3)] animate-spin-orbital">
            
            {/* 1. SPANNER (Wrench) orbiting at 0 deg */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 transform -rotate-12 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] animate-spanner-wiggle">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full transform -rotate-45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="wrenchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="35%" stopColor="#E2E8F0" />
                      <stop offset="70%" stopColor="#94A3B8" />
                      <stop offset="100%" stopColor="#64748B" />
                    </linearGradient>
                    <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDE047" />
                      <stop offset="100%" stopColor="#EAB308" />
                    </linearGradient>
                    <filter id="metalGleam" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.4" />
                    </filter>
                  </defs>
                  
                  {/* Spanner Head & Handle */}
                  <path
                    d="M 28,12 C 18,16 12,26 15,36 C 17,42 22,46 27,48 L 70,91 C 73,94 78,94 81,91 L 91,81 C 94,78 94,73 91,70 L 48,27 C 46,22 42,17 36,15 C 33,14 30,13 28,12 Z"
                    fill="url(#wrenchGrad)"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                    filter="url(#metalGleam)"
                  />
                  {/* Open-Ended Jaw Cutout */}
                  <path
                    d="M 16,22 L 28,32 L 36,24 L 24,14 Z"
                    fill="#3B0764"
                    stroke="#94A3B8"
                    strokeWidth="1"
                  />
                  {/* Handle Grip Emboss */}
                  <rect
                    x="48"
                    y="52"
                    width="26"
                    height="6"
                    rx="3"
                    transform="rotate(45 48 52)"
                    fill="url(#goldAccent)"
                    opacity="0.9"
                  />
                </svg>
              </div>
            </div>

            {/* 2. HEX NUT orbiting at 120 deg (bottom right) */}
            <div className="absolute bottom-2 right-1 transform group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] animate-nut-spin">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="nutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="30%" stopColor="#CBD5E1" />
                      <stop offset="70%" stopColor="#64748B" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>
                    <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E1B4B" />
                      <stop offset="100%" stopColor="#4338CA" />
                    </linearGradient>
                  </defs>
                  
                  {/* Hexagon Outer Body */}
                  <polygon
                    points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                    fill="url(#nutGrad)"
                    stroke="#F8FAFC"
                    strokeWidth="2.5"
                  />
                  {/* Inner Threaded Circle Hole */}
                  <circle
                    cx="50"
                    cy="50"
                    r="23"
                    fill="url(#threadGrad)"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  {/* Thread Ridge Highlights */}
                  <circle cx="50" cy="50" r="17" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="11" fill="#1E1035" />
                </svg>
              </div>
            </div>

            {/* 3. HEX BOLT orbiting at 240 deg (bottom left) */}
            <div className="absolute bottom-2 left-1 transform group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] animate-bolt-float">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full transform -rotate-15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F8FAFC" />
                      <stop offset="40%" stopColor="#94A3B8" />
                      <stop offset="80%" stopColor="#475569" />
                      <stop offset="100%" stopColor="#1E293B" />
                    </linearGradient>
                    <linearGradient id="boltGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FACC15" />
                      <stop offset="100%" stopColor="#CA8A04" />
                    </linearGradient>
                  </defs>
                  
                  {/* Bolt Hex Head Top */}
                  <path
                    d="M 25,20 L 75,20 L 85,35 L 15,35 Z"
                    fill="url(#boltGrad)"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                  />
                  <line x1="25" y1="20" x2="15" y2="35" stroke="#FFF" strokeWidth="1" />
                  <line x1="75" y1="20" x2="85" y2="35" stroke="#64748B" strokeWidth="1" />

                  {/* Bolt Threaded Shank Shaft */}
                  <rect
                    x="32"
                    y="35"
                    width="36"
                    height="50"
                    rx="3"
                    fill="url(#boltGrad)"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                  />
                  {/* Helical Thread Ridges */}
                  <line x1="32" y1="44" x2="68" y2="47" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="32" y1="53" x2="68" y2="56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="32" y1="62" x2="68" y2="65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="32" y1="71" x2="68" y2="74" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Bolt Tip Chamfer */}
                  <path d="M 35,85 L 65,85 L 58,92 L 42,92 Z" fill="url(#boltGold)" />
                </svg>
              </div>
            </div>

          </div>

          {/* Central Glowing AI Automotive Core Hub */}
          <div className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-violet-900 via-indigo-800 to-violet-600 border-2 border-violet-300/60 shadow-[0_0_30px_rgba(167,139,250,0.6)] flex items-center justify-center animate-pulse">
            <div className="relative">
              <Wrench className="w-7 h-7 sm:w-9 sm:h-9 text-amber-300 animate-wiggle-soft" />
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 absolute -top-1 -right-1 animate-ping" />
            </div>
          </div>

        </div>

        {/* Brand Title & Loading State Typography */}
        <div className="mt-8 text-center space-y-3 px-4 max-w-md">
          {/* Main App Brand Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs sm:text-sm font-black font-heading tracking-wider uppercase text-violet-100">
              MECH CONNECT AI
            </span>
            {isAi && (
              <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-mono text-[10px] font-black uppercase">
                AI ENGINE
              </span>
            )}
          </div>

          {/* Dynamic Loading Message */}
          <div className="min-h-[3.25rem] flex flex-col items-center justify-center">
            <h3 className="text-base sm:text-xl font-bold font-heading text-white tracking-tight leading-snug drop-shadow-md">
              {displayMessage}
            </h3>
            <p className="text-xs sm:text-sm text-violet-200/80 font-mono mt-1 font-medium">
              {subMessage}
            </p>
          </div>

          {/* BigBasket-Style Bouncing Violet Dot Indicator */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" />
          </div>

          {/* Progress Shimmer Bar */}
          <div className="w-48 sm:w-64 h-1.5 bg-violet-950/60 rounded-full mx-auto overflow-hidden border border-violet-400/30 mt-3">
            <div className="h-full bg-gradient-to-r from-amber-400 via-cyan-300 to-violet-300 rounded-full w-full animate-loader-progress" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechLoader;
