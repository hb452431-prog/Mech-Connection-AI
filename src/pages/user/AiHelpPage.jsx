import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { AiHelpSkeleton } from '../../components/common/Skeleton';
import MechLoader from '../../components/common/MechLoader';
import { aiService } from '../../services/aiService';
import { SirenLight } from '../../components/common/SirenLight';
import { 
  Sparkles, 
  Upload, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Wrench, 
  AlertTriangle,
  ArrowRight,
  Image as ImageIcon,
  Check,
  Zap,
  HelpCircle,
  Copy,
  X,
  RefreshCw
} from 'lucide-react';

export const AiHelpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [typedProblem, setTypedProblem] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!typedProblem.trim() && !imageFile) return;

    setIsAnalyzing(true);
    try {
      const result = await aiService.analyzeProblem(typedProblem, !!imageFile);
      setAnalysisResult(result);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleQuickChip = (text) => {
    setTypedProblem(text);
  };

  const handleCopyReport = () => {
    if (!analysisResult) return;
    const text = `MECH CONNECT AI Diagnostic Report:\nProblem: ${analysisResult.problem}\nCategory: ${analysisResult.badgeText}\nAdvice: ${analysisResult.advice}\nSteps:\n${analysisResult.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-28 sm:pb-32 md:pb-16 transition-colors duration-200">
      <UserNavbar />

      {/* Fullscreen Violet Revolving Nut, Bolt & Spanner Loader during AI Prompt Analysis */}
      {isAnalyzing && (
        <MechLoader
          fullScreen={true}
          isAi={true}
          message="AI Vehicle Diagnostic Engine Running..."
          subMessage="Processing Automotive Neural Diagnostic Protocol"
        />
      )}

      {loading ? (
        <AiHelpSkeleton />
      ) : (
        <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
        {/* Header */}
        <div className="space-y-2">
          <Link
            to="/user"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3.5 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center border border-indigo-200 dark:border-indigo-800 shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
                AI Vehicle Diagnostic Assistant
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Explain what happened or upload a dashboard photo to get an instant 3-step diagnostic solution.
          </p>
        </div>

        {/* Input Card: 2 Ways to explain problem */}
        <div className="clean-card p-7 sm:p-10 space-y-7 border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-3xl">
          <form onSubmit={handleAnalyze} className="space-y-6">
            {/* 1. Type the problem */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                  1. Describe the Problem
                </label>
                {typedProblem && (
                  <button
                    type="button"
                    onClick={() => setTypedProblem('')}
                    className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium"
                  >
                    Clear Text
                  </button>
                )}
              </div>

              <textarea
                rows={3}
                value={typedProblem}
                onChange={(e) => setTypedProblem(e.target.value)}
                placeholder='e.g. "My bike suddenly stopped while riding" or "Car makes a loud clicking sound when I turn key"...'
                className="w-full clean-input p-4 text-xs sm:text-sm resize-none font-medium leading-relaxed"
              />

              {/* Sample suggestion chips */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono uppercase">Common breakdown symptoms:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Car battery clicking / won\'t start',
                    'Engine overheating with smoke',
                    'Soft spongy brake pedal',
                    'Sudden vehicle power loss'
                  ].map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickChip(sample)}
                      className="text-xs sm:text-sm font-bold p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/60 hover:text-amber-800 dark:hover:text-amber-300 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all text-left"
                    >
                      💡 {sample}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Upload vehicle image */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <label className="block text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                2. Upload Vehicle Photo (Optional)
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="btn-secondary px-5 py-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-xs rounded-xl">
                  <Upload className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{imageFile ? 'Change Photo' : 'Upload Warning Light / Engine Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imageFile && (
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate max-w-xs">
                      📎 {imageFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {imagePreview && (
                <div className="mt-3 relative w-44 h-32 rounded-2xl overflow-hidden border-2 border-indigo-300 dark:border-indigo-800 shadow-md group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Analyze Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isAnalyzing || (!typedProblem.trim() && !imageFile)}
                className="w-full btn-rapido py-4 sm:py-5 text-base sm:text-lg font-black shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin text-slate-950" />
                    <span>ANALYZING DIAGNOSTICS WITH AI ENGINE...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>DIAGNOSE PROBLEM WITH AI</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* AI ANALYSIS RESULTS DISPLAY */}
        {analysisResult && (
          <div className="clean-card p-7 sm:p-10 space-y-7 border-l-4 border-l-amber-500 animate-in fade-in duration-200 shadow-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl">
            {/* Header with Problem & Category Badge */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Diagnosis Result
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyReport}
                    className="text-xs px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-mono transition-colors font-bold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  {/* SIMPLE PROBLEM vs COMPLEX PROBLEM */}
                  {analysisResult.type === 'SIMPLE' ? (
                    <span className="px-4 py-2 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      🟢 {analysisResult.badgeText}
                    </span>
                  ) : (
                    <span className="px-4 py-2 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800 flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                      🟠 {analysisResult.badgeText}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-black uppercase font-mono">Identified Issue:</p>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading mt-1">
                  "{analysisResult.problem}"
                </h2>
                <p className="text-sm text-slate-700 dark:text-slate-200 mt-3 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  💡 {analysisResult.advice}
                </p>
              </div>
            </div>

            {/* 3-Step Solution */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Step-by-Step Resolution Steps
              </h3>

              <div className="space-y-3.5">
                {analysisResult.steps.map((step, idx) => (
                  <div key={idx} className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl flex items-start gap-4 border border-slate-200 dark:border-slate-700">
                    <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs font-mono">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono block">Step {idx + 1}</span>
                      <p className="text-sm sm:text-base text-slate-900 dark:text-white leading-relaxed font-bold mt-1">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Action Buttons: Find Nearby Garage & Emergency Help */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                to="/user/garages"
                className="btn-primary py-4 text-sm sm:text-base font-black flex items-center justify-center gap-2 text-center rounded-2xl"
              >
                <Wrench className="w-4 h-4" />
                <span>FIND NEARBY GARAGE</span>
              </Link>

              <Link
                to="/user/emergency"
                className="btn-emergency py-4 text-sm sm:text-base font-black flex items-center justify-center gap-2 text-center group shadow-lg rounded-2xl"
              >
                <SirenLight size="xs" variant="sticker" animated={true} />
                <span>REQUEST PRIORITY RESCUE</span>
              </Link>
            </div>
          </div>
        )}
      </main>
      )}
    </div>
  );
};

export default AiHelpPage;
