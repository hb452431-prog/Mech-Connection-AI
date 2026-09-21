import React from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({ size = 'md', clickable = true, className = '' }) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', badge: 'text-[9px]' },
    md: { icon: 36, text: 'text-xl', badge: 'text-[10px]' },
    lg: { icon: 52, text: 'text-3xl', badge: 'text-xs' },
    xl: { icon: 68, text: 'text-4xl', badge: 'text-xs' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High-Tech Vector Logo Icon */}
      <div className="relative flex-shrink-0">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>

          {/* Shield Frame */}
          <polygon
            points="50,6 88,26 88,74 50,94 12,74 12,26"
            fill="#0F172A"
            stroke="url(#logoPrimary)"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Outer Gear Teeth Outline */}
          <circle
            cx="50"
            cy="50"
            r="32"
            stroke="#334155"
            strokeWidth="3"
            strokeDasharray="6 8"
          />

          {/* Car Body Contour */}
          <path
            d="M26 62 C28 54, 34 46, 42 45 L58 45 C66 46, 72 54, 74 62 L76 66 C76 68, 74 70, 72 70 L28 70 C26 70, 24 68, 24 66 Z"
            fill="#1E293B"
            stroke="#818CF8"
            strokeWidth="2.5"
          />

          {/* Windshield */}
          <path
            d="M36 45 L43 35 L57 35 L64 45 Z"
            fill="#6366F1"
            fillOpacity="0.4"
            stroke="#A5B4FC"
            strokeWidth="2"
          />

          {/* Wheels with Orange Core */}
          <circle cx="34" cy="67" r="5.5" fill="#0F172A" stroke="#EA580C" strokeWidth="2.5" />
          <circle cx="66" cy="67" r="5.5" fill="#0F172A" stroke="#EA580C" strokeWidth="2.5" />

          {/* AI Neural Chip / Wrench Spark Center */}
          <circle cx="50" cy="48" r="5" fill="#818CF8" />
          <line x1="50" y1="35" x2="50" y2="43" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Typography Brand Name */}
      <div className="flex flex-col text-left">
        <div className="flex items-center tracking-tight leading-none">
          <span className={`font-black ${currentSize.text} tracking-tight text-slate-900 font-heading`}>
            MECH<span className="text-indigo-600">CONNECT</span>
          </span>
          <span className={`ml-1.5 px-1.5 py-0.5 ${currentSize.badge} font-mono font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 rounded`}>
            AI
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          Vehicle & Mechanic Platform
        </span>
      </div>
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
