import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Sparkles, Zap, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';

export const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('intro'); // 'intro' | 'loading' | 'exit'
  const [statusText, setStatusText] = useState('Initializing AI Core...');

  useEffect(() => {
    // Stage 1: Progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 60 ? 4 : 6;
        const next = Math.min(prev + increment, 100);

        if (next > 30 && next < 65) {
          setStatusText('Connecting GPS Roadside Network...');
        } else if (next >= 65 && next < 95) {
          setStatusText('Loading Certified Garages...');
        } else if (next >= 95) {
          setStatusText('Ready! Welcome to MECH CONNECT AI');
        }

        return next;
      });
    }, 45);

    // Stage 2: Trigger exit animation
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 2100);

    // Stage 3: Unmount callback
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    setPhase('exit');
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between px-4 py-8 select-none transition-all duration-500 overflow-hidden ${
        phase === 'exit'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #1A0538 0%, #2E0854 25%, #4C1D95 60%, #3B0764 85%, #1E084E 100%)'
      }}
    >
      {/* Dynamic Background Glowing Light Orbs & Speed Streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-center ambient violet glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-500/25 rounded-full blur-[120px] animate-pulse" />
        
        {/* Center-left purple flare */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-[90px]" />
        
        {/* Center-right cyan flare */}
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-[90px]" />
        
        {/* Bottom highway perspective grid lines */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-64 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(167, 139, 250, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(167, 139, 250, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(300px) rotateX(60deg)',
            transformOrigin: 'bottom'
          }}
        />

        {/* Animated Radar Pulse Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-violet-400/20 animate-ping opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-fuchsia-400/15 animate-ping opacity-20" style={{ animationDelay: '0.6s' }} />
      </div>

      {/* Top Header with Skip Action */}
      <div className="w-full max-w-lg flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-violet-200 text-[11px] font-mono font-bold tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>APP LAUNCH</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/80 hover:text-white text-xs font-bold transition-all border border-white/15 backdrop-blur-md"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Main Splash Content (Rapido Style) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center space-y-6 max-w-md my-auto animate-in zoom-in-95 duration-700">
        {/* Glowing Logo Icon Container */}
        <div className="relative group">
          {/* Pulsing Backlight */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
          
          {/* Main Round Emblem Wrapper */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-violet-950 via-slate-900 to-purple-950 border-2 border-violet-400/50 shadow-2xl flex items-center justify-center p-3 backdrop-blur-xl">
            <BrandLogo size="lg" clickable={false} showSubtitle={false} />
          </div>

          {/* Sparkle Badge */}
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-[10px] font-extrabold uppercase shadow-lg border border-cyan-300 flex items-center gap-1 animate-bounce">
            <Zap className="w-3 h-3 fill-current text-yellow-300" />
            AI Pro
          </div>
        </div>

        {/* Website Name & Branding */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-100 to-cyan-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            MECH CONNECT AI
          </h1>

          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-violet-400" />
            <p className="text-xs sm:text-sm font-bold font-mono tracking-widest text-violet-200 uppercase drop-shadow-xs">
              VEHICLE & MECHANIC PLATFORM
            </p>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-violet-400" />
          </div>
        </div>

        {/* Highlight Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-900/60 border border-violet-400/30 text-violet-200 text-xs font-semibold backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Smart Help When You Need It</span>
        </div>
      </div>

      {/* Bottom Loading Progress & Speed Indicator (Rapido App Style) */}
      <div className="w-full max-w-sm relative z-20 space-y-3 mb-2">
        {/* Progress status and percentage */}
        <div className="flex items-center justify-between text-xs font-mono text-violet-200/90 font-bold px-1">
          <span className="flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span className="truncate max-w-[220px]">{statusText}</span>
          </span>
          <span className="text-cyan-300 font-extrabold">{progress}%</span>
        </div>

        {/* Custom Violet / Neon Speed Track */}
        <div className="relative w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-violet-400/30 p-0.5 backdrop-blur-md shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(167,139,250,0.8)] relative"
            style={{ width: `${progress}%` }}
          >
            {/* White light flare on leading edge */}
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
          </div>
        </div>

        {/* Trust Badges Footer */}
        <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-violet-300/70 font-mono">
          <span>⚡ GPS Dispatch</span>
          <span>•</span>
          <span>🔧 Certified Mechanics</span>
          <span>•</span>
          <span>🛡️ 24/7 SOS</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
