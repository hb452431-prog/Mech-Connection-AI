import React, { useState, useEffect, useRef } from 'react';
import { 
  Wrench, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Radio, 
  Sparkles
} from 'lucide-react';

/**
 * MechanicBikeDispatchLoader
 * 
 * Simple, unique, and clean loading experience for the "Nearby Garages" portal.
 * Features an integrated 100% SVG scene where a mobile mechanic riding a service bike
 * with emergency tools travels along the road towards the user's broken-down vehicle.
 */
export const MechanicBikeDispatchLoader = ({ 
  onFinish, 
  duration = 2400,
  userCoordinates = { lat: 19.0760, lng: 72.8777 }
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('riding'); // 'riding' | 'arrived' | 'exiting'
  const isFinishedRef = useRef(false);

  // Remaining distance in km (from 2.4 km down to 0.0 km)
  const remainingDistance = Math.max(0, ((100 - progress) / 100 * 2.4)).toFixed(1);

  // Status message based on travel progression
  const getStatusMessage = () => {
    if (progress < 25) return "Scanning nearby garages & licensed mobile units...";
    if (progress < 60) return "Mechanic Suresh dispatched on Rapid Service Bike...";
    if (progress < 88) return "Traveling via Main Expressway with emergency tools...";
    return "Mechanic arrived near your vehicle! Loading garages map...";
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

  const handleSkip = () => {
    if (!isFinishedRef.current) {
      isFinishedRef.current = true;
      setPhase('exiting');
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 150);
    }
  };

  // Bike travels across SVG from x = 70 to x = 540 (halting right next to the car at x = 650)
  const bikeX = 70 + (progress / 100) * 470;

  return (
    <div 
      className={`fixed inset-0 z-[99999] h-screen h-[100dvh] w-screen flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden transition-all duration-300 ${
        phase === 'exiting' ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #0D1B36 0%, #081022 55%, #030712 100%)'
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-blue-600/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Main Unified Dispatch Card */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden p-4 sm:p-6 space-y-4">
        
        {/* Card Header: Brand & Controls */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-glow-blue border border-white/20">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-white tracking-wide uppercase font-heading">
                  MECH CONNECT AI
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  NEARBY GARAGES
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Locating closest certified workshops & mobile mechanics
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <span>Skip to Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 100% UNIFIED SVG CINEMATIC SCENE */}
        {/* Road, moving stripes, mechanic on bike, tools, and stranded car are all locked inside this single SVG */}
        <div className="relative w-full aspect-[2/1] sm:aspect-[2.2/1] rounded-2xl overflow-hidden border border-slate-700/70 bg-[#070D1E] shadow-inner">
          <svg 
            className="w-full h-full"
            viewBox="0 0 900 340"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Sky Background Gradient */}
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B162C" />
                <stop offset="50%" stopColor="#0F2042" />
                <stop offset="100%" stopColor="#142A58" />
              </linearGradient>

              {/* Road Gradient */}
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="30%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#090E1A" />
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
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>

              {/* Headlight Beam Gradient */}
              <linearGradient id="beamGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="rgba(254, 240, 138, 0.9)" />
                <stop offset="40%" stopColor="rgba(56, 189, 248, 0.35)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
              </linearGradient>
            </defs>

            {/* 1. SKY & CITY HORIZON */}
            <rect x="0" y="0" width="900" height="230" fill="url(#skyGrad)" />

            {/* Distant City Silhouette */}
            <g fill="#0B132B" opacity="0.45">
              <rect x="30" y="110" width="40" height="120" />
              <rect x="75" y="80" width="50" height="150" />
              <rect x="135" y="130" width="35" height="100" />
              <rect x="180" y="95" width="60" height="135" />
              <rect x="250" y="70" width="45" height="160" />
              <rect x="305" y="125" width="40" height="105" />
              <rect x="355" y="85" width="55" height="145" />
              <rect x="420" y="60" width="70" height="170" />
              <rect x="500" y="105" width="45" height="125" />
              <rect x="555" y="75" width="55" height="155" />
              <rect x="620" y="120" width="40" height="110" />
              <rect x="670" y="80" width="60" height="150" />
              <rect x="740" y="100" width="50" height="130" />
              <rect x="800" y="65" width="60" height="165" />
            </g>

            {/* Twinkling skyline window lights */}
            <circle cx="100" cy="110" r="1.5" fill="#FDE047" opacity="0.8" />
            <circle cx="270" cy="90" r="1.5" fill="#38BDF8" opacity="0.9" />
            <circle cx="450" cy="80" r="1.5" fill="#FDE047" opacity="0.8" />
            <circle cx="700" cy="100" r="1.5" fill="#38BDF8" opacity="0.8" />
            <circle cx="830" cy="90" r="1.5" fill="#FDE047" opacity="0.9" />

            {/* 2. THE ROAD (Y = 230 to 340) */}
            <rect x="0" y="230" width="900" height="110" fill="url(#roadGrad)" />
            
            {/* Road shoulder safety curb line */}
            <line x1="0" y1="230" x2="900" y2="230" stroke="#475569" strokeWidth="2" />
            <line x1="0" y1="233" x2="900" y2="233" stroke="#F59E0B" strokeWidth="1.5" opacity="0.7" />

            {/* Continuous animated moving dashed road center-line */}
            <line 
              x1="0" 
              y1="285" 
              x2="900" 
              y2="285" 
              stroke="#F8FAFC" 
              strokeWidth="3.5" 
              strokeDasharray="40 40"
              className="svg-road-dash"
            />

            {/* Road bottom cyan guide line */}
            <line x1="0" y1="330" x2="900" y2="330" stroke="#06B6D4" strokeWidth="1.5" opacity="0.4" />

            {/* 3. USER'S STRANDED VEHICLE (Stationed at X = 700 - 870, Tires resting on road at Y = 250) */}
            <g transform="translate(680, 160)">
              {/* Emergency breakdown warning triangle placed behind vehicle */}
              <g transform="translate(-45, 76)">
                <polygon points="10,0 20,18 0,18" fill="#EA580C" stroke="#FDE047" strokeWidth="1.5" />
                <polygon points="10,5 15,15 5,15" fill="#1E293B" />
                <rect x="9" y="7" width="2" height="4" fill="#FDE047" />
                <circle cx="10" cy="13" r="0.8" fill="#FDE047" />
              </g>

              {/* Gentle radiator steam puffs from car breakdown */}
              <circle cx="145" cy="20" r="5" fill="#E2E8F0" opacity="0.6" className="steam-puff-1" />
              <circle cx="140" cy="10" r="7" fill="#E2E8F0" opacity="0.4" className="steam-puff-2" />

              {/* Ground Shadow */}
              <ellipse cx="85" cy="94" rx="85" ry="7" fill="#000000" opacity="0.7" />

              {/* Car Body */}
              <path 
                d="M 5,75 C 10,58 30,54 50,52 L 72,34 C 84,22 125,22 138,34 L 152,50 C 165,52 172,60 174,75 L 172,82 L 5,82 Z" 
                fill="url(#carPaint)" 
                stroke="#475569" 
                strokeWidth="1.5"
              />

              {/* Slightly popped hood */}
              <path d="M 138,50 L 174,47 L 175,54 L 135,53 Z" fill="#334155" stroke="#64748B" strokeWidth="1" />

              {/* Tinted Cabin Windows */}
              <path 
                d="M 55,51 L 74,37 C 80,30 120,30 134,37 L 148,51 Z" 
                fill="#0F172A" 
                stroke="#475569" 
                strokeWidth="1"
              />
              <line x1="102" y1="34" x2="102" y2="51" stroke="#475569" strokeWidth="1.5" />

              {/* Rear Wheel (resting on road at y = 90 -> absolute Y = 250) */}
              <g transform="translate(36, 85)">
                <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="#334155" strokeWidth="3" />
                <circle cx="0" cy="0" r="8" fill="#64748B" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="2.5" fill="#FFF" />
              </g>

              {/* Front Wheel (resting on road at y = 90 -> absolute Y = 250) */}
              <g transform="translate(142, 85)">
                <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="#334155" strokeWidth="3" />
                <circle cx="0" cy="0" r="8" fill="#64748B" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="2.5" fill="#FFF" />
              </g>

              {/* Rhythmic Hazard Warning Flashers (Amber pulsing lights) */}
              <circle cx="6" cy="62" r="4.5" fill="#F59E0B" className="hazard-light-blink" />
              <circle cx="173" cy="60" r="4.5" fill="#F59E0B" className="hazard-light-blink" />

              {/* User Standing Beside Vehicle with Phone */}
              <g transform="translate(-18, 38)">
                <circle cx="0" cy="0" r="5" fill="#F8FAFC" />
                <path d="M -4,6 L 4,6 L 5,30 L -5,30 Z" fill="#2563EB" />
                <line x1="-2" y1="30" x2="-2" y2="52" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                <line x1="2" y1="30" x2="2" y2="52" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                {/* Arm holding glowing phone */}
                <line x1="3" y1="10" x2="9" y2="18" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="10" cy="19" r="4" fill="#38BDF8" opacity="0.6" className="animate-pulse" />
              </g>

              {/* Holographic GPS Breakdown Pin */}
              <g transform="translate(85, -15)">
                <circle cx="0" cy="0" r="14" fill="none" stroke="#22D3EE" strokeWidth="1.8" className="beacon-radar-ping" />
                <circle cx="0" cy="0" r="24" fill="none" stroke="#06B6D4" strokeWidth="1.2" className="beacon-radar-ping" style={{ animationDelay: '0.4s' }} />
                <path d="M 0,12 C -6,3 -6,0 -6,-5 C -6,-10 -2,-13 0,-13 C 2,-13 6,-10 6,-5 C 6,0 6,3 0,12 Z" fill="#06B6D4" stroke="#FFF" strokeWidth="1" />
                <circle cx="0" cy="-5" r="2.5" fill="#FFF" />
                <rect x="-48" y="-34" width="96" height="17" rx="8" fill="#0B132B" stroke="#22D3EE" strokeWidth="1" />
                <text x="0" y="-22" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                  📍 YOUR CAR
                </text>
              </g>
            </g>

            {/* 4. THE MECHANIC RIDING THE BIKE WITH EMERGENCY TOOLS (DYNAMIC TRAVEL) */}
            {/* Tires rest on road at exact same Y level: absolute Y = 250 */}
            <g 
              transform={`translate(${bikeX}, 168)`}
              className={phase === 'riding' ? 'bike-suspension-bounce' : ''}
            >
              {/* Volumetric Headlight Beam casting onto road */}
              <polygon 
                points="95,58 280,30 310,85 95,68" 
                fill="url(#beamGrad)" 
                opacity="0.85" 
                className="headlight-flicker"
              />

              {/* Bike Ground Shadow */}
              <ellipse cx="44" cy="84" rx="48" ry="6" fill="#000000" opacity="0.7" />

              {/* Chrome Exhaust Pipe */}
              <path d="M -5,70 L -18,70 C -22,70 -25,73 -28,76" stroke="url(#toolChrome)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {phase === 'riding' && (
                <circle cx="-34" cy="76" r="3" fill="#94A3B8" opacity="0.6" className="exhaust-puff-1" />
              )}

              {/* Rear Wheel (Tire rests on road at Y = 84 -> absolute Y = 252) */}
              <g transform="translate(0, 70)">
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

              {/* Front Wheel (Tire rests on road at Y = 84 -> absolute Y = 252) */}
              <g transform="translate(86, 70)">
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
              <line x1="86" y1="70" x2="72" y2="34" stroke="url(#toolChrome)" strokeWidth="3.5" strokeLinecap="round" />

              {/* Bike Engine & Frame */}
              <rect x="32" y="54" width="22" height="16" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="1" />
              <path d="M 0,70 L 35,50 L 72,34 L 45,66 Z" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Blue & Cyan Fuel Tank & Fairing */}
              <path 
                d="M 34,40 C 40,28 60,28 74,34 L 70,50 L 35,50 Z" 
                fill="url(#bikePaint)" 
                stroke="#60A5FA" 
                strokeWidth="1"
              />
              <path d="M 40,38 L 65,38 L 60,43 L 36,43 Z" fill="#22D3EE" opacity="0.9" />

              {/* Bike Saddle */}
              <path d="M 10,40 C 18,40 28,38 34,46 L 16,48 Z" fill="#020617" stroke="#334155" strokeWidth="1" />

              {/* Projector LED Headlight */}
              <circle cx="82" cy="40" r="4" fill="#FEF08A" stroke="#FFF" strokeWidth="1" />

              {/* Handlebars */}
              <line x1="70" y1="32" x2="65" y2="24" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="65" cy="23" r="2" fill="#22D3EE" />

              {/* ======================================================= */}
              {/* REAR TOOL CARRIER & EMERGENCY TOOLS (Clean & Prominent) */}
              {/* ======================================================= */}
              <g transform="translate(-14, 18)">
                {/* Heavy Duty Tool Box */}
                <rect x="0" y="14" width="28" height="18" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="1.2" />
                <rect x="3" y="18" width="22" height="3" fill="#334155" />
                <rect x="11" y="17" width="5" height="5" rx="0.5" fill="url(#toolChrome)" />

                {/* PROMINENT CHROME WRENCH 🔧 sticking out */}
                <g transform="translate(14, 6) rotate(30)">
                  <rect x="-1.5" y="-12" width="3" height="16" rx="1" fill="url(#toolChrome)" stroke="#64748B" strokeWidth="0.6" />
                  <circle cx="0" cy="-14" r="4" fill="url(#toolChrome)" stroke="#64748B" strokeWidth="0.6" />
                  <polygon points="-1.5,-16 1.5,-16 0,-12" fill="#1E293B" />
                </g>

                {/* Battery Booster Pack with Clamps */}
                <g transform="translate(2, 4)">
                  <rect x="0" y="0" width="10" height="10" rx="1.5" fill="#DC2626" stroke="#EF4444" strokeWidth="0.8" />
                  <circle cx="2.5" cy="2.5" r="0.8" fill="#FDE047" />
                  <path d="M 2,10 C 1,13 -1,14 -2,18" stroke="#DC2626" strokeWidth="1.2" fill="none" />
                  <circle cx="-2" cy="18" r="1.5" fill="#DC2626" />
                </g>

                {/* Digital OBD-II Diagnostic Scanner */}
                <g transform="translate(22, 2) rotate(-15)">
                  <rect x="0" y="0" width="10" height="13" rx="1" fill="#047857" stroke="#10B981" strokeWidth="0.8" />
                  <rect x="1.5" y="1.5" width="7" height="6" fill="#022C22" />
                  <path d="M 2.5,5 L 4,5 L 5,2.5 L 6,6.5 L 7,5 L 7.5,5" stroke="#34D399" strokeWidth="0.7" fill="none" />
                </g>
              </g>

              {/* ======================================================= */}
              {/* THE MECHANIC RIDER                                      */}
              {/* ======================================================= */}
              <g transform="translate(22, 0)">
                {/* Rider Legs */}
                <path d="M 6,30 L 16,42 L 10,54" fill="none" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

                {/* Safety Jacket (Blue & Fluorescent Lime) */}
                <path 
                  d="M 4,12 L 24,12 C 27,20 24,32 16,36 L 2,30 Z" 
                  fill="#2563EB" 
                  stroke="#1D4ED8" 
                  strokeWidth="1.2" 
                />
                <path d="M 4,17 L 22,17" stroke="#A3E635" strokeWidth="2.5" />
                <path d="M 5,24 L 20,24" stroke="#A3E635" strokeWidth="2" />

                {/* Arm / Greeting Wave */}
                {phase === 'arrived' ? (
                  <g>
                    {/* Waving greeting arm */}
                    <path d="M 18,14 L 26,-2 L 34,-4" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="36" cy="-4" r="3" fill="#FDE047" />
                    <text x="42" y="-3" fill="#34D399" fontSize="8" fontWeight="bold">👋</text>
                  </g>
                ) : (
                  <g>
                    <path d="M 20,15 L 32,22 L 38,21" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="38" cy="21" r="2.5" fill="#020617" />
                  </g>
                )}

                {/* Mechanic Helmet */}
                <g transform="translate(15, 0)">
                  <circle cx="0" cy="0" r="9" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <path d="M 2,-3 C 7,-3 8,3 7,5 L 2,5 Z" fill="#06B6D4" opacity="0.95" />
                  <line x1="3" y1="-1" x2="6" y2="3" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
                </g>
              </g>

              {/* Status Pill Floating Above Bike */}
              <g transform="translate(40, -24)">
                <rect x="-42" y="-10" width="84" height="17" rx="8" fill="#0B132B" stroke="#38BDF8" strokeWidth="1" />
                <text x="0" y="2" textAnchor="middle" fill="#38BDF8" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                  {phase === 'arrived' ? "✅ ARRIVED!" : "RAPID BIKE ⚡"}
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Dynamic Status & Distance Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              {getStatusMessage()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>DISTANCE: {remainingDistance} KM</span>
          </div>
        </div>

        {/* Glowing Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-2.5 rounded-full bg-slate-800 border border-slate-700 overflow-hidden relative p-0.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-75 relative shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span>Fast-Response Mobile Workshop</span>
            <span className="font-bold text-cyan-400">{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MechanicBikeDispatchLoader;
