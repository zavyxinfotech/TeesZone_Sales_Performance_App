import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSalesData } from '../context/SalesDataContext';
import { TeeszoneLogo } from './TeeszoneLogo';
import { 
  RefreshCw, 
  Settings, 
  UserPlus, 
  LogOut, 
  ExternalLink,
  CheckCircle2
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
    <header className="skeuo-header sticky top-0 z-40 transition-all border-b border-[#D5C7B8]">
      {/* Full-width Compact Responsive Bar */}
      <div className="w-full px-3 sm:px-6 lg:px-10 py-2.5 sm:py-3">
        <div className="w-full flex items-center justify-between gap-2">
          
          {/* Logo Section - Deep Burgundy Vector Branding */}
          <div className="flex items-center flex-shrink-0">
            <TeeszoneLogo className="h-8 sm:h-10 md:h-11 w-auto" />
          </div>

          {/* Action Cluster - Always Stays in a Clean Single Line */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-nowrap">
            {/* Live Sync Status Indicator Pill */}
            <div 
              title={config.sheetCsvUrl ? (lastSyncTime ? `Live Google Sheet synced at ${lastSyncTime}` : 'Live Google Sheet Sync Active') : 'Live Auto-Sync'}
              className={`skeuo-pill hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                config.sheetCsvUrl 
                  ? (syncError ? 'text-error' : 'text-success') 
                  : 'text-[#6E1B2D]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                config.sheetCsvUrl 
                  ? (syncError ? 'bg-error' : 'bg-success animate-pulse-dot') 
                  : 'bg-[#6E1B2D] animate-pulse-dot'
              }`} />
              <span className="truncate max-w-[170px]">
                {isSyncing ? 'Syncing...' : (syncError ? 'Sync Error' : `Live Sheet (${lastSyncTime || 'Active'})`)}
              </span>
            </div>

            {/* Refresh Data Button */}
            <button
              onClick={() => syncWithGoogleSheet()}
              disabled={isSyncing}
              title="Refresh Google Sheet Data"
              className="skeuo-btn p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold text-[#4A0A17] flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#7A1E32]' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Google Form / Sheet Link */}
            {config.formUrl && (
              <a
                href={config.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Google Sheet / Form"
                className="skeuo-btn p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold text-[#6E1B2D] flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Google Sheet</span>
              </a>
            )}

            {/* Add Sales Rep Button */}
            <button
              onClick={onOpenAddRep}
              title="Add Sales Representative"
              className="skeuo-btn-primary px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden xs:inline sm:inline">+ Add Rep</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSyncConfig}
              title="Google Sheet Settings"
              className="skeuo-btn p-2 rounded-xl text-on-surface-variant hover:text-primary cursor-pointer active:scale-95"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Profile Avatar / Logout */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="skeuo-btn p-1.5 sm:p-1.5 sm:pl-2 sm:pr-3 rounded-full flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="User Menu"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-b from-[#6E1B2D] to-[#470815] text-white flex items-center justify-center text-xs font-black shadow-xs">
                  {user?.avatar || 'T'}
                </div>
                <span className="text-xs font-black text-on-surface hidden sm:inline truncate max-w-[80px]">
                  {user?.name || 'Lead'}
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
                    <span>Sheet Settings</span>
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
