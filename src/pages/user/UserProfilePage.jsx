import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../../components/common/UserNavbar';
import { authService } from '../../services/authService';
import { User, Phone, Mail, Car, Edit3, LogOut, Check, ArrowLeft, ShieldCheck, Key } from 'lucide-react';

export const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUser());
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
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-12">
      <UserNavbar />

      <main className="max-w-xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div>
          <Link
            to="/user"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Driver Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your personal profile and registered vehicle information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="clean-card p-6 sm:p-8 space-y-6 border-slate-200 shadow-sm">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  className="w-full clean-input px-3.5 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full clean-input px-3.5 py-2.5 text-sm"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <p className="text-[11px] font-bold text-slate-500 uppercase font-mono">
                  Vehicle Information
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Brand</label>
                    <input
                      type="text"
                      value={vehicleBrand}
                      onChange={(e) => setVehicleBrand(e.target.value)}
                      placeholder="e.g. Honda"
                      className="w-full clean-input px-3 py-2 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Model</label>
                    <input
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="e.g. Civic"
                      className="w-full clean-input px-3 py-2 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Vehicle License Number</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    placeholder="e.g. CA-8XYZ92"
                    className="w-full clean-input px-3 py-2 text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary py-3 px-4 text-xs font-bold flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary py-3 px-4 text-xs font-bold flex-1 flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  Save Profile
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Personal details */}
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-xs">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900 font-heading">
                      {user.name}
                    </h2>
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Registered User Account</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Phone:
                  </span>
                  <strong className="text-slate-900">{user.phone}</strong>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Email:
                  </span>
                  <strong className="text-slate-900">{user.email}</strong>
                </div>
              </div>

              {/* Vehicle details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-sky-600" />
                  Registered Vehicle
                </h3>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Brand:</span>
                    <strong className="text-slate-900 font-bold">{user.vehicleBrand || 'Not specified'}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Model:</span>
                    <strong className="text-slate-900 font-bold">{user.vehicleModel || 'Not specified'}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Vehicle Number:</span>
                    <strong className="text-slate-900 font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                      {user.vehicleNumber || 'Not specified'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn-primary py-3 px-4 text-xs font-bold flex-1 flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-secondary py-3 px-4 text-xs font-bold text-rose-600 hover:bg-rose-50 flex-1 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
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
