import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Volume2, 
  Eye, 
  Binary, 
  Play, 
  Pause, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  DollarSign,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { MOCK_ACOUSTIC_SAMPLES, MOCK_WARNING_LIGHTS, MOCK_OBD_CODES } from '../../services/mockData';

export const QuickDiagnosticWidget = () => {
  const [activeTab, setActiveTab] = useState('acoustic'); // 'acoustic' | 'visual' | 'obd'
  
  // Acoustic state
  const [selectedSound, setSelectedSound] = useState(MOCK_ACOUSTIC_SAMPLES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Visual state
  const [selectedLight, setSelectedLight] = useState(MOCK_WARNING_LIGHTS[0]);

  // OBD state
  const [selectedObd, setSelectedObd] = useState(MOCK_OBD_CODES[0]);

  const togglePlayAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <section className="py-20 bg-navy-900/60 border-y border-slate-800 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive AI Diagnostic Lab
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
            Experience AI Vehicle Triage in Seconds
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Test how our proprietary acoustic pattern recognition, dashboard optical scanner, and ECU DTC decoder identify problems with precision.
          </p>
        </div>

        {/* Diagnostic Mode Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <button
              onClick={() => { setActiveTab('acoustic'); setIsPlayingAudio(false); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'acoustic'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              1. Acoustic Engine Sound AI
            </button>

            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'visual'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              2. Warning Light Optical AI
            </button>

            <button
              onClick={() => setActiveTab('obd')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'obd'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Binary className="w-4 h-4" />
              3. OBD-II DTC Code Decoder
            </button>
          </div>
        </div>

        {/* Tab 1: Acoustic Sound Analysis */}
        {activeTab === 'acoustic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Sound Selector List */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Select an audio sample to test:
              </p>
              {MOCK_ACOUSTIC_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedSound(sample);
                    setIsPlayingAudio(true);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedSound.id === sample.id
                      ? 'bg-cyan-950/40 border-cyan-500/50 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-white">{sample.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                      {sample.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{sample.description}</p>
                </button>
              ))}
            </div>

            {/* AI Waveform & Report Card */}
            <div className="lg:col-span-7">
              <div className="glass-panel-glow rounded-2xl p-6 h-full flex flex-col justify-between border-cyan-500/30">
                <div className="space-y-5">
                  {/* Waveform Visualizer Banner */}
                  <div className="bg-navy-950 rounded-xl p-5 border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlayAudio}
                          className="w-10 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 flex items-center justify-center transition-transform active:scale-95"
                        >
                          {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                        </button>
                        <div>
                          <p className="text-xs text-slate-400 font-mono">
                            {isPlayingAudio ? 'Analyzing Audio Spectrum Live...' : 'Click Play to run AI Spectrum Match'}
                          </p>
                          <p className="text-sm font-bold text-white">{selectedSound.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-cyan-400 block font-bold">
                          {selectedSound.confidenceScore}% MATCH
                        </span>
                        <span className="text-[10px] text-slate-400">{selectedSound.frequencyHz}</span>
                      </div>
                    </div>

                    {/* Animated Audio Equalizer Bars */}
                    <div className="flex items-end justify-between h-14 gap-1 px-2 pt-2 border-t border-slate-800">
                      {selectedSound.audioWaveform.map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t transition-all duration-200"
                          style={{
                            height: isPlayingAudio ? `${Math.max(15, (height * ((i % 2 === 0) ? 1 : 0.8)))}%` : '20%',
                            opacity: isPlayingAudio ? 1 : 0.4
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* AI Diagnosis Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400 uppercase font-mono">Likely Root Cause</span>
                      <p className="text-sm font-semibold text-white leading-snug">{selectedSound.likelyRootCause}</p>
                    </div>

                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400 uppercase font-mono">Estimated Repair Cost</span>
                      <p className="text-lg font-black text-amber-400 font-mono">{selectedSound.estimatedCost}</p>
                    </div>
                  </div>

                  {/* Danger Advisory */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-300">Safety & Driveability Advisory</p>
                      <p className="text-xs text-slate-300">{selectedSound.dangerLevel}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Need live microphone vehicle test?</span>
                  <Link
                    to="/diagnose"
                    className="btn-primary-glow px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    Open Full Sound Studio
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Warning Light Scanner */}
        {activeTab === 'visual' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Warning Light Buttons */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {MOCK_WARNING_LIGHTS.map((light) => (
                <button
                  key={light.id}
                  onClick={() => setSelectedLight(light)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    selectedLight.id === light.id
                      ? 'bg-slate-800/90 border-cyan-400 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black"
                      style={{ backgroundColor: `${light.color}20`, color: light.color }}
                    >
                      ⚠️
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      Score: {light.urgencyScore}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white">{light.name}</span>
                </button>
              ))}
            </div>

            {/* Diagnostic Details */}
            <div className="lg:col-span-7">
              <div className="glass-panel-glow rounded-2xl p-6 h-full flex flex-col justify-between border-cyan-500/30">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold"
                        style={{ backgroundColor: `${selectedLight.color}25`, color: selectedLight.color }}
                      >
                        ⚠️
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white font-heading">{selectedLight.name}</h4>
                        <p className="text-xs text-slate-400">Severity: <strong className="text-rose-400">{selectedLight.severity}</strong></p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      URGENCY: {selectedLight.urgencyScore}/100
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-mono">AI Meaning & System Trigger</span>
                    <p className="text-sm text-slate-200 leading-relaxed">{selectedLight.description}</p>
                  </div>

                  <div className="bg-rose-950/30 p-4 rounded-xl border border-rose-500/30 space-y-2">
                    <span className="text-xs text-rose-400 uppercase font-mono font-bold flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" />
                      Immediate Driver Protocol
                    </span>
                    <p className="text-sm text-rose-200 font-medium leading-relaxed">{selectedLight.action}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Take a photo of your dashboard for instant AI OCR scan</span>
                  <Link
                    to="/diagnose"
                    className="btn-primary-glow px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    Upload Dashboard Photo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: OBD-II Trouble Code Decoder */}
        {activeTab === 'obd' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* DTC Selector List */}
            <div className="lg:col-span-5 space-y-2.5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Common ECU Trouble Codes:
              </p>
              {MOCK_OBD_CODES.map((code) => (
                <button
                  key={code.code}
                  onClick={() => setSelectedObd(code)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedObd.code === code.code
                      ? 'bg-cyan-950/40 border-cyan-500/50 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm font-black text-cyan-400">{code.code}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {code.system}
                    </span>
                  </div>
                  <p className="text-xs text-white font-medium line-clamp-1">{code.title}</p>
                </button>
              ))}
            </div>

            {/* OBD Code Detail Card */}
            <div className="lg:col-span-7">
              <div className="glass-panel-glow rounded-2xl p-6 h-full flex flex-col justify-between border-cyan-500/30">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black font-mono text-cyan-400">{selectedObd.code}</span>
                        <span className="px-2 py-0.5 text-xs font-bold rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {selectedObd.severity} Severity
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{selectedObd.title}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-mono block">Estimated Cost</span>
                      <span className="text-lg font-black text-white font-mono">
                        ${selectedObd.estimatedCost.min} - ${selectedObd.estimatedCost.max}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase font-mono block mb-1">AI Recommendation</span>
                    <p className="text-xs sm:text-sm text-slate-200">{selectedObd.recommendation}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block mb-1">Can I Drive It?</span>
                      <p className="font-semibold text-white">{selectedObd.canDrive}</p>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block mb-1">DIY Fix Safety</span>
                      <p className="font-semibold text-cyan-300">{selectedObd.diyDifficulty}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Search over 5,000+ manufacturer DTC codes</span>
                  <Link
                    to="/diagnose"
                    className="btn-primary-glow px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    Open OBD-II Terminal
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickDiagnosticWidget;
