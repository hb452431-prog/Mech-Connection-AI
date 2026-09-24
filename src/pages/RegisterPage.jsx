import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ThemeToggle from '../components/common/ThemeToggle';
import { User, Lock, Mail, Phone, ArrowRight, ShieldCheck, Car, Wrench } from 'lucide-react';

export const RegisterPage = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('driver');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({
        name: name || 'Demo User',
        email: email || 'user@example.com',
        phone: phone || '+1 (555) 123-4567',
        role: selectedRole
      });
      showToast('Account created successfully!', 'success');
      if (selectedRole === 'mechanic') {
        navigate('/partner-portal');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      showToast('Registration failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 bg-navy-950 dark:bg-slate-950 min-h-screen flex items-center justify-center relative overflow-hidden transition-colors">
      {/* Top right theme toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom max-w-md relative z-10 px-4">
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-cyan-500/30 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <BrandLogo size="lg" />
            </div>
            <h2 className="text-2xl font-black text-white font-heading">
              Create Your Account
            </h2>
            <p className="text-xs text-slate-400">
              Join the next-generation AI vehicle assistance platform
            </p>
          </div>

          {/* Account Role Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedRole('driver')}
              className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'driver'
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              Driver Account
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('mechanic')}
              className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'mechanic'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              Mechanic Partner
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 font-bold uppercase font-mono mb-1">Full Name / Business</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={selectedRole === 'mechanic' ? 'RapidRescue Mechanics' : 'Alex Turner'}
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase font-mono mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase font-mono mb-1">Mobile Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (415) 883-9912"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase font-mono mb-1">Create Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  spellCheck="false"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary-glow py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
            >
              Complete Registration
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
