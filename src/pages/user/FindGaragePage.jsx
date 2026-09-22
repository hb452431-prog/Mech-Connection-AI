import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import MechMap from '../../components/map/MechMap';
import { useUserLocation } from '../../hooks/useUserLocation';
import { getGaragesWithDistance, generateGaragesNearLocation, BASE_DEMO_GARAGES } from '../../data/demoGarages';
import { 
  MapPin, 
  Star, 
  Phone, 
  ArrowLeft, 
  Eye, 
  Wrench, 
  X, 
  ShieldCheck, 
  Clock, 
  Navigation,
  Compass,
  AlertCircle,
  Radio,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SirenBadge, SirenLight } from '../../components/common/SirenLight';

export const FindGaragePage = () => {
  const navigate = useNavigate();
  const {
    location: userLocation,
    loading: isLocating,
    error: locationError,
    requestLocation,
    setManualLocation
  } = useUserLocation(false);

  const [filter, setFilter] = useState('all'); // 'all' | 'closest' | '247'
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [requestHelpModal, setRequestHelpModal] = useState(null);
  const [problemType, setProblemType] = useState('Battery Problem');
  const [problemNotes, setProblemNotes] = useState('');
  const [garages, setGarages] = useState(BASE_DEMO_GARAGES);

  // When user location is available or manual coordinates change, generate nearby garages
  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      const nearby = generateGaragesNearLocation(userLocation.lat, userLocation.lng, 8);
      setGarages(nearby);
    } else {
      setGarages(BASE_DEMO_GARAGES);
    }
  }, [userLocation]);

  // Filter garages
  const filteredGarages = garages.filter((g) => {
    if (filter === 'closest') {
      const dist = g.distanceKm || parseFloat(g.distance) || 3.0;
      return dist <= 3.0;
    }
    if (filter === '247') {
      const text = Array.isArray(g.services) ? g.services.join(' ') : (g.services || '');
      return text.toLowerCase().includes('24/7') || text.toLowerCase().includes('emergency');
    }
    return true;
  });

  const handleSelectGarage = (garage) => {
    setSelectedGarage(garage);
  };

  const handleRequestHelp = (garage) => {
    setRequestHelpModal(garage);
  };

  const handleSendHelpRequest = (e) => {
    e.preventDefault();
    const targetGarage = requestHelpModal;
    setRequestHelpModal(null);
    navigate(
      `/user/emergency?garage=${encodeURIComponent(targetGarage.name)}&notes=${encodeURIComponent(
        problemNotes || problemType
      )}&type=${encodeURIComponent(problemType)}`
    );
  };

  const handleLocationSearchSelect = (lat, lng, name) => {
    setManualLocation(lat, lng, name);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <UserNavbar />

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <Link
              to="/user"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
                Find Nearby Garage
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                WORLD MAP DEMO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live interactive map to locate certified mechanics and workshops near you or anywhere in the world.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-bold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              All ({garages.length})
            </button>
            <button
              onClick={() => setFilter('closest')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'closest' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              &lt; 3 km
            </button>
            <button
              onClick={() => setFilter('247')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === '247' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              24/7 Roadside
            </button>
          </div>
        </div>

        {/* Master Interactive Map Container */}
        <div className="space-y-2">
          <MechMap
            userLocation={userLocation}
            garages={filteredGarages}
            selectedGarage={selectedGarage}
            onSelectGarage={handleSelectGarage}
            onLocate={requestLocation}
            isLocating={isLocating}
            locationError={locationError}
            onSelectLocation={handleLocationSearchSelect}
            onRequestHelp={handleRequestHelp}
            height="440px"
          />

          {/* Quick Helper Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span>📍 You (GPS)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-slate-100" />
                <span>🔧 Certified Garage</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              💡 Tip: Click any garage marker on the map to view instant service details or dispatch aid.
            </span>
          </div>
        </div>

        {/* Garages List Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-heading">
                Available Mechanics & Garages ({filteredGarages.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {userLocation
                  ? 'Showing verified workshops sorted by proximity to your detected GPS location.'
                  : 'Showing global demo network. Click "Use My Location" (⌖) on the map to find workshops near you.'}
              </p>
            </div>
            <span className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Live Online
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGarages.map((garage) => {
              const isSelected = selectedGarage?.id === garage.id;

              return (
                <div
                  key={garage.id}
                  className={`clean-card p-5 space-y-3 flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 ring-2 ring-indigo-100 dark:ring-indigo-900/60 shadow-lg bg-indigo-50/20 dark:bg-indigo-950/30'
                      : 'hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedGarage(garage)}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-heading line-clamp-1">
                            {garage.name}
                          </h3>
                          <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{garage.address}</p>
                      </div>

                      <span className="text-xs font-bold font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-lg whitespace-nowrap border border-indigo-100 dark:border-indigo-800 flex-shrink-0">
                        {garage.distance || `${garage.distanceKm || 2.4} km`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800 font-mono text-[11px]">
                        <Star className="w-3 h-3 fill-current" />
                        {garage.rating || 4.8}
                        <span className="text-slate-400 dark:text-slate-500 font-normal">({garage.reviewsCount || 120})</span>
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Lead Tech: <strong className="text-slate-800 dark:text-slate-200">{garage.mechanicName || 'Master Tech'}</strong>
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/70 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="text-[9px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 block mb-0.5">Specialty:</span>
                      <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                        {garage.specialty || (Array.isArray(garage.services) ? garage.services.join(' • ') : garage.services)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGarage(garage);
                      }}
                      className="btn-secondary py-2 text-xs font-bold flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestHelp(garage);
                      }}
                      className="btn-primary py-2 text-xs font-bold flex items-center justify-center gap-1 shadow-xs"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      Request Help
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View Garage Details Modal */}
        {selectedGarage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    🔧
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                      {selectedGarage.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{selectedGarage.address}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGarage(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/70 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-2">
                  <span><strong>Master Mechanic:</strong></span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedGarage.mechanicName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-2">
                  <span><strong>Estimated Distance:</strong></span>
                  <span className="font-bold font-mono text-indigo-700 dark:text-indigo-300">{selectedGarage.distance || `${selectedGarage.distanceKm || 2.1} km`}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-2">
                  <span><strong>Customer Rating:</strong></span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">★ {selectedGarage.rating} ({selectedGarage.reviewsCount || 140} reviews)</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Services Offered:</span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {Array.isArray(selectedGarage.services) ? selectedGarage.services.join(' • ') : selectedGarage.services}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${selectedGarage.phone}`}
                  className="btn-secondary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Call Garage
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const g = selectedGarage;
                    setSelectedGarage(null);
                    handleRequestHelp(g);
                  }}
                  className="btn-emergency py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <SirenLight size="xs" variant="sticker" animated={true} />
                  <span>Request Help</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Request Help Modal */}
        {requestHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <SirenLight size="sm" variant="sticker" animated={true} />
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white font-heading">
                      Request Help from {requestHelpModal.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Tech: {requestHelpModal.mechanicName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setRequestHelpModal(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                Send your live coordinates and problem details to dispatch this mobile technician immediately.
              </p>

              <form onSubmit={handleSendHelpRequest} className="space-y-3.5 text-xs">
                {/* Problem selector */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 dark:text-slate-300">Select Vehicle Problem:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Battery Problem',
                      'Flat Tyre',
                      'Engine Problem',
                      'Vehicle Not Starting',
                      'Lockout / Keys',
                      'Other Issue'
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProblemType(type)}
                        className={`p-2 rounded-xl border text-left transition-all font-medium text-xs ${
                          problemType === type
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/60 text-orange-950 dark:text-orange-200 font-bold ring-1 ring-orange-200 dark:ring-orange-800'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700 dark:text-slate-300">Additional Notes (Optional):</label>
                  <input
                    type="text"
                    value={problemNotes}
                    onChange={(e) => setProblemNotes(e.target.value)}
                    placeholder="e.g., Car is parked next to gas station..."
                    className="w-full clean-input px-3 py-2 text-xs"
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
                    className="btn-emergency py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <SirenLight size="xs" variant="sticker" animated={false} />
                    <span>Send Request</span>
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
