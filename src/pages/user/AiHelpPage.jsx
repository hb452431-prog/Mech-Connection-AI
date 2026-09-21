import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { aiService } from '../../services/aiService';
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
  HelpCircle
} from 'lucide-react';

export const AiHelpPage = () => {
  const navigate = useNavigate();
  const [typedProblem, setTypedProblem] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
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

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col pb-24 md:pb-12">
      <UserNavbar />

      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div>
          <Link
            to="/user"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              AI Vehicle Assistant
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explain what happened or upload a picture to get an instant 3-step diagnostic solution.
          </p>
        </div>

        {/* Input Card: 2 Ways to explain problem */}
        <div className="clean-card p-6 sm:p-7 space-y-5 border-slate-200 shadow-sm">
          <form onSubmit={handleAnalyze} className="space-y-4">
            {/* 1. Type the problem */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                1. Describe the Problem
              </label>
              <textarea
                rows={3}
                value={typedProblem}
                onChange={(e) => setTypedProblem(e.target.value)}
                placeholder='e.g. "My bike suddenly stopped while riding" or "Car makes a loud clicking sound when I turn key"...'
                className="w-full clean-input p-3.5 text-xs sm:text-sm resize-none font-medium leading-relaxed"
              />

              {/* Sample suggestion chips */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Quick examples:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'My bike suddenly stopped while riding',
                    'Car battery clicking / won\'t start',
                    'White smoke from engine',
                    'Spongy brake pedal / squeak'
                  ].map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickChip(sample)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 transition-colors"
                    >
                      "{sample}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Upload vehicle image */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                2. Upload Vehicle Photo (Optional)
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="btn-secondary px-4 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-2xs">
                  <Upload className="w-4 h-4 text-indigo-600" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imageFile && (
                  <span className="text-xs text-slate-600 font-medium bg-slate-100 px-3 py-1.5 rounded-lg truncate max-w-xs">
                    📎 {imageFile.name}
                  </span>
                )}
              </div>

              {imagePreview && (
                <div className="mt-2 relative w-32 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Analyze Button */}
            <button
              type="submit"
              disabled={isAnalyzing || (!typedProblem.trim() && !imageFile)}
              className="w-full btn-primary py-3.5 text-sm font-bold shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Analyzing with AI Diagnostic Engine...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Analyze Problem</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI ANALYSIS RESULTS DISPLAY */}
        {analysisResult && (
          <div className="clean-card p-6 sm:p-7 space-y-6 border-l-4 border-l-indigo-600 animate-in fade-in duration-200 shadow-md">
            {/* Header with Problem & Category Badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Diagnosis Result
                </span>

                {/* SIMPLE PROBLEM vs COMPLEX PROBLEM */}
                {analysisResult.type === 'SIMPLE' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    🟢 {analysisResult.badgeText}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200 flex items-center gap-1.5 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                    🟠 {analysisResult.badgeText}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase font-mono">Problem:</p>
                <h2 className="text-xl font-black text-slate-900 font-heading">
                  "{analysisResult.problem}"
                </h2>
                <p className="text-xs text-slate-600 mt-1 italic font-medium">
                  {analysisResult.advice}
                </p>
              </div>
            </div>

            {/* 3-Step Solution */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                SOLUTION
              </h3>

              <div className="space-y-2.5">
                {analysisResult.steps.map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl flex items-start gap-3 border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-700 block">Step {idx + 1}:</span>
                      <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium mt-0.5">
                        "{step}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Action Buttons: Find Nearby Garage & Emergency Help */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <Link
                to="/user/garages"
                className="btn-primary py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center"
              >
                <Wrench className="w-4 h-4" />
                Find Nearby Garage
              </Link>

              <Link
                to="/user/emergency"
                className="btn-emergency py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center"
              >
                <AlertTriangle className="w-4 h-4" />
                Emergency Help
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AiHelpPage;
