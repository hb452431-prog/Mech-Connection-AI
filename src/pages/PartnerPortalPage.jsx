import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Radio, 
  MapPin, 
  DollarSign, 
  Star, 
  CheckCircle2, 
  AlertOctagon, 
  PhoneCall, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  Activity,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Sliders,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const mechanicVanIcon = L.divIcon({
  className: 'custom-partner-van',
  html: `<div style="background-color:#F59E0B; width:34px; height:34px; border-radius:50%; border:3px solid #FDE68A; box-shadow:0 0 20px #F59E0B; display:flex; align-items:center; justify-content:center; color:#0F172A; font-size:16px;">
          🚐
        </div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17]
});

const customerTargetIcon = L.divIcon({
  className: 'custom-customer-pin',
  html: `<div style="background-color:#E11D48; width:30px; height:30px; border-radius:50%; border:3px solid #FFFFFF; box-shadow:0 0 20px #E11D48; display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:14px;">
          📍
        </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

export const PartnerPortalPage = () => {
  const { currentUser, isMechanic } = useAuth();
  const { showToast } = useToast();

  const [isOnline, setIsOnline] = useState(true);
  const [hasIncomingRadarAlert, setHasIncomingRadarAlert] = useState(true);
  const [activeJob, setActiveJob] = useState(null);
  const [todayEarnings, setTodayEarnings] = useState(420.00);
  const [completedJobsCount, setCompletedJobsCount] = useState(4);

  const sampleIncomingAlert = {
    id: 'SOS-882190',
    service: '12V Battery Jumpstart & Diagnostic',
    customerName: 'Alex Turner',
    vehicle: '2023 Tesla Model Y (White)',
    distanceMiles: 1.8,
    etaMins: 9,
    payout: 49.00,
    address: 'Market St & 7th St, San Francisco, CA',
    customerPhone: '+1 (415) 883-9912',
    notes: 'Low voltage battery warning triggered on dashboard. 12V dead.'
  };

  const routePositions = [
    [37.7850, -122.4100], // Partner current van location
    [37.7810, -122.4145],
    [37.7749, -122.4194]  // Customer target location
  ];

  const handleAcceptJob = () => {
    setActiveJob(sampleIncomingAlert);
    setHasIncomingRadarAlert(false);
    showToast('Job Accepted! Live GPS route navigation initiated.', 'success');
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
  };

  const handleDeclineJob = () => {
    setHasIncomingRadarAlert(false);
    showToast('Job passed to next available mobile unit.', 'info');
  };

  const handleCompleteJob = () => {
    setTodayEarnings((prev) => prev + (activeJob?.payout || 49.00));
    setCompletedJobsCount((prev) => prev + 1);
    showToast(`Rescue completed! $${activeJob?.payout || 49.00} added to today's payout balance.`, 'success');
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.5 } });
    setActiveJob(null);
  };

  const toggleOnlineStatus = () => {
    const nextStatus = !isOnline;
    setIsOnline(nextStatus);
    showToast(
      nextStatus ? 'Status: ONLINE & Receiving SOS Radar Dispatches' : 'Status: OFFLINE',
      nextStatus ? 'success' : 'warning'
    );
  };

  return (
    <div className="py-10 bg-navy-950 min-h-screen">
      <div className="container-custom space-y-8">
        {/* Partner Header */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Wrench className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white font-heading">
                  {currentUser?.businessName || 'RapidRescue 24/7 Mobile Mechanics'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
                  Master Field Tech
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Technician: <strong>Dave Miller</strong> • Unit #12 (Ford Transit Mobile Lab)
              </p>
            </div>
          </div>

          {/* Status Toggle Switch */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleOnlineStatus}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-lg ${
                isOnline
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-navy-950 shadow-emerald-500/30'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-navy-950 animate-ping' : 'bg-white'}`} />
              {isOnline ? 'Online for SOS Dispatch' : 'Offline / On Break'}
            </button>
          </div>
        </div>

        {/* Real-time Earnings & Metric Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="glass-card p-5 border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Today's Earnings</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-emerald-400 font-mono">
              ${todayEarnings.toFixed(2)}
            </p>
            <span className="text-[10px] text-slate-500 font-mono">Direct Daily Stripe Deposit</span>
          </div>

          <div className="glass-card p-5 border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Jobs Completed Today</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-black text-white font-mono">{completedJobsCount}</p>
            <span className="text-[10px] text-slate-500 font-mono">100% On-Time Arrival</span>
          </div>

          <div className="glass-card p-5 border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Driver Rating</span>
              <Star className="w-4 h-4 text-amber-400 fill-current" />
            </div>
            <p className="text-2xl font-black text-amber-400 font-mono">4.88 ★</p>
            <span className="text-[10px] text-slate-500 font-mono">512 Verified Reviews</span>
          </div>

          <div className="glass-card p-5 border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Average Response</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-black text-cyan-400 font-mono">8.2 min</p>
            <span className="text-[10px] text-slate-500 font-mono">Top 5% in Metro Area</span>
          </div>
        </div>

        {/* INCOMING SOS RADAR ALERT CARD (When available) */}
        {hasIncomingRadarAlert && !activeJob && isOnline && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border-2 border-rose-500/80 shadow-2xl shadow-rose-950/70 animate-pulse space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center animate-spin-slow flex-shrink-0">
                  <Radio className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-rose-400 uppercase tracking-wider">
                      🚨 PRIORITY EMERGENCY SOS RADAR ALERT
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold font-mono">
                      #{sampleIncomingAlert.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                    {sampleIncomingAlert.service}
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-mono block">Estimated Guaranteed Payout</span>
                <span className="text-3xl font-black text-emerald-400 font-mono">${sampleIncomingAlert.payout.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-navy-950/80 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-400 block mb-0.5">Customer & Vehicle:</span>
                <strong className="text-white">{sampleIncomingAlert.customerName}</strong>
                <p className="text-slate-300 font-mono">{sampleIncomingAlert.vehicle}</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Stranded Location:</span>
                <strong className="text-cyan-300">{sampleIncomingAlert.address}</strong>
                <p className="text-slate-400 font-mono">~{sampleIncomingAlert.distanceMiles} miles away ({sampleIncomingAlert.etaMins} mins)</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Incident Notes:</span>
                <p className="text-slate-300 italic">{sampleIncomingAlert.notes}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleDeclineJob}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Pass to Next Unit
              </button>

              <button
                onClick={handleAcceptJob}
                className="btn-emergency-glow px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                ACCEPT EMERGENCY RESCUE JOB
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE NAVIGATION & JOB TRACKING HUD */}
        {activeJob && (
          <div className="space-y-6">
            <div className="glass-panel-glow rounded-3xl p-6 border-cyan-500/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 animate-pulse">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Active Rescue Mission</span>
                    <h3 className="text-xl font-bold text-white font-heading">
                      En Route to {activeJob.customerName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${activeJob.customerPhone}`}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                    Call Customer
                  </a>

                  <button
                    onClick={handleCompleteJob}
                    className="btn-primary-glow px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Service Completed
                  </button>
                </div>
              </div>

              {/* Navigation Route Map */}
              <div className="rounded-2xl overflow-hidden border border-slate-800 h-[380px] relative shadow-xl">
                <MapContainer
                  center={[37.7800, -122.4150]}
                  zoom={14}
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {/* Partner Van Location */}
                  <Marker position={routePositions[0]} icon={mechanicVanIcon}>
                    <Popup>
                      <div className="text-xs font-bold">🚐 Your Mobile Workshop Van</div>
                    </Popup>
                  </Marker>

                  {/* Customer Target Pin */}
                  <Marker position={routePositions[2]} icon={customerTargetIcon}>
                    <Popup>
                      <div className="text-xs font-bold">📍 Customer Location: {activeJob.address}</div>
                    </Popup>
                  </Marker>

                  {/* Route Polyline */}
                  <Polyline positions={routePositions} color="#F59E0B" weight={4} dashArray="6, 8" />
                </MapContainer>

                {/* Floating Route HUD */}
                <div className="absolute top-4 left-4 z-[1000] bg-navy-950/90 border border-slate-700 p-3 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Navigation className="w-3.5 h-3.5 animate-spin" />
                    <span>Turn Right on 7th St in 400 ft</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">ETA: 6 mins (Traffic Clear)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completed Jobs Log */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white font-heading">
            Recent Completed Dispatches & Invoices
          </h3>
          <div className="glass-panel rounded-3xl overflow-hidden border-slate-800 divide-y divide-slate-800 text-xs">
            {[
              { id: 'SOS-771920', service: 'Emergency Flat Tyre Swap', customer: 'Sarah Jenkins', time: '1 hr ago', payout: 55.00, vehicle: '2022 Honda Accord' },
              { id: 'SOS-771891', service: '12V Battery Jumpstart & Diagnostic', customer: 'David Kim', time: '3 hrs ago', payout: 49.00, vehicle: '2021 Toyota Tacoma' },
              { id: 'SOS-771840', service: 'Vehicle Lockout Non-Destructive', customer: 'Marcus Lee', time: '5 hrs ago', payout: 65.00, vehicle: '2020 BMW 330i' }
            ].map((job) => (
              <div key={job.id} className="p-4 flex items-center justify-between hover:bg-slate-900/50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-400">{job.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400">
                      PAID
                    </span>
                  </div>
                  <p className="font-bold text-white mt-0.5">{job.service}</p>
                  <p className="text-[11px] text-slate-400">{job.customer} • {job.vehicle}</p>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 block font-mono">{job.time}</span>
                  <span className="text-sm font-black text-emerald-400 font-mono">+${job.payout.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPortalPage;
