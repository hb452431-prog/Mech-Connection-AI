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
  Image as ImageIcon
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20 md:pb-10">
      <UserNavbar />

      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <Link
            to="/user"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-sky-600" />
            <h1 className="text-2xl font-black text-slate-900 font-heading">
              AI Vehicle Assistant
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Describe your vehicle symptoms or upload a picture to get an instant step-by-step solution.
          </p>
        </div>

        {/* Input Card: 2 Ways to explain problem */}
        <div className="clean-card p-6 sm:p-7 space-y-5">
          <form onSubmit={handleAnalyze} className="space-y-4">
            {/* 1. Type the problem */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                1. Type the Problem
              </label>
              <textarea
                rows={3}
                value={typedProblem}
                onChange={(e) => setTypedProblem(e.target.value)}
                placeholder='e.g. "My bike suddenly stopped while riding" or "Car makes a clicking noise when starting"...'
                className="w-full clean-input p-3.5 text-xs sm:text-sm resize-none"
              />

              {/* Sample suggestion chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  'My bike suddenly stopped while riding',
                  'Car battery clicking / won\'t start',
                  'White smoke from engine',
                  'Flat tyre on roadside'
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTypedProblem(sample)}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    "{sample}"
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Upload vehicle image */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                2. Upload Vehicle Image (Optional)
              </label>

              <div className="flex items-center gap-3">
                <label className="btn-secondary px-4 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4 text-sky-600" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imageFile && (
                  <span className="text-xs text-slate-600 truncate max-w-xs">
                    📎 {imageFile.name}
                  </span>
                )}
              </div>

              {imagePreview && (
                <div className="mt-3 relative w-32 h-24 rounded-xl overflow-hidden border border-slate-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Analyze Button */}
            <button
              type="submit"
              disabled={isAnalyzing || (!typedProblem.trim() && !imageFile)}
              className="w-full btn-primary py-3 text-sm font-bold shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Analyzing Problem with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Problem
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI ANALYSIS RESULTS DISPLAY */}
        {analysisResult && (
          <div className="clean-card p-6 sm:p-7 space-y-6 border-l-4 border-l-sky-600 animate-in fade-in duration-200">
            {/* Problem Title & Category Tag */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  AI Diagnostic Result
                </span>

                {/* SIMPLE PROBLEM vs COMPLEX PROBLEM TAG */}
                {analysisResult.type === 'SIMPLE' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    🟢 {analysisResult.badgeText}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    🔴 {analysisResult.badgeText}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs text-slate-500 font-semibold">Problem:</p>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  "{analysisResult.problem}"
                </h2>
                <p className="text-xs text-slate-600 mt-0.5 italic">
                  {analysisResult.advice}
                </p>
              </div>
            </div>

            {/* Step-by-step Solution */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                SOLUTION
              </h3>

              <div className="space-y-2.5">
                {analysisResult.steps.map((step, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-700 block">Step {idx + 1}:</span>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        "{step}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Action Buttons: Find Nearby Garage & Emergency Help */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <Link
                to="/user/garages"
                className="btn-primary py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center"
              >
                <Wrench className="w-4 h-4" />
                Find Nearby Garage
              </Link>

              <Link
                to="/user/emergency"
                className="btn-emergency py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center"
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
