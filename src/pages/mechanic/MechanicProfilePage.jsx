import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import { ProfileSkeleton } from '../../components/common/Skeleton';
import { authService } from '../../services/authService';
import { Wrench, Phone, Mail, MapPin, User, Edit3, LogOut, Check, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const MechanicProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mechanic, setMechanic] = useState(authService.getMechanic());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Form states for editing
  const [garageName, setGarageName] = useState(mechanic.garageName || '');
  const [mechanicName, setMechanicName] = useState(mechanic.mechanicName || '');
  const [phone, setPhone] = useState(mechanic.phone || '');
  const [email, setEmail] = useState(mechanic.email || '');
  const [garageAddress, setGarageAddress] = useState(mechanic.garageAddress || '');
  const [services, setServices] = useState(mechanic.services || '');

  const handleSave = (e) => {
    e.preventDefault();
    const updated = authService.saveMechanic({
      ...mechanic,
      garageName,
      mechanicName,
      phone,
      email,
      garageAddress,
      services
    });
    setMechanic(updated);
    setIsEditing(false);
  };

  const handleLogout = () => {
    authService.mechanicLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col pb-28 sm:pb-32 md:pb-16 transition-colors duration-200">
      <MechanicNavbar />

      {loading ? (
        <ProfileSkeleton />
      ) : (
        <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
        <div className="space-y-2">
          <Link
            to="/mechanic"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Mechanic Home
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            Garage Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Manage your registered workshop and technician contact information.
          </p>
        </div>

        {/* Profile Details Card */}
        <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-7 sm:p-10 space-y-7 border-slate-200 shadow-sm rounded-3xl">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-5 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Garage Name</label>
                <input
                  type="text"
                  required
                  value={garageName}
                  onChange={(e) => setGarageName(e.target.value)}
                  className="w-full clean-input px-4 py-3 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Mechanic Name</label>
                <input
                  type="text"
                  required
                  value={mechanicName}
                  onChange={(e) => setMechanicName(e.target.value)}
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

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Garage Address</label>
                <input
                  type="text"
                  required
                  value={garageAddress}
                  onChange={(e) => setGarageAddress(e.target.value)}
                  className="w-full clean-input px-4 py-3 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Services Offered</label>
                <input
                  type="text"
                  required
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  className="w-full clean-input px-4 py-3 text-sm font-medium"
                />
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
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-7">
              <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-xs">
                  <Wrench className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                      {mechanic.garageName}
                    </h2>
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Technician: {mechanic.mechanicName}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                    <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    Phone:
                  </span>
                  <strong className="text-slate-900 dark:text-white font-mono font-bold text-sm">{mechanic.phone}</strong>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    Email:
                  </span>
                  <strong className="text-slate-900 dark:text-white font-medium text-sm">{mechanic.email}</strong>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    Garage Address:
                  </span>
                  <strong className="text-slate-900 dark:text-white text-right font-medium">{mechanic.garageAddress}</strong>
                </div>

                <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1.5 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block font-medium">Services Offered:</span>
                  <strong className="text-slate-900 dark:text-white block leading-relaxed">{mechanic.services}</strong>
                </div>
              </div>

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
                  className="btn-secondary py-3.5 px-5 text-xs font-bold text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 flex-1 flex items-center justify-center gap-2 border-orange-200 dark:border-orange-800 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      )}
    </div>
  );
};

export default MechanicProfilePage;
