import React from 'react';

/**
 * SirenLight - A high-fidelity animated emergency siren / ambulance beacon component
 * Supports 'sticker', 'beacon', and 'icon' variants with authentic rotating strobe & glowing light reflections.
 *
 * @param {string} size - 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
 * @param {string} variant - 'sticker' | 'beacon' | 'icon' | 'ambulance'
 * @param {boolean} animated - whether strobe & rotation animations are active
 * @param {boolean} hasWaves - whether expanding pulse waves are shown
 * @param {string} className - extra classes
 */
export const SirenLight = ({
  size = 'md',
  variant = 'sticker',
  animated = true,
  hasWaves = false,
  colorScheme = 'emergency', // 'emergency' (Orange/Red) | 'ambulance' (Red/Blue) | 'amber' (Pure Amber)
  className = '',
  onClick
}) => {
  const sizeConfig = {
    xs: { px: 18, waveSize: 32 },
    sm: { px: 22, waveSize: 42 },
    md: { px: 32, waveSize: 56 },
    lg: { px: 48, waveSize: 84 },
    xl: { px: 64, waveSize: 110 },
    '2xl': { px: 88, waveSize: 140 }
  };

  const { px, waveSize } = sizeConfig[size] || sizeConfig.md;
  const isSticker = variant === 'sticker' || variant === 'ambulance';
  const isAmbulance = colorScheme === 'ambulance' || variant === 'ambulance';

  // Primary and secondary colors for gradients
  const primaryGlow = isAmbulance ? '#EF4444' : '#F97316';
  const secondaryGlow = isAmbulance ? '#3B82F6' : '#EF4444';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: px, height: px }}
    >
      {/* Expanding Beacon Radar / Sound Waves (Optional) */}
      {hasWaves && animated && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: waveSize,
            height: waveSize,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }}
        >
          <span className="absolute inset-0 rounded-full bg-orange-500/25 animate-ping opacity-60" />
          <span
            className="absolute inset-2 rounded-full border-2 border-red-500/40 animate-pulse"
            style={{ animationDuration: '1.4s' }}
          />
        </div>
      )}

      {/* Ambulance Siren SVG graphic */}
      <svg
        width={px}
        height={px}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 transition-transform duration-300 ${
          isSticker ? 'filter drop-shadow-md hover:scale-110 active:scale-95' : ''
        }`}
        style={{
          filter: isSticker
            ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.22)) drop-shadow(0 0 8px rgba(249,115,22,0.45))'
            : undefined
        }}
      >
        <defs>
          {/* Outer Sticker Die-cut Border Gradient */}
          <linearGradient id="stickerBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFF7ED" />
            <stop offset="100%" stopColor="#FED7AA" />
          </linearGradient>

          {/* Dome Glass Gradient (Amber / Red / Orange) */}
          <linearGradient id="domeGradEmergency" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="35%" stopColor="#EA580C" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* Dome Glass Gradient (Ambulance Red & Blue) */}
          <linearGradient id="domeGradAmbulance" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="45%" stopColor="#DC2626" />
            <stop offset="55%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          {/* Metal / Chrome Base Gradient */}
          <linearGradient id="chromeBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="25%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#F1F5F9" />
            <stop offset="75%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Rubber Gasket Base */}
          <linearGradient id="gasketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* High Intensity LED Core Glow */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#F97316" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>

          {/* Rotating Beacon Light Beam */}
          <linearGradient id="lightBeamGrad" x1="50%" y1="50%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FDBA74" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </linearGradient>

          {/* Gloss Glass Highlight */}
          <linearGradient id="glassGloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* --- 1. STICKER WHITE DIE-CUT CONTOUR BACKGROUND --- */}
        {isSticker && (
          <path
            d="M 23 88
               C 17 88, 14 83, 16 77
               L 22 45
               C 23 25, 36 12, 50 12
               C 64 12, 77 25, 78 45
               L 84 77
               C 86 83, 83 88, 77 88
               Z"
            fill="url(#stickerBorderGrad)"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinejoin="round"
            className="transition-all"
          />
        )}

        {/* --- 2. AMBIENT EMITTING LIGHT RAYS --- */}
        {animated && (
          <g
            className="origin-center"
            style={{
              transformOrigin: '50px 48px',
              animation: 'sirenLightSweep 2.2s linear infinite'
            }}
          >
            {/* Primary rotating light beam */}
            <path
              d="M 50 48 L 94 20 L 98 42 Z"
              fill="url(#lightBeamGrad)"
              opacity="0.75"
            />
            {/* Counter rotating light beam */}
            <path
              d="M 50 48 L 6 76 L 2 54 Z"
              fill="url(#lightBeamGrad)"
              opacity="0.45"
            />
          </g>
        )}

        {/* --- 3. MOUNTING BASE (CHROME & RUBBER GASKET) --- */}
        {/* Rubber bottom pad */}
        <path
          d="M 24 82 C 24 79, 76 79, 76 82 L 74 86 C 74 87, 26 87, 26 86 Z"
          fill="url(#gasketGrad)"
        />

        {/* Chrome metallic bevel base */}
        <path
          d="M 26 74 C 26 71, 74 71, 74 74 L 76 81 C 76 83, 24 83, 24 81 Z"
          fill="url(#chromeBaseGrad)"
          stroke="#475569"
          strokeWidth="0.8"
        />

        {/* Base grip ridges / notches */}
        <line x1="38" y1="75" x2="38" y2="80" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="50" y1="75" x2="50" y2="80" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="62" y1="75" x2="62" y2="80" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />

        {/* --- 4. GLASS DOME (AERODYNAMIC AMBULANCE SIREN LENS) --- */}
        <path
          d="M 28 73
             L 30 46
             C 31 29, 39 18, 50 18
             C 61 18, 69 29, 70 46
             L 72 73
             C 72 75, 28 75, 28 73 Z"
          fill={isAmbulance ? 'url(#domeGradAmbulance)' : 'url(#domeGradEmergency)'}
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeOpacity="0.6"
        />

        {/* --- 5. INTERNAL FRESNEL LENS RIBS (REALISTIC OPTICAL TEXTURE) --- */}
        <g stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="1.5 2">
          <path d="M 33 66 C 33 66, 50 68, 67 66" />
          <path d="M 34 57 C 34 57, 50 59, 66 57" />
          <path d="M 36 48 C 36 48, 50 50, 64 48" />
          <path d="M 39 39 C 39 39, 50 41, 61 39" />
          <path d="M 43 30 C 43 30, 50 32, 57 30" />
        </g>

        {/* Vertical optic ridges */}
        <line x1="42" y1="26" x2="38" y2="72" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.25" />
        <line x1="58" y1="26" x2="62" y2="72" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.25" />

        {/* --- 6. CENTRAL ROTATING / FLASHING LED REFLECTOR BULB --- */}
        <circle
          cx="50"
          cy="49"
          r="14"
          fill="url(#coreGlow)"
          className={animated ? 'animate-pulse' : ''}
          style={{ animationDuration: '0.8s' }}
        />
        {/* Core filament pinpoint */}
        <circle cx="50" cy="49" r="4.5" fill="#FFFFFF" opacity="0.95" />

        {/* --- 7. CURVED GLASS SURFACE SPECULAR HIGHLIGHT (GLOSS SHINE) --- */}
        {/* Left gloss curved highlight */}
        <path
          d="M 34 70
             L 36 46
             C 37 32, 42 22, 48 20
             C 45 23, 40 33, 39 46
             L 37 70 Z"
          fill="url(#glassGloss)"
        />

        {/* Top edge glossy curve */}
        <path
          d="M 44 20
             C 48 19, 52 19, 56 20
             C 54 22, 46 22, 44 20 Z"
          fill="#FFFFFF"
          opacity="0.8"
        />

        {/* Mini star sparkle on the upper left rim */}
        <path
          d="M 40 25 Q 40 29 44 29 Q 40 29 40 33 Q 40 29 36 29 Q 40 29 40 25 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};

/**
 * SirenBadge - Interactive sticker pill badge for headers & CTA buttons
 */
export const SirenBadge = ({
  text = 'IMMEDIATE SOS RESCUE',
  liveStatus = 'ACTIVE',
  size = 'sm',
  className = '',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-600/15 via-red-600/10 to-orange-500/15 border border-orange-500/30 text-orange-600 dark:text-orange-400 font-mono text-xs font-black uppercase tracking-wider backdrop-blur-sm shadow-xs hover:border-orange-500/60 hover:shadow-orange-500/20 transition-all ${className}`}
    >
      <SirenLight size={size} variant="sticker" animated={true} />
      <span className="font-extrabold tracking-wide">{text}</span>
      {liveStatus && (
        <span className="flex items-center gap-1 pl-1 border-l border-orange-400/30 text-[10px] text-orange-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="font-bold text-[9px] uppercase tracking-widest">{liveStatus}</span>
        </span>
      )}
    </div>
  );
};

export default SirenLight;
