import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  Volume2, 
  Eye, 
  Binary, 
  Search, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Upload, 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Wrench, 
  FileText, 
  Share2, 
  Download,
  Car,
  Activity,
  DollarSign
} from 'lucide-react';
import { aiDiagnosticService } from '../services/aiDiagnosticService';
import { MOCK_ACOUSTIC_SAMPLES, MOCK_WARNING_LIGHTS, MOCK_OBD_CODES } from '../services/mockData';
import { useToast } from '../context/ToastContext';

export const DiagnosticsPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('nlp'); // 'nlp' | 'acoustic' | 'visual' | 'obd'
  
  // NLP Query state
  const [userQuery, setUserQuery] = useState(initialQuery);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosticReport, setDiagnosticReport] = useState(null);

  // Acoustic Studio state
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [micSeconds, setMicSeconds] = useState(0);
  const [selectedSoundSample, setSelectedSoundSample] = useState(MOCK_ACOUSTIC_SAMPLES[0]);
  const [isPlayingSample, setIsPlayingSample] = useState(false);

  // Visual Scanner state
  const [selectedWarningLight, setSelectedWarningLight] = useState(MOCK_WARNING_LIGHTS[0]);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);

  // OBD state
  const [obdCodeSearch, setObdCodeSearch] = useState('');
  const [selectedObdResult, setSelectedObdResult] = useState(MOCK_OBD_CODES[0]);

  // Execute search if query was passed in URL
  useEffect(() => {
    if (initialQuery) {
      handleNlpDiagnosis(initialQuery);
    }
  }, [initialQuery]);

  // Mic timer effect
  useEffect(() => {
    let interval = null;
    if (isRecordingMic) {
      interval = setInterval(() => {
        setMicSeconds((prev) => {
          if (prev >= 6) {
            setIsRecordingMic(false);
            showToast('AI finished processing acoustic recording!', 'success');
            handleAcousticAnalysis(selectedSoundSample);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setMicSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingMic]);

  const handleNlpDiagnosis = async (text) => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await aiDiagnosticService.diagnoseSymptomText(text);
      setDiagnosticReport(result);
      showToast('AI Diagnostic Report Generated', 'success');
    } catch (e) {
      showToast('Failed to run AI triage', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAcousticAnalysis = async (sample) => {
    setIsAnalyzing(true);
    try {
      const result = await aiDiagnosticService.diagnoseAcousticAudio(sample.id);
      setDiagnosticReport({
        type: 'ACOUSTIC_MATCH',
        title: result.name,
        category: result.category,
        severity: result.severity,
        severityColor: result.severityColor,
        confidenceScore: result.confidenceScore,
        explanation: result.description,
        canDrive: result.dangerLevel,
        diySafety: 'Professional Diagnostic Recommended',
        estimatedCost: result.estimatedCost,
        troubleshootingSteps: [
          `Detected acoustic frequency peak: ${result.frequencyHz}`,
          result.likelyRootCause,
          'Recommend workshop mechanical verification and torque test.'
        ]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVisualAnalysis = async (light) => {
    setSelectedWarningLight(light);
    setIsAnalyzing(true);
    try {
      const result = await aiDiagnosticService.diagnoseWarningLight(light.id);
      setDiagnosticReport({
        type: 'VISUAL_WARNING',
        title: `${result.name} Dashboard Indicator`,
        category: 'Instrument Cluster & Sensors',
        severity: result.severity.includes('Critical') ? 'Critical' : 'High',
        severityColor: result.severity.includes('Critical') ? 'rose' : 'amber',
        confidenceScore: 99.2,
        explanation: result.description,
        canDrive: result.action,
        diySafety: 'Check owner manual / OBD Scanner',
        estimatedCost: '$65 - $320',
        troubleshootingSteps: [
          'Verify fluid reservoirs and wiring harnesses.',
          'Connect OBD-II scanner to read triggered diagnostic trouble codes.',
          result.action
        ]
      });
      showToast(`Analyzed ${light.name} indicator`, 'info');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleObdSelect = (code) => {
    setSelectedObdResult(code);
    setDiagnosticReport({
      type: 'OBD_DTC',
      title: `${code.code} - ${code.title}`,
      category: code.system,
      severity: code.severity,
      severityColor: code.severityColor,
      confidenceScore: 99.8,
      explanation: code.recommendation,
      canDrive: code.canDrive,
      diySafety: code.diyDifficulty,
      estimatedCost: `$${code.estimatedCost.min} - $${code.estimatedCost.max}`,
      troubleshootingSteps: code.causes
    });
    showToast(`Loaded details for OBD-II code ${code.code}`, 'info');
  };

  const filteredObdCodes = MOCK_OBD_CODES.filter((c) => 
    c.code.toLowerCase().includes(obdCodeSearch.toLowerCase()) ||
    c.title.toLowerCase().includes(obdCodeSearch.toLowerCase()) ||
    c.system.toLowerCase().includes(obdCodeSearch.toLowerCase())
  );

  return (
    <div className="py-10 bg-navy-950 min-h-screen">
      <div className="container-custom">
        {/* Page Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 font-mono">
              <Cpu className="w-3.5 h-3.5" />
              AI Triage Station v3.8
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
              AI Vehicle Diagnostic Center
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Multi-modal engine acoustics, computer vision warning light scanner, and OBD-II trouble code decoder.
            </p>
          </div>

          {/* Connected Vehicle Banner */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-mono">Active Target Vehicle</p>
              <p className="text-sm font-bold text-white">2023 Tesla Model Y AWD</p>
            </div>
          </div>
        </div>

        {/* Diagnostic Mode Navigation Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-8 gap-2 scrollbar-none">
          {[
            { id: 'nlp', label: '1. Symptom & AI Assistant', icon: Sparkles },
            { id: 'acoustic', label: '2. Acoustic Engine Sound Studio', icon: Volume2 },
            { id: 'visual', label: '3. Warning Light & Photo Scanner', icon: Eye },
            { id: 'obd', label: '4. OBD-II DTC Code Database', icon: Binary },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Input Area + Diagnostic Report Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Input Modules */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mode 1: NLP Symptom Query */}
            {activeTab === 'nlp' && (
              <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-cyan-500/30 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Describe Your Vehicle's Symptoms
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Describe what you hear, smell, feel, or see while driving or idling.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNlpDiagnosis(userQuery);
                  }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <textarea
                      rows={4}
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      placeholder="e.g. My car shakes violently when I brake from highway speeds, or there is a loud high-pitched squeal when I turn on the A/C..."
                      className="w-full glass-input p-4 rounded-2xl text-sm text-slate-100 placeholder-slate-500 resize-none font-medium"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2">
                      {['Brake Shudder', 'Engine Sputter', 'White Smoke', 'No Crank / Dead'].map((sample) => (
                        <button
                          key={sample}
                          type="button"
                          onClick={() => {
                            setUserQuery(sample);
                            handleNlpDiagnosis(sample);
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={isAnalyzing || !userQuery.trim()}
                      className="btn-primary-glow px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <>
                          <Activity className="w-4 h-4 animate-spin" />
                          Analyzing Symptoms...
                        </>
                      ) : (
                        <>
                          <span>Run AI Analysis</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Mode 2: Acoustic Sound Studio */}
            {activeTab === 'acoustic' && (
              <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-cyan-500/30 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Acoustic Engine Sound Analysis Studio
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Record your engine noise live through your microphone or test pre-recorded acoustic failure signatures.
                  </p>
                </div>

                {/* Microphone Live Simulator */}
                <div className="bg-navy-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => setIsRecordingMic(!isRecordingMic)}
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                        isRecordingMic
                          ? 'bg-rose-500 text-white shadow-2xl shadow-rose-600/60 ring-8 ring-rose-500/20 animate-pulse'
                          : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500 hover:text-navy-950'
                      }`}
                    >
                      {isRecordingMic ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </button>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      {isRecordingMic ? `Listening to Engine Noise... (${micSeconds}/6s)` : 'Tap to Record Live Vehicle Sound'}
                    </p>
                    <p className="text-xs text-slate-400">Hold microphone near open hood, wheel arch, or exhaust</p>
                  </div>

                  {isRecordingMic && (
                    <div className="flex items-center justify-center gap-1.5 h-10 px-4">
                      {[30, 60, 90, 45, 80, 100, 70, 40, 60, 95, 80, 50, 70, 90, 40].map((h, idx) => (
                        <div
                          key={idx}
                          className="w-1.5 bg-rose-500 rounded-full animate-pulse"
                          style={{ height: `${h}%`, animationDuration: `${0.3 + (idx % 4) * 0.2}s` }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Pre-recorded Samples Selector */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Or select a benchmark audio sample:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MOCK_ACOUSTIC_SAMPLES.map((sample) => (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => {
                          setSelectedSoundSample(sample);
                          handleAcousticAnalysis(sample);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          selectedSoundSample.id === sample.id
                            ? 'bg-cyan-950/40 border-cyan-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{sample.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                            {sample.confidenceScore}%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{sample.category}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mode 3: Warning Light & Photo Scanner */}
            {activeTab === 'visual' && (
              <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-cyan-500/30 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Dashboard Warning Light Optical AI
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Upload a photo of your illuminated instrument cluster or tap any warning icon below.
                  </p>
                </div>

                {/* Image Upload Simulator */}
                <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 text-center bg-navy-950/60 transition-colors">
                  <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-bold text-white">Upload Dashboard Photo / Screenshot</p>
                  <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP up to 15MB</p>
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Simulating camera photo capture scan...', 'info');
                      handleVisualAnalysis(MOCK_WARNING_LIGHTS[0]);
                    }}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700 inline-flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Simulate Live Photo Scan
                  </button>
                </div>

                {/* Grid of Common Warning Lights */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Select Warning Icon to Inspect:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {MOCK_WARNING_LIGHTS.map((light) => (
                      <button
                        key={light.id}
                        type="button"
                        onClick={() => handleVisualAnalysis(light)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          selectedWarningLight.id === light.id
                            ? 'bg-slate-800 border-cyan-400 ring-1 ring-cyan-400'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xl block mb-1">⚠️</span>
                        <p className="text-xs font-bold text-white leading-tight">{light.name}</p>
                        <span className="text-[10px] text-rose-400 block mt-1">{light.severity}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mode 4: OBD-II Code Database */}
            {activeTab === 'obd' && (
              <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-cyan-500/30 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    OBD-II Diagnostic Trouble Code (DTC) Decoder
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Search ECU fault codes directly from handheld scanners, Elm327, or car dashboard diagnostics.
                  </p>
                </div>

                {/* Code Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={obdCodeSearch}
                    onChange={(e) => setObdCodeSearch(e.target.value)}
                    placeholder="Search code e.g. P0300, P0420, P0171, P0128..."
                    className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm font-mono text-white placeholder-slate-500"
                  />
                </div>

                {/* OBD Code Results List */}
                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {filteredObdCodes.map((code) => (
                    <button
                      key={code.code}
                      type="button"
                      onClick={() => handleObdSelect(code)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                        selectedObdResult?.code === code.code
                          ? 'bg-cyan-950/40 border-cyan-400'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-black text-cyan-400">{code.code}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {code.system}
                          </span>
                        </div>
                        <p className="text-xs text-white font-medium mt-1">{code.title}</p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-mono font-bold text-white block">
                          ${code.estimatedCost.min} - ${code.estimatedCost.max}
                        </span>
                        <span className="text-[10px] text-amber-400">{code.severity}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic AI Diagnostic Report */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-cyan-500/40 space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                  <h3 className="text-lg font-bold text-white font-heading">
                    AI Diagnostic Report
                  </h3>
                </div>
                {diagnosticReport && (
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                    {diagnosticReport.confidenceScore || 96}% MATCH
                  </span>
                )}
              </div>

              {diagnosticReport ? (
                <div className="space-y-5">
                  {/* Title & Severity */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono uppercase text-slate-400">{diagnosticReport.category}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30">
                        {diagnosticReport.severity} Severity
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white leading-tight">{diagnosticReport.title}</h4>
                  </div>

                  {/* AI Explanation */}
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                    <span className="text-xs text-slate-400 uppercase font-mono font-bold">AI Triage Breakdown</span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{diagnosticReport.explanation}</p>
                  </div>

                  {/* Can I Drive It? */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Can I Still Drive The Vehicle?
                    </span>
                    <p className="text-xs text-slate-300 leading-normal">{diagnosticReport.canDrive}</p>
                  </div>

                  {/* Estimated Cost & DIY rating */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimated Cost</span>
                      <span className="text-base font-black text-emerald-400 font-mono">
                        {diagnosticReport.estimatedCost || '$120 - $380'}
                      </span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">DIY Safety</span>
                      <span className="text-xs font-bold text-cyan-300">
                        {diagnosticReport.diySafety || 'Moderate'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800">
                    <Link
                      to={`/mechanics?service=${encodeURIComponent(diagnosticReport.title)}`}
                      className="w-full btn-primary-glow py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Wrench className="w-4 h-4" />
                      Book Certified Specialist for this Issue
                    </Link>

                    <Link
                      to="/sos"
                      className="w-full btn-emergency-glow py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-center"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Request Emergency Roadside Tow
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <Cpu className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
                  <p className="text-sm font-bold text-slate-300">Ready for Diagnostic Input</p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Type a symptom description, trigger the audio mic, or pick an OBD trouble code to generate an AI report.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsPage;
