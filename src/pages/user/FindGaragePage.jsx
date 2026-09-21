import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { garageService, MOCK_GARAGES } from '../../services/garageService';
import { MapPin, Star, Phone, ArrowLeft, Eye, Wrench, X, Check } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const userLocationIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="background-color:#0284C7; width:28px; height:28px; border-radius:50%; border:3px solid #FFFFFF; box-shadow:0 0 10px rgba(2,132,199,0.5); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:12px;">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

const garageMarkerIcon = L.divIcon({
  className: 'custom-garage-marker',
  html: `<div style="background-color:#0F172A; width:30px; height:30px; border-radius:50%; border:2px solid #38BDF8; box-shadow:0 0 10px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:12px;">🔧</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

export const FindGaragePage = () => {
  const navigate = useNavigate();
  const garages = garageService.getNearbyGarages();
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [requestHelpModal, setRequestHelpModal] = useState(null);
  const [problemDescription, setProblemDescription] = useState('Routine inspection & assistance');

  const handleRequestHelp = (garage) => {
    setRequestHelpModal(garage);
  };

  const handleSendHelpRequest = (e) => {
    e.preventDefault();
    setRequestHelpModal(null);
    navigate(`/user/emergency?garage=${encodeURIComponent(requestHelpModal.name)}&notes=${encodeURIComponent(problemDescription)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20 md:pb-10">
      <UserNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/user"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-black text-slate-900 font-heading">
              Nearby Auto Garages
            </h1>
            <p className="text-xs text-slate-500">
              Verified workshops and mechanics near your current location.
            </p>
          </div>
          <span className="text-xs font-bold font-mono px-3 py-1 bg-sky-50 text-sky-700 rounded-lg">
            📍 GPS Active
          </span>
        </div>

        {/* Simple Map View */}
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

          {/* Floating Map Hint */}
          <div className="absolute top-3 right-3 z-[1000] bg-white/95 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-sm">
            📍 You: Market St • 4 Garages Nearby
          </div>
        </div>

        {/* Below Map: Simple Garage Cards */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            Garages List ({garages.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {garages.map((garage) => (
              <div
                key={garage.id}
                className={`clean-card p-5 space-y-4 flex flex-col justify-between ${
                  selectedGarage?.id === garage.id ? 'border-sky-500 ring-2 ring-sky-100' : ''
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        {garage.name}
                      </h3>
                      <p className="text-xs text-slate-500">{garage.address}</p>
                    </div>
                    <span className="text-xs font-bold font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded whitespace-nowrap">
                      {garage.distance}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {garage.rating}
                    </span>
                    <span className="text-slate-400">({garage.reviewsCount} reviews)</span>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                    {garage.services}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedGarage(garage)}
                    className="btn-secondary py-2 text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRequestHelp(garage)}
                    className="btn-primary py-2 text-xs font-bold flex items-center justify-center gap-1"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="clean-card p-6 max-w-sm w-full space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  {selectedGarage.name}
                </h3>
                <button
                  onClick={() => setSelectedGarage(null)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <p><strong>Mechanic:</strong> {selectedGarage.mechanicName}</p>
                <p><strong>Distance:</strong> {selectedGarage.distance}</p>
                <p><strong>Rating:</strong> ★ {selectedGarage.rating} ({selectedGarage.reviewsCount} ratings)</p>
                <p><strong>Address:</strong> {selectedGarage.address}</p>
                <p><strong>Services:</strong> {selectedGarage.services}</p>
                <p><strong>Phone:</strong> {selectedGarage.phone}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${selectedGarage.phone}`}
                  className="btn-secondary py-2 text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const g = selectedGarage;
                    setSelectedGarage(null);
                    handleRequestHelp(g);
                  }}
                  className="btn-primary py-2 text-xs font-bold"
                >
                  Request Help
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Request Help Confirmation Modal */}
        {requestHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="clean-card p-6 max-w-sm w-full space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Request Help from {requestHelpModal.name}
              </h3>
              <p className="text-xs text-slate-500">
                Send your current location and problem description to this garage.
              </p>

              <form onSubmit={handleSendHelpRequest} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Problem Description</label>
                  <input
                    type="text"
                    required
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    className="w-full clean-input px-3 py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRequestHelpModal(null)}
                    className="btn-secondary py-2 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary py-2 text-xs font-bold"
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
