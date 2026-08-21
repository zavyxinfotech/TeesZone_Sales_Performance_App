import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';

export const LoginPage = () => {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (activeTab === 'login') {
        login(email.trim(), password);
      } else {
        register(email.trim(), name.trim());
      }
      setIsLoading(false);
    }, 400);
  };

  const handleDemoLogin = (repEmail = 'manager@teeszone.com') => {
    login(repEmail, 'password123');
  };

  return (
    <div className="spatial-bg-ambient text-on-surface min-h-screen flex items-center justify-center p-4 md:p-8 selection:bg-brand-pink selection:text-white">
      <div className="w-full max-w-md">
        {/* Brand Logo - Pure logo without border or duplicate text */}
        <div className="flex justify-center mb-6">
          <img
            src="/teeszone_logo.png"
            alt="TEESZONE"
            className="h-12 md:h-14 w-auto object-contain select-none"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Spatial Auth Card */}
        <div className="spatial-card p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-primary">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-xs text-on-surface-variant mt-1 font-medium">
              {activeTab === 'login'
                ? 'Sign in to access August Sales Pipeline Review.'
                : 'Register as a TEESZONE sales representative.'}
            </p>
          </div>

          {/* Spatial Tab Toggle */}
          <div className="spatial-pill p-1 flex rounded-xl mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'signup'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Sign Up
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50/90 border border-red-200 text-error text-xs rounded-xl font-bold">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div>
                <label className="block text-label-caps text-on-surface font-bold uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramya / Vijayadarshini / Archana"
                    className="spatial-pill w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-label-caps text-on-surface font-bold uppercase tracking-wider mb-1">
                {activeTab === 'login' ? 'Work Email' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@teeszone.com"
                  className="spatial-pill w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-label-caps text-on-surface font-bold uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="spatial-pill w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition"
                />
              </div>
            </div>

            {activeTab === 'login' && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer select-none font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-outline-variant text-brand-pink focus:ring-brand-pink"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="font-bold text-primary hover:text-brand-pink transition">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-container to-[#7a2034] text-white py-3 rounded-xl text-xs font-bold hover:from-primary hover:to-primary-container transition shadow-[0_4px_14px_rgba(90,23,37,0.3)] flex items-center justify-center gap-2 mt-2 disabled:opacity-50 active:scale-98"
            >
              <span>{isLoading ? 'Authenticating...' : (activeTab === 'login' ? 'Log In to Dashboard' : 'Create Account')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Sign-In */}
          <div className="mt-6 pt-5 border-t border-outline-variant/40">
            <p className="text-[11px] text-center font-bold uppercase tracking-wider text-on-surface-variant mb-3">
              🚀 Fast Demo Sign-In
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('ramya@teeszone.com')}
                className="spatial-pill p-2.5 rounded-xl hover:bg-white text-primary transition text-left group"
              >
                <div className="font-extrabold text-xs group-hover:text-brand-pink transition">Ramya</div>
                <div className="text-[10px] text-on-surface-variant">₹1.90L Actual Achieved</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('salesmanager@teeszone.com')}
                className="spatial-pill p-2.5 rounded-xl hover:bg-white text-primary transition text-left group"
              >
                <div className="font-extrabold text-xs group-hover:text-brand-pink transition">Sales Lead</div>
                <div className="text-[10px] text-on-surface-variant">Team Overview (₹9L)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-on-surface-variant font-medium">
          © 2026 TEESZONE Clothing Private Limited. All rights reserved.
        </div>
      </div>
    </div>
  );
};
