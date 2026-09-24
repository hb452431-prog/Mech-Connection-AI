import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { AuthSkeleton } from '../../components/common/Skeleton';
import { authService } from '../../services/authService';
import ThemeToggle from '../../components/common/ThemeToggle';
import { Wrench, ArrowLeft, CheckCircle2, ShieldCheck, Eye, EyeOff, Sparkles, Building2 } from 'lucide-react';

export const MechanicAuthPage = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Form states
  const [garageName, setGarageName] = useState('Apex Auto Care & Diagnostics');
  const [mechanicName, setMechanicName] = useState('David Miller');
  const [phone, setPhone] = useState('+1 555-4321');
  const [email, setEmail] = useState('david@apexauto.com');
  const [garageAddress, setGarageAddress] = useState('142 Market Street, Downtown');
  const [services, setServices] = useState('Engine Repair, Battery, Brakes, Tyre, 24/7 Roadside');
  const [password, setPassword] = useState('Mech#MasterKey77');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await authService.mechanicRegister({
          garageName,
          mechanicName,
          phone,
          email,
          garageAddress,
          services
        });
      } else {
        await authService.mechanicLogin(email, password);
      }
      navigate('/mechanic');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('david@apexauto.com');
    setPassword('Mech#MasterKey77');
    setGarageName('Apex Auto Care & Diagnostics');
    setMechanicName('David Miller');
    setPhone('+1 555-4321');
    setGarageAddress('142 Market Street, Downtown');
    setServices('Engine Repair, Battery, Brakes, Tyre, 24/7 Roadside');
  };

  if (pageLoading) {
    return <AuthSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center px-4 py-8 relative transition-colors duration-200 animate-in fade-in duration-300">
      {/* Top right Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portal Selection
        </Link>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <BrandLogo size="md" clickable={false} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200/80 dark:border-indigo-800 shadow-2xs font-mono">
            <Wrench className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Mechanic & Garage Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
            {isRegister ? 'Register Workshop' : 'Mechanic Partner Login'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            {isRegister
              ? 'Register your workshop to receive nearby driver assistance requests on live radar.'
              : 'Sign in to access your live roadside queue and customer assistance requests.'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl border-2 border-slate-200 dark:border-slate-800 rounded-3xl">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all ${
                !isRegister 
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all ${
                isRegister 
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Register Garage
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-xs sm:text-sm"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
          >
            {isRegister && (
              <>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Garage Workshop Name</label>
                  <input
                    type="text"
                    required
                    value={garageName}
                    onChange={(e) => setGarageName(e.target.value)}
                    placeholder="e.g. Apex Auto Care & Diagnostics"
                    className="w-full clean-input px-4 py-3 text-sm sm:text-base font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Lead Mechanic / Manager Name</label>
                  <input
                    type="text"
                    required
                    value={mechanicName}
                    onChange={(e) => setMechanicName(e.target.value)}
                    placeholder="e.g. David Miller"
                    className="w-full clean-input px-4 py-3 text-sm sm:text-base font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Workshop Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555-4321"
                    className="w-full clean-input px-4 py-3 text-sm sm:text-base font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Physical Garage Address</label>
                  <input
                    type="text"
                    required
                    value={garageAddress}
                    onChange={(e) => setGarageAddress(e.target.value)}
                    placeholder="e.g. 142 Market Street, Downtown"
                    className="w-full clean-input px-4 py-3 text-sm sm:text-base font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Services Offered</label>
                  <input
                    type="text"
                    required
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    placeholder="e.g. Car Repair, Battery, Tyre, Oil Change, 24/7 Roadside"
                    className="w-full clean-input px-4 py-3 text-sm sm:text-base font-medium"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="david@apexauto.com"
                className="w-full clean-input px-4 py-3 text-sm sm:text-base font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  spellCheck="false"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full clean-input px-4 py-3 text-sm sm:text-base font-medium pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Fill Helper */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Demo Credentials</span>
              </button>
              <span className="text-[11px] text-slate-400 font-mono">Encrypted • 256-bit</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-base sm:text-lg font-black shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Processing...</span>
              ) : isRegister ? (
                <>
                  <Building2 className="w-5 h-5" />
                  <span>REGISTER GARAGE WORKSHOP</span>
                </>
              ) : (
                <>
                  <Wrench className="w-5 h-5" />
                  <span>SIGN IN TO MECHANIC PORTAL</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MechanicAuthPage;
