import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Truck,
  Zap,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  RefreshCw,
  Send
} from 'lucide-react';

export const EmergencyPage = () => {
  const [searchParams] = useSearchParams();
  const initialNotes = searchParams.get('notes') || '';
  const initialGarage = searchParams.get('garage') || '';
  const initialType = searchParams.get('type') || 'Flat Tyre';
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
    fetchIPLocation,
    turnOnLocation,
    setManualLocation,
    useFallbackLocation
  } = useLocation({ autoRequest: true, enableHighAccuracy: true, watch: true, allowIPFallback: true });

  const [showPermissionModal, setShowPermissionModal] = useState(false);

  // Screen stages: 'FORM' | 'SEARCHING' | 'ACCEPTED'
  const [stage, setStage] = useState('FORM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Comprehensive Driver Emergency Inputs
  const [vehicleType, setVehicleType] = useState('🚗 Car / 4-Wheeler');
  const [vehicleBrand, setVehicleBrand] = useState(
    user.vehicle?.year ? `${user.vehicle.year} ${user.vehicle.model}` : user.vehicleBrand || 'Honda'
  );
  const [vehicleModel, setVehicleModel] = useState(user.vehicle?.model || user.vehicleModel || 'Civic');
  const [vehiclePlate, setVehiclePlate] = useState(user.vehicle?.plate || user.vehicleNumber || 'CA-8XYZ92');
  const [selectedProblem, setSelectedProblem] = useState(initialType);
  const [urgencyLevel, setUrgencyLevel] = useState('⚡ Highway / Danger Zone');
  const [customNotes, setCustomNotes] = useState(
    initialNotes ? `${initialGarage ? `Request for ${initialGarage}: ` : ''}${initialNotes}` : ''
  );

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [acceptedMechanic, setAcceptedMechanic] = useState(null);
  const [activeRequestId, setActiveRequestId] = useState(null);

  // Guaranteed non-null location fallback object
  const effectiveLocation = useMemo(() => {
    if (userCoords && typeof userCoords.lat === 'number' && typeof userCoords.lng === 'number') {
      return {
        lat: userCoords.lat,
        lng: userCoords.lng,
        address: userCoords.address || `Current Location (${userCoords.lat.toFixed(4)}, ${userCoords.lng.toFixed(4)})`,
        name: userCoords.name || 'Detected Location'
      };
    }
    return {
      lat: 37.7749,
      lng: -122.4194,
      address: 'Market St & 7th St, Downtown, San Francisco, CA',
      name: 'San Francisco Hub (Default)'
    };
  }, [userCoords]);

  // Route and live mechanic movement state
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [mechanicCurrentPos, setMechanicCurrentPos] = useState(null);
  const [routeIndex, setRouteIndex] = useState(0);
  const [liveDistance, setLiveDistance] = useState('1.8 km');
  const [liveETA, setLiveETA] = useState('6 mins');
  const [isSimulatingMovement, setIsSimulatingMovement] = useState(false);

  const simulationIntervalRef = useRef(null);

  const vehicleTypeOptions = [
    { id: 'bike', label: 'Bike / 2-Wheeler', icon: '🏍️', badge: 'Fastest 3-Min ETA' },
    { id: 'car', label: 'Car / 4-Wheeler', icon: '🚗', badge: 'Full Breakdown Rescue' },
    { id: 'auto', label: 'Auto / 3-Wheeler', icon: '🛺', badge: 'City Rapid Assist' },
    { id: 'heavy', label: 'Heavy Commercial', icon: '🚚', badge: 'Tow & Heavy Repair' }
  ];

  const problemOptions = [
    { name: 'Flat Tyre', icon: Disc, desc: 'Puncture, valve leak, or wheel blowout' },
    { name: 'Battery Problem', icon: BatteryCharging, desc: 'Dead battery / jumpstart required' },
    { name: 'Engine Problem', icon: Flame, desc: 'Overheating, white smoke, or sudden stall' },
    { name: 'Vehicle Breakdown', icon: Car, desc: 'Transmission, belt snap, or immobile' },
    { name: 'Towing Needed', icon: Truck, desc: 'Vehicle cannot be driven safely' },
    { name: 'Fuel / Lockout / Other', icon: HelpCircle, desc: 'Out of gas, locked out, or general assist' }
  ];

  const urgencyOptions = [
    { id: 'danger', label: '⚡ Highway / Danger Zone', desc: 'Critical priority dispatch', color: 'border-red-500 bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 ring-red-400' },
    { id: 'roadside', label: '🟡 Roadside Breakdown', desc: 'Parked on street shoulder', color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 ring-amber-400' },
    { id: 'safe', label: '🟢 Safe Location / Parking', desc: 'Safe inside parking lot/home', color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 ring-emerald-400' }
  ];

  // Dispatch Emergency SOS Request
  const handleConfirmSend = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    setStage('SEARCHING');

    const userLat = effectiveLocation.lat;
    const userLng = effectiveLocation.lng;
    const userAddress = effectiveLocation.address;

    try {
      // 1. Create request in local service with full vehicle intake data
      const createdReq = await emergencyService.createRequest({
        vehicleType,
        vehicleBrand,
        vehicleModel,
        vehiclePlate,
        problemType: selectedProblem,
        urgency: urgencyLevel,
        notes: customNotes,
        userName: user.name || 'John Doe',
        userPhone: user.phone || '+1 555-0199',
        userLocation: {
          address: userAddress,
          lat: userLat,
          lng: userLng
        }
      });

      if (createdReq && createdReq.id) {
        setActiveRequestId(createdReq.id);
      }

      // 2. Mechanic initial starting coordinates (~1.8 km north-east of user)
      const mechanicOrigin = {
        lat: userLat + 0.015,
        lng: userLng + 0.012
      };

      // 3. Calculate initial route using OSRM with graceful fallback
      const routeData = await routingService.getRoute(
        mechanicOrigin.lat,
        mechanicOrigin.lng,
        userLat,
        userLng
      );

      // 4. Simulate mechanic response after 2.4 seconds
      setTimeout(() => {
        const coords = (routeData && routeData.coordinates && routeData.coordinates.length > 0)
          ? routeData.coordinates
          : [
              [mechanicOrigin.lat, mechanicOrigin.lng],
              [userLat + 0.007, userLng + 0.005],
              [userLat, userLng]
            ];

        const initialDist = routeData?.distanceFormatted || '1.8 km';
        const initialEta = routeData?.durationFormatted || '5 mins';

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
          vehicle: 'RapidRescue Mobile Unit #12',
          eta: initialEta,
          origin: mechanicOrigin
        });

        setStage('ACCEPTED');
        setIsSubmitting(false);
        setIsSimulatingMovement(true);
      }, 2400);
    } catch (err) {
      console.error('Error creating emergency request:', err);
      // Fallback transition so user is never stuck
      setTimeout(() => {
        setStage('ACCEPTED');
        setIsSubmitting(false);
      }, 2000);
    }
  };

  // Demo Live Movement Simulation Effect
  useEffect(() => {
    if (stage !== 'ACCEPTED' || !isSimulatingMovement || !routeCoordinates || routeCoordinates.length === 0) {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
      return;
    }

    const userLat = effectiveLocation.lat;
    const userLng = effectiveLocation.lng;

    simulationIntervalRef.current = setInterval(() => {
      setRouteIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= routeCoordinates.length) {
          // Reached destination!
          setMechanicCurrentPos({
            lat: userLat,
            lng: userLng
          });
          setLiveDistance('Arrived (0 m)');
          setLiveETA('Arrived on Scene!');
          setIsSimulatingMovement(false);
          return prevIndex;
        }

        const nextPoint = routeCoordinates[nextIndex];
        if (nextPoint && Array.isArray(nextPoint)) {
          setMechanicCurrentPos({
            lat: nextPoint[0],
            lng: nextPoint[1]
          });

          // Compute remaining distance & ETA to user
          const remainingKm = calculateDistanceKm(
            nextPoint[0],
            nextPoint[1],
            userLat,
            userLng
          );
          setLiveDistance(formatDistance(remainingKm));
          setLiveETA(calculateETA(remainingKm));
        }

        return nextIndex;
      });
    }, 1600);

    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, [stage, isSimulatingMovement, routeCoordinates, effectiveLocation]);

  // Restart movement simulation
  const handleRestartSimulation = () => {
    if (!acceptedMechanic || !routeCoordinates || routeCoordinates.length === 0) return;
    setRouteIndex(0);
    setMechanicCurrentPos(acceptedMechanic.origin);
    const totalDist = calculateDistanceKm(
      acceptedMechanic.origin.lat,
      acceptedMechanic.origin.lng,
      effectiveLocation.lat,
      effectiveLocation.lng
    );
    setLiveDistance(formatDistance(totalDist));
    setLiveETA(calculateETA(totalDist));
    setIsSimulatingMovement(true);
  };

  // Reset / Cancel SOS flow
  const handleResetSos = () => {
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
    }
    setStage('FORM');
    setAcceptedMechanic(null);
    setRouteCoordinates(null);
    setIsSimulatingMovement(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#080D1A] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <UserNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div>
          <Link
            to="/user"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950 border-2 border-orange-300 dark:border-orange-800 flex items-center justify-center flex-shrink-0 shadow-md">
              <SirenLight size="md" variant="ambulance" animated={true} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
                Request Emergency Mechanic
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                Instant 24/7 GPS dispatch signal with driver vehicle specifications.
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Location Status & Telemetry Bar */}
        <LocationStatusBar
          location={effectiveLocation}
          accuracy={accuracy}
          loading={isLocating}
          error={locationError}
          permission={permission}
          tracking={tracking}
          isManual={isManual}
          onRefreshLocation={() => turnOnLocation()}
          onRequestPermission={() => setShowPermissionModal(true)}
          onOpenHubModal={() => setShowPermissionModal(true)}
        />

        {/* 1. FORM STAGE (Comprehensive Driver Breakdown Intake) */}
        {stage === 'FORM' && (
          <div className="clean-card emergency-card-active p-6 sm:p-8 space-y-7 shadow-xl rounded-3xl border-2 border-orange-200 dark:border-orange-900/60 bg-white dark:bg-slate-900">
            
            {/* STEP 1: VEHICLE TYPE SELECTOR (Rapido Style) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
                  <span>Select Vehicle Type:</span>
                </label>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  ● GPS Active
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {vehicleTypeOptions.map((opt) => {
                  const isSelected = vehicleType.includes(opt.label.split('/')[0].trim());
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setVehicleType(`${opt.icon} ${opt.label}`)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2.5 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-slate-900 dark:text-white ring-2 ring-amber-400/40 shadow-md scale-[1.02]'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{opt.icon}</span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                      </div>
                      <div>
                        <div className="font-black text-xs sm:text-sm leading-tight font-heading">{opt.label}</div>
                        <div className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold mt-0.5">
                          {opt.badge}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: VEHICLE DETAILS */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center text-xs font-black">2</span>
                <span>Vehicle Identification:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 text-xs font-bold mb-1">Make / Model</label>
                  <input
                    type="text"
                    value={vehicleBrand}
                    onChange={(e) => setVehicleBrand(e.target.value)}
                    placeholder="e.g. Honda Civic or Royal Enfield"
                    className="w-full clean-input px-4 py-3 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 text-xs font-bold mb-1">License Plate Number</label>
                  <input
                    type="text"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    placeholder="e.g. CA-8XYZ92"
                    className="w-full clean-input px-4 py-3 text-sm font-mono font-black uppercase"
                  />
                </div>
              </div>
            </div>

            {/* STEP 3: BREAKDOWN PROBLEM CATEGORY */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center text-xs font-black">3</span>
                <span>What Happened to your Vehicle?</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {problemOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedProblem === opt.name;

                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setSelectedProblem(opt.name)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 ring-2 ring-orange-300 dark:ring-orange-800 shadow-md scale-[1.01]'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        <Icon className="w-6 h-6 flex-shrink-0" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-black text-sm sm:text-base font-heading">{opt.name}</p>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: URGENCY & SAFETY LEVEL */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center text-xs font-black">4</span>
                <span>Breakdown Urgency & Safety Status:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {urgencyOptions.map((urg) => {
                  const isSelected = urgencyLevel === urg.label;
                  return (
                    <button
                      key={urg.id}
                      type="button"
                      onClick={() => setUrgencyLevel(urg.label)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? `${urg.color} ring-2 shadow-sm font-bold scale-[1.01]`
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="font-black text-xs sm:text-sm font-heading">{urg.label}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{urg.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 5: NOTES & SPECIFIC LANDMARKS */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center text-xs font-black">5</span>
                <span>Additional Breakdown Notes / Landmarks (Optional):</span>
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Front tyre flat, waiting near bridge toll gate with hazard lights on..."
                className="w-full clean-input px-4 py-3.5 text-sm font-medium"
              />
            </div>

            {/* GPS Location & Telemetry Display */}
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase font-mono">
                  Current GPS Locked Coordinates
                </span>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  ● Telemetry Verified
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                {effectiveLocation.address}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Driver: <strong>{user.name || 'John Doe'}</strong> • Phone: <strong>{user.phone || '+1 555-0199'}</strong>
              </p>
            </div>

            {/* Big Send Emergency Button */}
            <button
              type="button"
              onClick={handleConfirmSend}
              disabled={isSubmitting}
              className="w-full btn-emergency py-5 text-base sm:text-lg font-black uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl group cursor-pointer"
            >
              <SirenLight size="sm" variant="sticker" animated={true} />
              <span className="drop-shadow-xs font-black">
                {isSubmitting ? 'BROADCASTING SOS BEACON...' : 'DISPATCH EMERGENCY MECHANIC NOW'}
              </span>
            </button>
          </div>
        )}

        {/* 2. SEARCHING STAGE */}
        {stage === 'SEARCHING' && (
          <div className="clean-card emergency-card-active p-10 text-center space-y-6 shadow-xl rounded-3xl animate-in fade-in duration-200 border-2 border-orange-300 dark:border-orange-800">
            <div className="relative inline-flex items-center justify-center p-4">
              <SirenLight size="2xl" variant="ambulance" hasWaves={true} animated={true} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
                Broadcasting Emergency GPS Siren...
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Dispatching your vehicle telemetry (<strong>{vehicleType}</strong> • <strong>{selectedProblem}</strong>) to all certified mechanics and mobile units in your radius.
              </p>
            </div>

            <div className="p-4 bg-white/90 dark:bg-slate-900/90 rounded-2xl inline-flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-800 dark:text-slate-200 border border-orange-200 dark:border-orange-800 shadow-sm">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
              <span>Vehicle: <strong>{vehicleBrand} ({vehiclePlate})</strong></span>
              <span className="text-slate-400">|</span>
              <span className="text-orange-600 dark:text-orange-400 font-bold">{urgencyLevel}</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Scanning 5 km radius</span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetSos}
                className="btn-secondary py-2.5 px-5 text-xs font-bold rounded-xl"
              >
                Cancel SOS Request
              </button>
            </div>
          </div>
        )}

        {/* 3. ACCEPTED STAGE (Live Ride-tracking screen with interactive Map & Movement) */}
        {stage === 'ACCEPTED' && (
          <div className="clean-card p-6 sm:p-8 space-y-6 border-l-4 border-l-emerald-600 animate-in fade-in duration-200 shadow-xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800">
            {/* Acceptance Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="space-y-1.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 inline-flex items-center gap-2 shadow-2xs border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Mechanic Unit Dispatched & En Route
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
                  {acceptedMechanic?.garageName || 'Apex Auto Care & Diagnostics'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Assigned Master Tech: <strong className="text-slate-800 dark:text-slate-200">{acceptedMechanic?.mechanicName || 'David Miller'}</strong> ({acceptedMechanic?.vehicle || 'RapidRescue Unit #12'})
                </p>
              </div>

              {/* Dynamic Live Arrival Badge */}
              <div className="text-left sm:text-right bg-gradient-to-br from-indigo-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 px-5 py-3 rounded-2xl border border-indigo-100 dark:border-slate-700 self-start sm:self-auto shadow-sm">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase block font-bold">Estimated Arrival</span>
                <div className="flex items-center gap-2.5 mt-0.5">
                  <span className="text-3xl font-black font-mono text-indigo-700 dark:text-indigo-400">{liveETA}</span>
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800">
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
                  📍 You ({vehicleBrand})
                </span>
                <span className="flex items-center gap-1.5 text-orange-700 dark:text-orange-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping" />
                  🚚 Mechanic ({acceptedMechanic?.vehicle || 'Mobile Unit'})
                </span>
              </div>

              {/* Master Leaflet Interactive Map */}
              <MechMap
                userLocation={effectiveLocation}
                mechanicLocation={mechanicCurrentPos || { lat: effectiveLocation.lat + 0.015, lng: effectiveLocation.lng + 0.012 }}
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
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-time GPS tracking: Mechanic is navigating towards your stranded vehicle.</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRestartSimulation}
                    className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold border border-slate-300 dark:border-slate-700 shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Restart Simulation</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetSos}
                    className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 rounded-xl font-bold border border-rose-200 dark:border-rose-800"
                  >
                    New Request
                  </button>
                </div>
              </div>
            </div>

            {/* Status & Driver Card */}
            <div className="p-5 bg-indigo-50/90 dark:bg-slate-800/90 rounded-2xl border-2 border-indigo-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-base font-black text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Mechanic is en route.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Remaining distance: <strong className="text-indigo-700 dark:text-indigo-300 font-mono text-sm">{liveDistance}</strong> • Please keep your hazard lights on.
                </p>
              </div>

              <a
                href={`tel:${acceptedMechanic?.phone || '+15554321'}`}
                className="btn-primary w-full sm:w-auto px-6 py-3.5 text-sm font-black flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Call {acceptedMechanic?.mechanicName?.split(' ')[0] || 'Mechanic'}</span>
              </a>
            </div>
          </div>
        )}

        {/* Automotive Location Permission & Fallback Modal */}
        {showPermissionModal && (
          <LocationPermissionModal
            isOpen={showPermissionModal}
            onClose={() => setShowPermissionModal(false)}
            onEnable={async () => {
              try {
                await turnOnLocation();
                setShowPermissionModal(false);
              } catch (e) {
                // Stays open showing error recovery guidance
              }
            }}
            onUseIPLocation={async () => {
              await fetchIPLocation();
              setShowPermissionModal(false);
            }}
            permission={permission}
            error={locationError}
            deviceInfo={deviceInfo}
            loading={isLocating}
            onManualSelect={(lat, lng, name) => {
              setManualLocation(lat, lng, name);
              setShowPermissionModal(false);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default EmergencyPage;

