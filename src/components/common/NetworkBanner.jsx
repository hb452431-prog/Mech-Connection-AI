import React, { useState } from 'react';
import { useNetwork } from '../../context/NetworkContext';
import { 
  Wifi, 
  WifiOff, 
  Activity, 
  RotateCcw, 
  Zap, 
  ChevronUp, 
  ChevronDown, 
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const NetworkBanner = () => {
  const { 
    isOnline, 
    effectiveType, 
    downlink, 
    rtt, 
    isSlowNetwork, 
    isSimulatedSlow, 
    networkLabel, 
    networkColor,
    toggleSimulateSlowNetwork, 
    recheckNetwork, 
    isRechecking 
  } = useNetwork();

  const [expanded, setExpanded] = useState(false);

  return (
    <aside 
      aria-label="Network telemetry & status controls"
      className="fixed bottom-20 md:bottom-5 right-4 md:right-6 z-50 transition-all duration-300"
    >
      {/* Expanded Control Card */}
      {expanded && (
        <div className="mb-2 p-4 w-72 sm:w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-800 shadow-glass-card dark:shadow-glass-dark text-slate-800 dark:text-slate-200 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span className="text-xs font-black uppercase tracking-wider font-heading">
                Network Telemetry
              </span>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Connection State:</span>
              <span className="font-bold flex items-center gap-1.5 font-mono">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                {isOnline ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Bandwidth & Latency:</span>
              <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                {isSimulatedSlow ? '~0.3 Mbps • 920ms' : `${downlink} Mbps • ${rtt}ms`}
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 dark:text-slate-400">Active Mode:</span>
              <span className={`font-bold font-mono ${isSlowNetwork ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {isSlowNetwork ? 'Skeleton Loading Active' : 'Normal Rendering'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={toggleSimulateSlowNetwork}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                isSimulatedSlow
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {isSimulatedSlow ? 'Turn Off Slow Network' : 'Simulate Less Network (Test Skeleton)'}
            </button>

            <button
              type="button"
              onClick={recheckNetwork}
              disabled={isRechecking}
              className="w-full py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRechecking ? 'animate-spin text-blue-600' : ''}`} />
              {isRechecking ? 'Probing Network...' : 'Re-check Connection'}
            </button>
          </div>
        </div>
      )}

      {/* Floating Status Pill Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setExpanded(prev => !prev)}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full backdrop-blur-xl border shadow-lg transition-all duration-200 text-xs font-bold ${
            isSlowNetwork
              ? 'bg-amber-500/90 hover:bg-amber-600 text-white border-amber-400 shadow-glow-amber'
              : !isOnline
              ? 'bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-glow-red animate-pulse'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border-slate-200/90 dark:border-slate-800/90 shadow-glass-card dark:shadow-glass-dark'
          }`}
          title="Click to view network telemetry or simulate less network"
        >
          {isSlowNetwork ? (
            <>
              <WifiOff className="w-3.5 h-3.5 animate-pulse" />
              <span>Less Network ({isSimulatedSlow ? 'Simulated' : effectiveType}) • Skeleton Active</span>
            </>
          ) : !isOnline ? (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline • Skeleton Active</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Network: {networkLabel}</span>
              <span className="sm:hidden">Online</span>
            </>
          )}

          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5 opacity-70 ml-0.5" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 opacity-70 ml-0.5" />
          )}
        </button>

        {/* Quick One-Click Toggle for Immediate Testing */}
        <button
          type="button"
          onClick={toggleSimulateSlowNetwork}
          className={`px-3 py-2 rounded-full text-xs font-bold border transition-all duration-200 shadow-sm hidden sm:flex items-center gap-1.5 ${
            isSimulatedSlow
              ? 'bg-slate-900 text-white border-slate-700 hover:bg-black'
              : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow-glow-blue'
          }`}
          title={isSimulatedSlow ? 'Resume normal network speed' : 'Test skeleton loading on this page'}
        >
          <Zap className="w-3 h-3 text-amber-300" />
          {isSimulatedSlow ? 'Resume Normal' : 'Test Less Network'}
        </button>
      </div>
    </aside>
  );
};

export default NetworkBanner;
