import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, User } from 'lucide-react';

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
    <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-4 md:p-8 selection:bg-brand-pink selection:text-white">
      <div className="w-full max-w-md">
        {/* Brand Logo */}
        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src="/teeszone_logo.png"
            alt="TEESZONE Logo"
            className="h-12 md:h-14 w-auto object-contain mb-1"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xl font-extrabold tracking-tight text-brand-pink">TEESZONE</span>
            <span className="text-xs text-on-surface-variant font-medium">• Sales Performance Hub</span>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">
              {activeTab === 'login' ? 'Welcome Back' : 'Join TEESZONE Team'}
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              {activeTab === 'login'
                ? 'Sign in to access your August Sales Pipeline Review.'
                : 'Create your sales representative account.'}
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex border-b border-outline-variant mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold transition border-b-2 ${
                activeTab === 'login'
                  ? 'text-primary border-primary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
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
              className={`flex-1 py-2 text-xs font-bold transition border-b-2 ${
                activeTab === 'signup'
                  ? 'text-primary border-primary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`}
            >
              Sign Up
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-error text-xs rounded-lg font-medium">
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
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramya / Vijayadarshini / Archana"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-label-caps text-on-surface font-bold uppercase tracking-wider mb-1">
                {activeTab === 'login' ? 'Work Email' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@teeszone.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-label-caps text-on-surface font-bold uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition"
                />
              </div>
            </div>

            {activeTab === 'login' && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-outline-variant text-brand-pink focus:ring-brand-pink"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="font-semibold text-primary hover:text-brand-pink transition">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-container text-white py-3 rounded-xl text-xs font-bold hover:bg-primary transition shadow-xs flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Authenticating...' : (activeTab === 'login' ? 'Log In to Dashboard' : 'Create Account')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Divider */}
          <div className="mt-6 pt-5 border-t border-outline-variant/50">
            <p className="text-[11px] text-center font-bold uppercase tracking-wider text-on-surface-variant mb-2.5">
              🚀 Fast Demo Sign-In
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('ramya@teeszone.com')}
                className="p-2 text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary border border-outline-variant rounded-lg transition text-left"
              >
                <div className="font-bold">Ramya</div>
                <div className="text-[10px] text-on-surface-variant">₹1.90L Actual</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('salesmanager@teeszone.com')}
                className="p-2 text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary border border-outline-variant rounded-lg transition text-left"
              >
                <div className="font-bold">Sales Lead</div>
                <div className="text-[10px] text-on-surface-variant">Team View (₹9L)</div>
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
