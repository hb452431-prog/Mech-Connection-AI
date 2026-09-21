import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import confetti from 'canvas-confetti';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Wrench, 
  Calendar, 
  Clock, 
  DollarSign, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Navigation, 
  PhoneCall, 
  Award,
  Sparkles
} from 'lucide-react';
import { mechanicService } from '../services/mechanicService';
import { MOCK_MECHANICS, MOCK_VEHICLES } from '../services/mockData';
import { useToast } from '../context/ToastContext';

// Custom Map Marker Icon
const mechanicShopIcon = L.divIcon({
  className: 'custom-mechanic-marker',
  html: `<div style="background-color:#0284C7; width:32px; height:32px; border-radius:50%; border:3px solid #38BDF8; box-shadow:0 0 15px rgba(2,132,199,0.8); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:14px;">
          🔧
        </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

export const MechanicsPage = () => {
  const [searchParams] = useSearchParams();
  const initialSelectedId = searchParams.get('selected');
  const serviceQuery = searchParams.get('service') || '';
  const shouldOpenBooking = searchParams.get('book') === 'true';
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState(serviceQuery);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [is247Only, setIs247Only] = useState(false);
  const [isMobileOnly, setIsMobileOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'distance' | 'price'
  
  const [mechanicsList, setMechanicsList] = useState(MOCK_MECHANICS);
  const [selectedMechanic, setSelectedMechanic] = useState(MOCK_MECHANICS[0]);
  
  // Modal states
  const [bookingModalOpen, setBookingModalOpen] = useState(shouldOpenBooking);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Booking form state
  const [bookingService, setBookingService] = useState(selectedMechanic?.services[0]?.name || 'Full AI Diagnostic & OBD-II Scan');
  const [bookingDate, setBookingDate] = useState('2026-09-24');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingVehicle, setBookingVehicle] = useState('2023 Tesla Model Y');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  useEffect(() => {
    const filtered = mechanicService.getAllMechanics({
      search: searchQuery,
      specialty: selectedSpecialty,
      is247Only,
      isMobileOnly,
      sortBy
    });
    setMechanicsList(filtered);

    if (initialSelectedId) {
      const match = MOCK_MECHANICS.find((m) => m.id === initialSelectedId);
      if (match) setSelectedMechanic(match);
    }
  }, [searchQuery, selectedSpecialty, is247Only, isMobileOnly, sortBy, initialSelectedId]);

  const handleOpenBooking = (mech) => {
    setSelectedMechanic(mech);
    setBookingService(mech.services[0]?.name || 'Full AI Diagnostic');
    setBookingModalOpen(true);
  };

  const handleOpenProfile = (mech) => {
    setSelectedMechanic(mech);
    setProfileModalOpen(true);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    try {
      const selectedSrv = selectedMechanic.services.find((s) => s.name === bookingService) || selectedMechanic.services[0];
      await mechanicService.createBooking({
        mechanicId: selectedMechanic.id,
        mechanicName: selectedMechanic.name,
        mechanicAddress: selectedMechanic.address,
        serviceName: bookingService,
        date: bookingDate,
        timeSlot: bookingTime,
        vehicleName: bookingVehicle,
        estimatedTotal: selectedSrv.price
      });

      setBookingModalOpen(false);
      showToast(`Appointment confirmed with ${selectedMechanic.name}!`, 'success');
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.5 } });
    } catch (err) {
      showToast('Error booking appointment', 'error');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <div className="py-10 bg-navy-950 min-h-screen">
      <div className="container-custom">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 font-mono">
              <MapPin className="w-3.5 h-3.5" />
              Verified Workshop & Mobile Network
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
              Certified Mechanics Directory
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Search vetted master technicians, view certifications, and book appointments with fair pricing guarantee.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Showing <strong className="text-cyan-400">{mechanicsList.length}</strong> certified centers
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel p-4 rounded-2xl mb-8 space-y-4 border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by shop name, address, or service (e.g. Brakes, EV, Transmission)..."
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500"
              />
            </div>

            {/* Specialty Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full glass-input px-3 py-2.5 rounded-xl text-xs sm:text-sm text-white"
              >
                <option value="all" className="bg-slate-900">All Specialties</option>
                <option value="ev" className="bg-slate-900">EV & Hybrid Specialists</option>
                <option value="engine" className="bg-slate-900">Engine & Diagnostics</option>
                <option value="brake" className="bg-slate-900">Brakes & Suspension</option>
                <option value="transmission" className="bg-slate-900">Transmissions</option>
                <option value="german" className="bg-slate-900">German / European Imports</option>
              </select>
            </div>

            {/* Sort By Dropdown */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full glass-input px-3 py-2.5 rounded-xl text-xs sm:text-sm text-white"
              >
                <option value="rating" className="bg-slate-900">Sort: Highest Rated</option>
                <option value="distance" className="bg-slate-900">Sort: Closest Distance</option>
                <option value="price" className="bg-slate-900">Sort: Lowest Hourly Rate</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="md:col-span-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setIs247Only(!is247Only)}
                className={`w-1/2 py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                  is247Only
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                24/7 Only
              </button>

              <button
                type="button"
                onClick={() => setIsMobileOnly(!isMobileOnly)}
                className={`w-1/2 py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                  isMobileOnly
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Mobile Only
              </button>
            </div>
          </div>
        </div>

        {/* Split Screen Layout: List on Left, Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Filterable Mechanics Cards */}
          <div className="lg:col-span-7 space-y-4">
            {mechanicsList.length === 0 ? (
              <div className="glass-panel rounded-3xl p-12 text-center space-y-3">
                <Wrench className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-white">No Mechanics Matching Filters</h4>
                <p className="text-xs text-slate-400">Try resetting search keywords or selecting All Specialties.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialty('all');
                    setIs247Only(false);
                    setIsMobileOnly(false);
                  }}
                  className="btn-primary-glow px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              mechanicsList.map((mech) => (
                <div
                  key={mech.id}
                  className={`glass-card p-5 transition-all ${
                    selectedMechanic?.id === mech.id
                      ? 'border-cyan-400 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={mech.image}
                        alt={mech.name}
                        className="w-20 h-20 rounded-2xl object-cover border border-slate-700 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-white font-heading">{mech.name}</h3>
                          {mech.verifiedBadge && (
                            <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mb-2">{mech.address}</p>

                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{mech.rating}</span>
                            <span className="text-slate-400 font-normal">({mech.reviewCount})</span>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-cyan-300 font-mono bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20">
                            <Navigation className="w-3 h-3" />
                            <span>{mech.distanceKm} km away</span>
                          </div>

                          {mech.isOpen247 && (
                            <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              24/7 Available
                            </span>
                          )}

                          {mech.isMobileUnit && (
                            <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                              Mobile Van Unit
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800 flex sm:flex-col justify-between items-center sm:items-end">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Labor Rate</span>
                        <span className="text-lg font-black text-white font-mono">${mech.hourlyRate}/hr</span>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => handleOpenProfile(mech)}
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                        >
                          Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenBooking(mech)}
                          className="btn-primary-glow px-4 py-2 rounded-xl text-xs font-bold"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Specialties Pills */}
                  <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {mech.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono">
                      ~{mech.responseTimeMins} mins response
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Interactive Leaflet Map View */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl overflow-hidden border border-slate-800 h-[560px] shadow-2xl relative">
              <MapContainer
                center={[37.7749, -122.4194]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {mechanicsList.map((m) => (
                  <Marker
                    key={m.id}
                    position={[m.lat, m.lng]}
                    icon={mechanicShopIcon}
                    eventHandlers={{
                      click: () => setSelectedMechanic(m)
                    }}
                  >
                    <Popup>
                      <div className="p-1 space-y-1 text-slate-900">
                        <strong className="text-xs font-bold block">{m.name}</strong>
                        <p className="text-[11px] text-slate-600">{m.address}</p>
                        <p className="text-[11px] text-cyan-800 font-bold font-mono">★ {m.rating} • ${m.hourlyRate}/hr</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* Floating Map Legend HUD */}
              <div className="absolute top-4 left-4 z-[1000] bg-navy-950/90 border border-slate-700/80 backdrop-blur-md rounded-2xl p-3 shadow-xl text-xs">
                <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Interactive Map Radar</span>
                </div>
                <p className="text-[11px] text-slate-400">Click any marker to view workshop</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOOKING APPOINTMENT MODAL */}
        {bookingModalOpen && selectedMechanic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 max-w-lg w-full border-cyan-500/40 relative max-h-[90vh] overflow-y-auto space-y-5">
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <img
                  src={selectedMechanic.image}
                  alt={selectedMechanic.name}
                  className="w-12 h-12 rounded-xl object-cover border border-cyan-400"
                />
                <div>
                  <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold">Schedule Appointment</span>
                  <h3 className="text-lg font-bold text-white font-heading">{selectedMechanic.name}</h3>
                </div>
              </div>

              <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                {/* 1. Service Selection */}
                <div>
                  <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">
                    1. Select Service Package
                  </label>
                  <select
                    value={bookingService}
                    onChange={(e) => setBookingService(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white"
                  >
                    {selectedMechanic.services.map((srv, idx) => (
                      <option key={idx} value={srv.name} className="bg-slate-900">
                        {srv.name} — ${srv.price} ({srv.duration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">
                      2. Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">
                      3. Time Slot
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white"
                    >
                      <option value="09:00 AM" className="bg-slate-900">09:00 AM</option>
                      <option value="10:30 AM" className="bg-slate-900">10:30 AM</option>
                      <option value="01:00 PM" className="bg-slate-900">01:00 PM</option>
                      <option value="03:30 PM" className="bg-slate-900">03:30 PM</option>
                      <option value="05:00 PM" className="bg-slate-900">05:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* 3. Vehicle */}
                <div>
                  <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">
                    4. Target Vehicle
                  </label>
                  <select
                    value={bookingVehicle}
                    onChange={(e) => setBookingVehicle(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white"
                  >
                    {MOCK_VEHICLES.map((v) => (
                      <option key={v.id} value={`${v.year} ${v.make} ${v.model}`} className="bg-slate-900">
                        {v.year} {v.make} {v.model} ({v.licensePlate})
                      </option>
                    ))}
                    <option value="Custom Vehicle" className="bg-slate-900">+ Other Vehicle</option>
                  </select>
                </div>

                {/* Pricing Summary */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Selected Service:</span>
                    <strong className="text-white">{bookingService}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Labor Rate / Estimate:</span>
                    <strong className="text-cyan-400 font-mono">
                      ${selectedMechanic.services.find((s) => s.name === bookingService)?.price || 65}
                    </strong>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="w-full btn-primary-glow py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm & Reserve Appointment
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MECHANIC PROFILE DEEP DIVE MODAL */}
        {profileModalOpen && selectedMechanic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 max-w-2xl w-full border-cyan-500/40 relative max-h-[90vh] overflow-y-auto space-y-6">
              <button
                onClick={() => setProfileModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={selectedMechanic.image}
                  alt={selectedMechanic.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-cyan-400 flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white font-heading">{selectedMechanic.name}</h3>
                    {selectedMechanic.verifiedBadge && (
                      <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{selectedMechanic.owner}</p>
                  <p className="text-xs text-slate-400">{selectedMechanic.address}</p>

                  <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                    <span className="text-amber-400 font-bold">★ {selectedMechanic.rating} ({selectedMechanic.reviewCount} reviews)</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">{selectedMechanic.experienceYears} Years in Business</span>
                  </div>
                </div>
              </div>

              {/* Verified Certifications */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase font-mono">
                  Master Certifications & Standards
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMechanic.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Price List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase font-mono">
                  Available Service Menu & Fixed Pricing
                </h4>
                <div className="space-y-1.5">
                  {selectedMechanic.services.map((srv, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                    >
                      <div>
                        <p className="font-bold text-white">{srv.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">Duration: ~{srv.duration}</p>
                      </div>
                      <span className="text-sm font-black text-cyan-400 font-mono">${srv.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`tel:${selectedMechanic.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {selectedMechanic.phone}
                </a>

                <button
                  onClick={() => {
                    setProfileModalOpen(false);
                    handleOpenBooking(selectedMechanic);
                  }}
                  className="btn-primary-glow px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Book Service Slot
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MechanicsPage;
