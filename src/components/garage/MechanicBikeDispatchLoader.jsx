import React, { useState, useEffect, useRef } from 'react';
import { 
  Wrench, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Radio, 
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * MechanicBikeDispatchLoader
 * 
 * Adaptive Dark/Light Mode loading experience for the "Nearby Garages" & "Mechanic Portal" maps.
 * Automatically adapts between a sleek dark-mode cyber scene and a bright, crisp daytime scene.
 * Features an integrated 100% SVG scene where a mobile mechanic riding a service bike
 * with emergency tools travels directly on the road towards the user's broken-down vehicle.
 */
export const MechanicBikeDispatchLoader = ({ 
  onFinish, 
  duration = 2400,
  userCoordinates = { lat: 19.0760, lng: 72.8777 },
  portalType = "user", // "user" | "mechanic"
  mechanicName = "Suresh"
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('riding'); // 'riding' | 'arrived' | 'exiting'
  const isFinishedRef = useRef(false);

  // Read current website theme (Dark vs Light)
  let isDark = true;
  try {
    const themeContext = useTheme();
    isDark = themeContext.isDark;
  } catch (e) {
    isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  }

  // Remaining distance in km (from 2.4 km down to 0.0 km)
  const remainingDistance = Math.max(0, ((100 - progress) / 100 * 2.4)).toFixed(1);

  // Dynamic status message based on travel progression
  const getStatusMessage = () => {
    if (portalType === 'mechanic') {
      if (progress < 25) return "Initializing Live Area Radar & GPS telemetry...";
      if (progress < 60) return `Mechanic ${mechanicName} on Service Bike online with roadside tools...`;
      if (progress < 88) return "Scanning urban sectors for stranded driver SOS beacons...";
      return "SOS beacons synchronized! Opening Live Area Radar map...";
    }
    if (progress < 25) return "Scanning nearby garages & active mobile mechanics...";
    if (progress < 60) return "Mechanic Suresh dispatched on Rapid Service Bike...";
    if (progress < 88) return "Traveling via expressway with emergency roadside tools...";
    return "Mechanic arrived at your vehicle! Opening garages map...";
  };

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 25; // 40 updates/sec for smooth motion

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 90 && phase !== 'arrived') {
        setPhase('arrived');
      }

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setPhase('exiting');
          setTimeout(() => {
            if (!isFinishedRef.current) {
              isFinishedRef.current = true;
              if (onFinish) onFinish();
            }
          }, 300);
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [duration, onFinish, phase]);

  // Bike travels directly on the road across SVG from x = 60 to x = 550 (halting right next to car at x = 670)
  const bikeX = 60 + (progress / 100) * 490;

  return (
    <div 
      className={`fixed inset-0 z-[99999] h-screen h-[100dvh] w-screen flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden transition-all duration-300 ${
        phase === 'exiting' ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: isDark
          ? 'radial-gradient(ellipse at 50% 30%, #0D1B36 0%, #081022 55%, #030712 100%)'
          : 'radial-gradient(ellipse at 50% 25%, #EFF6FF 0%, #F1F5F9 55%, #E2E8F0 100%)'
      }}
    >
      {/* Background ambient lighting (Dark vs Light mode) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[300px] rounded-full blur-[100px] transition-colors duration-300 ${
          isDark ? 'bg-blue-600/15' : 'bg-blue-400/20'
        }`} />
        <div className={`absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-[80px] transition-colors duration-300 ${
          isDark ? 'bg-cyan-500/10' : 'bg-cyan-400/20'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[80px] transition-colors duration-300 ${
          isDark ? 'bg-amber-500/10' : 'bg-amber-300/25'
        }`} />
      </div>

      {/* Main Unified Dispatch Card (Adaptive Theme) */}
      <div className={`relative z-10 w-full max-w-3xl max-h-[96dvh] overflow-y-auto flex flex-col rounded-3xl backdrop-blur-xl p-4 sm:p-6 space-y-4 transition-all duration-300 ${
        isDark 
          ? 'bg-slate-900/90 border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-white' 
          : 'bg-white/95 border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12)] text-slate-900'
      }`}>
        
        {/* Card Header: Brand & Live Telemetry Badge (No Skip Buttons) */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-glow-blue border border-white/20">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs sm:text-sm font-black tracking-wide uppercase font-heading ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  MECH CONNECT AI
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold transition-colors ${
                  isDark 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' 
                    : 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isDark ? 'bg-cyan-400' : 'bg-blue-600'}`} />
                  {portalType === 'mechanic' ? 'MECHANIC RADAR' : 'NEARBY GARAGES'}
                </span>
              </div>
              <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {portalType === 'mechanic'
                  ? 'Connecting Live Area Radar & active driver breakdown SOS signals'
                  : 'Locating closest certified workshops & mobile mechanics'}
              </p>
            </div>
          </div>

          {/* Active Dispatch Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold shadow-xs transition-colors ${
            isDark 
              ? 'bg-cyan-500/15 border border-cyan-400/30 text-cyan-300' 
              : 'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            <Zap className={`w-3.5 h-3.5 ${isDark ? 'text-amber-300 fill-amber-300' : 'text-amber-500 fill-amber-500'}`} />
            <span>{portalType === 'mechanic' ? 'RADAR ACTIVE' : 'DISPATCH ACTIVE'}</span>
          </div>
        </div>

        {/* 100% UNIFIED SVG CINEMATIC SCENE (Light vs Dark Adaptive) */}
        {/* Road surface is at Y = 240. Tires of both the car and bike roll directly on Y = 240 with zero floating! */}
        <div className={`relative w-full aspect-[2/1] sm:aspect-[2.2/1] rounded-2xl overflow-hidden border shadow-inner transition-colors duration-300 ${
          isDark 
            ? 'border-slate-700/70 bg-[#070D1E]' 
            : 'border-slate-300/80 bg-[#EBF5FF]'
        }`}>
          <svg 
            className="w-full h-full"
            viewBox="0 0 900 340"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Sky Background Gradient (Adaptive) */}
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                {isDark ? (
                  <>
                    <stop offset="0%" stopColor="#0B162C" />
                    <stop offset="50%" stopColor="#0F2042" />
                    <stop offset="100%" stopColor="#142A58" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#7DD3FC" />
                    <stop offset="45%" stopColor="#BAE6FD" />
                    <stop offset="100%" stopColor="#F0F9FF" />
                  </>
                )}
              </linearGradient>

              {/* Road Gradient (Adaptive) */}
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                {isDark ? (
                  <>
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="25%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#080C16" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="30%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1E293B" />
                  </>
                )}
              </linearGradient>

              {/* Chrome Gradient for Tools */}
              <linearGradient id="toolChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>

              {/* Bike Body Gradient */}
              <linearGradient id="bikePaint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>

              {/* Car Body Gradient */}
              <linearGradient id="carPaint" x1="0%" y1="0%" x2="100%" y2="100%">
                {isDark ? (
                  <>
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1E293B" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="50%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </>
                )}
              </linearGradient>

              {/* Headlight Beam Gradient */}
              <linearGradient id="beamGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="rgba(254, 240, 138, 0.9)" />
                <stop offset="40%" stopColor="rgba(56, 189, 248, 0.35)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
              </linearGradient>
            </defs>

            {/* 1. SKY & HORIZON */}
            <rect x="0" y="0" width="900" height="240" fill="url(#skyGrad)" />

            {/* Daytime Sun & Clouds for Light Mode */}
            {!isDark && (
              <g>
                {/* Morning Sun */}
                <g transform="translate(130, 52)">
                  <circle cx="0" cy="0" r="26" fill="#FEF08A" opacity="0.4" />
                  <circle cx="0" cy="0" r="18" fill="#FDE047" opacity="0.95" />
                  <circle cx="0" cy="0" r="12" fill="#FFFFFF" opacity="0.6" />
                </g>
                {/* Soft Daytime Clouds */}
                <g fill="#FFFFFF" opacity="0.75">
                  <path d="M 640,65 C 650,55 675,55 685,65 C 695,60 715,65 720,75 L 630,75 Z" />
                  <path d="M 320,50 C 330,42 350,42 358,50 C 365,46 380,50 385,58 L 310,58 Z" opacity="0.6" />
                </g>
              </g>
            )}

            {/* Distant City Silhouette */}
            <g fill={isDark ? "#0B132B" : "#94A3B8"} opacity={isDark ? "0.45" : "0.35"}>
              <rect x="30" y="115" width="40" height="125" />
              <rect x="75" y="85" width="50" height="155" />
              <rect x="135" y="135" width="35" height="105" />
              <rect x="180" y="100" width="60" height="140" />
              <rect x="250" y="75" width="45" height="165" />
              <rect x="305" y="130" width="40" height="110" />
              <rect x="355" y="90" width="55" height="150" />
              <rect x="420" y="65" width="70" height="175" />
              <rect x="500" y="110" width="45" height="130" />
              <rect x="555" y="80" width="55" height="160" />
              <rect x="620" y="125" width="40" height="115" />
              <rect x="670" y="85" width="60" height="155" />
              <rect x="740" y="105" width="50" height="135" />
              <rect x="800" y="70" width="60" height="170" />
            </g>

            {/* Twinkling skyline window lights (Dark Mode) */}
            {isDark && (
              <g>
                <circle cx="100" cy="115" r="1.5" fill="#FDE047" opacity="0.8" />
                <circle cx="270" cy="95" r="1.5" fill="#38BDF8" opacity="0.9" />
                <circle cx="450" cy="85" r="1.5" fill="#FDE047" opacity="0.8" />
                <circle cx="700" cy="105" r="1.5" fill="#38BDF8" opacity="0.8" />
                <circle cx="830" cy="95" r="1.5" fill="#FDE047" opacity="0.9" />
              </g>
            )}

            {/* 2. THE ROAD (Asphalt: Y = 240 to 340) */}
            <rect x="0" y="240" width="900" height="100" fill="url(#roadGrad)" />
            
            {/* Road shoulder hazard curb line */}
            <rect x="0" y="236" width="900" height="4" fill="#F59E0B" opacity="0.9" />
            <line x1="0" y1="240" x2="900" y2="240" stroke={isDark ? "#475569" : "#64748B"} strokeWidth="2" />

            {/* Continuous animated moving dashed road center-line */}
            <line 
              x1="0" 
              y1="288" 
              x2="900" 
              y2="288" 
              stroke="#F8FAFC" 
              strokeWidth="3.5" 
              strokeDasharray="35 35"
              className="svg-road-dash"
            />

            {/* Road bottom guide line */}
            <line x1="0" y1="332" x2="900" y2="332" stroke="#06B6D4" strokeWidth="1.5" opacity="0.4" />

            {/* 3. USER'S STRANDED VEHICLE (Stationed at X = 670, resting firmly on road surface Y = 240) */}
            <g transform="translate(670, 240)">
              {/* Emergency breakdown warning triangle placed behind vehicle */}
              <g transform="translate(-45, 0)">
                <polygon points="10,-20 20,0 0,0" fill="#EA580C" stroke="#FDE047" strokeWidth="1.5" />
                <polygon points="10,-14 15,-3 5,-3" fill="#1E293B" />
                <rect x="9" y="-12" width="2" height="5" fill="#FDE047" />
                <circle cx="10" cy="-5" r="0.8" fill="#FDE047" />
              </g>

              {/* Gentle radiator steam puffs from car breakdown */}
              <circle cx="152" cy="-52" r="5" fill="#E2E8F0" opacity="0.6" className="steam-puff-1" />
              <circle cx="148" cy="-64" r="7" fill="#E2E8F0" opacity="0.4" className="steam-puff-2" />

              {/* Ground Shadow on asphalt */}
              <ellipse cx="95" cy="0" rx="95" ry="6" fill="#000000" opacity="0.75" />

              {/* Car Body */}
              <path 
                d="M 5,-14 C 10,-32 30,-36 52,-38 L 74,-58 C 88,-70 132,-70 146,-58 L 162,-40 C 175,-38 182,-30 185,-14 L 182,-6 L 5,-6 Z" 
                fill="url(#carPaint)" 
                stroke={isDark ? "#475569" : "#1E293B"} 
                strokeWidth="1.5" 
              />

              {/* Slightly popped hood */}
              <path d="M 146,-40 L 185,-44 L 186,-36 L 144,-36 Z" fill="#334155" stroke="#64748B" strokeWidth="1" />

              {/* Tinted Cabin Windows */}
              <path 
                d="M 58,-38 L 76,-55 C 82,-62 126,-62 142,-55 L 156,-38 Z" 
                fill="#0F172A" 
                stroke="#475569" 
                strokeWidth="1" 
              />
              <line x1="106" y1="-58" x2="106" y2="-38" stroke="#475569" strokeWidth="1.5" />

              {/* Rear Wheel (bottom touches road at y = 0 -> absolute Y = 240) */}
              <g transform="translate(38, -16)">
                <circle cx="0" cy="0" r="16" fill="#0F172A" stroke="#334155" strokeWidth="3" />
                <circle cx="0" cy="0" r="10" fill="#64748B" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3" fill="#FFF" />
              </g>

              {/* Front Wheel (bottom touches road at y = 0 -> absolute Y = 240) */}
              <g transform="translate(152, -16)">
                <circle cx="0" cy="0" r="16" fill="#0F172A" stroke="#334155" strokeWidth="3" />
                <circle cx="0" cy="0" r="10" fill="#64748B" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3" fill="#FFF" />
              </g>

              {/* Rhythmic Hazard Warning Flashers (Amber pulsing lights) */}
              <circle cx="6" cy="-26" r="4.5" fill="#F59E0B" className="hazard-light-blink" />
              <circle cx="184" cy="-26" r="4.5" fill="#F59E0B" className="hazard-light-blink" />

              {/* User Standing Beside Vehicle with Phone */}
              <g transform="translate(-18, 0)">
                <line x1="-3" y1="-26" x2="-3" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                <line x1="3" y1="-26" x2="3" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                <path d="M -5,-50 L 5,-50 L 6,-26 L -6,-26 Z" fill="#2563EB" />
                <circle cx="0" cy="-56" r="5" fill="#F8FAFC" />
                <line x1="4" y1="-44" x2="10" y2="-36" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="11" cy="-35" r="4" fill="#38BDF8" opacity="0.6" className="animate-pulse" />
              </g>

              {/* Holographic GPS Breakdown Pin (Theme-Aware) */}
              <g transform="translate(95, -95)">
                <circle cx="0" cy="0" r="14" fill="none" stroke="#22D3EE" strokeWidth="1.8" className="beacon-radar-ping" />
                <circle cx="0" cy="0" r="24" fill="none" stroke="#06B6D4" strokeWidth="1.2" className="beacon-radar-ping" style={{ animationDelay: '0.4s' }} />
                <path d="M 0,12 C -6,3 -6,0 -6,-5 C -6,-10 -2,-13 0,-13 C 2,-13 6,-10 6,-5 C 6,0 6,3 0,12 Z" fill="#06B6D4" stroke="#FFF" strokeWidth="1" />
                <circle cx="0" cy="-5" r="2.5" fill="#FFF" />
                <rect 
                  x="-46" 
                  y="-32" 
                  width="92" 
                  height="17" 
                  rx="8" 
                  fill={isDark ? "#0B132B" : "#FFFFFF"} 
                  stroke={isDark ? "#22D3EE" : "#0284C7"} 
                  strokeWidth="1.2" 
                />
                <text 
                  x="0" 
                  y="-20" 
                  textAnchor="middle" 
                  fill={isDark ? "#38BDF8" : "#0284C7"} 
                  fontSize="8" 
                  fontWeight="bold" 
                  fontFamily="monospace"
                >
                  {portalType === 'mechanic' ? '📍 DRIVER SOS' : '📍 YOUR CAR'}
                </text>
              </g>
            </g>

            {/* 4. THE MECHANIC RIDING THE BIKE WITH EMERGENCY TOOLS (TRAVELING FIRMLY ON ROAD) */}
            {/* The outer group has ONLY transform="translate(bikeX, 240)" with NO CSS animation class to avoid override bugs! */}
            <g transform={`translate(${bikeX}, 240)`}>
              
              {/* Bike Ground Shadow on asphalt */}
              <ellipse cx="44" cy="0" rx="52" ry="5" fill="#000000" opacity="0.75" />

              {/* Volumetric Headlight Beam casting onto road */}
              <polygon 
                points="88,-46 290,-30 320,0 88,-36" 
                fill="url(#beamGrad)" 
                opacity="0.85" 
                className="headlight-flicker"
              />

              {/* Chrome Exhaust Pipe */}
              <path d="M -5,-16 L -20,-16 C -24,-16 -28,-13 -32,-9" stroke="url(#toolChrome)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {phase === 'riding' && (
                <circle cx="-38" cy="-9" r="3" fill="#94A3B8" opacity="0.6" className="exhaust-puff-1" />
              )}

              {/* Rear Wheel (bottom touches road at y = 0 -> absolute Y = 240) */}
              <g transform="translate(0, -16)">
                <circle cx="0" cy="0" r="16" fill="#0F172A" stroke="#1E293B" strokeWidth="3" />
                <circle cx="0" cy="0" r="11" fill="#020617" stroke="#38BDF8" strokeWidth="1.2" />
                <g className={phase === 'riding' ? 'bike-wheel-spin' : ''}>
                  <line x1="-10" y1="0" x2="10" y2="0" stroke="#94A3B8" strokeWidth="1.2" />
                  <line x1="0" y1="-10" x2="0" y2="10" stroke="#94A3B8" strokeWidth="1.2" />
                  <line x1="-7" y1="-7" x2="7" y2="7" stroke="#94A3B8" strokeWidth="1.2" />
                  <line x1="-7" y1="7" x2="7" y2="-7" stroke="#94A3B8" strokeWidth="1.2" />
                  <circle cx="0" cy="0" r="5" fill="#EAB308" />
                </g>
                <circle cx="0" cy="0" r="2" fill="#FFF" />
              </g>

              {/* Front Wheel (bottom touches road at y = 0 -> absolute Y = 240) */}
              <g transform="translate(88, -16)">
                <circle cx="0" cy="0" r="16" fill="#0F172A" stroke="#1E293B" strokeWidth="3" />
                <circle cx="0" cy="0" r="11" fill="#020617" stroke="#38BDF8" strokeWidth="1.2" />
                <g className={phase === 'riding' ? 'bike-wheel-spin' : ''}>
                  <line x1="-10" y1="0" x2="10" y2="0" stroke="#94A3B8" strokeWidth="1.2" />
                  <line x1="0" y1="-10" x2="0" y2="10" stroke="#94A3B8" strokeWidth="1.2" />
                  <line x1="-7" y1="-7" x2="7" y2="7" stroke="#94A3B8" strokeWidth="1.2" />
                  <line x1="-7" y1="7" x2="7" y2="-7" stroke="#94A3B8" strokeWidth="1.2" />
                  <circle cx="0" cy="0" r="5" fill="#EAB308" />
                </g>
                <circle cx="0" cy="0" r="2" fill="#FFF" />
              </g>

              {/* Front Fork Suspension */}
              <line x1="88" y1="-16" x2="74" y2="-52" stroke="url(#toolChrome)" strokeWidth="3.5" strokeLinecap="round" />

              {/* Bike Engine & Frame */}
              <rect x="32" y="-32" width="22" height="16" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="1" />
              <path d="M 0,-16 L 36,-36 L 74,-52 L 46,-20 Z" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Blue & Cyan Fuel Tank & Fairing */}
              <path 
                d="M 34,-46 C 40,-58 60,-58 76,-52 L 72,-36 L 36,-36 Z" 
                fill="url(#bikePaint)" 
                stroke="#60A5FA" 
                strokeWidth="1" 
              />
              <path d="M 40,-48 L 66,-48 L 62,-43 L 37,-43 Z" fill="#22D3EE" opacity="0.9" />

              {/* Bike Saddle */}
              <path d="M 10,-46 C 18,-46 28,-48 35,-40 L 16,-38 Z" fill="#020617" stroke="#334155" strokeWidth="1" />

              {/* Projector LED Headlight */}
              <circle cx="84" cy="-46" r="4.5" fill="#FEF08A" stroke="#FFF" strokeWidth="1" />

              {/* Handlebars */}
              <line x1="72" y1="-54" x2="66" y2="-62" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="66" cy="-63" r="2" fill="#22D3EE" />

              {/* ======================================================= */}
              {/* REAR TOOL CARRIER & EMERGENCY TOOLS (Clean & Prominent) */}
              {/* ======================================================= */}
              <g transform="translate(-14, 0)">
                {/* Heavy Duty Tool Box */}
                <rect x="-2" y="-52" width="28" height="18" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="1.2" />
                <rect x="1" y="-48" width="22" height="3" fill="#334155" />
                <rect x="9" y="-49" width="6" height="5" rx="0.5" fill="url(#toolChrome)" />

                {/* PROMINENT CHROME WRENCH 🔧 sticking out */}
                <g transform="translate(12, -60) rotate(30)">
                  <rect x="-1.5" y="-14" width="3" height="18" rx="1" fill="url(#toolChrome)" stroke="#64748B" strokeWidth="0.6" />
                  <circle cx="0" cy="-16" r="4.5" fill="url(#toolChrome)" stroke="#64748B" strokeWidth="0.6" />
                  <polygon points="-1.5,-18 1.5,-18 0,-14" fill="#1E293B" />
                </g>

                {/* Battery Booster Pack with Clamps */}
                <g transform="translate(0, -62)">
                  <rect x="0" y="0" width="10" height="10" rx="1.5" fill="#DC2626" stroke="#EF4444" strokeWidth="0.8" />
                  <circle cx="2.5" cy="2.5" r="0.8" fill="#FDE047" />
                  <path d="M 2,10 C 1,13 -1,14 -2,18" stroke="#DC2626" strokeWidth="1.2" fill="none" />
                  <circle cx="-2" cy="18" r="1.5" fill="#DC2626" />
                </g>

                {/* Digital OBD-II Diagnostic Scanner */}
                <g transform="translate(20, -64) rotate(-15)">
                  <rect x="0" y="0" width="10" height="13" rx="1" fill="#047857" stroke="#10B981" strokeWidth="0.8" />
                  <rect x="1.5" y="1.5" width="7" height="6" fill="#022C22" />
                  <path d="M 2.5,5 L 4,5 L 5,2.5 L 6,6.5 L 7,5 L 7.5,5" stroke="#34D399" strokeWidth="0.7" fill="none" />
                </g>
              </g>

              {/* ======================================================= */}
              {/* THE MECHANIC RIDER                                      */}
              {/* ======================================================= */}
              <g transform="translate(24, 0)">
                {/* Rider Legs */}
                <path d="M 4,-44 L 14,-30 L 8,-18" fill="none" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

                {/* Safety Jacket (Blue & Fluorescent Lime) */}
                <path 
                  d="M 0,-64 L 20,-64 C 23,-56 20,-44 12,-40 L -2,-44 Z" 
                  fill="#2563EB" 
                  stroke="#1D4ED8" 
                  strokeWidth="1.2" 
                />
                <path d="M 0,-59 L 18,-59" stroke="#A3E635" strokeWidth="2.5" />
                <path d="M 1,-52 L 16,-52" stroke="#A3E635" strokeWidth="2" />

                {/* Arm / Greeting Wave */}
                {phase === 'arrived' ? (
                  <g>
                    {/* Waving greeting arm */}
                    <path d="M 14,-62 L 22,-78 L 30,-80" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="32" cy="-80" r="3" fill="#FDE047" />
                    <text x="38" y="-79" fill="#34D399" fontSize="8" fontWeight="bold">👋</text>
                  </g>
                ) : (
                  <g>
                    <path d="M 16,-61 L 28,-54 L 34,-55" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="34" cy="-55" r="2.5" fill="#020617" />
                  </g>
                )}

                {/* Mechanic Helmet */}
                <g transform="translate(12, -74)">
                  <circle cx="0" cy="0" r="9" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <path d="M 2,-3 C 7,-3 8,3 7,5 L 2,5 Z" fill="#06B6D4" opacity="0.95" />
                  <line x1="3" y1="-1" x2="6" y2="3" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
                </g>
              </g>

              {/* Status Pill Floating Above Bike (Theme-Aware) */}
              <g transform="translate(42, -98)">
                <rect 
                  x="-42" 
                  y="-10" 
                  width="84" 
                  height="17" 
                  rx="8" 
                  fill={isDark ? "#0B132B" : "#FFFFFF"} 
                  stroke={isDark ? "#38BDF8" : "#0284C7"} 
                  strokeWidth="1.2" 
                />
                <text 
                  x="0" 
                  y="2" 
                  textAnchor="middle" 
                  fill={isDark ? "#38BDF8" : "#0284C7"} 
                  fontSize="7.5" 
                  fontWeight="bold" 
                  fontFamily="monospace"
                >
                  {phase === 'arrived' ? "✅ ARRIVED!" : (portalType === 'mechanic' ? "MECHANIC UNIT ⚡" : "RAPID BIKE ⚡")}
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Dynamic Status & Distance Counter (Adaptive Theme) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isDark ? 'bg-cyan-400' : 'bg-blue-600'
              }`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isDark ? 'bg-cyan-500' : 'bg-blue-600'
              }`} />
            </span>
            <span className={`text-xs sm:text-sm font-bold ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}>
              {getStatusMessage()}
            </span>
          </div>

          <div className={`flex items-center gap-2 text-xs font-mono font-bold px-3 py-1 rounded-full border transition-colors ${
            isDark 
              ? 'text-cyan-300 bg-slate-800/80 border-slate-700' 
              : 'text-blue-700 bg-slate-100 border-slate-200 shadow-xs'
          }`}>
            <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
            <span>DISTANCE: {remainingDistance} KM</span>
          </div>
        </div>

        {/* Glowing Progress Bar (Adaptive Theme) */}
        <div className="space-y-1.5 pt-1">
          <div className={`w-full h-2.5 rounded-full border overflow-hidden relative p-0.5 transition-colors ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'
          }`}>
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-75 relative shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono px-1">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500 font-semibold'}>
              {portalType === 'mechanic' ? 'Live Area Radar Telemetry' : 'Fast-Response Mobile Workshop'}
            </span>
            <span className={`font-black ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
              {progress}%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MechanicBikeDispatchLoader;
