import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSalesData } from '../context/SalesDataContext';
import { 
  RefreshCw, 
  Settings, 
  UserPlus, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';

export const Navbar = ({ onOpenSyncConfig, onOpenAddRep }) => {
  const { user, logout } = useAuth();
  const { 
    isSyncing, 
    lastSyncTime, 
    syncError, 
    syncWithGoogleSheet, 
    config 
  } = useSalesData();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="skeuo-header sticky top-0 z-40 transition-all">
      {/* Full-width Skeuomorphic Top Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-3.5">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Section - Clean, No Border, No Frame */}
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

          {/* Right Action Controls - Skeuomorphic Tactile Elements */}
          <div className="flex items-center gap-3 flex-wrap justify-end">
            {/* Live Sync Status Pill */}
            <div className={`skeuo-pill flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${
              config.sheetCsvUrl 
                ? (syncError ? 'text-error' : 'text-success') 
                : 'text-brand-pink'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.3)] ${
                config.sheetCsvUrl 
                  ? (syncError ? 'bg-error' : 'bg-success animate-pulse-dot') 
                  : 'bg-brand-pink animate-pulse-dot'
              }`} />
              <span className="tracking-tight">
                {config.sheetCsvUrl 
                  ? (isSyncing ? 'Syncing...' : (syncError ? 'Sync Error' : `Live Sheets Sync ${lastSyncTime ? `(${lastSyncTime})` : ''}`)) 
                  : 'Live Pipeline Real-time Mode'}
              </span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => syncWithGoogleSheet()}
              disabled={isSyncing}
              title="Refresh Google Sheet Data"
              className="skeuo-btn flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-primary rounded-xl cursor-pointer disabled:opacity-50"
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
                className="skeuo-btn flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-brand-pink rounded-xl cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Google Form</span>
              </a>
            )}

            {/* Add Sales Rep Button - Raised Skeuomorphic 3D Burgundy Button */}
            <button
              onClick={onOpenAddRep}
              className="skeuo-btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Sales Rep</span>
            </button>

            {/* Sync Config Settings Button */}
            <button
              onClick={onOpenSyncConfig}
              title="Google Sheets & Forms Configuration"
              className="skeuo-btn p-2 rounded-xl text-on-surface-variant hover:text-primary cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="skeuo-btn flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-full cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-b from-[#6E1B2D] to-[#470815] text-white flex items-center justify-center text-xs font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.3)]">
                  {user?.avatar || 'T'}
                </div>
                <span className="text-xs font-black text-on-surface hidden md:inline truncate max-w-[120px]">
                  {user?.name || 'Sales Lead'}
                </span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 skeuo-card p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-outline-variant/40">
                    <p className="text-xs font-black text-on-surface">{user?.name}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenSyncConfig();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-on-surface hover:bg-surface-container rounded-lg flex items-center gap-2 transition mt-1"
                  >
                    <Settings className="w-3.5 h-3.5 text-on-surface-variant" />
                    <span>Sheet & Form Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-black text-error hover:bg-red-50 rounded-lg flex items-center gap-2 transition"
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
