import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import MechMap from '../../components/map/MechMap';
import { emergencyService } from '../../services/emergencyService';
import { authService } from '../../services/authService';
import { routingService } from '../../services/routingService';
import { useLocation } from '../../hooks/useLocation';
import LocationStatusBar from '../../components/common/LocationStatusBar';
import LocationPermissionModal from '../../components/common/LocationPermissionModal';
import { calculateDistanceKm, calculateETA, formatDistance } from '../../utils/distance';
import { SirenLight, SirenBadge } from '../../components/common/SirenLight';
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
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';

export const EmergencyPage = () => {
  const [searchParams] = useSearchParams();
  const initialNotes = searchParams.get('notes') || '';
  const initialGarage = searchParams.get('garage') || '';
  const initialType = searchParams.get('type') || 'Vehicle Breakdown';
  const user = authService.getUser() || {};

  const {
    location: userCoords,
    accuracy,
    loading: isLocating,
    error: locationError,
    permission,
    supported,
    tracking,
    isManual,
    deviceInfo,
    requestLocation,
    setManualLocation,
    useFallbackLocation
  } = useLocation({ autoRequest: true, enableHighAccuracy: true, watch: true });

  const [showPermissionModal, setShowPermissionModal] = useState(false);

  // Screen stages: 'FORM' | 'SEARCHING' | 'ACCEPTED'
  const [stage, setStage] = useState('FORM');
  const [selectedOption, setSelectedOption] = useState(initialType);
  const [customNotes, setCustomNotes] = useState(
    initialNotes ? `${initialGarage ? `Request for ${initialGarage}: ` : ''}${initialNotes}` : ''
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [acceptedMechanic, setAcceptedMechanic] = useState(null);

  // Route and live mechanic movement state
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [mechanicCurrentPos, setMechanicCurrentPos] = useState(null);
  const [routeIndex, setRouteIndex] = useState(0);
  const [liveDistance, setLiveDistance] = useState('1.8 km');
  const [liveETA, setLiveETA] = useState('6 mins');
  const [isSimulatingMovement, setIsSimulatingMovement] = useState(false);

  const simulationIntervalRef = useRef(null);

  const emergencyOptions = [
    { name: 'Vehicle Breakdown', icon: Car, desc: 'Car stalled or won\'t move' },
    { name: 'Flat Tyre', icon: Disc, desc: 'Puncture or wheel damage' },
    { name: 'Battery Problem', icon: BatteryCharging, desc: 'Dead battery / jumpstart needed' },
    { name: 'Engine Problem', icon: Flame, desc: 'Smoke, overheating, or noise' },
    { name: 'Other', icon: HelpCircle, desc: 'Lockout, fuel, or general aid' }
  ];

  // Auto-prompt permission dialog if location is unknown/prompt and not yet granted on emergency page
  useEffect(() => {
    if (permission === 'prompt' || permission === 'denied' || permission === 'blocked' || permission === 'disabled') {
      // Don't auto-open repeatedly if dismissed, but make it available
    }
  }, [permission]);

  // Confirm and send emergency request
  const handleConfirmSend = async () => {
    setShowConfirmModal(false);
    setStage('SEARCHING');

    // Create request in local service
    await emergencyService.createRequest({
      problemType: selectedOption,
      notes: customNotes,
      userName: user.name || 'John Doe',
      userPhone: user.phone || '+1 555-0199',
      userLocation: {
        address: userCoords.address || 'Detected GPS Location',
        lat: userCoords.lat,
        lng: userCoords.lng
      }
    });

    // Mechanic initial starting coordinates (~2 km north-east of user)
    const mechanicOrigin = {
      lat: userCoords.lat + 0.018,
      lng: userCoords.lng + 0.014
    };

    // Calculate initial route using OSRM
    const routeData = await routingService.getRoute(
      mechanicOrigin.lat,
      mechanicOrigin.lng,
      userCoords.lat,
      userCoords.lng
    );

    // Simulate mechanic response after 2.8 seconds
    setTimeout(() => {
      const coords = routeData?.coordinates || [
        [mechanicOrigin.lat, mechanicOrigin.lng],
        [userCoords.lat + 0.009, userCoords.lng + 0.007],
        [userCoords.lat, userCoords.lng]
      ];

      const initialDist = routeData?.distanceFormatted || '1.8 km';
      const initialEta = routeData?.durationFormatted || '6 mins';

      setRouteCoordinates(coords);
      setMechanicCurrentPos(mechanicOrigin);
      setRouteIndex(0);
      setLiveDistance(initialDist);
      setLiveETA(initialEta);

      setAcceptedMechanic({
        garageName: initialGarage || 'Apex Auto Care & Diagnostics',
        mechanicName: 'David Miller',
        distance: initialDist,
        phone: '+1 555-4321',
        vehicle: 'Ford Transit Mobile Unit #12',
        eta: initialEta,
        origin: mechanicOrigin
      });

      setStage('ACCEPTED');
      setIsSimulatingMovement(true);
    }, 2800);
  };

  // Demo Live Movement Simulation Effect
  useEffect(() => {
    if (stage !== 'ACCEPTED' || !isSimulatingMovement || !routeCoordinates || routeCoordinates.length === 0) {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
      return;
    }

    simulationIntervalRef.current = setInterval(() => {
      setRouteIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= routeCoordinates.length) {
          // Reached destination!
          setMechanicCurrentPos({
            lat: userCoords.lat,
            lng: userCoords.lng
          });
          setLiveDistance('Arrived (0 m)');
          setLiveETA('Arrived!');
          setIsSimulatingMovement(false);
          return prevIndex;
        }

        const nextPoint = routeCoordinates[nextIndex];
        setMechanicCurrentPos({
          lat: nextPoint[0],
          lng: nextPoint[1]
        });

        // Compute remaining distance & ETA to user
        const remainingKm = calculateDistanceKm(
          nextPoint[0],
          nextPoint[1],
          userCoords.lat,
          userCoords.lng
        );
        setLiveDistance(formatDistance(remainingKm));
        setLiveETA(calculateETA(remainingKm));

        return nextIndex;
      });
    }, 1600);

    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, [stage, isSimulatingMovement, routeCoordinates, userCoords]);

  // Restart movement simulation
  const handleRestartSimulation = () => {
    if (!acceptedMechanic || !routeCoordinates || routeCoordinates.length === 0) return;
    setRouteIndex(0);
    setMechanicCurrentPos(acceptedMechanic.origin);
    const totalDist = calculateDistanceKm(
      acceptedMechanic.origin.lat,
      acceptedMechanic.origin.lng,
      userCoords.lat,
      userCoords.lng
    );
    setLiveDistance(formatDistance(totalDist));
    setLiveETA(calculateETA(totalDist));
    setIsSimulatingMovement(true);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <UserNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div>
          <Link
            to="/user"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950 border border-orange-200 dark:border-orange-800 flex items-center justify-center flex-shrink-0 shadow-xs">
              <SirenLight size="md" variant="ambulance" animated={true} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
                Request Emergency Mechanic
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Send high-priority GPS rescue signal to certified mobile mechanics and workshops nearby.
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Production Location Status & Telemetry Bar */}
        <LocationStatusBar
          location={userCoords}
          accuracy={accuracy}
          loading={isLocating}
          error={locationError}
          permission={permission}
          tracking={tracking}
          isManual={isManual}
          onRefreshLocation={() => requestLocation({ forceFresh: true })}
          onRequestPermission={() => setShowPermissionModal(true)}
          onOpenHubModal={() => setShowPermissionModal(true)}
        />

        {/* 1. FORM STAGE */}
        {stage === 'FORM' && (
          <div className="clean-card emergency-card-active p-6 sm:p-7 space-y-6 shadow-md rounded-2xl">
            {/* Question: What happened? */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                  What happened to your vehicle?
                </label>
                <SirenBadge text="Live Network" liveStatus="Ready" size="xs" />
              </div>

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
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/60 text-orange-950 dark:text-orange-200 ring-2 ring-orange-200 dark:ring-orange-800 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-xs sm:text-sm">{opt.name}</p>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional details */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
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

            {/* Current Location Display with Mini Map preview */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase font-mono">
                  Current Location (GPS Locked)
                </span>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  ● Telemetry Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                {userCoords.address || 'Market St & 7th St, Downtown, San Francisco, CA'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Coordinates: {userCoords.lat.toFixed(4)}, {userCoords.lng.toFixed(4)}
              </p>
            </div>

            {/* Big Send Emergency Button */}
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="w-full btn-emergency py-4 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg group"
            >
              <SirenLight size="sm" variant="sticker" animated={true} />
              <span className="drop-shadow-xs font-black">DISPATCH EMERGENCY MECHANIC</span>
            </button>
          </div>
        )}

        {/* 2. SEARCHING STAGE */}
        {stage === 'SEARCHING' && (
          <div className="clean-card emergency-card-active p-10 text-center space-y-6 shadow-lg rounded-2xl animate-in fade-in duration-200">
            <div className="relative inline-flex items-center justify-center p-4">
              <SirenLight size="2xl" variant="ambulance" hasWaves={true} animated={true} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                Broadcasting Emergency Siren & GPS...
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Dispatching your vehicle location and emergency request to all active mobile mechanics and partner repair garages in your radius.
              </p>
            </div>

            <div className="p-3.5 bg-white/90 dark:bg-slate-900/90 rounded-xl inline-flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 border border-orange-200 dark:border-orange-800 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span>Incident: <strong>{selectedOption}</strong></span>
              <span className="text-slate-400">|</span>
              <span className="text-orange-600 dark:text-orange-400 font-bold">Scanning 5 km radius</span>
            </div>
          </div>
        )}

        {/* 3. ACCEPTED STAGE (Live Ride-tracking screen with interactive Map & Movement) */}
        {stage === 'ACCEPTED' && acceptedMechanic && (
          <div className="clean-card p-6 sm:p-7 space-y-6 border-l-4 border-l-emerald-600 animate-in fade-in duration-200 shadow-md rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            {/* Acceptance Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 inline-flex items-center gap-1.5 shadow-2xs border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Mechanic Accepted Your Request
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white font-heading">
                  {acceptedMechanic.garageName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Assigned Master Tech: <strong className="text-slate-700 dark:text-slate-200">{acceptedMechanic.mechanicName}</strong> ({acceptedMechanic.vehicle})
                </p>
              </div>

              {/* Dynamic Live Arrival Badge */}
              <div className="text-left sm:text-right bg-gradient-to-br from-indigo-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 px-4 py-2.5 rounded-2xl border border-indigo-100 dark:border-slate-700 self-start sm:self-auto shadow-xs">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase block font-bold">Estimated Arrival</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black font-mono text-indigo-700 dark:text-indigo-400">{liveETA}</span>
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-800">
                    {liveDistance}
                  </span>
                </div>
              </div>
            </div>

            {/* Ride Tracking Map (Leaflet MechMap) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  📍 You (Stranded Location)
                </span>
                <span className="flex items-center gap-1.5 text-orange-700 dark:text-orange-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping" />
                  🚚 Mechanic (Live Moving Unit)
                </span>
              </div>

              {/* Master Leaflet Interactive Map */}
              <MechMap
                userLocation={userCoords}
                mechanicLocation={mechanicCurrentPos}
                mechanicInfo={acceptedMechanic}
                routeCoordinates={routeCoordinates}
                showRoute={true}
                activeRouteInfo={{
                  distance: liveDistance,
                  eta: liveETA
                }}
                height="380px"
              />

              {/* Simulation Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Demo simulation: Mechanic is driving towards your vehicle coordinates.</span>
                </span>

                <button
                  type="button"
                  onClick={handleRestartSimulation}
                  className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg font-bold border border-slate-300 dark:border-slate-700 shadow-2xs flex items-center gap-1 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Restart Tracking Demo</span>
                </button>
              </div>
            </div>

            {/* Status & Driver Card */}
            <div className="p-4 bg-indigo-50/80 dark:bg-slate-800/90 rounded-2xl border border-indigo-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div>
                <p className="text-sm font-black text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Mechanic is en route.
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                  Remaining distance: <strong>{liveDistance}</strong> • Please turn on vehicle hazard lights.
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="clean-card emergency-card-active p-6 sm:p-7 max-w-sm w-full space-y-4 shadow-2xl rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 text-orange-600 dark:text-orange-400">
                <SirenLight size="md" variant="sticker" animated={true} />
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">
                  Dispatch Emergency Rescue?
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Send your current location and priority emergency alert for <strong>"{selectedOption}"</strong> to certified mechanics nearby?
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
                  className="btn-emergency py-2.5 text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
                >
                  <SirenLight size="xs" variant="sticker" animated={false} />
                  <span>Send SOS</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Automotive Location Permission & Fallback Modal */}
        {showPermissionModal && (
          <LocationPermissionModal
            isOpen={showPermissionModal}
            onClose={() => setShowPermissionModal(false)}
            onGrant={() => {
              setShowPermissionModal(false);
              requestLocation({ forceFresh: true });
            }}
            permission={permission}
            error={locationError}
            deviceInfo={deviceInfo}
            onSelectManualLocation={(loc) => {
              setManualLocation(loc);
              setShowPermissionModal(false);
            }}
            onUseFallback={() => {
              useFallbackLocation();
              setShowPermissionModal(false);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default EmergencyPage;
