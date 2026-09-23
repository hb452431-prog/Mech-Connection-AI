import React, { useEffect, useRef, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import UserLocationMarker from './UserLocationMarker';
import GarageMarker from './GarageMarker';
import MechanicMarker from './MechanicMarker';
import MapControls from './MapControls';

/**
 * Controller component inside MapContainer to smoothly adjust view
 */
const MapViewController = ({
  center,
  zoom,
  fitBoundsCoordinates,
  resetTrigger
}) => {
  const map = useMap();

  useEffect(() => {
    if (fitBoundsCoordinates && fitBoundsCoordinates.length >= 2) {
      try {
        map.fitBounds(fitBoundsCoordinates, {
          padding: [45, 45],
          maxZoom: 15,
          animate: true,
          duration: 1.2
        });
      } catch (e) {
        // Fallback safely
      }
    } else if (center && typeof center[0] === 'number' && typeof center[1] === 'number') {
      map.flyTo(center, zoom || 14, {
        duration: 1.4,
        easeLinearity: 0.25
      });
    }
  }, [center, zoom, fitBoundsCoordinates, resetTrigger, map]);

  return null;
};

export const MechMap = ({
  userLocation = null,
  garages = [],
  selectedGarage = null,
  onSelectGarage = null,
  mechanicLocation = null,
  mechanicInfo = null,
  routeCoordinates = null,
  showRoute = false,
  activeRouteInfo = null,
  isLocating = false,
  locationError = null,
  onLocate = null,
  onSelectLocation = null,
  onRequestHelp = null,
  height = '420px',
  initialCenter = [20, 0], // Default World Map view
  initialZoom = 2,
  className = ''
}) => {
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [mapZoom, setMapZoom] = useState(initialZoom);
  const [resetTrigger, setResetTrigger] = useState(0);

  // Auto-center map when user location is detected
  useEffect(() => {
    if (userLocation && typeof userLocation.lat === 'number' && typeof userLocation.lng === 'number') {
      setMapCenter([userLocation.lat, userLocation.lng]);
      setMapZoom(14);
    }
  }, [userLocation]);

  // When a garage is explicitly selected, fly to it
  useEffect(() => {
    if (selectedGarage && typeof selectedGarage.lat === 'number' && typeof selectedGarage.lng === 'number') {
      setMapCenter([selectedGarage.lat, selectedGarage.lng]);
      setMapZoom(15);
    }
  }, [selectedGarage]);

  // Handle location selected from search
  const handleLocationSearchSelect = (lat, lng, name) => {
    setMapCenter([lat, lng]);
    setMapZoom(14);
    if (onSelectLocation) {
      onSelectLocation(lat, lng, name);
    }
  };

  // Reset to World Map
  const handleResetWorldView = () => {
    setMapCenter([20, 0]);
    setMapZoom(2);
    setResetTrigger((prev) => prev + 1);
  };

  // Compute bounding box when a route is active
  const fitBoundsCoordinates = useMemo(() => {
    if (showRoute && routeCoordinates && routeCoordinates.length >= 2) {
      return routeCoordinates;
    }
    if (userLocation && mechanicLocation) {
      return [
        [userLocation.lat, userLocation.lng],
        [mechanicLocation.lat, mechanicLocation.lng]
      ];
    }
    return null;
  }, [showRoute, routeCoordinates, userLocation, mechanicLocation]);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 ${className}`}
      style={{ height }}
    >
      {/* Floating Map Controls & Search */}
      <MapControls
        onLocate={onLocate}
        onSelectLocation={handleLocationSearchSelect}
        onResetWorldView={handleResetWorldView}
        isLocating={isLocating}
        locationError={locationError}
        activeRouteInfo={activeRouteInfo}
        garagesCount={garages.length}
      />

      {/* Leaflet Master Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ minHeight: '100%', width: '100%' }}
      >
        <MapViewController
          center={mapCenter}
          zoom={mapZoom}
          fitBoundsCoordinates={fitBoundsCoordinates}
          resetTrigger={resetTrigger}
        />

        {/* OpenStreetMap Base Tile Layer with required attribution */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* 1. User Location Marker */}
        {userLocation && (
          <UserLocationMarker location={userLocation} label="YOU" />
        )}

        {/* 2. Nearby Garage Markers */}
        {garages.map((garage) => (
          <GarageMarker
            key={garage.id || `${garage.lat}_${garage.lng}`}
            garage={garage}
            isSelected={selectedGarage?.id === garage.id}
            onSelect={onSelectGarage}
            onRequestHelp={onRequestHelp}
          />
        ))}

        {/* 3. Assigned Mechanic Marker */}
        {mechanicLocation && (
          <MechanicMarker
            location={mechanicLocation}
            mechanicInfo={mechanicInfo}
            eta={activeRouteInfo?.eta}
            distance={activeRouteInfo?.distance}
          />
        )}

        {/* 4. Active Driving Route Polyline */}
        {showRoute && routeCoordinates && routeCoordinates.length >= 2 && (
          <>
            {/* Background Route Glow */}
            <Polyline
              positions={routeCoordinates}
              pathOptions={{
                color: '#EA580C',
                weight: 8,
                opacity: 0.35,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />
            {/* Foreground Solid Road Route */}
            <Polyline
              positions={routeCoordinates}
              pathOptions={{
                color: '#4F46E5',
                weight: 5,
                opacity: 0.9,
                dashArray: '8, 8',
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MechMap;