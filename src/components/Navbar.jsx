import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSalesData } from '../context/SalesDataContext';
import { 
  RefreshCw, 
  Settings, 
  UserPlus, 
  LogOut, 
  ExternalLink, 
  Sparkles
} from 'lucide-react';

export const Navbar = ({ onOpenSyncConfig, onOpenAddRep }) => {
  const { user, logout } = useAuth();
  const { 
    isSyncing, 
    lastSyncTime, 
    syncError, 
    syncWithGoogleSheet, 
    config, 
    selectedMonth 
  } = useSalesData();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="spatial-nav sticky top-0 z-40 transition-all">
      {/* Full-width Spatial Top Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-3.5 border-b border-outline-variant/30">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Section - No Border, No Extra/Duplicate Text */}
          <div className="flex items-center">
            <img 
              src="/teeszone_logo.png" 
              alt="TEESZONE" 
              className="h-10 md:h-12 w-auto object-contain select-none"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Right Action Cluster - Spatial Glass Elements */}
          <div className="flex items-center gap-3 flex-wrap justify-end">
            {/* Live Sync Status indicator */}
            <div className={`spatial-pill flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${
              config.sheetCsvUrl 
                ? (syncError ? 'bg-red-50/80 text-error border-red-200' : 'bg-emerald-50/80 text-success border-emerald-200')
                : 'bg-pink-50/70 text-brand-pink border-pink-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                config.sheetCsvUrl 
                  ? (syncError ? 'bg-error' : 'bg-success animate-pulse-dot') 
                  : 'bg-brand-pink animate-pulse-dot'
              }`} />
              <span className="tracking-tight">
                {config.sheetCsvUrl 
                  ? (isSyncing ? 'Syncing...' : (syncError ? 'Sync Error' : `Live Google Sheet Sync ${lastSyncTime ? `(${lastSyncTime})` : ''}`)) 
                  : 'Live Pipeline Auto-Sync Active'}
              </span>
            </div>

            {/* Refresh Data Button */}
            <button
              onClick={() => syncWithGoogleSheet()}
              disabled={isSyncing}
              title="Refresh Google Sheet Data"
              className="spatial-pill flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-primary hover:text-brand-pink hover:bg-white transition-all disabled:opacity-50 active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-brand-pink' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            {/* Google Form Link */}
            {config.formUrl && (
              <a
                href={config.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="spatial-pill flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-brand-pink hover:bg-pink-50/60 transition-all active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Google Form</span>
              </a>
            )}

            {/* Add Sales Rep Button */}
            <button
              onClick={onOpenAddRep}
              className="flex items-center gap-1.5 bg-gradient-to-r from-primary-container to-[#7a2034] text-white hover:from-primary hover:to-primary-container px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_4px_14px_rgba(90,23,37,0.25)] hover:shadow-[0_6px_20px_rgba(90,23,37,0.35)] transition-all active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Sales Rep</span>
            </button>

            {/* Sync Config Settings Button */}
            <button
              onClick={onOpenSyncConfig}
              title="Google Sheets & Forms Configuration"
              className="spatial-pill p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-white transition-all active:scale-95"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Profile / Logout */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="spatial-pill flex items-center gap-2 p-1 pl-2 pr-3 rounded-full hover:bg-white transition-all active:scale-95"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-pink to-[#ff5297] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {user?.avatar || 'T'}
                </div>
                <span className="text-xs font-bold text-on-surface hidden md:inline truncate max-w-[120px]">
                  {user?.name || 'Sales Lead'}
                </span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 spatial-card bg-white/95 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 border border-outline-variant/60 shadow-xl">
                  <div className="px-3 py-2.5 border-b border-outline-variant/30">
                    <p className="text-xs font-bold text-on-surface">{user?.name}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenSyncConfig();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container rounded-lg flex items-center gap-2 transition"
                  >
                    <Settings className="w-3.5 h-3.5 text-on-surface-variant" />
                    <span>Sheet & Form Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-error hover:bg-red-50/80 rounded-lg flex items-center gap-2 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
