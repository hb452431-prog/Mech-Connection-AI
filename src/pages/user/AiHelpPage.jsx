import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
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
  const [typedProblem, setTypedProblem] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [copied, setCopied] = useState(false);

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
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <UserNavbar />

      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div>
          <Link
            to="/user"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center border border-indigo-200 dark:border-indigo-800 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
                AI Vehicle Diagnostic Assistant
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explain what happened or upload a dashboard photo to get an instant 3-step diagnostic solution.
          </p>
        </div>

        {/* Input Card: 2 Ways to explain problem */}
        <div className="clean-card p-6 sm:p-7 space-y-5 border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <form onSubmit={handleAnalyze} className="space-y-4">
            {/* 1. Type the problem */}
            <div className="space-y-2">
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
                className="w-full clean-input p-3.5 text-xs sm:text-sm resize-none font-medium leading-relaxed"
              />

              {/* Sample suggestion chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">Common symptoms:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Car battery clicking / won\'t start',
                    'Engine overheating with white smoke',
                    'Soft spongy brake pedal',
                    'Sudden vehicle power loss'
                  ].map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickChip(sample)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-700 dark:hover:text-indigo-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      "{sample}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Upload vehicle image */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                2. Upload Vehicle Photo (Optional)
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="btn-secondary px-4 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-2xs">
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
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate max-w-xs">
                      📎 {imageFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-0.5 text-slate-400 hover:text-red-500 rounded transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {imagePreview && (
                <div className="mt-2 relative w-36 h-24 rounded-xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-800 shadow-xs group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors shadow-sm"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Analyze Button */}
            <button
              type="submit"
              disabled={isAnalyzing || (!typedProblem.trim() && !imageFile)}
              className="w-full btn-primary py-3.5 text-sm font-bold shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-cyan-300" />
                  <span>Analyzing Diagnostics with AI Engine...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Diagnose Problem with AI</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI ANALYSIS RESULTS DISPLAY */}
        {analysisResult && (
          <div className="clean-card p-6 sm:p-7 space-y-6 border-l-4 border-l-indigo-600 animate-in fade-in duration-200 shadow-md bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800">
            {/* Header with Problem & Category Badge */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Diagnosis Result
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyReport}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1 font-mono transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  {/* SIMPLE PROBLEM vs COMPLEX PROBLEM */}
                  {analysisResult.type === 'SIMPLE' ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      🟢 {analysisResult.badgeText}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800 flex items-center gap-1.5 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                      🟠 {analysisResult.badgeText}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase font-mono">Identified Issue:</p>
                <h2 className="text-xl font-black text-slate-900 dark:text-white font-heading mt-0.5">
                  "{analysisResult.problem}"
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  💡 {analysisResult.advice}
                </p>
              </div>
            </div>

            {/* 3-Step Solution */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Step-by-Step Resolution Steps
              </h3>

              <div className="space-y-2.5">
                {analysisResult.steps.map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl flex items-start gap-3 border border-slate-100 dark:border-slate-800">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs font-mono">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Step {idx + 1}:</span>
                      <p className="text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed font-medium mt-0.5">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Action Buttons: Find Nearby Garage & Emergency Help */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                to="/user/garages"
                className="btn-primary py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center"
              >
                <Wrench className="w-4 h-4" />
                Find Nearby Garage
              </Link>

              <Link
                to="/user/emergency"
                className="btn-emergency py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center group shadow-md"
              >
                <SirenLight size="xs" variant="sticker" animated={true} />
                <span>Request Priority Rescue</span>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AiHelpPage;
