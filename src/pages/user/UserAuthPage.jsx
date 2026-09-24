import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { AuthSkeleton } from '../../components/common/Skeleton';
import { authService } from '../../services/authService';
import ThemeToggle from '../../components/common/ThemeToggle';
import { Car, ArrowLeft, ShieldCheck, Sparkles, Eye, EyeOff, UserCheck } from 'lucide-react';

export const UserAuthPage = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Form fields
  const [name, setName] = useState('John Doe');
  const [phone, setPhone] = useState('+1 555-0199');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('password123');
  const [vehicleBrand, setVehicleBrand] = useState('Honda');
  const [vehicleModel, setVehicleModel] = useState('Civic');
  const [vehicleNumber, setVehicleNumber] = useState('CA-8XYZ92');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await authService.userRegister({
          name,
          phone,
          email,
          vehicleBrand,
          vehicleModel,
          vehicleNumber
        });
      } else {
        await authService.userLogin(email, password);
      }
      navigate('/user');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('john.doe@example.com');
    setPassword('password123');
    setName('John Doe');
    setPhone('+1 555-0199');
    setVehicleBrand('Honda');
    setVehicleModel('Civic');
    setVehicleNumber('CA-8XYZ92');
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portal Selection
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <BrandLogo size="md" clickable={false} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-200/80 dark:border-cyan-800 shadow-2xs font-mono">
            <Car className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            User & Driver Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
            {isRegister ? 'Create Driver Account' : 'Driver Sign In'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            {isRegister
              ? 'Sign up to get instant AI vehicle diagnostics and nearby garage roadside assistance.'
              : 'Sign in to access your vehicle assistance services and live roadside map.'}
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
                  ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm' 
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
                  ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {isRegister && (
              <>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full clean-input px-4 py-3 text-sm sm:text-base font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555-0199"
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
                placeholder="john.doe@example.com"
                className="w-full clean-input px-4 py-3 text-sm sm:text-base font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
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

            {/* Optional Vehicle info for registration */}
            {isRegister && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Vehicle Information (Optional)
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-bold text-xs">Brand</label>
                    <input
                      type="text"
                      value={vehicleBrand}
                      onChange={(e) => setVehicleBrand(e.target.value)}
                      placeholder="e.g. Honda"
                      className="w-full clean-input px-3.5 py-2.5 text-xs sm:text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-bold text-xs">Model</label>
                    <input
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="e.g. Civic"
                      className="w-full clean-input px-3.5 py-2.5 text-xs sm:text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-bold text-xs">License Plate Number</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    placeholder="e.g. CA-8XYZ92"
                    className="w-full clean-input px-3.5 py-2.5 text-xs sm:text-sm font-mono uppercase font-bold"
                  />
                </div>
              </div>
            )}

            {/* Quick Demo Fill Helper */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5 font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Demo Credentials</span>
              </button>
              <span className="text-[11px] text-slate-400 font-mono">Secure TLS 1.3</span>
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
                  <UserCheck className="w-5 h-5" />
                  <span>CREATE DRIVER ACCOUNT</span>
                </>
              ) : (
                <>
                  <Car className="w-5 h-5" />
                  <span>SIGN IN TO DRIVER PORTAL</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;
