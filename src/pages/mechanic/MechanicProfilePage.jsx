import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MechanicNavbar from '../../components/common/MechanicNavbar';
import { authService } from '../../services/authService';
import { Wrench, Phone, Mail, MapPin, User, Edit3, LogOut, Check, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const MechanicProfilePage = () => {
  const navigate = useNavigate();
  const [mechanic, setMechanic] = useState(authService.getMechanic());
  const [isEditing, setIsEditing] = useState(false);

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
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-slate-950 flex flex-col pb-24 md:pb-12 transition-colors">
      <MechanicNavbar />

      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div>
          <Link
            to="/mechanic"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Mechanic Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
            Garage Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your registered workshop and technician contact information.
          </p>
        </div>

        {/* Profile Details Card */}
        <div className="clean-card dark:bg-slate-900 dark:border-slate-800 p-6 sm:p-8 space-y-6 border-slate-200 shadow-sm">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Garage Name</label>
                <input
                  type="text"
                  required
                  value={garageName}
                  onChange={(e) => setGarageName(e.target.value)}
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
                  className="w-full clean-input px-3.5 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="w-full clean-input px-3.5 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Services</label>
                <input
                  type="text"
                  required
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  className="w-full clean-input px-3.5 py-2.5 text-sm"
                />
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
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-xs">
                  <Wrench className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white font-heading">
                      {mechanic.garageName}
                    </h2>
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Technician: {mechanic.mechanicName}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    Phone:
                  </span>
                  <strong className="text-slate-900 dark:text-white">{mechanic.phone}</strong>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    Email:
                  </span>
                  <strong className="text-slate-900 dark:text-white">{mechanic.email}</strong>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    Garage Address:
                  </span>
                  <strong className="text-slate-900 dark:text-white text-right">{mechanic.garageAddress}</strong>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block font-medium">Services Offered:</span>
                  <strong className="text-slate-900 dark:text-white block leading-relaxed">{mechanic.services}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
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
                  className="btn-secondary py-3 px-4 text-xs font-bold text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 flex-1 flex items-center justify-center gap-1.5 border-orange-200 dark:border-orange-800"
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

export default MechanicProfilePage;
