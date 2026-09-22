import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { authService } from '../../services/authService';
import ThemeToggle from '../../components/common/ThemeToggle';
import { Wrench, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

export const MechanicAuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [garageName, setGarageName] = useState('Apex Auto Care & Diagnostics');
  const [mechanicName, setMechanicName] = useState('David Miller');
  const [phone, setPhone] = useState('+1 555-4321');
  const [email, setEmail] = useState('david@apexauto.com');
  const [garageAddress, setGarageAddress] = useState('142 Market Street, Downtown');
  const [services, setServices] = useState('Engine Repair, Battery, Brakes, Tyre, 24/7 Roadside');
  const [password, setPassword] = useState('password123');
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

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-slate-950 flex flex-col justify-center items-center px-4 py-8 relative transition-colors">
      {/* Top right Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portal Selection
        </Link>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <BrandLogo size="md" clickable={false} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-100 dark:border-indigo-800">
            <Wrench className="w-3.5 h-3.5" />
            Mechanic Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
            {isRegister ? 'Create Garage Account' : 'Mechanic Login'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            {isRegister
              ? 'Register your workshop to receive nearby driver assistance requests.'
              : 'Sign in to access your incoming roadside assistance requests.'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-lg">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                !isRegister 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                isRegister 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Register Garage
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isRegister && (
              <>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Garage Name</label>
                  <input
                    type="text"
                    required
                    value={garageName}
                    onChange={(e) => setGarageName(e.target.value)}
                    placeholder="e.g. Apex Auto Care"
                    className="w-full clean-input px-3.5 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mechanic Name</label>
                  <input
                    type="text"
                    required
                    value={mechanicName}
                    onChange={(e) => setMechanicName(e.target.value)}
                    placeholder="e.g. David Miller"
                    className="w-full clean-input px-3.5 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555-4321"
                    className="w-full clean-input px-3.5 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Garage Address</label>
                  <input
                    type="text"
                    required
                    value={garageAddress}
                    onChange={(e) => setGarageAddress(e.target.value)}
                    placeholder="e.g. 142 Market Street, Downtown"
                    className="w-full clean-input px-3.5 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Services Offered</label>
                  <input
                    type="text"
                    required
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    placeholder="e.g. Car Repair, Battery, Tyre, Oil Change"
                    className="w-full clean-input px-3.5 py-2.5 text-sm"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-700 font-bold mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="david@apexauto.com"
                className="w-full clean-input px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full clean-input px-3.5 py-2.5 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-sm font-bold shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Processing...' : isRegister ? 'Register Garage' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MechanicAuthPage;
