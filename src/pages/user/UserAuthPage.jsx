import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { authService } from '../../services/authService';
import { Car, ArrowLeft } from 'lucide-react';

export const UserAuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col justify-center items-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portal Selection
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <BrandLogo size="md" clickable={false} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <Car className="w-3.5 h-3.5" />
            User / Driver Portal
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-heading">
            {isRegister ? 'Create Driver Account' : 'Driver Login'}
          </h1>
          <p className="text-xs text-slate-500">
            {isRegister
              ? 'Sign up to get instant AI vehicle diagnostics and nearby garage assistance.'
              : 'Sign in to access your vehicle assistance services.'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="clean-card p-6 sm:p-8 space-y-5">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                !isRegister ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                isRegister ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isRegister && (
              <>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full clean-input px-3.5 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555-0199"
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
                placeholder="john.doe@example.com"
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

            {/* Optional Vehicle info for registration */}
            {isRegister && (
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Vehicle Information (Optional)
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 mb-1">Brand</label>
                    <input
                      type="text"
                      value={vehicleBrand}
                      onChange={(e) => setVehicleBrand(e.target.value)}
                      placeholder="e.g. Honda"
                      className="w-full clean-input px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Model</label>
                    <input
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="e.g. Civic"
                      className="w-full clean-input px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Vehicle License Number</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    placeholder="e.g. CA-8XYZ92"
                    className="w-full clean-input px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-sm font-bold shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;
