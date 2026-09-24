import React, { useState, useEffect } from 'react';
import { BrandEmblem } from './BrandLogo';
import { Sparkles, Zap, Navigation, ShieldCheck, Wrench, Car } from 'lucide-react';

export const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('intro'); // 'intro' | 'loading' | 'exit'
  const [statusText, setStatusText] = useState('Starting Engine...');

  useEffect(() => {
    // Stage 1: Progress simulation - Reaches 100% in ~1.6s
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 60 ? 4 : 5;
        const next = Math.min(prev + increment, 100);

        if (next > 25 && next < 55) {
          setStatusText('Connecting GPS Roadside Network...');
        } else if (next >= 55 && next < 85) {
          setStatusText('Locating Certified Mechanics...');
        } else if (next >= 85) {
          setStatusText('Ready! Launching MECH-CONNECT-AI...');
        }

        return next;
      });
    }, 32);

    // Stage 2: Trigger exit fade at 1.7s
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 1700);

    // Stage 3: Finish and unmount automatically at exactly 2.0 seconds (2000ms)
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[99999] h-screen h-[100dvh] w-screen flex flex-col items-center justify-between px-4 py-6 sm:py-8 select-none transition-all duration-300 overflow-hidden ${
        phase === 'exit'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #5B21B6 0%, #3B0764 45%, #1E084E 80%, #13032E 100%)'
      }}
    >
      {/* Background Animated Ambient Flares & Road Perspective */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic center violet aura */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[100px] animate-pulse" />
        
        {/* Electric cyan secondary flare */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-[80px]" />
        
        {/* Bottom highway perspective grid lines */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 opacity-25"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(196, 181, 253, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(196, 181, 253, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(280px) rotateX(60deg)',
            transformOrigin: 'bottom'
          }}
        />

        {/* Sonar Radar Pulse Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-violet-400/25 animate-ping opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-400/20 animate-ping opacity-30" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Top Bar with Live Tag & Status */}
      <div className="w-full max-w-lg flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-violet-200 text-[11px] font-mono font-bold tracking-wider shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>MECH CONNECT AI</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-cyan-200 text-xs font-mono font-bold border border-white/15 backdrop-blur-md shadow-sm">
          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>INITIALIZING</span>
        </div>
      </div>

      {/* Center Main Stage: Rapido-style Animated Violet Logo & Name */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto space-y-5 max-w-md animate-in zoom-in-90 duration-500">
        {/* Glowing 3D Emblem Container */}
        <div className="relative group">
          {/* Animated Glow Halo behind emblem */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 rounded-full blur-2xl opacity-75 animate-pulse" />
          
          {/* Main Round Shield Emblem Frame */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-violet-950/90 via-slate-900/95 to-purple-950/90 border-2 border-violet-300/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center justify-center p-3 backdrop-blur-xl">
            <BrandEmblem size={100} className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
          </div>

          {/* AI Active Indicator Badge */}
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-[10px] font-black uppercase shadow-lg border border-cyan-200 flex items-center gap-1">
            <Zap className="w-3 h-3 fill-current text-yellow-300" />
            <span>AI LIVE</span>
          </div>
        </div>

        {/* Official Website Name in Center */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <span className="text-white">MECH</span>
            <span className="text-cyan-300 mx-1.5">-</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400">CONNECT</span>
            <span className="text-cyan-300 mx-1.5">-</span>
            <span className="text-yellow-300">AI</span>
          </h1>

          <div className="flex items-center justify-center gap-2 pt-0.5">
            <span className="h-px w-5 bg-gradient-to-r from-transparent to-violet-400/80" />
            <p className="text-[11px] sm:text-xs font-bold font-mono tracking-widest text-violet-200 uppercase">
              VEHICLE & MECHANIC PLATFORM
            </p>
            <span className="h-px w-5 bg-gradient-to-l from-transparent to-violet-400/80" />
          </div>
        </div>

        {/* Feature Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-900/60 border border-violet-400/30 text-violet-200 text-xs font-semibold backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Smart Roadside Help When You Need It</span>
        </div>
      </div>

      {/* Bottom Racing Speed Loader (Rapido App Style) */}
      <div className="w-full max-w-sm relative z-20 space-y-2.5 mb-1">
        {/* Live Status & Percentage */}
        <div className="flex items-center justify-between text-xs font-mono text-violet-200 font-bold px-1">
          <span className="flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span className="truncate max-w-[210px]">{statusText}</span>
          </span>
          <span className="text-cyan-300 font-extrabold">{progress}%</span>
        </div>

        {/* Progress Bar with Racing Glow Lead */}
        <div className="relative w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-violet-400/30 p-0.5 backdrop-blur-md shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(167,139,250,0.8)] relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
          </div>
        </div>

        {/* Sub-footer Micro Highlights */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-violet-300/70 font-mono pt-1">
          <span className="flex items-center gap-1">
            <Car className="w-3 h-3 text-cyan-400" />
            Drivers
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Wrench className="w-3 h-3 text-fuchsia-400" />
            Mechanics
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            24/7 Roadside
          </span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
