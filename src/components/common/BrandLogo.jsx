import React from 'react';
import { Link } from 'react-router-dom';
import brandLogoImg from '../../assets/brand_logo.png';

export const BrandLogo = ({ size = 'md', clickable = true, className = '', showSubtitle = true, variant = 'full' }) => {
  const sizeMap = {
    sm: { img: 'h-9 w-9', text: 'text-base', badge: 'text-[9px]' },
    md: { img: 'h-11 w-11', text: 'text-lg sm:text-xl', badge: 'text-[10px]' },
    lg: { img: 'h-32 w-32 sm:h-36 sm:w-36', text: 'text-2xl sm:text-3xl', badge: 'text-xs' },
    xl: { img: 'h-44 w-44', text: 'text-3xl sm:text-4xl', badge: 'text-sm' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const isLarge = size === 'lg' || size === 'xl';

  const content = isLarge ? (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Official Emblem Banner with Soft Glow */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-orange-500/20 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-white p-2.5 rounded-2xl border border-slate-200 shadow-md">
          <img
            src={brandLogoImg}
            alt="MECH CONNECT AI Official Logo"
            className={`${currentSize.img} object-contain rounded-xl`}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Circular Emblem */}
      <div className="relative flex-shrink-0 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
        <img
          src={brandLogoImg}
          alt="MECH CONNECT AI Logo"
          className={`${currentSize.img} object-contain rounded-lg`}
        />
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
        {showSubtitle && (
          <span className="text-[11px] text-slate-500 font-medium">
            Vehicle & Mechanic Platform
          </span>
        )}
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
