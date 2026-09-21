import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Plus, 
  ShieldCheck, 
  Activity, 
  Wrench, 
  Calendar, 
  Clock, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  Trash2, 
  X, 
  Cpu,
  ArrowRight,
  TrendingUp,
  Fuel,
  Disc
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { vehicleService } from '../services/vehicleService';
import { mechanicService } from '../services/mechanicService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [garageVehicles, setGarageVehicles] = useState([]);
  const [selectedVehicleIdx, setSelectedVehicleIdx] = useState(0);
  const [userBookings, setUserBookings] = useState([]);
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedBookingForInvoice, setSelectedBookingForInvoice] = useState(null);

  // New vehicle form
  const [newVin, setNewVin] = useState('');
  const [newMake, setNewMake] = useState('Honda');
  const [newModel, setNewModel] = useState('Civic');
  const [newYear, setNewYear] = useState('2022');
  const [newMileage, setNewMileage] = useState('32000');
  const [newPlate, setNewPlate] = useState('7XYZ892 (CA)');
  const [isDecodingVin, setIsDecodingVin] = useState(false);
  const [isSavingVehicle, setIsSavingVehicle] = useState(false);

  useEffect(() => {
    const vehicles = vehicleService.getGarageVehicles();
    setGarageVehicles(vehicles);
    const bookings = mechanicService.getUserBookings();
    setUserBookings(bookings);
  }, []);

  const currentVehicle = garageVehicles[selectedVehicleIdx] || garageVehicles[0];

  const handleVinDecode = async () => {
    if (!newVin.trim()) return;
    setIsDecodingVin(true);
    try {
      const decoded = await vehicleService.simulateVinLookup(newVin);
      setNewMake(decoded.make);
      setNewModel(decoded.model);
      setNewYear(decoded.year.toString());
      showToast(`Decoded VIN: ${decoded.year} ${decoded.make} ${decoded.model}`, 'success');
    } catch (e) {
      showToast('VIN lookup failed', 'error');
    } finally {
      setIsDecodingVin(false);
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setIsSavingVehicle(true);
    try {
      const newVeh = await vehicleService.addVehicle({
        make: newMake,
        model: newModel,
        year: newYear,
        mileage: newMileage,
        vin: newVin || '4T1B11HK' + Math.floor(100000 + Math.random() * 900000),
        licensePlate: newPlate,
        fuelType: 'Gasoline'
      });

      const refreshed = vehicleService.getGarageVehicles();
      setGarageVehicles(refreshed);
      setSelectedVehicleIdx(0);
      setAddVehicleModalOpen(false);
      showToast(`Added ${newVeh.year} ${newVeh.make} ${newVeh.model} to Digital Garage!`, 'success');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    } catch (e) {
      showToast('Error saving vehicle', 'error');
    } finally {
      setIsSavingVehicle(false);
    }
  };

  const handleDeleteVehicle = (id) => {
    if (garageVehicles.length <= 1) {
      showToast('You must keep at least one registered vehicle in your garage.', 'warning');
      return;
    }
    const updated = vehicleService.deleteVehicle(id);
    setGarageVehicles(updated);
    setSelectedVehicleIdx(0);
    showToast('Vehicle removed from garage', 'info');
  };

  const handleOpenInvoice = (booking) => {
    setSelectedBookingForInvoice(booking);
    setInvoiceModalOpen(true);
  };

  return (
    <div className="py-10 bg-navy-950 min-h-screen">
      <div className="container-custom space-y-8">
        {/* Top User Greeting Banner */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt="User"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white font-heading">
                  {currentUser?.displayName || 'Driver Portal'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono">
                  {currentUser?.membership || 'MechConnect+ Gold'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Emergency Contact: <strong>{currentUser?.emergencyContact?.name || 'Emma Turner'}</strong> ({currentUser?.emergencyContact?.phone || '+1 415-883-9913'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAddVehicleModalOpen(true)}
              className="btn-primary-glow px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Vehicle
            </button>
            <Link
              to="/sos"
              className="btn-emergency-glow px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4" />
              Emergency SOS
            </Link>
          </div>
        </div>

        {/* VEHICLE GARAGE SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
              <Car className="w-5 h-5 text-cyan-400" />
              Digital Vehicle Garage & Health Passports
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {garageVehicles.length} Vehicles Enrolled
            </span>
          </div>

          {/* Vehicle Tab Switcher */}
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
            {garageVehicles.map((veh, idx) => (
              <button
                key={veh.id}
                onClick={() => setSelectedVehicleIdx(idx)}
                className={`p-4 rounded-2xl border text-left min-w-[240px] flex-shrink-0 transition-all ${
                  selectedVehicleIdx === idx
                    ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">{veh.fuelType}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-emerald-400">
                    {veh.healthScore}% HEALTH
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-tight font-heading">
                  {veh.year} {veh.make} {veh.model}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono mt-1">{veh.licensePlate}</p>
              </button>
            ))}
          </div>

          {/* Detailed Selected Vehicle Health Card */}
          {currentVehicle && (
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-cyan-500/30 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
                <div className="flex items-start gap-4">
                  <img
                    src={currentVehicle.image}
                    alt={currentVehicle.model}
                    className="w-24 h-24 rounded-2xl object-cover border border-slate-700 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-white font-heading">
                        {currentVehicle.year} {currentVehicle.make} {currentVehicle.model}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {currentVehicle.trim}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">VIN: {currentVehicle.vin}</p>
                    <p className="text-xs text-slate-300 mt-1 font-mono">
                      Odometer: <strong>{currentVehicle.mileage.toLocaleString()} miles</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Health Score</span>
                    <span className="text-3xl font-black text-emerald-400 font-mono">
                      {currentVehicle.healthScore}%
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteVehicle(currentVehicle.id)}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                    title="Remove Vehicle"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Real-time Component Life Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-navy-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Brake Pad Life</span>
                    <strong className="text-emerald-400 font-mono">{currentVehicle.brakePadLifePercent}%</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${currentVehicle.brakePadLifePercent}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Thickness: ~7.5mm (Good)</span>
                </div>

                <div className="bg-navy-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Battery Health</span>
                    <strong className="text-cyan-400 font-mono">{currentVehicle.batteryHealth}%</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${currentVehicle.batteryHealth}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Resting: 12.68V (Nominal)</span>
                </div>

                <div className="bg-navy-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Tyre Tread Depth</span>
                    <strong className="text-amber-400 font-mono">{currentVehicle.tyreTreadPercent}%</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${currentVehicle.tyreTreadPercent}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Depth: 6/32" (Rotation soon)</span>
                </div>
              </div>

              {/* Predictive Maintenance Action List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  AI Predictive Maintenance Schedule
                </h4>
                <div className="space-y-2">
                  {currentVehicle.upcomingServices?.map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${srv.priority === 'High' ? 'bg-rose-400' : 'bg-amber-400'}`} />
                        <div>
                          <p className="font-bold text-white">{srv.item}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{srv.dueDate}</p>
                        </div>
                      </div>

                      <Link
                        to={`/mechanics?service=${encodeURIComponent(srv.item)}`}
                        className="btn-primary-glow px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        Book
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SERVICE HISTORY & DIGITAL INVOICES */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Service Appointments & Digital Receipts
            </h2>
          </div>

          <div className="glass-panel rounded-3xl overflow-hidden border-slate-800">
            {userBookings.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No past service appointments recorded.
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {userBookings.map((b) => (
                  <div key={b.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-xs text-cyan-400">#{b.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {b.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{b.serviceName}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{b.mechanicName} • {b.mechanicAddress}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-right">
                        <span className="text-slate-400 block font-mono">{b.date} at {b.timeSlot}</span>
                        <span className="text-sm font-black text-white font-mono">${b.estimatedTotal}</span>
                      </div>

                      <button
                        onClick={() => handleOpenInvoice(b)}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ADD VEHICLE MODAL */}
        {addVehicleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 max-w-lg w-full border-cyan-500/40 relative space-y-5">
              <button
                onClick={() => setAddVehicleModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">Add Vehicle to Garage</h3>
                  <p className="text-xs text-slate-400">Enter VIN or manual details for AI telemetry</p>
                </div>
              </div>

              <form onSubmit={handleAddVehicle} className="space-y-4 text-xs">
                {/* VIN Input with Decoder Button */}
                <div>
                  <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">
                    Vehicle VIN (17 Characters)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newVin}
                      onChange={(e) => setNewVin(e.target.value.toUpperCase())}
                      placeholder="e.g. 5YJ3E1EB6PF928174 or WBA5R7..."
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl font-mono text-white text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleVinDecode}
                      disabled={isDecodingVin || !newVin.trim()}
                      className="btn-primary-glow px-4 py-2.5 rounded-xl font-bold whitespace-nowrap"
                    >
                      {isDecodingVin ? 'Decoding...' : 'Decode VIN'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">Make</label>
                    <input
                      type="text"
                      required
                      value={newMake}
                      onChange={(e) => setNewMake(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">Model</label>
                    <input
                      type="text"
                      required
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">Year</label>
                    <input
                      type="number"
                      required
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">Current Mileage</label>
                    <input
                      type="number"
                      required
                      value={newMileage}
                      onChange={(e) => setNewMileage(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">License Plate</label>
                  <input
                    type="text"
                    value={newPlate}
                    onChange={(e) => setNewPlate(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSavingVehicle}
                  className="w-full btn-primary-glow py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Save to Digital Garage
                </button>
              </form>
            </div>
          </div>
        )}

        {/* DIGITAL INVOICE PREVIEW MODAL */}
        {invoiceModalOpen && selectedBookingForInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 max-w-md w-full border-cyan-500/40 relative space-y-5">
              <button
                onClick={() => setInvoiceModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-1 border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Official Digital Invoice</span>
                <h3 className="text-lg font-bold text-white font-heading">{selectedBookingForInvoice.serviceName}</h3>
                <p className="text-xs text-slate-400">Invoice ID: #{selectedBookingForInvoice.id}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Workshop:</span>
                  <strong className="text-white text-right">{selectedBookingForInvoice.mechanicName}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Target Vehicle:</span>
                  <strong className="text-white">{selectedBookingForInvoice.vehicleName}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Scheduled Date:</span>
                  <strong className="text-white">{selectedBookingForInvoice.date} ({selectedBookingForInvoice.timeSlot})</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Payment Status:</span>
                  <span className="text-emerald-400 font-bold font-mono">PAID / GUARANTEED</span>
                </div>
                
                <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Amount:</span>
                  <span className="text-xl font-black text-cyan-400 font-mono">${selectedBookingForInvoice.estimatedTotal}.00</span>
                </div>
              </div>

              <button
                onClick={() => {
                  showToast('Invoice PDF downloaded to device', 'success');
                  setInvoiceModalOpen(false);
                }}
                className="w-full btn-primary-glow py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
