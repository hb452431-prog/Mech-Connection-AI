import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { garageService, MOCK_GARAGES } from '../../services/garageService';
import { MapPin, Star, Phone, ArrowLeft, Eye, Wrench, X, Check, ShieldCheck, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const userLocationIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="background-color:#0284C7; width:28px; height:28px; border-radius:50%; border:3px solid #FFFFFF; box-shadow:0 0 12px rgba(2,132,199,0.6); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:12px;">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

const garageMarkerIcon = L.divIcon({
  className: 'custom-garage-marker',
  html: `<div style="background-color:#0F172A; width:32px; height:32px; border-radius:50%; border:2px solid #38BDF8; box-shadow:0 0 12px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:14px;">🔧</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

export const FindGaragePage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all' | 'closest' | '247'
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [requestHelpModal, setRequestHelpModal] = useState(null);
  const [problemDescription, setProblemDescription] = useState('Vehicle needs inspection and repair');

  const garages = garageService.getNearbyGarages().filter((g) => {
    if (filter === 'closest') return parseFloat(g.distance) <= 2.0;
    if (filter === '247') return g.services.toLowerCase().includes('24/7');
    return true;
  });

  const handleRequestHelp = (garage) => {
    setRequestHelpModal(garage);
  };

  const handleSendHelpRequest = (e) => {
    e.preventDefault();
    setRequestHelpModal(null);
    navigate(`/user/emergency?garage=${encodeURIComponent(requestHelpModal.name)}&notes=${encodeURIComponent(problemDescription)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-12">
      <UserNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <Link
              to="/user"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Find Nearby Garage
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Verified auto mechanics and repair centers near your current GPS location.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white p-1 rounded-xl border border-slate-200 shadow-xs text-xs font-bold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'all' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              All ({MOCK_GARAGES.length})
            </button>
            <button
              onClick={() => setFilter('closest')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'closest' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              &lt; 2 km
            </button>
            <button
              onClick={() => setFilter('247')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === '247' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              24/7 Roadside
            </button>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="clean-card overflow-hidden h-72 sm:h-80 border border-slate-200 relative shadow-sm">
          <MapContainer
            center={[37.7749, -122.4194]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* User Marker */}
            <Marker position={[37.7749, -122.4194]} icon={userLocationIcon}>
              <Popup>
                <div className="text-xs font-bold text-slate-900">
                  📍 Your Location (Current)
                </div>
              </Popup>
            </Marker>

            {/* Garage Markers */}
            {garages.map((g) => (
              <Marker
                key={g.id}
                position={[g.lat, g.lng]}
                icon={garageMarkerIcon}
                eventHandlers={{
                  click: () => setSelectedGarage(g)
                }}
              >
                <Popup>
                  <div className="text-xs text-slate-900">
                    <strong className="block font-bold">{g.name}</strong>
                    <p className="text-slate-600">{g.distance} • ★ {g.rating}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Floating Map HUD */}
          <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>GPS: Market St • {garages.length} Workshops Online</span>
          </div>
        </div>

        {/* Garages List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
              Available Mechanics ({garages.length})
            </h2>
            <span className="text-xs text-slate-500 font-medium">Click a garage to view or request help</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {garages.map((garage) => (
              <div
                key={garage.id}
                className={`clean-card p-5 space-y-4 flex flex-col justify-between transition-all ${
                  selectedGarage?.id === garage.id ? 'border-sky-500 ring-2 ring-sky-100 shadow-md' : ''
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-slate-900 font-heading">
                          {garage.name}
                        </h3>
                        <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500">{garage.address}</p>
                    </div>
                    <span className="text-xs font-bold font-mono text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg whitespace-nowrap border border-sky-100">
                      {garage.distance}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {garage.rating}
                    </span>
                    <span className="text-slate-400">({garage.reviewsCount} reviews)</span>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
                    {garage.services}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedGarage(garage)}
                    className="btn-secondary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRequestHelp(garage)}
                    className="btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    Request Help
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Garage Details Modal */}
        {selectedGarage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card p-6 max-w-sm w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-sky-600" />
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {selectedGarage.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedGarage(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-2.5 bg-slate-50 rounded-xl space-y-1">
                  <p><strong>Master Mechanic:</strong> {selectedGarage.mechanicName}</p>
                  <p><strong>Distance from you:</strong> {selectedGarage.distance}</p>
                  <p><strong>Customer Rating:</strong> ★ {selectedGarage.rating} ({selectedGarage.reviewsCount} verified reviews)</p>
                  <p><strong>Address:</strong> {selectedGarage.address}</p>
                  <p><strong>Services:</strong> {selectedGarage.services}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${selectedGarage.phone}`}
                  className="btn-secondary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-600" />
                  Call Garage
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const g = selectedGarage;
                    setSelectedGarage(null);
                    handleRequestHelp(g);
                  }}
                  className="btn-primary py-2.5 text-xs font-bold"
                >
                  Request Help
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Request Help Modal */}
        {requestHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card p-6 max-w-sm w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Request Help from {requestHelpModal.name}
                </h3>
                <button
                  onClick={() => setRequestHelpModal(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Send your current location and problem description directly to this workshop.
              </p>

              <form onSubmit={handleSendHelpRequest} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Problem Description</label>
                  <input
                    type="text"
                    required
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    className="w-full clean-input px-3.5 py-2.5 text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRequestHelpModal(null)}
                    className="btn-secondary py-2.5 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary py-2.5 text-xs font-bold"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FindGaragePage;
