import React, { useMemo } from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

/**
 * Creates custom user pin icon with pulsing radar aura
 */
const createUserIcon = (name = 'YOU') => {
  return L.divIcon({
    className: 'custom-user-pin-wrapper',
    html: `
      <div style="position:relative; width:36px; height:36px; display:flex; align-items:center; justify-content:center;">
        <span style="position:absolute; width:100%; height:100%; border-radius:50%; background:rgba(79, 70, 229, 0.4); animation:ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <div style="position:relative; z-index:10; width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg, #6366F1 0%, #4338CA 100%); border:3px solid #FFFFFF; box-shadow:0 4px 14px rgba(79,70,229,0.6); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:13px;">
          📍
        </div>
        <span style="position:absolute; bottom:-18px; left:50%; transform:translateX(-50%); background:#1E1B4B; color:#FFFFFF; font-size:9px; font-weight:800; font-family:monospace; padding:1px 6px; border-radius:999px; white-space:nowrap; border:1px solid rgba(255,255,255,0.3); box-shadow:0 2px 6px rgba(0,0,0,0.3);">
          ${name}
        </span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -22]
  });
};

export const UserLocationMarker = ({ location, label = 'YOU' }) => {
  if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
    return null;
  }

  const icon = useMemo(() => createUserIcon(label), [label]);

  return (
    <>
      {/* Accuracy circle ring */}
      <Circle
        center={[location.lat, location.lng]}
        radius={150}
        pathOptions={{
          color: '#6366F1',
          fillColor: '#818CF8',
          fillOpacity: 0.12,
          weight: 1.5,
          dashArray: '4, 4'
        }}
      />

      <Marker position={[location.lat, location.lng]} icon={icon}>
        <Popup className="mech-map-popup">
          <div className="p-1 space-y-1 text-slate-900 font-sans" style={{ minWidth: 160 }}>
            <div className="flex items-center gap-1.5 text-xs font-black text-indigo-700">
              <span>📍 Your Location</span>
              <span className="px-1.5 py-0.2 rounded bg-indigo-50 text-[9px] font-mono border border-indigo-200">GPS ACTIVE</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              You are here. Ready to connect with nearby emergency mechanics.
            </p>
            <p className="text-[10px] text-slate-400 font-mono pt-0.5">
              Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
            </p>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default UserLocationMarker;
