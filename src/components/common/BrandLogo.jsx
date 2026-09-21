import React from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({ size = 'md', showTagline = false, clickable = true, className = '' }) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', sub: 'text-[10px]' },
    md: { icon: 38, text: 'text-xl', sub: 'text-xs' },
    lg: { icon: 52, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 68, text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const LogoGraphic = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High-Tech Vector Logo Icon */}
      <div className="relative flex-shrink-0">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="logoPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="logoAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Shield/Hexagon Frame */}
          <polygon
            points="50,5 87,25 87,75 50,95 13,75 13,25"
            fill="#0F172A"
            stroke="url(#logoPrimaryGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Outer Gear Teeth Accents */}
          <circle
            cx="50"
            cy="50"
            r="33"
            stroke="#1E293B"
            strokeWidth="3"
            strokeDasharray="6 8"
          />

          {/* Aerodynamic Sports Car Silhouette */}
          <path
            d="M26 62 C28 54, 34 46, 42 45 L58 45 C66 46, 72 54, 74 62 L76 66 C76 68, 74 70, 72 70 L28 70 C26 70, 24 68, 24 66 Z"
            fill="#0B1120"
            stroke="url(#logoPrimaryGrad)"
            strokeWidth="2.5"
          />

          {/* Windshield */}
          <path
            d="M35 45 L42 34 L58 34 L65 45 Z"
            fill="#0284C7"
            fillOpacity="0.3"
            stroke="#38BDF8"
            strokeWidth="2"
          />

          {/* Wheels with Amber Core */}
          <circle cx="34" cy="67" r="6" fill="#0F172A" stroke="url(#logoAmberGrad)" strokeWidth="2.5" />
          <circle cx="34" cy="67" r="2.5" fill="#F59E0B" />
          <circle cx="66" cy="67" r="6" fill="#0F172A" stroke="url(#logoAmberGrad)" strokeWidth="2.5" />
          <circle cx="66" cy="67" r="2.5" fill="#F59E0B" />

          {/* Central AI Neural Node / Wrench Spark */}
          <circle cx="50" cy="48" r="6" fill="#0284C7" filter="url(#logoGlow)" />
          <circle cx="50" cy="48" r="3" fill="#FFFFFF" />

          {/* Circuit / Neural Lines */}
          <line x1="50" y1="34" x2="50" y2="42" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="44" y1="48" x2="35" y2="54" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="56" y1="48" x2="65" y2="54" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>

        {/* Ambient Pulsing Glow Dot */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
        </span>
      </div>

      {/* Typography Brand Name */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight leading-none">
          <span className={`font-black ${currentSize.text} tracking-wider text-slate-100 font-heading`}>
            MECH<span className="text-cyan-400">CONNECT</span>
          </span>
          <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
            AI
          </span>
        </div>
        {showTagline && (
          <span className={`text-slate-400 font-medium ${currentSize.sub} tracking-normal mt-0.5`}>
            Your Vehicle. Our AI. Help When You Need It.
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="group inline-flex items-center no-underline">
        {LogoGraphic}
      </Link>
    );
  }

  return LogoGraphic;
};

export default BrandLogo;
