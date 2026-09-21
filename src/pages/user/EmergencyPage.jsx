import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { emergencyService } from '../../services/emergencyService';
import { authService } from '../../services/authService';
import { 
  AlertCircle, 
  MapPin, 
  Phone, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Navigation,
  Car,
  X,
  ShieldCheck,
  Disc,
  BatteryCharging,
  Flame,
  HelpCircle
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

const userPin = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="background-color:#EA580C; width:28px; height:28px; border-radius:50%; border:3px solid #FFFFFF; box-shadow:0 0 14px rgba(234,88,12,0.7); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:12px;">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

const mechanicPin = L.divIcon({
  className: 'custom-mechanic-marker',
  html: `<div style="background-color:#4F46E5; width:34px; height:34px; border-radius:50%; border:3px solid #818CF8; box-shadow:0 0 16px rgba(79,70,229,0.7); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:15px;">🔧</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17]
});

export const EmergencyPage = () => {
  const [searchParams] = useSearchParams();
  const initialNotes = searchParams.get('notes') || '';
  const initialGarage = searchParams.get('garage') || '';
  const user = authService.getUser();

  // Screen stages: 'FORM' | 'SEARCHING' | 'ACCEPTED'
  const [stage, setStage] = useState('FORM');
  const [selectedOption, setSelectedOption] = useState('Vehicle Breakdown');
  const [customNotes, setCustomNotes] = useState(initialNotes ? `${initialGarage ? `Request for ${initialGarage}: ` : ''}${initialNotes}` : '');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [acceptedMechanic, setAcceptedMechanic] = useState(null);

  const emergencyOptions = [
    { name: 'Vehicle Breakdown', icon: Car, desc: 'Car stalled or won\'t move' },
    { name: 'Flat Tyre', icon: Disc, desc: 'Puncture or wheel damage' },
    { name: 'Battery Problem', icon: BatteryCharging, desc: 'Dead battery / jumpstart needed' },
    { name: 'Engine Problem', icon: Flame, desc: 'Smoke, overheating, or noise' },
    { name: 'Other', icon: HelpCircle, desc: 'Lockout, fuel, or general aid' }
  ];

  const userCoords = [37.7749, -122.4194];
  const mechanicCoords = [37.7850, -122.4100];
  const routePoints = [
    userCoords,
    [37.7810, -122.4145],
    mechanicCoords
  ];

  const handleConfirmSend = async () => {
    setShowConfirmModal(false);
    setStage('SEARCHING');

    // Create request in service
    await emergencyService.createRequest({
      problemType: selectedOption,
      notes: customNotes,
      userName: user.name,
      userPhone: user.phone,
      userLocation: {
        address: 'Market St & 7th St, Downtown, San Francisco, CA',
        lat: 37.7749,
        lng: -122.4194
      }
    });

    // Simulate mechanic response after 3.2 seconds
    setTimeout(() => {
      setAcceptedMechanic({
        garageName: initialGarage || 'Apex Auto Care & Diagnostics',
        mechanicName: 'David Miller',
        distance: '1.2 km',
        phone: '+1 555-4321',
        vehicle: 'Ford Transit Mobile Unit #12',
        eta: '8 mins'
      });
      setStage('ACCEPTED');
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col pb-24 md:pb-12">
      <UserNavbar />

      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div>
          <Link
            to="/user"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Request Emergency Mechanic
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Send high-priority GPS rescue signal to certified mobile mechanics and workshops nearby.
          </p>
        </div>

        {/* 1. FORM STAGE */}
        {stage === 'FORM' && (
          <div className="clean-card p-6 sm:p-7 space-y-6 border-slate-200 shadow-sm">
            {/* Question: What happened? */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                What happened to your vehicle?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {emergencyOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedOption === opt.name;

                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setSelectedOption(opt.name)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/60 text-orange-950 ring-2 ring-orange-100 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isSelected ? 'text-orange-600' : 'text-slate-400'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-xs sm:text-sm">{opt.name}</p>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-orange-600" />}
                        </div>
                        <p className="text-[11px] text-slate-500">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional details */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Additional Details (Optional)
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Near the main signal, hazard lights are turned on..."
                className="w-full clean-input px-3.5 py-2.5 text-xs sm:text-sm"
              />
            </div>

            {/* Current Location Display */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                Current Location (GPS Locked)
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                Market St & 7th St, Downtown, San Francisco, CA
              </p>
              <p className="text-[11px] text-slate-500">Auto-detected via high-precision device telemetry</p>
            </div>

            {/* Big Send Emergency Button */}
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="w-full btn-emergency py-4 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <AlertCircle className="w-5 h-5" />
              🚨 SEND EMERGENCY REQUEST
            </button>
          </div>
        )}

        {/* 2. SEARCHING STAGE */}
        {stage === 'SEARCHING' && (
          <div className="clean-card p-10 text-center space-y-6 border-slate-200 shadow-md animate-in fade-in duration-200">
            <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto animate-pulse-radar shadow-md">
              <AlertCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Searching for nearby mechanics...
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                Broadcasting your emergency request and live coordinates to mobile units and workshops in your area.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl inline-flex items-center gap-2 text-xs font-mono text-slate-700 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
              <span>Incident: <strong>{selectedOption}</strong></span>
            </div>
          </div>
        )}

        {/* 3. ACCEPTED STAGE (Live Ride-tracking screen) */}
        {stage === 'ACCEPTED' && acceptedMechanic && (
          <div className="clean-card p-6 sm:p-7 space-y-6 border-l-4 border-l-emerald-600 animate-in fade-in duration-200 shadow-md">
            {/* Acceptance Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 inline-flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Mechanic Accepted Your Request
                </span>
                <h2 className="text-xl font-black text-slate-900 font-heading">
                  {acceptedMechanic.garageName}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Assigned Master Tech: <strong>{acceptedMechanic.mechanicName}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right bg-indigo-50 px-3.5 py-2 rounded-xl border border-indigo-100 self-start sm:self-auto">
                <span className="text-[10px] text-slate-500 font-mono uppercase block font-bold">Estimated Arrival</span>
                <span className="text-xl font-black font-mono text-indigo-700">{acceptedMechanic.eta}</span>
              </div>
            </div>

            {/* Ride Tracking Map */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
                <span className="flex items-center gap-1 text-orange-700">📍 You (Stranded Location)</span>
                <span className="flex items-center gap-1 text-indigo-700">🔧 Mechanic (En Route)</span>
              </div>

              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative">
                <MapContainer
                  center={[37.7800, -122.4150]}
                  zoom={14}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={userCoords} icon={userPin}>
                    <Popup><div className="text-xs font-bold">📍 Your Vehicle Location</div></Popup>
                  </Marker>
                  <Marker position={mechanicCoords} icon={mechanicPin}>
                    <Popup><div className="text-xs font-bold">🔧 {acceptedMechanic.mechanicName}</div></Popup>
                  </Marker>
                  <Polyline positions={routePoints} color="#4F46E5" weight={5} dashArray="8, 8" />
                </MapContainer>

                <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                  <span>Live Dispatch Route Active</span>
                </div>
              </div>
            </div>

            {/* Status & Driver Card */}
            <div className="p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div>
                <p className="text-sm font-black text-indigo-950 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-indigo-600" />
                  Mechanic is on the way.
                </p>
                <p className="text-slate-600 mt-0.5">
                  Distance: <strong>{acceptedMechanic.distance}</strong> • Please turn on vehicle hazard lights.
                </p>
              </div>

              <a
                href={`tel:${acceptedMechanic.phone}`}
                className="btn-primary w-full sm:w-auto px-5 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                Call {acceptedMechanic.mechanicName.split(' ')[0]}
              </a>
            </div>
          </div>
        )}

        {/* CONFIRMATION DIALOG MODAL */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card p-6 sm:p-7 max-w-sm w-full space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-orange-600">
                <AlertCircle className="w-7 h-7 flex-shrink-0" />
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  Send Emergency Request?
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Send your current location and emergency request for <strong>"{selectedOption}"</strong> to certified mechanics nearby?
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="btn-secondary py-2.5 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSend}
                  className="btn-emergency py-2.5 text-xs font-bold shadow-xs"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmergencyPage;
