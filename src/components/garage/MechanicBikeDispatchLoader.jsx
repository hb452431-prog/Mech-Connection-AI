import React, { useState, useEffect, useRef } from 'react';
import { 
  Wrench, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Gauge, 
  CheckCircle2, 
  ArrowRight, 
  Radio, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';

/**
 * MechanicBikeDispatchLoader
 * 
 * Cinematic loading experience for the "Nearby Garages" portal:
 * Features a certified mobile mechanic riding a fast-response service motorcycle 
 * equipped with emergency diagnostic tools, traveling down the highway to reach 
 * the user's broken-down vehicle parked on the roadside.
 */
export const MechanicBikeDispatchLoader = ({ 
  onFinish, 
  duration = 2600, // Total duration in ms
  userCoordinates = { lat: 19.0760, lng: 72.8777 },
  title = "Finding Nearby Garages & Mechanics",
  subtitle = "Dispatching live radar & mobile rapid-response bike"
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('riding'); // 'riding' | 'arrived' | 'exiting'
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFinishedRef = useRef(false);

  // Dispatch telemetric stages
  const dispatchSteps = [
    {
      title: "Triangulating GPS Coordinates",
      detail: "Scanning 5.0 km urban radius for active licensed workshops...",
      status: "LOCKED"
    },
    {
      title: "Rapid Bike Mechanic Dispatched",
      detail: "Mechanic Rajesh en route on Express Service Bike with rapid toolset...",
      status: "DISPATCHED"
    },
    {
      title: "Traveling With Emergency Tools",
      detail: "Carrying OBD-II scanner, battery booster pack, & heavy-duty wrench set...",
      status: "EN ROUTE"
    },
    {
      title: "Approaching User's Vehicle",
      detail: "Slowing down beside stranded vehicle. Initializing workshop map...",
      status: "ARRIVED"
    }
  ];

  // Calculate live distance countdown in km based on progress (from 2.4 km down to 0.0 km)
  const remainingDistance = Math.max(0, ((100 - progress) / 100 * 2.4)).toFixed(1);
  const currentSpeed = progress < 85 ? Math.round(48 + Math.sin(progress) * 8) : Math.max(0, Math.round((100 - progress) * 2));

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 30; // 30ms tick for ultra smooth 60fps movement

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) {
        setCurrentStepIndex(0);
      } else if (pct < 60) {
        setCurrentStepIndex(1);
      } else if (pct < 88) {
        setCurrentStepIndex(2);
      } else {
        setCurrentStepIndex(3);
      }

      if (pct >= 92 && phase !== 'arrived') {
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
          }, 350);
        }, 450);
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
      }, 200);
    }
  };

  // Bike position calculation:
  // Starts on left at x = 80, travels towards user car stationed at x = 750
  // When progress = 100, bike position is at x = 650 (right beside the car)
  const bikeX = 80 + (progress / 100) * 570;

  return (
    <div 
      className={`fixed inset-0 z-[99999] h-screen h-[100dvh] w-screen flex flex-col justify-between select-none overflow-hidden transition-all duration-300 ${
        phase === 'exiting' ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 25%, #0B172E 0%, #080E1C 50%, #030712 100%)'
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[110px]" />
        
        {/* Subtle holographic radar grid lines */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      {/* TOP HEADER / TELEMETRY STATUS BAR */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 pt-4 sm:pt-6 flex items-center justify-between gap-3">
        {/* Portal & Brand Tag */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-glow-blue border border-white/20">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-white tracking-wide uppercase font-heading">
                MECH CONNECT AI
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                NEARBY GARAGES RADAR
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
              Locating closest workshops & rapid mobile mechanics
            </p>
          </div>
        </div>

        {/* Live Distance & Skip Button */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
            <Gauge className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <div className="text-left">
              <div className="text-[10px] font-mono uppercase text-slate-400 leading-none">DISTANCE TO VEHICLE</div>
              <div className="text-xs font-mono font-black text-white">{remainingDistance} km</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <span>Skip to Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* MAIN CINEMATIC ANIMATION STAGE (Mechanic Riding Bike with Tools Toward User's Broken-Down Car) */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-6 flex-1 flex flex-col justify-center my-auto">
        
        {/* Floating Telemetry Alert Pill */}
        <div className="mx-auto mb-3 sm:mb-5 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 shadow-lg backdrop-blur-md text-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          <span className="font-mono font-bold text-cyan-300 uppercase tracking-wider text-[11px] sm:text-xs">
            {dispatchSteps[currentStepIndex].title}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-medium text-[11px] sm:text-xs hidden md:inline">
            {dispatchSteps[currentStepIndex].detail}
          </span>
        </div>

        {/* HIGHWAY STAGE CONTAINER */}
        <div className="relative w-full aspect-[21/9] min-h-[260px] max-h-[420px] rounded-3xl overflow-hidden border-2 border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#070D1E]">
          
          {/* 1. SCENIC HIGHWAY SKYLINE & PARALLAX BACKGROUND */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Twilight Sky gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1226] via-[#0E1A38] to-[#122349]" />

            {/* Distant City Skyline Silhouettes */}
            <svg 
              className="absolute bottom-28 left-0 right-0 w-full h-24 opacity-35" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
            >
              {/* City buildings */}
              <rect x="20" y="40" width="45" height="80" fill="#1E293B" />
              <rect x="70" y="20" width="55" height="100" fill="#1E293B" />
              <rect x="130" y="55" width="40" height="65" fill="#1E293B" />
              <rect x="180" y="30" width="70" height="90" fill="#1E293B" />
              <rect x="260" y="15" width="50" height="105" fill="#1E293B" />
              <rect x="320" y="60" width="40" height="60" fill="#1E293B" />
              <rect x="370" y="35" width="60" height="85" fill="#1E293B" />
              <rect x="440" y="10" width="80" height="110" fill="#1E293B" />
              <rect x="530" y="45" width="50" height="75" fill="#1E293B" />
              <rect x="590" y="25" width="65" height="95" fill="#1E293B" />
              <rect x="665" y="50" width="45" height="70" fill="#1E293B" />
              <rect x="720" y="20" width="75" height="100" fill="#1E293B" />
              <rect x="805" y="35" width="55" height="85" fill="#1E293B" />
              <rect x="870" y="15" width="65" height="105" fill="#1E293B" />
              <rect x="945" y="40" width="80" height="80" fill="#1E293B" />
              <rect x="1035" y="25" width="50" height="95" fill="#1E293B" />
              <rect x="1095" y="45" width="75" height="75" fill="#1E293B" />

              {/* Twinkling window lights */}
              <circle cx="95" cy="40" r="1.5" fill="#FDE047" opacity="0.8" />
              <circle cx="105" cy="60" r="1.5" fill="#38BDF8" opacity="0.9" />
              <circle cx="210" cy="50" r="1.5" fill="#FDE047" opacity="0.7" />
              <circle cx="280" cy="35" r="1.5" fill="#38BDF8" opacity="0.9" />
              <circle cx="475" cy="28" r="1.5" fill="#FDE047" opacity="0.8" />
              <circle cx="500" cy="65" r="1.5" fill="#F43F5E" opacity="0.8" />
              <circle cx="750" cy="45" r="1.5" fill="#38BDF8" opacity="0.7" />
              <circle cx="895" cy="35" r="1.5" fill="#FDE047" opacity="0.9" />
            </svg>

            {/* Distant highway transmission towers & stars */}
            <div className="absolute top-6 left-12 w-1 h-1 rounded-full bg-white opacity-80 animate-ping" />
            <div className="absolute top-10 left-1/3 w-1.5 h-1.5 rounded-full bg-cyan-200 opacity-90" />
            <div className="absolute top-4 right-1/4 w-1 h-1 rounded-full bg-amber-200 opacity-75" />
            <div className="absolute top-12 right-12 w-1.5 h-1.5 rounded-full bg-blue-300 opacity-60" />

            {/* Overhead Cyber Radar Satellite Sweep */}
            <div 
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-cyan-500/10 pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 310deg, rgba(6, 182, 212, 0.15) 360deg)',
                animation: 'spin 4s linear infinite'
              }}
            />
          </div>

          {/* 2. PERSPECTIVE ASPHALT ROAD */}
          <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-36 bg-[#111827] border-t-2 border-slate-700/80 overflow-hidden">
            {/* Road shoulder curb with safety stripes */}
            <div 
              className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-slate-700 to-amber-400"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #F59E0B 0, #F59E0B 20px, #1E293B 20px, #1E293B 40px)',
                backgroundSize: '40px 100%'
              }}
            />

            {/* Asphalt subtle texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#0F172A] to-[#0B0F19]" />

            {/* Fast moving white dashed lane lines (Moving Road Effect) */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 flex items-center pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, #F8FAFC 0, #F8FAFC 45px, transparent 45px, transparent 95px)',
                backgroundSize: '95px 100%',
                animation: 'roadLinesScroll 0.45s linear infinite'
              }}
            />

            {/* Road edge continuous neon cyan guide-line */}
            <div className="absolute bottom-4 left-0 right-0 h-1 bg-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />

            {/* Passing Streetlamps on the Highway */}
            <div className="absolute inset-0 pointer-events-none flex justify-around">
              {[0, 1, 2, 3].map((idx) => (
                <div 
                  key={idx} 
                  className="h-full w-24 relative opacity-40"
                  style={{
                    animation: 'roadLinesScroll 1.8s linear infinite',
                    animationDelay: `${idx * 0.45}s`
                  }}
                >
                  {/* Street lamp post */}
                  <div className="absolute -top-16 left-1/2 w-1.5 h-16 bg-slate-500" />
                  {/* Glowing cone of warm light onto road */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-32 bg-amber-400/10 blur-md pointer-events-none rounded-b-full"
                    style={{
                      clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 3. MASTER SVG STAGE: BIKE WITH TOOLS + STRANDED CAR + MECHANIC */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 400"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Chrome Gradient for Tools & Exhaust */}
              <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#CBD5E1" />
                <stop offset="70%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              {/* Gold Accent for Brake Caliper & Hazard */}
              <linearGradient id="goldBrake" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Bike Body Sport Paint */}
              <linearGradient id="bikeBodyGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="30%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>

              {/* Headlight Beam Gradient */}
              <linearGradient id="headlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="rgba(254, 240, 138, 0.95)" />
                <stop offset="30%" stopColor="rgba(56, 189, 248, 0.45)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
              </linearGradient>

              {/* Car Body Finish */}
              <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="45%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>

              {/* Shadow Filter */}
              <filter id="roadShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                <feOffset dx="0" dy="8" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.6" />
                </feComponentTransfer>
                <feMerge> 
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ============================================================== */}
            {/* A. USER'S STRANDED VEHICLE (Stationed at Right, X = 740 - 930) */}
            {/* ============================================================== */}
            <g transform="translate(740, 205)" filter="url(#roadShadow)">
              
              {/* Emergency Warning Triangle Placed on Road Behind Car */}
              <g transform="translate(-55, 68)">
                <polygon points="12,0 24,22 0,22" fill="#EA580C" stroke="#FDE047" strokeWidth="2" />
                <polygon points="12,6 18,18 6,18" fill="#1E293B" />
                <rect x="11" y="9" width="2" height="5" fill="#FDE047" />
                <circle cx="12" cy="16" r="1" fill="#FDE047" />
                {/* Ground reflection */}
                <ellipse cx="12" cy="23" rx="10" ry="2" fill="#EA580C" opacity="0.4" />
              </g>

              {/* Wisps of Engine Radiator Steam (Broken-Down Vehicle Smoke) */}
              <g transform="translate(145, 12)">
                <circle cx="0" cy="0" r="7" fill="#E2E8F0" opacity="0.6" className="steam-puff-1" />
                <circle cx="-6" cy="-12" r="10" fill="#E2E8F0" opacity="0.4" className="steam-puff-2" />
                <circle cx="8" cy="-22" r="13" fill="#E2E8F0" opacity="0.2" className="steam-puff-3" />
              </g>

              {/* Car Body (Modern Sedan / Compact SUV) */}
              {/* Under-chassis shadow */}
              <ellipse cx="90" cy="85" rx="95" ry="12" fill="#000000" opacity="0.8" />

              {/* Lower Body Sill */}
              <path d="M 5,72 L 180,72 L 175,80 L 10,80 Z" fill="#0B132B" />

              {/* Main Body Shell */}
              <path 
                d="M 5,68 C 12,50 35,46 55,44 L 80,24 C 92,12 135,12 148,24 L 165,42 C 178,44 186,52 188,68 L 186,75 L 5,75 Z" 
                fill="url(#carBodyGrad)" 
                stroke="#334155" 
                strokeWidth="1.5"
              />

              {/* Slightly Popped Hood (Car Breakdown indicator) */}
              <path d="M 148,42 L 186,40 L 188,48 L 145,46 Z" fill="#334155" stroke="#64748B" strokeWidth="1" />

              {/* Car Cabin Windows with Tint */}
              <path 
                d="M 60,43 L 82,27 C 88,20 130,20 144,27 L 160,43 Z" 
                fill="#1E293B" 
                stroke="#475569" 
                strokeWidth="1"
              />
              <path d="M 85,27 L 85,43" stroke="#475569" strokeWidth="1.5" />
              <path d="M 125,27 L 125,43" stroke="#475569" strokeWidth="1.5" />
              {/* Window glass glare */}
              <polygon points="90,26 105,26 95,42 80,42" fill="rgba(255,255,255,0.12)" />

              {/* Car Front Wheel */}
              <g transform="translate(150, 75)">
                <circle cx="0" cy="0" r="16" fill="#0F172A" stroke="#334155" strokeWidth="3" />
                <circle cx="0" cy="0" r="9" fill="#64748B" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3" fill="#F8FAFC" />
              </g>

              {/* Car Rear Wheel */}
              <g transform="translate(38, 75)">
                <circle cx="0" cy="0" r="16" fill="#0F172A" stroke="#334155" strokeWidth="3" />
                <circle cx="0" cy="0" r="9" fill="#64748B" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3" fill="#F8FAFC" />
              </g>

              {/* RHYTHMIC HAZARD FLASHERS (Rear & Front Amber Blinking Lights) */}
              {/* Rear Hazard Light */}
              <circle cx="6" cy="54" r="5" fill="#F59E0B" className="hazard-light-blink" />
              <circle cx="6" cy="54" r="10" fill="none" stroke="#F59E0B" strokeWidth="1.5" className="hazard-light-blink" />

              {/* Front Hazard Light */}
              <circle cx="186" cy="52" r="5" fill="#F59E0B" className="hazard-light-blink" />
              <circle cx="186" cy="52" r="10" fill="none" stroke="#F59E0B" strokeWidth="1.5" className="hazard-light-blink" />

              {/* DRIVER / USER STANDING BY CAR (Looking for mechanic) */}
              <g transform="translate(-20, 22)">
                {/* Head */}
                <circle cx="0" cy="0" r="6" fill="#F8FAFC" />
                {/* Body / Jacket */}
                <path d="M -5,8 L 5,8 L 6,36 L -6,36 Z" fill="#3B82F6" rx="2" />
                {/* Legs */}
                <line x1="-3" y1="36" x2="-3" y2="60" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="3" y1="36" x2="3" y2="60" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
                {/* Arm holding glowing smartphone */}
                <line x1="4" y1="12" x2="11" y2="20" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="10" y="18" width="3" height="6" rx="0.5" fill="#000" stroke="#38BDF8" strokeWidth="0.8" />
                {/* Phone screen glow */}
                <circle cx="11.5" cy="21" r="5" fill="#38BDF8" opacity="0.5" className="animate-pulse" />
              </g>

              {/* HOLOGRAPHIC GPS TARGET PIN OVER USER VEHICLE */}
              <g transform="translate(90, -35)">
                {/* Concentric radar beacon rings */}
                <circle cx="0" cy="0" r="16" fill="none" stroke="#22D3EE" strokeWidth="2" className="beacon-radar-ping" />
                <circle cx="0" cy="0" r="28" fill="none" stroke="#06B6D4" strokeWidth="1.5" className="beacon-radar-ping" style={{ animationDelay: '0.4s' }} />

                {/* Target Pin Marker */}
                <path d="M 0,16 C -8,5 -8,0 -8,-7 C -8,-14 -3,-18 0,-18 C 3,-18 8,-14 8,-7 C 8,0 8,5 0,16 Z" fill="#06B6D4" stroke="#FFF" strokeWidth="1.5" />
                <circle cx="0" cy="-7" r="3.5" fill="#FFF" />

                {/* Status Beacon Tag */}
                <rect x="-65" y="-45" width="130" height="20" rx="10" fill="#0F172A" stroke="#22D3EE" strokeWidth="1.2" />
                <text x="0" y="-31" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="900" fontFamily="monospace">
                  📍 USER VEHICLE BREAKDOWN
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* B. THE CERTIFIED MECHANIC RIDING THE BIKE WITH EMERGENCY TOOLS (DYNAMIC) */}
            {/* Travels from left (x ~ 80) towards user's car (halts at x ~ 650)           */}
            {/* ========================================================================= */}
            <g 
              transform={`translate(${bikeX}, 208)`} 
              className={phase === 'riding' ? 'bike-suspension-bounce' : ''}
              filter="url(#roadShadow)"
            >
              {/* 1. Volumetric Headlight Beam cutting across the asphalt road */}
              <polygon 
                points="110,64 340,30 380,95 110,75" 
                fill="url(#headlightBeam)" 
                opacity="0.8" 
                className="headlight-flicker"
              />

              {/* 2. Bike Ground Shadow */}
              <ellipse cx="50" cy="85" rx="60" ry="8" fill="#000000" opacity="0.75" />

              {/* 3. Dual Exhaust Pipes & Exhaust Gas Puffs */}
              <g transform="translate(-18, 72)">
                {/* Chrome exhaust pipe */}
                <path d="M 12,0 L -8,0 C -12,0 -16,4 -18,8 L -24,8" stroke="url(#chromeGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                {/* Exhaust gas puffs */}
                {phase === 'riding' && (
                  <g>
                    <circle cx="-30" cy="8" r="3" fill="#94A3B8" opacity="0.6" className="exhaust-puff-1" />
                    <circle cx="-42" cy="7" r="5" fill="#94A3B8" opacity="0.4" className="exhaust-puff-2" />
                    <circle cx="-56" cy="6" r="7" fill="#94A3B8" opacity="0.2" className="exhaust-puff-3" />
                  </g>
                )}
              </g>

              {/* 4. Rear Wheel & Sprocket (Spinning Wheel) */}
              <g transform="translate(0, 70)">
                {/* Tire Rubber */}
                <circle cx="0" cy="0" r="19" fill="#0F172A" stroke="#1E293B" strokeWidth="4" />
                {/* Alloy Wheel Rim */}
                <circle cx="0" cy="0" r="14" fill="#020617" stroke="#38BDF8" strokeWidth="1.5" />
                {/* Spinning Spokes Group */}
                <g className={phase === 'riding' ? 'bike-wheel-spin' : ''}>
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#94A3B8" strokeWidth="1.5" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#94A3B8" strokeWidth="1.5" />
                  <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#94A3B8" strokeWidth="1.5" />
                  <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#94A3B8" strokeWidth="1.5" />
                  {/* Gold brake disc center */}
                  <circle cx="0" cy="0" r="7" fill="url(#goldBrake)" />
                </g>
                <circle cx="0" cy="0" r="3" fill="#FFF" />
              </g>

              {/* 5. Front Wheel & Dual Disc Brakes (Spinning Wheel) */}
              <g transform="translate(98, 70)">
                {/* Tire Rubber */}
                <circle cx="0" cy="0" r="19" fill="#0F172A" stroke="#1E293B" strokeWidth="4" />
                {/* Alloy Wheel Rim */}
                <circle cx="0" cy="0" r="14" fill="#020617" stroke="#38BDF8" strokeWidth="1.5" />
                {/* Spinning Spokes */}
                <g className={phase === 'riding' ? 'bike-wheel-spin' : ''}>
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#94A3B8" strokeWidth="1.5" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#94A3B8" strokeWidth="1.5" />
                  <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#94A3B8" strokeWidth="1.5" />
                  <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#94A3B8" strokeWidth="1.5" />
                  {/* Gold brake disc center */}
                  <circle cx="0" cy="0" r="7" fill="url(#goldBrake)" />
                </g>
                <circle cx="0" cy="0" r="3" fill="#FFF" />
              </g>

              {/* 6. Front Telescopic Fork Suspension */}
              <line x1="98" y1="70" x2="80" y2="28" stroke="url(#chromeGrad)" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="93" y1="65" x2="77" y2="30" stroke="#D97706" strokeWidth="2" />

              {/* 7. Bike Engine & Chassis Frame */}
              {/* Engine Block */}
              <rect x="36" y="52" width="26" height="20" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <line x1="40" y1="58" x2="58" y2="58" stroke="#64748B" strokeWidth="1.5" />
              <line x1="40" y1="64" x2="58" y2="64" stroke="#64748B" strokeWidth="1.5" />

              {/* Modern Tubular Steel Frame */}
              <path d="M 0,70 L 40,48 L 80,28 L 52,66 Z" fill="none" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Fuel Tank & Sleek Fairing (Vibrant Royal Blue & Cyan) */}
              <path 
                d="M 38,36 C 44,22 68,22 84,30 L 80,48 L 40,48 Z" 
                fill="url(#bikeBodyGrad)" 
                stroke="#60A5FA" 
                strokeWidth="1.2"
              />
              {/* Cyan Speed Graphic Decal */}
              <path d="M 45,34 L 74,34 L 68,40 L 40,40 Z" fill="#22D3EE" opacity="0.9" />

              {/* Bike Saddle / Seat */}
              <path d="M 12,38 C 22,38 34,36 40,44 L 20,48 Z" fill="#020617" stroke="#334155" strokeWidth="1" />

              {/* Front Projector LED Headlight */}
              <path d="M 86,28 L 94,30 L 92,42 L 84,40 Z" fill="#020617" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="92" cy="35" r="4.5" fill="#FEF08A" stroke="#FFF" strokeWidth="1" />

              {/* Handlebars with Throttle & Hand Guards */}
              <line x1="78" y1="26" x2="72" y2="18" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
              <circle cx="72" cy="17" r="2.5" fill="#22D3EE" />

              {/* =============================================================== */}
              {/* 8. REAR CARRIER & TOOL RACK LOADED WITH EMERGENCY REPAIR TOOLS  */}
              {/* =============================================================== */}
              <g transform="translate(-16, 12)">
                
                {/* Heavy Duty Metal Tool Box / Pannier Case */}
                <rect x="0" y="16" width="34" height="22" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                <rect x="4" y="22" width="26" height="4" fill="#334155" />
                <rect x="14" y="20" width="6" height="7" rx="1" fill="url(#chromeGrad)" /> {/* Latch */}
                
                {/* "MECH TOOLS" Label on Box */}
                <rect x="5" y="29" width="24" height="6" rx="1" fill="#0B132B" />
                <text x="17" y="34" textAnchor="middle" fill="#22D3EE" fontSize="4.5" fontWeight="900" fontFamily="sans-serif">
                  MECH-SOS
                </text>

                {/* TOOL 1: LARGE CHROME SPANNER / WRENCH (Sticking out prominently) */}
                <g transform="translate(18, 6) rotate(35)">
                  {/* Spanner handle */}
                  <rect x="-2" y="-14" width="4" height="20" rx="1.5" fill="url(#chromeGrad)" stroke="#64748B" strokeWidth="0.8" />
                  {/* Spanner jaw head */}
                  <circle cx="0" cy="-16" r="5" fill="url(#chromeGrad)" stroke="#64748B" strokeWidth="0.8" />
                  <polygon points="-2,-19 2,-19 0,-14" fill="#1E293B" />
                </g>

                {/* TOOL 2: BATTERY BOOSTER PACK WITH RED/BLACK JUMPER CLAMPS */}
                <g transform="translate(2, 6)">
                  <rect x="0" y="0" width="12" height="12" rx="2" fill="#DC2626" stroke="#EF4444" strokeWidth="1" />
                  <circle cx="3" cy="3" r="1.2" fill="#FDE047" /> {/* 12V LED */}
                  {/* Red & Black Clamps hanging */}
                  <path d="M 3,12 C 1,16 -2,17 -3,22" stroke="#DC2626" strokeWidth="1.5" fill="none" />
                  <circle cx="-3" cy="22" r="2" fill="#DC2626" />
                  <path d="M 9,12 C 11,15 13,18 12,22" stroke="#1E293B" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="22" r="2" fill="#1E293B" />
                </g>

                {/* TOOL 3: DIGITAL OBD-II DIAGNOSTIC SCANNER TABLET */}
                <g transform="translate(26, 4) rotate(-15)">
                  <rect x="0" y="0" width="12" height="16" rx="1.5" fill="#047857" stroke="#10B981" strokeWidth="1" />
                  <rect x="2" y="2" width="8" height="8" fill="#022C22" />
                  {/* Glowing Diagnostic Waveform */}
                  <path d="M 3,6 L 5,6 L 6,3 L 7,8 L 8,6 L 9,6" stroke="#34D399" strokeWidth="0.8" fill="none" />
                  <circle cx="6" cy="13" r="1" fill="#F8FAFC" />
                </g>
              </g>

              {/* =============================================================== */}
              {/* 9. THE MECHANIC RIDER (Dynamic Aerodynamic Stance)              */}
              {/* =============================================================== */}
              <g transform="translate(26, -6)">
                {/* Rider Legs in Riding Pants & Boots */}
                <path d="M 6,34 L 18,48 L 12,62" fill="none" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                {/* Boot resting on peg */}
                <rect x="6" y="58" width="12" height="6" rx="2" fill="#020617" />

                {/* Torso & High-Vis Safety Jacket (Vibrant Royal Blue & Fluorescent Lime) */}
                <path 
                  d="M 4,14 L 28,14 C 32,24 28,38 18,42 L 2,36 Z" 
                  fill="#2563EB" 
                  stroke="#1D4ED8" 
                  strokeWidth="1.5" 
                />
                {/* Fluorescent reflective safety cross-strap */}
                <path d="M 4,20 L 26,20" stroke="#A3E635" strokeWidth="3" />
                <path d="M 6,28 L 24,28" stroke="#A3E635" strokeWidth="2.5" />
                {/* "MECH AI" chest insignia */}
                <circle cx="12" cy="18" r="2" fill="#38BDF8" />

                {/* Arms Reaching Handlebars */}
                {phase === 'arrived' ? (
                  // Mechanic arrived: raises hand in greeting / wave!
                  <g>
                    {/* Left arm still on bar */}
                    <path d="M 24,18 L 40,24 L 46,24" fill="none" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" />
                    {/* Right arm waving in arrival */}
                    <path d="M 20,16 L 30,-2 L 40,-4" fill="none" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" />
                    <circle cx="42" cy="-4" r="3.5" fill="#FDE047" /> {/* Glove hand waving */}
                    <text x="48" y="-4" fill="#34D399" fontSize="9" fontWeight="bold">👋</text>
                  </g>
                ) : (
                  // Normal riding posture gripping handlebars
                  <g>
                    <path d="M 24,18 L 38,25 L 46,24" fill="none" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* High-vis sleeve stripe */}
                    <path d="M 28,20 L 36,24" stroke="#A3E635" strokeWidth="2" />
                    {/* Glove */}
                    <circle cx="46" cy="24" r="3" fill="#020617" />
                  </g>
                )}

                {/* MECHANIC FULL-FACE HELMET */}
                <g transform="translate(18, 0)">
                  {/* Helmet Shell (Aerodynamic Gloss Finish) */}
                  <circle cx="0" cy="0" r="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.8" />
                  {/* Visor with Cyber Neon Reflection */}
                  <path d="M 2,-4 C 8,-4 9,3 8,6 L 2,6 Z" fill="#06B6D4" opacity="0.95" />
                  {/* Visor Glare Line */}
                  <line x1="3" y1="-2" x2="7" y2="4" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                  {/* Helmet spoiler at back */}
                  <path d="M -7,-2 L -11,2 L -7,6 Z" fill="#38BDF8" />
                </g>
              </g>

              {/* Status Badge floating directly above the Mechanic Bike */}
              <g transform="translate(45, -34)">
                <rect x="-50" y="-12" width="100" height="20" rx="10" fill="#0B132B" stroke="#38BDF8" strokeWidth="1.2" />
                <text x="0" y="2" textAnchor="middle" fill="#38BDF8" fontSize="8.5" fontWeight="900" fontFamily="monospace">
                  {phase === 'arrived' ? "✅ ARRIVED AT VEHICLE" : `⚡ RAPID BIKE (${currentSpeed} km/h)`}
                </text>
              </g>
            </g>
          </svg>

          {/* Real-time Highway HUD Overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/70 text-[11px] font-mono font-bold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>RADAR: 5.0 KM SWEEP</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400">{garagesFoundCount(progress)} GARAGES DETECTED</span>
          </div>

          {/* Arrived Celebration Banner */}
          {phase === 'arrived' && (
            <div className="absolute inset-x-0 bottom-4 mx-auto w-fit flex items-center gap-2 px-5 py-2 rounded-2xl bg-emerald-600/90 text-white font-bold text-xs sm:text-sm shadow-glow-green border border-emerald-400/50 animate-in fade-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Mobile Mechanic reached user coordinates! Opening garages portal...</span>
            </div>
          )}
        </div>

        {/* BOTTOM TELEMETRY DASHBOARD */}
        <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Card 1: Active Dispatched Mechanic */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 border border-blue-400/30">
              <Wrench className="w-5 h-5 animate-spanner-wiggle" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase text-slate-400">DISPATCHED MECHANIC</div>
              <div className="text-xs sm:text-sm font-black text-white truncate">Rajesh Kumar • Rapid Moto Unit</div>
              <div className="text-[11px] text-cyan-400 font-medium">Licensed Mobile Technician</div>
            </div>
          </div>

          {/* Card 2: Roadside Tools Carried */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase text-slate-400">EQUIPMENT ON BIKE</div>
              <div className="text-xs sm:text-sm font-black text-white truncate">OBD Scanner + Jump Kit + Tools</div>
              <div className="text-[11px] text-amber-400 font-medium">Instant Roadside Diagnosis Ready</div>
            </div>
          </div>

          {/* Card 3: Distance & Time To Vehicle */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0 border border-cyan-400/30">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase text-slate-400">DISTANCE TO USER CAR</div>
              <div className="text-xs sm:text-sm font-black text-white">
                {remainingDistance > 0 ? `${remainingDistance} km away` : 'Arrived at Vehicle!'}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium font-mono">
                {progress < 100 ? `ETA: ~${Math.max(1, Math.ceil((100 - progress) / 25))} min` : 'PERIMETER REACHED'}
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR & STAGE CHECKPOINTS */}
        <div className="mt-4 sm:mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SEARCHING URBAN SECTORS</span>
            </span>
            <span className="text-white font-mono text-xs">{progress}%</span>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div className="w-full h-3 rounded-full bg-slate-800/90 border border-slate-700 overflow-hidden relative p-0.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-75 relative shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-loader-progress" />
            </div>
          </div>

          {/* Micro Step Dots */}
          <div className="grid grid-cols-4 gap-2 pt-1 text-[10px] sm:text-[11px] font-mono text-slate-400">
            {dispatchSteps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-1.5 transition-colors ${
                  idx <= currentStepIndex ? 'text-cyan-300 font-bold' : 'text-slate-600'
                }`}
              >
                <div 
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx < currentStepIndex 
                      ? 'bg-emerald-400 ring-2 ring-emerald-400/30' 
                      : idx === currentStepIndex 
                      ? 'bg-cyan-400 animate-ping' 
                      : 'bg-slate-700'
                  }`} 
                />
                <span className="truncate">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER TICKER */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-4 pb-3 sm:pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>MECH-CONNECT CERTIFIED RAPID ASSISTANCE DISPATCH PROTOCOL</span>
        </div>
        <div>GPS Target: {userCoordinates.lat.toFixed(4)}° N, {userCoordinates.lng.toFixed(4)}° E</div>
      </footer>
    </div>
  );
};

// Helper: Calculate incremental garages discovered as radar scans
function garagesFoundCount(pct) {
  if (pct < 20) return 2;
  if (pct < 45) return 4;
  if (pct < 75) return 6;
  return 8;
}

export default MechanicBikeDispatchLoader;
