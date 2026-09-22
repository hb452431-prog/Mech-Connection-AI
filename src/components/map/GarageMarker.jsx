import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

/**
 * Creates custom garage pin icon
 */
const createGarageIcon = (isSelected = false, rating = 4.8) => {
  const bg = isSelected ? '#EA580C' : '#0F172A';
  const border = isSelected ? '#FDBA74' : '#818CF8';
  const size = isSelected ? 42 : 36;
  const shadow = isSelected ? 'rgba(234,88,12,0.6)' : 'rgba(0,0,0,0.35)';

  return L.divIcon({
    className: 'custom-garage-pin-wrapper',
    html: `
      <div style="position:relative; width:${size}px; height:${size}px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
        <div style="width:${size}px; height:${size}px; border-radius:50%; background:${bg}; border:2.5px solid ${border}; box-shadow:0 4px 14px ${shadow}; display:flex; align-items:center; justify-content:center; color:#FFFFFF; font-size:15px; transition:all 0.2s ease;">
          🔧
        </div>
        <span style="position:absolute; top:-6px; right:-6px; background:#F59E0B; color:#0F172A; font-size:8px; font-weight:900; font-family:monospace; padding:1px 4px; border-radius:999px; border:1px solid #FFFFFF; box-shadow:0 1px 4px rgba(0,0,0,0.2);">
          ★${rating}
        </span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 6]
  });
};

export const GarageMarker = ({
  garage,
  isSelected = false,
  onSelect,
  onRequestHelp
}) => {
  if (!garage || typeof garage.lat !== 'number' || typeof garage.lng !== 'number') {
    return null;
  }

  const icon = useMemo(
    () => createGarageIcon(isSelected, garage.rating || 4.8),
    [isSelected, garage.rating]
  );

  return (
    <Marker
      position={[garage.lat, garage.lng]}
      icon={icon}
      eventHandlers={{
        click: () => {
          if (onSelect) onSelect(garage);
        }
      }}
    >
      <Popup className="mech-map-popup">
        <div className="p-1 space-y-2 text-slate-900 font-sans" style={{ minWidth: 200, maxWidth: 260 }}>
          {/* Header */}
          <div className="border-b border-slate-100 pb-1.5">
            <div className="flex items-center justify-between gap-1">
              <h4 className="font-black text-xs text-slate-900 leading-snug">
                {garage.name}
              </h4>
              <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex-shrink-0">
                ★ {garage.rating || 4.8}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Lead Mechanic: <strong className="text-slate-700">{garage.mechanicName || 'Master Tech'}</strong>
            </p>
          </div>

          {/* Distance & Availability */}
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              📍 {garage.distance || `${garage.distanceKm || 1.8} km away`}
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ● {garage.available !== false ? 'Open Now' : 'Closed'}
            </span>
          </div>

          {/* Services */}
          <div className="text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
            <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block">Services:</span>
            <p className="line-clamp-2 leading-tight mt-0.5 font-medium">
              {Array.isArray(garage.services) ? garage.services.join(' • ') : garage.services || 'General Vehicle Repair'}
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => onSelect && onSelect(garage)}
              className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-lg transition-colors text-center"
            >
              View Details
            </button>
            <button
              type="button"
              onClick={() => onRequestHelp && onRequestHelp(garage)}
              className="py-1.5 px-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-[11px] font-bold rounded-lg shadow-xs transition-all text-center"
            >
              Request Help
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default GarageMarker;
