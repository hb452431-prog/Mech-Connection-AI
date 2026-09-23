import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { authService } from '../../services/authService';
import { User, Phone, Mail, Car, Edit3, LogOut, Check, ArrowLeft, ShieldCheck, Key } from 'lucide-react';

export const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUser() || {});
  const [isEditing, setIsEditing] = useState(false);

  // Edit form states
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');
  const [vehicleBrand, setVehicleBrand] = useState(user.vehicleBrand || '');
  const [vehicleModel, setVehicleModel] = useState(user.vehicleModel || '');
  const [vehicleNumber, setVehicleNumber] = useState(user.vehicleNumber || '');

  const handleSave = (e) => {
    e.preventDefault();
    const updated = authService.saveUser({
      ...user,
      name,
      phone,
      email,
      vehicleBrand,
      vehicleModel,
      vehicleNumber
    });
    setUser(updated);
    setIsEditing(false);
  };

  const handleLogout = () => {
    authService.userLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12 transition-colors duration-200">
      <UserNavbar />

      <main className="max-w-xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10">
        <div className="space-y-2">
          <Link
            to="/user"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            Driver Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Manage your personal profile and registered vehicle information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="clean-card p-7 sm:p-10 space-y-7 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-3xl">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-5 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full clean-input px-4 py-3 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full clean-input px-4 py-3 text-sm font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full clean-input px-4 py-3 text-sm font-medium"
                />
              </div>

              <div className="pt-5 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono">
                  Vehicle Information
                </p>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">Brand</label>
                    <input
                      type="text"
                      value={vehicleBrand}
                      onChange={(e) => setVehicleBrand(e.target.value)}
                      placeholder="e.g. Honda"
                      className="w-full clean-input px-3.5 py-2.5 text-xs sm:text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">Model</label>
                    <input
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="e.g. Civic"
                      className="w-full clean-input px-3.5 py-2.5 text-xs sm:text-sm font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">Vehicle License Number</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    placeholder="e.g. CA-8XYZ92"
                    className="w-full clean-input px-4 py-3 text-xs sm:text-sm font-mono font-black uppercase tracking-wider"
                  />
                </div>
              </div>

              <div className="flex gap-3.5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary py-3.5 px-5 text-xs font-bold flex-1 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary py-3.5 px-5 text-xs font-bold flex-1 flex items-center justify-center gap-2 shadow-xs rounded-xl"
                >
                  <Check className="w-4 h-4" />
                  Save Profile
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-7">
              {/* Personal details */}
              <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-xs">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                      {user.name}
                    </h2>
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Registered User Account</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                    <Phone className="w-4 h-4 text-slate-400" />
                    Phone:
                  </span>
                  <strong className="text-slate-900 dark:text-white font-mono font-bold text-sm">{user.phone}</strong>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                    <Mail className="w-4 h-4 text-slate-400" />
                    Email:
                  </span>
                  <strong className="text-slate-900 dark:text-white font-medium text-sm">{user.email}</strong>
                </div>
              </div>

              {/* Vehicle details */}
              <div className="space-y-3.5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2">
                  <Car className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Registered Vehicle
                </h3>

                <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Brand:</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{user.vehicleBrand || 'Not specified'}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Model:</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{user.vehicleModel || 'Not specified'}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Vehicle License Number:</span>
                    <strong className="text-slate-900 dark:text-white font-mono font-black bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                      {user.vehicleNumber || 'Not specified'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn-primary py-3.5 px-5 text-xs font-bold flex-1 flex items-center justify-center gap-2 shadow-xs rounded-xl"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-secondary py-3.5 px-5 text-xs font-bold text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 flex-1 flex items-center justify-center gap-2 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
