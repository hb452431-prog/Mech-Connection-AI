import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  AlertCircle, 
  MapPin, 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  Navigation, 
  Clock, 
  Truck, 
  BatteryCharging, 
  Disc, 
  Fuel, 
  KeyRound, 
  Anchor, 
  Send, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { sosDispatchService, SOS_STATUSES } from '../services/sosDispatchService';
import { MOCK_EMERGENCY_SERVICES } from '../services/mockData';
import { useToast } from '../context/ToastContext';

// Custom Leaflet Icons using SVG
const userPinIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="background-color:#E11D48; width:28px; height:28px; border-radius:50%; border:3px solid #FFFFFF; box-shadow:0 0 15px #E11D48; display:flex; align-items:center; justify-content:center;">
          <div style="width:8px; height:8px; background:#FFFFFF; border-radius:50%;"></div>
        </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

const driverVanIcon = L.divIcon({
  className: 'custom-driver-marker',
  html: `<div style="background-color:#0284C7; width:34px; height:34px; border-radius:50%; border:3px solid #38BDF8; box-shadow:0 0 20px #0284C7; display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:16px;">
          🛠️
        </div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17]
});

export const SosPage = () => {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get('service') || 'sos-jumpstart';
  const { showToast } = useToast();

  const [activeRequest, setActiveRequest] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(preSelectedService);
  const [vehicleNotes, setVehicleNotes] = useState('Car disabled near sidewalk. Hazards turned on.');
  const [userLocation, setUserLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
    address: 'Market St & 7th St, San Francisco, CA'
  });
  const [chatMessage, setChatMessage] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Load existing SOS on mount
  useEffect(() => {
    const existing = sosDispatchService.getActiveRequest();
    if (existing) {
      setActiveRequest(existing);
    }
  }, []);

  // Step driver movement simulation when active
  useEffect(() => {
    if (!activeRequest || activeRequest.status === SOS_STATUSES.ARRIVED || activeRequest.status === SOS_STATUSES.CANCELLED) {
      return;
    }

    const interval = setInterval(() => {
      setActiveRequest((prev) => {
        if (!prev) return null;
        if (prev.status === SOS_STATUSES.SEARCHING) {
          const assigned = sosDispatchService.simulateAssignDriver(prev);
          showToast('Certified mobile technician Dave Miller assigned to your rescue!', 'success');
          return assigned;
        } else if (prev.status === SOS_STATUSES.ASSIGNED || prev.status === SOS_STATUSES.EN_ROUTE) {
          const stepped = sosDispatchService.stepDriverLocation(prev);
          if (stepped.status === SOS_STATUSES.ARRIVED) {
            showToast('Rescue Unit Has Arrived at Your Location!', 'success');
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          }
          return stepped;
        }
        return prev;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [activeRequest?.status]);

  const handleRequestSos = async () => {
    const selectedSrv = MOCK_EMERGENCY_SERVICES.find((s) => s.id === selectedServiceId) || MOCK_EMERGENCY_SERVICES[0];
    
    const req = await sosDispatchService.createEmergencyRequest({
      serviceType: selectedSrv.id,
      serviceName: selectedSrv.name,
      cost: selectedSrv.basePrice,
      notes: vehicleNotes,
      userLocation
    });

    setActiveRequest(req);
    showToast('Emergency Radar Beacon Activated. Dispatched to nearby units.', 'warning');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const handleCancelSos = () => {
    if (activeRequest) {
      sosDispatchService.cancelEmergencyRequest(activeRequest);
      setActiveRequest(null);
      showToast('Emergency SOS request cancelled.', 'info');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim() || !activeRequest) return;
    const updated = sosDispatchService.sendUserMessage(activeRequest, chatMessage.trim());
    setActiveRequest(updated);
    setChatMessage('');
  };

  const handleGetLiveLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setUserLocation({
        lat: 37.7749 + (Math.random() - 0.5) * 0.005,
        lng: -122.4194 + (Math.random() - 0.5) * 0.005,
        address: 'Live High-Precision GPS Lock (San Francisco Metro)'
      });
      setIsLocating(false);
      showToast('High-Precision GPS coordinates acquired', 'success');
    }, 800);
  };

  return (
    <div className="py-10 bg-navy-950 min-h-screen">
      <div className="container-custom">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2 font-mono">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              24/7 Rapid Emergency Response
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
              Emergency Roadside SOS
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Priority live GPS dispatch for breakdowns, flat tyres, dead batteries, and flatbed towing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1800632424"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              Call Emergency Phone Line
            </a>
          </div>
        </div>

        {/* ACTIVE SOS DISPATCH VIEW */}
        {activeRequest ? (
          <div className="space-y-6">
            {/* Live Progress Bar Banner */}
            <div className="glass-panel-glow rounded-3xl p-6 border-cyan-500/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 animate-pulse flex-shrink-0">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                      REQUEST #{activeRequest.id}
                    </span>
                    <h3 className="text-xl font-bold text-white font-heading">
                      {activeRequest.serviceName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-mono block">Estimated Arrival</span>
                    <span className="text-2xl font-black text-cyan-400 font-mono">
                      {activeRequest.etaMins > 0 ? `${activeRequest.etaMins} mins` : 'ARRIVED ON SCENE'}
                    </span>
                  </div>

                  <button
                    onClick={handleCancelSos}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 text-xs font-bold transition-all"
                  >
                    Cancel Request
                  </button>
                </div>
              </div>

              {/* Status Stepper */}
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800">
                {[
                  { label: 'Beacon Sent', status: 'SEARCHING' },
                  { label: 'Unit Assigned', status: 'ASSIGNED' },
                  { label: 'En Route (Live GPS)', status: 'EN_ROUTE' },
                  { label: 'Arrived at Vehicle', status: 'ARRIVED' }
                ].map((step, idx) => {
                  const isDone = 
                    (activeRequest.status === SOS_STATUSES.SEARCHING && idx === 0) ||
                    (activeRequest.status === SOS_STATUSES.ASSIGNED && idx <= 1) ||
                    (activeRequest.status === SOS_STATUSES.EN_ROUTE && idx <= 2) ||
                    (activeRequest.status === SOS_STATUSES.ARRIVED && idx <= 3);

                  return (
                    <div key={idx} className="text-center">
                      <div className={`h-1.5 rounded-full mb-1.5 transition-all ${
                        isDone ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-slate-800'
                      }`} />
                      <span className={`text-[10px] sm:text-xs font-mono ${
                        isDone ? 'text-cyan-300 font-bold' : 'text-slate-500'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Map & Driver Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Interactive Leaflet GPS Map */}
              <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-slate-800 h-[480px] relative shadow-2xl">
                <MapContainer
                  center={[activeRequest.userLocation.lat, activeRequest.userLocation.lng]}
                  zoom={14}
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {/* User Location Marker */}
                  <Marker
                    position={[activeRequest.userLocation.lat, activeRequest.userLocation.lng]}
                    icon={userPinIcon}
                  >
                    <Popup>
                      <div className="text-xs font-bold text-slate-900">
                        📍 Your Stranded Vehicle Location
                      </div>
                    </Popup>
                  </Marker>

                  {/* Driver Marker (if assigned) */}
                  {activeRequest.assignedDriver && (
                    <Marker
                      position={[
                        activeRequest.assignedDriver.currentLocation.lat,
                        activeRequest.assignedDriver.currentLocation.lng
                      ]}
                      icon={driverVanIcon}
                    >
                      <Popup>
                        <div className="text-xs font-bold text-slate-900">
                          🛠️ Dave Miller (RapidRescue Mobile Van)
                        </div>
                      </Popup>
                    </Marker>
                  )}

                  {/* Polyline Route */}
                  {activeRequest.driverPath && (
                    <Polyline
                      positions={activeRequest.driverPath.map((p) => [p.lat, p.lng])}
                      color="#0284C7"
                      weight={4}
                      dashArray="6, 8"
                    />
                  )}
                </MapContainer>

                {/* Floating GPS HUD Overlay */}
                <div className="absolute top-4 left-4 z-[1000] bg-navy-950/90 border border-slate-700/80 backdrop-blur-md rounded-2xl p-3 shadow-xl max-w-xs">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Navigation className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span>Live GPS Tracking Broadcast Active</span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">{activeRequest.userLocation.address}</p>
                </div>
              </div>

              {/* Right Column: Driver Card & In-App Live Messages */}
              <div className="lg:col-span-4 space-y-6">
                {/* Driver Profile */}
                {activeRequest.assignedDriver ? (
                  <div className="glass-panel-glow rounded-3xl p-6 border-cyan-500/30 space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={activeRequest.assignedDriver.avatar}
                        alt="Driver"
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400 flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-base font-bold text-white font-heading">
                          {activeRequest.assignedDriver.name}
                        </h4>
                        <p className="text-xs text-slate-400">{activeRequest.assignedDriver.company}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs font-mono">
                          <span className="text-amber-400 font-bold">★ {activeRequest.assignedDriver.rating}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-300">{activeRequest.assignedDriver.completedRescues} rescues</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <span className="text-slate-400 block mb-0.5">Assigned Vehicle:</span>
                      <strong className="text-slate-200">{activeRequest.assignedDriver.vehicle}</strong>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${activeRequest.assignedDriver.phone}`}
                        className="btn-primary-glow py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        Call Dave
                      </a>
                      <button
                        onClick={() => showToast('Driver location pinged', 'info')}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold"
                      >
                        Ping GPS
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="glass-panel rounded-3xl p-6 border-slate-800 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto animate-spin">
                      <Truck className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-white">Contacting Nearest Mobile Unit...</p>
                    <p className="text-xs text-slate-400">Broadcasting to 8 certified units in radius.</p>
                  </div>
                )}

                {/* In-App Live Chat Feed */}
                <div className="glass-panel rounded-3xl p-5 border-slate-800 flex flex-col h-64 justify-between">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Live Driver Communication</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Encrypted</span>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
                    {activeRequest.messages?.map((m) => (
                      <div
                        key={m.id}
                        className={`p-2.5 rounded-xl max-w-[90%] leading-relaxed ${
                          m.sender === 'user'
                            ? 'bg-cyan-600 text-white ml-auto'
                            : m.sender === 'driver'
                            ? 'bg-slate-800 text-slate-200 border border-slate-700'
                            : 'bg-navy-950 text-cyan-300 font-mono text-[11px] border border-cyan-500/20'
                        }`}
                      >
                        <p>{m.text}</p>
                        <span className="text-[9px] opacity-60 block mt-1 text-right">{m.timestamp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-800 flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Send message to driver..."
                      className="w-full glass-input px-3 py-1.5 rounded-lg text-xs"
                    />
                    <button
                      type="submit"
                      className="btn-primary-glow p-2 rounded-lg text-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* Safety Tips While Waiting */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Safety Checklist While Waiting:
                  </span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    <li>Turn on vehicle hazard emergency flashers.</li>
                    <li>If parked on freeway shoulder, remain belted inside vehicle.</li>
                    <li>Keep your mobile phone line free for incoming technician call.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* SOS REQUEST FORM VIEW (When no active rescue) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form: Select Breakdown Service */}
            <div className="lg:col-span-7 glass-panel-glow rounded-3xl p-6 sm:p-8 border-rose-500/30 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  1. Select Breakdown Emergency Service
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Guaranteed upfront flat-rate rescue pricing. No surge fees.
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_EMERGENCY_SERVICES.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedServiceId === srv.id
                        ? 'bg-rose-950/40 border-rose-500 shadow-xl shadow-rose-950/50 ring-1 ring-rose-400'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-cyan-400">~{srv.etaMins} mins ETA</span>
                        <span className="text-sm font-black text-white font-mono">${srv.basePrice}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-heading mb-1">{srv.name}</h4>
                      <p className="text-[11px] text-slate-400">{srv.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Location Input / Auto-GPS */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-400 uppercase font-mono">
                    2. Stranded Vehicle Location
                  </label>
                  <button
                    type="button"
                    onClick={handleGetLiveLocation}
                    disabled={isLocating}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    {isLocating ? 'Locking GPS...' : 'Auto-Locate Me via GPS'}
                  </button>
                </div>

                <div className="relative">
                  <MapPin className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userLocation.address}
                    onChange={(e) => setUserLocation({ ...userLocation, address: e.target.value })}
                    className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              {/* Vehicle & Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">
                  3. Emergency Notes / Vehicle Details
                </label>
                <textarea
                  rows={2}
                  value={vehicleNotes}
                  onChange={(e) => setVehicleNotes(e.target.value)}
                  placeholder="e.g. 2023 Tesla Model Y, white, passenger side rear tyre flat, hazards on..."
                  className="w-full glass-input p-3.5 rounded-xl text-sm text-white resize-none"
                />
              </div>

              {/* Big Red SOS Button */}
              <button
                type="button"
                onClick={handleRequestSos}
                className="w-full btn-emergency-glow py-4 rounded-2xl text-base font-black uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl"
              >
                <AlertCircle className="w-6 h-6 animate-spin-slow" />
                BROADCAST EMERGENCY SOS RADAR BEACON
              </button>
            </div>

            {/* Right Information Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel-glow rounded-3xl p-6 border-cyan-500/30 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">MECH CONNECT SOS Guarantee</h4>
                    <p className="text-xs text-slate-400">Official Roadside Security Standard</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Real-time Radar Dispatch:</strong> Nearby mobile mechanics receive instant priority alert on their dashboard.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Live Driver Route:</strong> Watch your rescue operator approach on the map in real time.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Standard Fixed Pricing:</strong> You pay the exact flat rate shown. No cash demanded on the shoulder.</span>
                  </div>
                </div>
              </div>

              {/* Membership CTA */}
              <div className="glass-panel rounded-3xl p-6 border-slate-800 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-base font-bold text-white font-heading">Get 2 Free Roadside Rescues Every Year</h4>
                <p className="text-xs text-slate-400">
                  Upgrade to MechConnect+ Gold for $9.99/mo and never pay out-of-pocket for towing or jumpstarts again.
                </p>
                <Link
                  to="/register"
                  className="inline-block btn-primary-glow px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Join MechConnect+
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SosPage;
