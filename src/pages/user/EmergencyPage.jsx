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
  X
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

const userPin = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="background-color:#DC2626; width:28px; height:28px; border-radius:50%; border:3px solid #FFFFFF; box-shadow:0 0 10px rgba(220,38,38,0.5); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:12px;">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

const mechanicPin = L.divIcon({
  className: 'custom-mechanic-marker',
  html: `<div style="background-color:#0284C7; width:32px; height:32px; border-radius:50%; border:3px solid #38BDF8; box-shadow:0 0 12px rgba(2,132,199,0.5); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:14px;">🔧</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

export const EmergencyPage = () => {
  const [searchParams] = useSearchParams();
  const initialNotes = searchParams.get('notes') || '';
  const user = authService.getUser();

  // Screen states: 'FORM' | 'SEARCHING' | 'ACCEPTED'
  const [stage, setStage] = useState('FORM');
  const [selectedOption, setSelectedOption] = useState('Vehicle Breakdown');
  const [customNotes, setCustomNotes] = useState(initialNotes);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [acceptedMechanic, setAcceptedMechanic] = useState(null);

  const emergencyOptions = [
    'Vehicle Breakdown',
    'Flat Tyre',
    'Battery Problem',
    'Engine Problem',
    'Other'
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
        address: 'Market St & 7th St, Downtown',
        lat: 37.7749,
        lng: -122.4194
      }
    });

    // Simulate mechanic response after 3 seconds
    setTimeout(() => {
      setAcceptedMechanic({
        garageName: 'Apex Auto Care & Diagnostics',
        mechanicName: 'David Miller',
        distance: '1.2 km',
        phone: '+1 555-4321',
        eta: '8 mins'
      });
      setStage('ACCEPTED');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20 md:pb-10">
      <UserNavbar />

      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <Link
            to="/user"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-black text-slate-900 font-heading">
              Request Emergency Mechanic
            </h1>
          </div>
        </div>

        {/* 1. FORM STAGE */}
        {stage === 'FORM' && (
          <div className="clean-card p-6 sm:p-7 space-y-6">
            {/* Question: What happened? */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-900">
                What happened?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {emergencyOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between ${
                      selectedOption === opt
                        ? 'border-red-500 bg-red-50/50 text-red-700 ring-2 ring-red-100'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedOption === opt && (
                      <CheckCircle2 className="w-4 h-4 text-red-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional details */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Additional Details (Optional)
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Near the metro signal, car won't shift gear..."
                className="w-full clean-input px-3.5 py-2.5 text-xs sm:text-sm"
              />
            </div>

            {/* Current Location Display */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                Current Location
              </span>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                Market St & 7th St, Downtown, San Francisco, CA
              </p>
              <p className="text-[11px] text-slate-500">📍 High-accuracy GPS lock active</p>
            </div>

            {/* Big Send Emergency Button */}
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="w-full btn-emergency py-4 text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <AlertCircle className="w-5 h-5" />
              🚨 SEND EMERGENCY REQUEST
            </button>
          </div>
        )}

        {/* 2. SEARCHING STAGE */}
        {stage === 'SEARCHING' && (
          <div className="clean-card p-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto animate-pulse">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Searching for nearby mechanics...
              </h2>
              <p className="text-xs text-slate-500">
                Broadcasting your emergency request and location to certified workshops within 5 km.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl inline-block text-xs font-mono text-slate-600">
              Selected Issue: <strong>{selectedOption}</strong>
            </div>
          </div>
        )}

        {/* 3. ACCEPTED STAGE (Live Ride-tracking style) */}
        {stage === 'ACCEPTED' && acceptedMechanic && (
          <div className="clean-card p-6 sm:p-7 space-y-6 border-l-4 border-l-emerald-600 animate-in fade-in duration-200">
            {/* Acceptance Banner */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mechanic Accepted Your Request
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  {acceptedMechanic.garageName}
                </h2>
                <p className="text-xs text-slate-500">Mechanic: {acceptedMechanic.mechanicName}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-mono block">Estimated Arrival</span>
                <span className="text-lg font-black font-mono text-sky-700">{acceptedMechanic.eta}</span>
              </div>
            </div>

            {/* Simple Map with User + Mechanic + Route */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">📍 User Location (You)</span>
                <span className="flex items-center gap-1">🔧 Mechanic Location</span>
              </div>

              <div className="h-64 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                <MapContainer
                  center={[37.7800, -122.4150]}
                  zoom={14}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={userCoords} icon={userPin}>
                    <Popup><div className="text-xs font-bold">📍 Your Location</div></Popup>
                  </Marker>
                  <Marker position={mechanicCoords} icon={mechanicPin}>
                    <Popup><div className="text-xs font-bold">🔧 {acceptedMechanic.mechanicName}</div></Popup>
                  </Marker>
                  <Polyline positions={routePoints} color="#0284C7" weight={4} dashArray="6, 8" />
                </MapContainer>
              </div>
            </div>

            {/* Status Strip */}
            <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-sky-900 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-sky-600" />
                  Mechanic is on the way.
                </p>
                <p className="text-slate-600 mt-0.5">
                  Distance: {acceptedMechanic.distance} • Turn on hazard lights if on roadside.
                </p>
              </div>

              <a
                href={`tel:${acceptedMechanic.phone}`}
                className="btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Mechanic
              </a>
            </div>
          </div>
        )}

        {/* CONFIRMATION DIALOG MODAL */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="clean-card p-6 max-w-sm w-full space-y-4 shadow-xl">
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Confirm Emergency Request
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Send your location and emergency request for <strong>"{selectedOption}"</strong> to nearby mechanics?
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="btn-secondary py-2 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSend}
                  className="btn-emergency py-2 text-xs font-bold"
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
