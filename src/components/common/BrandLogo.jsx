import React from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({ size = 'md', clickable = true, className = '', showSubtitle = true, layout = 'auto' }) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-base', subText: 'text-[9px]', badge: 'text-[9px]' },
    md: { icon: 44, text: 'text-xl', subText: 'text-[11px]', badge: 'text-[10px]' },
    lg: { icon: 110, text: 'text-3xl', subText: 'text-xs', badge: 'text-xs' },
    xl: { icon: 140, text: 'text-4xl', subText: 'text-sm', badge: 'text-sm' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const isLarge = size === 'lg' || size === 'xl' || layout === 'stacked';

  // Precision Vector SVG Emblem based on official design
  const EmblemSVG = ({ iconSize }) => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        <linearGradient id="emblemBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1E3B" />
          <stop offset="100%" stopColor="#0353A4" />
        </linearGradient>
        <linearGradient id="aiGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#0077B6" />
        </linearGradient>
        <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A2540" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>

      {/* Outer Thick Shield Ring */}
      <ellipse
        cx="100"
        cy="96"
        rx="92"
        ry="76"
        fill="#FFFFFF"
        stroke="url(#emblemBorder)"
        strokeWidth="9"
      />
      <ellipse
        cx="100"
        cy="96"
        rx="85"
        ry="69"
        fill="#F8FAFC"
        stroke="#0F172A"
        strokeWidth="2"
      />

      {/* Internal Dividing Lines: 3 Segments */}
      {/* 1. Vertical Top Divider */}
      <line x1="100" y1="27" x2="100" y2="96" stroke="#0B1E3B" strokeWidth="5.5" strokeLinecap="round" />
      {/* 2. Left Diagonal Divider */}
      <line x1="100" y1="96" x2="18" y2="128" stroke="#0B1E3B" strokeWidth="5.5" strokeLinecap="round" />
      {/* 3. Right Diagonal Divider */}
      <line x1="100" y1="96" x2="182" y2="128" stroke="#0B1E3B" strokeWidth="5.5" strokeLinecap="round" />

      {/* ================= SECTOR 1: TOP-LEFT (CAR & AI CHIP) ================= */}
      <g transform="translate(22, 32)">
        {/* AI Circuit Chip */}
        <rect x="42" y="5" width="22" height="18" rx="4" fill="#0077B6" stroke="#00B4D8" strokeWidth="1.5" />
        <text x="53" y="18" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">AI</text>
        {/* Circuit Traces */}
        <line x1="42" y1="10" x2="36" y2="8" stroke="#00B4D8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="35" cy="8" r="1.5" fill="#00B4D8" />
        <line x1="42" y1="18" x2="35" y2="20" stroke="#00B4D8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="34" cy="20" r="1.5" fill="#00B4D8" />
        <line x1="64" y1="10" x2="70" y2="7" stroke="#00B4D8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="71" cy="7" r="1.5" fill="#00B4D8" />
        <line x1="64" y1="18" x2="71" y2="21" stroke="#00B4D8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="72" cy="21" r="1.5" fill="#00B4D8" />

        {/* Aerodynamic Sports Car Silhouette */}
        <path
          d="M10 50 C14 43, 24 37, 36 36 L52 36 C64 36, 70 41, 74 48 L76 52 C76 53, 74 54, 72 54 L12 54 C10 54, 9 52, 10 50 Z"
          fill="#0B1E3B"
        />
        {/* Windshield */}
        <path
          d="M26 38 L34 30 L48 30 L56 38 Z"
          fill="#00B4D8"
          fillOpacity="0.85"
        />
        {/* Headlight Beam */}
        <path d="M12 51 L2 53 L10 54 Z" fill="#00B4D8" />
        <line x1="8" y1="56" x2="74" y2="56" stroke="#0077B6" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* ================= SECTOR 2: TOP-RIGHT (CROSSED TOOLS) ================= */}
      <g transform="translate(108, 36)">
        {/* Screwdriver (Crossed Bottom-Left to Top-Right) */}
        <g transform="rotate(35 40 32)">
          <rect x="36" y="8" width="8" height="24" rx="2" fill="#0077B6" />
          <rect x="38" y="32" width="4" height="28" fill="#0B1E3B" />
          <polygon points="38,60 42,60 41,64 39,64" fill="#0B1E3B" />
        </g>

        {/* Mechanical Wrench (Crossed Top-Left to Bottom-Right) */}
        <g transform="rotate(-38 40 32)">
          {/* Wrench Shaft */}
          <rect x="36" y="14" width="8" height="38" rx="2" fill="#0B1E3B" />
          {/* Wrench Open Head */}
          <path
            d="M30 14 C30 6, 50 6, 50 14 C48 18, 44 20, 44 22 L36 22 C36 20, 32 18, 30 14 Z"
            fill="#0B1E3B"
          />
          {/* Open Wrench Notch */}
          <polygon points="36,4 44,4 42,12 38,12" fill="#F8FAFC" />
          {/* Bottom Ring */}
          <circle cx="40" cy="54" r="6" fill="#0B1E3B" />
          <circle cx="40" cy="54" r="3" fill="#F8FAFC" />
        </g>
      </g>

      {/* ================= SECTOR 3: BOTTOM (GPS ROAD MAP & PIN) ================= */}
      {/* Map Grid Background Plate */}
      <clipPath id="bottomClip">
        <path d="M22 130 L100 100 L178 130 C162 165, 134 172, 100 172 C66 172, 38 165, 22 130 Z" />
      </clipPath>

      <g clipPath="url(#bottomClip)">
        <rect x="15" y="95" width="170" height="85" fill="url(#roadGradient)" />
        {/* Perspective Map Grid Lines */}
        <line x1="100" y1="100" x2="30" y2="175" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.45" />
        <line x1="100" y1="100" x2="65" y2="175" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.45" />
        <line x1="100" y1="100" x2="100" y2="175" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.45" />
        <line x1="100" y1="100" x2="135" y2="175" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.45" />
        <line x1="100" y1="100" x2="170" y2="175" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.45" />

        <line x1="30" y1="125" x2="170" y2="125" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.35" />
        <line x1="20" y1="145" x2="180" y2="145" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.35" />

        {/* Winding Blue Navigation Route */}
        <path
          d="M100 120 Q92 135, 106 148 T94 172"
          fill="none"
          stroke="#00B4D8"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M100 120 Q92 135, 106 148 T94 172"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Red GPS Marker Pin in Center of Map */}
      <g transform="translate(100, 114)">
        {/* Pin Drop Shadow */}
        <ellipse cx="0" cy="14" rx="6" ry="2.5" fill="#000000" fillOpacity="0.35" />
        {/* Teardrop Pin */}
        <path
          d="M0 13 C-1.5 11, -8 4, -8 -2 C-8 -7, -4.5 -10.5, 0 -10.5 C4.5 -10.5, 8 -7, 8 -2 C8 4, 1.5 11, 0 13 Z"
          fill="url(#pinGradient)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        {/* Inner White Dot */}
        <circle cx="0" cy="-2.5" r="3" fill="#FFFFFF" />
      </g>
    </svg>
  );

  // Stylized Typography: MECH CONNECT AI with crisp spacing and high-tech circuit node
  const LogoTypography = () => (
    <div className={`flex flex-col ${isLarge ? 'items-center mt-3 text-center' : 'text-left'}`}>
      <div className="flex items-center gap-1.5 sm:gap-2 tracking-normal leading-none select-none">
        {/* "MECH" in bold titanium slate */}
        <span className={`font-black ${currentSize.text} text-slate-900 font-heading tracking-wide`}>
          MECH
        </span>
        {/* "CONNECT" in signature electric blue */}
        <span className={`font-black ${currentSize.text} text-[#0077B6] font-heading tracking-wide`}>
          CONNECT
        </span>
        {/* "AI" with micro-circuit connection */}
        <div className="inline-flex items-center">
          <span className={`font-black ${currentSize.text} text-[#00B4D8] font-heading tracking-wide`}>
            AI
          </span>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" className="ml-1 text-[#00B4D8] flex-shrink-0">
            <line x1="0" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="13" cy="6" r="2.5" fill="currentColor" />
            <line x1="0" y1="2" x2="6" y2="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="8" cy="2" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {showSubtitle && (
        <span className={`${currentSize.subText} text-slate-500 font-bold tracking-widest uppercase font-mono mt-1.5`}>
          Vehicle & Mechanic Platform
        </span>
      )}
    </div>
  );

  const content = isLarge ? (
    <div className={`flex flex-col items-center select-none group ${className}`}>
      <EmblemSVG iconSize={currentSize.icon} />
      <LogoTypography />
    </div>
  ) : (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      <EmblemSVG iconSize={currentSize.icon} />
      <LogoTypography />
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="inline-flex items-center no-underline hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};

export default BrandLogo;
