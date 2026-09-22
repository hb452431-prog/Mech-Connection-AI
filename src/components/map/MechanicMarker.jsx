import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

/**
 * Creates custom mechanic mobile unit pin icon with flashing beacon
 */
const createMechanicIcon = (name = 'MECHANIC', isMoving = false) => {
  return L.divIcon({
    className: 'custom-mechanic-pin-wrapper',
    html: `
      <div style="position:relative; width:40px; height:40px; display:flex; align-items:center; justify-content:center;">
        <span style="position:absolute; width:100%; height:100%; border-radius:50%; background:rgba(234, 88, 12, 0.4); animation:ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <div style="position:relative; z-index:10; width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg, #EA580C 0%, #C2410C 100%); border:3px solid #FED7AA; box-shadow:0 4px 16px rgba(234,88,12,0.65); display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:16px;">
          🚚
        </div>
        <span style="position:absolute; bottom:-18px; left:50%; transform:translateX(-50%); background:#7C2D12; color:#FED7AA; font-size:9px; font-weight:900; font-family:monospace; padding:1px 6px; border-radius:999px; white-space:nowrap; border:1px solid rgba(254,215,170,0.5); box-shadow:0 2px 6px rgba(0,0,0,0.3);">
          ${name}
        </span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -24]
  });
};

export const MechanicMarker = ({
  location,
  mechanicInfo,
  eta,
  distance,
  isMoving = false
}) => {
  if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
    return null;
  }

  const icon = useMemo(
    () => createMechanicIcon(mechanicInfo?.mechanicName?.split(' ')[0] || 'MECHANIC', isMoving),
    [mechanicInfo, isMoving]
  );

  return (
    <Marker position={[location.lat, location.lng]} icon={icon}>
      <Popup className="mech-map-popup">
        <div className="p-1 space-y-1.5 text-slate-900 font-sans" style={{ minWidth: 180 }}>
          <div className="flex items-center justify-between gap-1 border-b border-slate-100 pb-1">
            <span className="text-xs font-black text-orange-700 flex items-center gap-1">
              <span>🚚 Mobile Rescue Unit</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold font-mono">
              EN ROUTE
            </span>
          </div>

          <div className="text-xs space-y-0.5">
            <p className="font-bold text-slate-900">
              {mechanicInfo?.garageName || 'Apex Auto Care & Diagnostics'}
            </p>
            <p className="text-[11px] text-slate-500">
              Tech: <strong>{mechanicInfo?.mechanicName || 'David Miller'}</strong>
            </p>
          </div>

          {(eta || distance) && (
            <div className="flex items-center justify-between p-1.5 bg-orange-50 rounded-lg text-[10px] font-mono border border-orange-200">
              <span className="text-orange-900">ETA: <strong>{eta || '6 mins'}</strong></span>
              <span className="text-slate-500">|</span>
              <span className="text-orange-900">Dist: <strong>{distance || '2.1 km'}</strong></span>
            </div>
          )}

          {mechanicInfo?.phone && (
            <a
              href={`tel:${mechanicInfo.phone}`}
              className="block w-full py-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-[11px] font-bold transition-colors shadow-xs"
            >
              📞 Call Mechanic
            </a>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default MechanicMarker;
