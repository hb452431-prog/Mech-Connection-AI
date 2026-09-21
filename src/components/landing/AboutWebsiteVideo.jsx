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
  Gauge,
  PhoneCall,
  Flame,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const AboutWebsiteVideo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStoryStage, setActiveStoryStage] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const containerRef = useRef(null);

  // Real-World Emergency Breakdown & Resolution Story Timeline
  const storyStages = [
    {
      id: 'breakdown',
      time: '11:20 PM',
      title: 'Real Situation: Highway Breakdown',
      phase: 'THE CRISIS',
      badgeColor: '#EF4444',
      userRole: 'DRIVER STRANDED',
      mechanicRole: 'GARAGES CLOSED',
      narrative: '11:20 PM: Rahul is stranded on NH-48 in the dark with steam pouring from his engine. Traditional towing takes 2+ hours and local shops are closed.'
    },
    {
      id: 'driver-action',
      time: '11:22 PM',
      title: 'Driver Uses MECH CONNECT AI',
      phase: 'AI DIAGNOSIS & 1-TAP SOS',
      badgeColor: '#00B4D8',
      userRole: 'AI ENGINE SCAN',
      mechanicRole: 'GPS BROADCAST',
      narrative: '11:22 PM: Rahul opens MECH CONNECT AI. AI scans symptom: "Radiator Hose Leak (Code P0217)". He taps 1-Tap SOS to lock GPS coordinates.'
    },
    {
      id: 'mechanic-alert',
      time: '11:23 PM',
      title: 'Mechanic Receives & Accepts Job',
      phase: 'GARAGE DISPATCH',
      badgeColor: '#4F46E5',
      userRole: 'ETA: 4 MINS',
      mechanicRole: '1-CLICK ACCEPT',
      narrative: '11:23 PM: Suresh at Apex Auto (1.8 km away) receives a loud distress alert with pre-diagnosed parts. He clicks "Accept" and starts his mobile service van.'
    },
    {
      id: 'rescue-complete',
      time: '11:32 PM',
      title: 'Fixed on Road & Back on Way',
      phase: 'PROBLEM SOLVED',
      badgeColor: '#10B981',
      userRole: 'SAFELY HOME',
      mechanicRole: 'EARNED ₹1,450',
      narrative: '11:32 PM: Suresh arrives in 4 mins, replaces the hose in 10 mins. Transparent digital bill generated. Rahul drives home safely!'
    }
  ];

  const STAGE_DURATION = 6500; // 6.5s per storyboard scene

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setStageProgress((prev) => {
          const step = (100 / (STAGE_DURATION / 100)) * playbackSpeed;
          if (prev >= 100) {
            setActiveStoryStage((current) => (current + 1) % storyStages.length);
            return 0;
          }
          return prev + step;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, storyStages.length]);

  const handleStageJump = (index) => {
    setActiveStoryStage(index);
    setStageProgress(0);
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
    <section className="w-full max-w-4xl mx-auto my-8 px-2 sm:px-4" id="about-website-story">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono tracking-wider shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          HOW IT WORKS IN THE REAL WORLD
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight">
          How MECH CONNECT AI Saves You in Real Emergencies
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium">
          Watch a real-life night breakdown situation: from sudden highway failure to AI diagnosis and instant mechanic roadside rescue.
        </p>
      </div>

      {/* Main Storyboard Animated Video Player */}
      <div 
        ref={containerRef}
        className={`relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl transition-all ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen flex flex-col justify-between' : ''
        }`}
      >
        {/* Top Video Header Bar */}
        <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 flex items-center justify-between backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <span className="text-xs font-mono font-bold text-slate-200">
                CASE STUDY: <span className="text-cyan-400">NIGHT HIGHWAY BREAKDOWN</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                👤 Driver View
              </span>
              <span className="text-slate-500">+</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                🔧 Mechanic View
              </span>
            </div>
          </div>
        </div>

        {/* Video Canvas */}
        <div className="relative min-h-[380px] sm:min-h-[440px] w-full bg-gradient-to-b from-slate-950 via-[#060D1A] to-slate-950 flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none">
          {/* Cybernetic Night Grid Background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/70 pointer-events-none" />

          {/* Top Stage Indicator Strip */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span 
                className="px-2.5 py-1 rounded text-[11px] font-black font-mono tracking-wider uppercase border shadow-xs"
                style={{
                  backgroundColor: `${storyStages[activeStoryStage].badgeColor}20`,
                  borderColor: `${storyStages[activeStoryStage].badgeColor}60`,
                  color: storyStages[activeStoryStage].badgeColor
                }}
              >
                {storyStages[activeStoryStage].time} • {storyStages[activeStoryStage].phase}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white font-heading truncate">
                {storyStages[activeStoryStage].title}
              </h3>
            </div>

            <span className="text-xs font-mono text-slate-400 flex-shrink-0">
              Scene 0{activeStoryStage + 1} / 0{storyStages.length}
            </span>
          </div>

          {/* ================= STAGE 1: THE CRISIS (NIGHT HIGHWAY BREAKDOWN) ================= */}
          {activeStoryStage === 0 && (
            <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left: Stranded Car Visual */}
              <div className="md:col-span-6 relative flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/80 border border-rose-500/30 overflow-hidden">
                {/* Night Highway Road & Rain Effect */}
                <div className="relative w-full h-32 flex items-center justify-center">
                  {/* Road Strip */}
                  <div className="absolute inset-x-0 bottom-2 h-8 bg-slate-800 rounded-lg flex items-center justify-center border-t border-slate-700">
                    <div className="w-full border-t-2 border-dashed border-amber-400/50"></div>
                  </div>

                  {/* Stranded Car with Steam & Hazard Blinkers */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Steam Cloud Animation */}
                    <div className="absolute -top-6 right-6 flex gap-1">
                      <span className="w-4 h-4 rounded-full bg-slate-400/40 animate-ping"></span>
                      <span className="w-6 h-6 rounded-full bg-slate-300/30 animate-pulse"></span>
                    </div>

                    <svg viewBox="0 0 180 80" className="w-44 h-auto drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                      {/* Car Body */}
                      <path d="M15 55 L30 50 L50 30 L120 30 L150 50 L170 55 L175 68 L10 68 Z" fill="#1E293B" stroke="#EF4444" strokeWidth="2" />
                      {/* Windows */}
                      <path d="M55 35 L75 35 L75 48 L40 48 Z" fill="#0284C7" fillOpacity="0.6" />
                      <path d="M82 35 L115 35 L135 48 L82 48 Z" fill="#0284C7" fillOpacity="0.6" />
                      {/* Wheels */}
                      <circle cx="45" cy="68" r="11" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
                      <circle cx="140" cy="68" r="11" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
                      {/* Blinking Hazard Lights */}
                      <circle cx="12" cy="58" r="3.5" fill="#F59E0B" className="animate-ping" />
                      <circle cx="173" cy="58" r="3.5" fill="#EF4444" className="animate-ping" />
                    </svg>
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 text-rose-500" />
                    Engine Overheating • NH-48 Mile 18
                  </span>
                </div>
              </div>

              {/* Right: The Problem Breakdown Card */}
              <div className="md:col-span-6 space-y-3 text-left">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-800">
                    <span>WITHOUT MECH CONNECT AI</span>
                    <span className="text-rose-400 font-bold">❌ 2+ HOURS DELAY</span>
                  </div>

                  <div className="space-y-1.5 text-slate-300 text-xs font-sans">
                    <p className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>No nearby garages open late at night</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>Don't know what's wrong (Risk of being overcharged)</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>Towing vans charging exorbitant emergency fees</span>
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-mono font-bold">
                    ⚠️ Stranded in dark with zero verified help.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STAGE 2: DRIVER USES AI & 1-TAP SOS ================= */}
          {activeStoryStage === 1 && (
            <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left: Mobile Phone AI Scanner Mockup */}
              <div className="md:col-span-6 relative flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
                <div className="w-full max-w-[260px] p-3.5 rounded-xl bg-slate-950 border-2 border-cyan-500/40 shadow-xl space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 pb-1 border-b border-slate-800">
                    <span>MECH CONNECT AI MOBILE</span>
                    <span className="text-emerald-400">● AI LIVE</span>
                  </div>

                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 space-y-1">
                    <div className="text-[11px] font-bold text-white font-mono">
                      🔍 AI Diagnosis Complete
                    </div>
                    <p className="text-[10px] text-cyan-200 leading-tight">
                      Cause: <strong>Radiator Hose Leak (P0217)</strong>
                    </p>
                    <p className="text-[9px] text-slate-400">
                      Est. Fix Cost: ₹750 - ₹1,100 (15 min repair)
                    </p>
                  </div>

                  <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-orange-600/40 animate-pulse">
                    <Radio className="w-3.5 h-3.5" />
                    BROADCAST 1-TAP SOS
                  </button>
                </div>

                <div className="mt-2 text-[10px] font-mono text-slate-400">
                  📍 Auto-locked GPS: 12.9716° N, 77.5946° E
                </div>
              </div>

              {/* Right: What Happened for the Driver */}
              <div className="md:col-span-6 space-y-3 text-left">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-800">
                    <span>DRIVER BENEFIT</span>
                    <span className="text-cyan-400 font-bold">⚡ IN 45 SECONDS</span>
                  </div>

                  <div className="space-y-2 text-slate-200 text-xs font-sans">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span><strong>AI Diagnostic:</strong> Driver knows exact issue without needing mechanical knowledge.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Fair Price Locked:</strong> AI estimated standard cost upfront so driver can't be scammed.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Instant SOS:</strong> Alert routed to nearest 5 verified mechanics in 2 km radius.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STAGE 3: MECHANIC ACCEPTS EMERGENCY JOB ================= */}
          {activeStoryStage === 2 && (
            <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left: Mechanic Portal Dashboard Alert */}
              <div className="md:col-span-6 relative flex flex-col p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/40">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2.5 font-mono">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-xs">
                    <span className="text-indigo-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                      GARAGE PORTAL: INCOMING SOS
                    </span>
                    <span className="text-slate-400 text-[10px]">1.8 KM AWAY</span>
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-xs">Rahul K. • Hyundai i20</h4>
                    <p className="text-[11px] text-cyan-300 font-sans">Diagnosis: Radiator Coolant Hose (Parts In Stock)</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] p-2 rounded bg-indigo-950/60 border border-indigo-500/20">
                    <span className="text-slate-300">Estimated Payout:</span>
                    <span className="text-emerald-400 font-bold font-mono">₹1,450 (Direct Payout)</span>
                  </div>

                  <button className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ACCEPT & START SERVICE VAN
                  </button>
                </div>
              </div>

              {/* Right: What Happened for the Mechanic */}
              <div className="md:col-span-6 space-y-3 text-left">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-800">
                    <span>MECHANIC BENEFIT</span>
                    <span className="text-indigo-400 font-bold">🚀 ZERO MARKETING COST</span>
                  </div>

                  <div className="space-y-2 text-slate-200 text-xs font-sans">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Pre-Diagnosed Lead:</strong> Mechanic knows exact problem and parts to pack beforehand.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Turn-by-Turn GPS:</strong> Exact live route navigation directly to stranded vehicle.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Direct Guaranteed Earnings:</strong> Instant digital confirmation upon job finish.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STAGE 4: RESCUED & BACK ON THE ROAD ================= */}
          {activeStoryStage === 3 && (
            <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left: Live Rescue Completion Card */}
              <div className="md:col-span-6 relative flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/40 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-3 shadow-xl shadow-emerald-900/40">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <h4 className="text-white font-black text-base font-heading">
                  Roadside Rescue Completed!
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xs">
                  Suresh replaced the radiator hose in 12 minutes. Total time from breakdown to fix: <strong>16 minutes</strong>.
                </p>

                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                  <span>⭐⭐⭐⭐⭐ Driver Rated 5.0 Stars</span>
                </div>
              </div>

              {/* Right: Win-Win Value Summary */}
              <div className="md:col-span-6 space-y-2.5 text-left">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-800">
                    <span>WIN-WIN REAL WORLD RESULT</span>
                    <span className="text-emerald-400 font-bold">100% SUCCESS</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-[10px] block">DRIVER OUTCOME</span>
                      <span className="text-white font-bold text-xs">Saved 2+ Hours • Safely Home</span>
                    </div>
                    <span className="text-cyan-400 font-mono font-bold text-sm">₹1,450 Paid</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-[10px] block">MECHANIC OUTCOME</span>
                      <span className="text-white font-bold text-xs">Apex Auto Earned ₹1,450</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-bold text-sm">+1 Verified Review</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subtitle Narration Bar */}
          <div className="relative z-10 my-2 p-3 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-200 text-xs sm:text-sm font-medium flex items-center gap-2.5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 animate-ping" />
            <p className="line-clamp-2 leading-relaxed">
              {storyStages[activeStoryStage].narrative}
            </p>
          </div>

          {/* Bottom Player Controls & Stage Scrubber */}
          <div className="relative z-10 space-y-2 pt-2 border-t border-slate-800/80">
            {/* Scrubber Timeline Bar */}
            <div 
              className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setStageProgress(pos * 100);
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-rose-500 via-cyan-500 to-emerald-500 transition-all duration-100"
                style={{ width: `${stageProgress}%` }}
              />
            </div>

            {/* Playback Buttons */}
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
                    setActiveStoryStage((prev) => (prev + 1) % storyStages.length);
                    setStageProgress(0);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Next Story Stage"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <span className="hidden sm:inline-block font-mono text-[11px] text-slate-400">
                  {storyStages[activeStoryStage].time} ({activeStoryStage + 1}/4)
                </span>
              </div>

              {/* Story Stage Selector Tabs */}
              <div className="flex items-center gap-1">
                {storyStages.map((stage, idx) => (
                  <button
                    key={stage.id}
                    onClick={() => handleStageJump(idx)}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                      activeStoryStage === idx
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {stage.time.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {/* Speed Toggle */}
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
    </section>
  );
};

export default AboutWebsiteVideo;
