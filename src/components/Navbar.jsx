import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSalesData } from '../context/SalesDataContext';
import { 
  RefreshCw, 
  Settings, 
  UserPlus, 
  LogOut, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Layers
} from 'lucide-react';

export const Navbar = ({ onOpenSyncConfig, onOpenAddRep }) => {
  const { user, logout } = useAuth();
  const { 
    isSyncing, 
    lastSyncTime, 
    syncError, 
    syncWithGoogleSheet, 
    config, 
    selectedMonth, 
    setSelectedMonth 
  } = useSalesData();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="bg-surface sticky top-0 z-30 border-b border-outline-variant/60 shadow-sm transition-colors">
      {/* Top Banner with Brand Logo */}
      <div className="bg-white border-b border-outline-variant/30 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img 
              src="/teeszone_logo.png" 
              alt="TEESZONE" 
              className="h-10 md:h-12 w-auto object-contain"
              onError={(e) => {
                // Fallback if image path has issue
                e.target.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tight text-brand-pink">TEESZONE</span>
              <span className="text-[10px] tracking-wider uppercase text-on-surface-variant font-semibold">
                Sales Pipeline & Performance Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Live Sync Status indicator */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
              config.sheetCsvUrl 
                ? (syncError ? 'bg-red-50 text-error border-red-200' : 'bg-emerald-50 text-success border-emerald-200')
                : 'bg-amber-50 text-warning border-amber-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                config.sheetCsvUrl 
                  ? (syncError ? 'bg-error' : 'bg-success animate-pulse-dot') 
                  : 'bg-warning'
              }`} />
              <span>
                {config.sheetCsvUrl 
                  ? (isSyncing ? 'Syncing...' : (syncError ? 'Sync Error' : `Live Sheets Sync ${lastSyncTime ? `(${lastSyncTime})` : ''}`)) 
                  : 'Real-time Auto Mode'}
              </span>
            </div>

            {/* Sync Now Button */}
            <button
              onClick={() => syncWithGoogleSheet()}
              disabled={isSyncing}
              title="Sync with Google Sheets"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-surface-container hover:bg-surface-container-high border border-outline-variant rounded transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-brand-pink' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            {/* Google Form External Link */}
            {config.formUrl && (
              <a
                href={config.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-pink bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Google Form</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-primary">
            <span className="material-symbols-outlined text-[20px] text-brand-pink">analytics</span>
            <span className="hidden sm:inline">August Pipeline Review</span>
          </div>
          <span className="text-outline-variant">|</span>
          <span className="text-xs text-on-surface-variant font-medium">
            🎯 ₹3,00,000 / person target
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Sales Rep Button */}
          <button
            onClick={onOpenAddRep}
            className="flex items-center gap-1.5 bg-primary-container text-white hover:bg-primary px-3 py-1.5 rounded text-xs font-semibold shadow-sm transition"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Add Sales Rep</span>
          </button>

          {/* Sync Config Settings Button */}
          <button
            onClick={onOpenSyncConfig}
            title="Google Sheets & Forms Configuration"
            className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Profile / Logout */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-surface-container border border-outline-variant hover:border-primary transition"
            >
              <div className="w-6 h-6 rounded-full bg-brand-pink text-white flex items-center justify-center text-xs font-bold">
                {user?.avatar || 'T'}
              </div>
              <span className="text-xs font-semibold text-on-surface hidden md:inline truncate max-w-[100px]">
                {user?.name || 'Teeszone Lead'}
              </span>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-outline-variant rounded-lg shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-outline-variant/40">
                  <p className="text-xs font-bold text-on-surface">{user?.name}</p>
                  <p className="text-[11px] text-on-surface-variant truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onOpenSyncConfig();
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-on-surface hover:bg-surface-container flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-on-surface-variant" />
                  <span>Sheet Integration</span>
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-error hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
