import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ThemeToggle from '../components/common/ThemeToggle';
import { User, Lock, ArrowRight, Sparkles, Wrench, Car, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('driver'); // 'driver' | 'mechanic'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const defaultPass = selectedRole === 'mechanic' ? 'Mech#MasterKey77' : 'Drive#SecurePass89';
      await loginWithEmail(email || (selectedRole === 'mechanic' ? 'dave@rapidrescue.com' : 'alex@example.com'), password || defaultPass, selectedRole);
      showToast(`Welcome back to MECH CONNECT AI!`, 'success');
      if (selectedRole === 'mechanic') {
        navigate('/partner-portal');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      showToast('Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle(selectedRole);
      showToast('Signed in via Google SSO (Demo)', 'success');
      if (selectedRole === 'mechanic') {
        navigate('/partner-portal');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      showToast('Google login failed', 'error');
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

      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom max-w-md relative z-10 px-4">
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border-cyan-500/30 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <BrandLogo size="lg" />
            </div>
            <h2 className="text-2xl font-black text-white font-heading">
              Welcome Back
            </h2>
            <p className="text-xs text-slate-400">
              Sign in to your AI Vehicle Health Portal & Roadside Network
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

          {/* 1-Click Google SSO Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google (Demo Sign-In)
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-navy-950 px-3 text-[10px] text-slate-500 font-mono uppercase">
              Or email login
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-xs"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
          >
            <div>
              <label className="block text-slate-400 font-bold uppercase font-mono mb-1.5">Email Address</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedRole === 'mechanic' ? 'dave.miller@rapidrescue.com' : 'alex.turner@example.com'}
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-400 font-bold uppercase font-mono">Password</label>
                <a href="#forgot" className="text-cyan-400 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
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
              className="w-full btn-primary-glow py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Sign In as {selectedRole === 'mechanic' ? 'Mechanic Partner' : 'Driver'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-bold">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
