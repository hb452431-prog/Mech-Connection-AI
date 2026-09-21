import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Cpu, 
  MapPin, 
  AlertCircle, 
  Wrench, 
  Car, 
  CheckCircle2, 
  ShieldCheck, 
  Radio, 
  Navigation, 
  Clock, 
  Activity, 
  Zap, 
  ChevronRight, 
  Volume2, 
  VolumeX,
  Smartphone,
  Gauge
} from 'lucide-react';

export const AboutWebsiteVideo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeScene, setActiveScene] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const containerRef = useRef(null);

  const scenes = [
    {
      id: 'ai-diag',
      title: '1. AI Vehicle Diagnostic Scanner',
      subtitle: 'Neural Audio & Symptom Engine',
      tag: 'AI ENGINE',
      color: '#00B4D8',
      link: '/user/ai-help',
      linkText: 'Try AI Diagnostics'
    },
    {
      id: 'gps-radar',
      title: '2. Live Radar & Mechanic Tracking',
      subtitle: 'Real-time GPS Dispatch Map',
      tag: 'LIVE GPS',
      color: '#4F46E5',
      link: '/user/mechanics',
      linkText: 'Find Nearby Mechanics'
    },
    {
      id: 'sos-rescue',
      title: '3. 1-Tap Emergency Roadside SOS',
      subtitle: 'Instant Distress Beacon Broadcast',
      tag: '24/7 SOS',
      color: '#EA580C',
      link: '/user/emergency',
      linkText: 'Test Emergency Rescue'
    },
    {
      id: 'workshop-hub',
      title: '4. Mechanic Workshop Operations',
      subtitle: 'Automated Job Feed & Navigation',
      tag: 'WORKSHOP',
      color: '#10B981',
      link: '/mechanic/auth',
      linkText: 'Enter Garage Portal'
    }
  ];

  const SCENE_DURATION = 6000; // 6 seconds per scene

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSceneProgress((prev) => {
          const step = (100 / (SCENE_DURATION / 100)) * playbackSpeed;
          if (prev >= 100) {
            setActiveScene((current) => (current + 1) % scenes.length);
            return 0;
          }
          return prev + step;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, scenes.length]);

  const handleSceneSelect = (index) => {
    setActiveScene(index);
    setSceneProgress(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-10 px-2 sm:px-4" id="about-platform">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          INTERACTIVE PLATFORM VIDEO DEMO
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight">
          See MECH CONNECT AI in Action
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
          Experience how our AI diagnoses breakdowns, locates nearby mechanics, and dispatches roadside rescue in seconds.
        </p>
      </div>

      {/* Main Video Simulation Player Device */}
      <div 
        ref={containerRef}
        className={`relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl transition-all ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen flex flex-col justify-between' : ''
        }`}
      >
        {/* Device Top Bar */}
        <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-700">
              <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">
                MECH CONNECT AI • <span className="text-cyan-400">DEMO V2.4</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              LIVE SIMULATION
            </span>
            <span className="hidden md:inline-block px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
              60 FPS HD
            </span>
          </div>
        </div>

        {/* Video Screen Canvas */}
        <div className="relative min-h-[360px] sm:min-h-[440px] w-full bg-gradient-to-b from-slate-950 via-[#060F1E] to-slate-950 flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none">
          {/* Background Digital Grid & Scanlines */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/60 pointer-events-none" />

          {/* Top Scene HUD Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span 
                className="px-2.5 py-1 rounded text-[10px] font-black font-mono tracking-wider uppercase border"
                style={{
                  backgroundColor: `${scenes[activeScene].color}15`,
                  borderColor: `${scenes[activeScene].color}40`,
                  color: scenes[activeScene].color
                }}
              >
                {scenes[activeScene].tag}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                {scenes[activeScene].title}
              </h3>
            </div>

            <div className="text-xs font-mono text-slate-400">
              0{activeScene + 1} / 0{scenes.length}
            </div>
          </div>

          {/* ================= SCENE 1: AI DIAGNOSTIC SCANNER ================= */}
          {activeScene === 0 && (
            <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Animated Vehicle Wireframe with Laser Scan Sweep */}
              <div className="md:col-span-6 relative flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                {/* Laser Scanning Line */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse z-20 top-1/2 -translate-y-1/2"></div>
                
                <svg viewBox="0 0 240 120" className="w-full max-w-[240px] h-auto drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                  {/* Car Outline */}
                  <path
                    d="M20 80 L35 75 L60 50 L140 50 L180 75 L220 80 L225 95 L15 95 Z"
                    fill="none"
                    stroke="#00B4D8"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  {/* Wheels */}
                  <circle cx="55" cy="95" r="14" fill="#0B1E3B" stroke="#00E5FF" strokeWidth="2.5" />
                  <circle cx="55" cy="95" r="6" fill="#00E5FF" />
                  <circle cx="180" cy="95" r="14" fill="#0B1E3B" stroke="#00E5FF" strokeWidth="2.5" />
                  <circle cx="180" cy="95" r="6" fill="#00E5FF" />
                  {/* Engine Scanning Node (Fault Pinpoint) */}
                  <g transform="translate(180, 60)">
                    <circle cx="0" cy="0" r="8" fill="#EF4444" fillOpacity="0.4" className="animate-ping" />
                    <circle cx="0" cy="0" r="5" fill="#EF4444" />
                    <line x1="0" y1="0" x2="-25" y2="-20" stroke="#EF4444" strokeWidth="1.5" />
                    <text x="-70" y="-24" fill="#EF4444" fontSize="9" fontWeight="bold" fontFamily="monospace">FAULT P0300</text>
                  </g>
                </svg>

                <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-cyan-300">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    Neural Diagnostic: 98.4%
                  </span>
                  <span>•</span>
                  <span>Sensors: 14 Active</span>
                </div>
              </div>

              {/* Real-time AI Telemetry Terminal */}
              <div className="md:col-span-6 space-y-2.5 text-left">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-800">
                    <span>OBD-II LIVE TELEMETRY</span>
                    <span className="text-emerald-400">● CONNECTED</span>
                  </div>
                  <div className="text-cyan-300">
                    &gt; Diagnosing: <span className="text-white font-bold">Ignition Coil & Cylinder 3 Misfire</span>
                  </div>
                  <div className="text-slate-300 text-[11px] leading-relaxed">
                    AI Recommendation: Safe to drive up to 12 km. Replace coil pack to avoid catalytic converter damage.
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-400">Est. Repair Cost:</span>
                    <span className="text-amber-400 font-bold font-mono">₹1,200 - ₹1,800</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    3 Certified Garages Stock Part Nearby
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= SCENE 2: LIVE GPS & MECHANIC TRACKING ================= */}
          {activeScene === 1 && (
            <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Animated Sonar Radar Map */}
              <div className="md:col-span-6 relative flex flex-col items-center justify-center p-6 rounded-xl bg-slate-900/70 border border-indigo-500/30 overflow-hidden">
                {/* Radar Grid Concentric Circles */}
                <div className="relative w-48 h-48 rounded-full border border-indigo-500/30 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full border border-indigo-500/20 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-indigo-500/30 flex items-center justify-center">
                      {/* User Location Pin */}
                      <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[8px] shadow-lg shadow-indigo-500/50">
                        <Car className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* Sonar Radar Sweep Beam */}
                  <div 
                    className="absolute inset-0 rounded-full border-r-2 border-indigo-400/80 bg-gradient-to-tr from-transparent via-indigo-500/10 to-transparent origin-center animate-spin"
                    style={{ animationDuration: '4s' }}
                  />

                  {/* Blinking Mechanic 1 Pin */}
                  <div className="absolute top-6 right-8 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold bg-slate-950 px-1 py-0.5 rounded border border-emerald-500/40">
                      Apex Auto (1.2 km)
                    </span>
                  </div>

                  {/* Blinking Mechanic 2 Pin */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-[9px] font-mono text-cyan-300 bg-slate-950 px-1 py-0.5 rounded border border-cyan-500/40">
                      Speed Fix (2.4 km)
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-[11px] font-mono text-indigo-300 flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  Radar: 5 Certified Workshops within 5 km
                </div>
              </div>

              {/* Live Tracking Card */}
              <div className="md:col-span-6 space-y-2.5 text-left">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-slate-400 text-[10px]">LIVE DISPATCH TRACKING</span>
                    <span className="text-indigo-400 font-bold flex items-center gap-1">
                      <Navigation className="w-3 h-3 animate-bounce" />
                      EN ROUTE
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-base border border-indigo-500/40">
                      🔧
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Rajesh Kumar</h4>
                      <p className="text-[11px] text-slate-400 font-sans">Apex Auto Care • Mobile Van #KA-04-9812</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">ESTIMATED ARRIVAL</span>
                      <span className="text-emerald-400 font-bold text-xs">3 Mins 40 Sec</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">DISTANCE REMAINING</span>
                      <span className="text-cyan-400 font-bold text-xs">1.2 km away</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= SCENE 3: 1-TAP EMERGENCY SOS ================= */}
          {activeScene === 2 && (
            <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Emergency Beacon Pulsing Screen */}
              <div className="md:col-span-6 relative flex flex-col items-center justify-center p-6 rounded-xl bg-slate-900/80 border border-orange-500/30 overflow-hidden">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping"></div>
                  <div className="absolute inset-2 rounded-full bg-orange-500/30 animate-pulse"></div>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex flex-col items-center justify-center text-white shadow-xl shadow-orange-600/50 z-10">
                    <AlertCircle className="w-8 h-8 animate-bounce" />
                    <span className="text-[10px] font-black font-mono tracking-wider mt-0.5">SOS</span>
                  </div>
                </div>

                <div className="mt-4 text-center space-y-1 font-mono">
                  <div className="text-orange-400 text-xs font-bold flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                    PRIORITY DISTRESS SIGNAL BROADCASTED
                  </div>
                  <div className="text-[10px] text-slate-400">
                    GPS Coordinates: 12.9716° N, 77.5946° E
                  </div>
                </div>
              </div>

              {/* Roadside Dispatch Card */}
              <div className="md:col-span-6 space-y-2.5 text-left">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-orange-500/30 font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px]">
                    <span className="text-slate-400">AUTOMATED RESCUE DISPATCH</span>
                    <span className="text-orange-400 font-bold">STATUS: CONFIRMED</span>
                  </div>

                  <p className="text-slate-200 text-xs leading-relaxed font-sans">
                    Emergency request received with battery jumpstart and towing protocol. 2 rapid-response units dispatched.
                  </p>

                  <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span>24/7 Priority Hotline Connected: <strong>1-800-MECH-AI</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= SCENE 4: WORKSHOP HUB & REVENUE ================= */}
          {activeScene === 3 && (
            <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Mechanic Incoming Job Alert */}
              <div className="md:col-span-6 relative flex flex-col p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                  <span className="text-emerald-400 font-bold font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    NEW INCOMING REQUEST
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">JUST NOW</span>
                </div>

                <div className="my-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-bold text-sm">Hyundai Creta • Brake Issue</h4>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono text-xs font-bold">
                      1.8 km
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">Customer: Anita Sharma • MG Road Outer Ring</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-emerald-900/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ACCEPT JOB
                  </button>
                  <button className="py-2 px-3 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs font-mono">
                    DETAILS
                  </button>
                </div>
              </div>

              {/* Workshop Revenue & Stats Feed */}
              <div className="md:col-span-6 space-y-2.5 text-left">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px]">
                    <span className="text-slate-400">GARAGE PERFORMANCE HUD</span>
                    <span className="text-emerald-400 font-bold">ONLINE</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">TODAY'S JOBS</span>
                      <span className="text-white font-bold text-base">8 Completed</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">TODAY'S REVENUE</span>
                      <span className="text-emerald-400 font-bold text-base">₹14,500</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 flex items-center justify-between pt-1 font-sans">
                    <span>Partner Garage Rating:</span>
                    <span className="font-bold text-amber-400 font-mono">★ 4.9 (128 Reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Interactive Player Controls & Timeline */}
          <div className="relative z-10 space-y-2 pt-3 border-t border-slate-800/80">
            {/* Progress Scrubber Bar */}
            <div 
              className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setSceneProgress(pos * 100);
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 transition-all duration-100"
                style={{ width: `${sceneProgress}%` }}
              />
            </div>

            {/* Playback Control Buttons */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-all shadow-md shadow-indigo-600/30"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={() => {
                    setActiveScene((prev) => (prev + 1) % scenes.length);
                    setSceneProgress(0);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Next Scene"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>Scene {activeScene + 1} of 4</span>
                </div>
              </div>

              {/* Try Feature Link */}
              <Link
                to={scenes[activeScene].link}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold font-mono transition-all border border-cyan-500/20"
              >
                <span>{scenes[activeScene].linkText}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2">
                {/* Speed Switcher */}
                <button
                  onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-slate-300 hover:text-white"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scene Switcher Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        {scenes.map((scene, idx) => (
          <button
            key={scene.id}
            onClick={() => handleSceneSelect(idx)}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              activeScene === idx
                ? 'bg-white border-indigo-500 shadow-sm ring-2 ring-indigo-500/20'
                : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span 
                className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: activeScene === idx ? `${scene.color}15` : '#F1F5F9',
                  color: activeScene === idx ? scene.color : '#64748B'
                }}
              >
                {scene.tag}
              </span>
              {activeScene === idx && (
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              )}
            </div>
            <p className={`text-xs font-bold leading-tight ${activeScene === idx ? 'text-slate-900' : 'text-slate-600'}`}>
              {scene.title.split('. ')[1]}
            </p>
          </button>
        ))}
      </div>

      {/* About Platform Key Architecture & Benefits */}
      <div className="mt-8 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div className="clean-card p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Neural Diagnosis</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Diagnoses 2,400+ vehicle symptoms, OBD-II error codes, and warning lights in seconds.
          </p>
        </div>

        <div className="clean-card p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Verified Garages</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every garage and mechanic is verified for certified tools, transparent pricing, and genuine spares.
          </p>
        </div>

        <div className="clean-card p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
            <AlertCircle className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Rapid Roadside SOS</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Instant 1-tap distress broadcast locks your GPS location and dispatches nearest mobile rescue.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutWebsiteVideo;
