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
  Menu,
  X
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="skeuo-header sticky top-0 z-40 transition-all">
      {/* Full-width Skeuomorphic Top Bar */}
      <div className="w-full px-3.5 sm:px-6 lg:px-10 py-3">
        <div className="w-full flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Deep Burgundy Logo - Clean, No Border, Fully Responsive */}
          <div className="flex items-center">
            <TeeszoneLogo className="h-9 sm:h-11 md:h-12 w-auto" />
          </div>

          {/* Desktop Right Action Controls */}
          <div className="hidden lg:flex items-center gap-3 flex-wrap justify-end">
            {/* Live Sync Status Pill */}
            <div className={`skeuo-pill flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold ${
              config.sheetCsvUrl 
                ? (syncError ? 'text-error' : 'text-success') 
                : 'text-[#6E1B2D]'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.3)] ${
                config.sheetCsvUrl 
                  ? (syncError ? 'bg-error' : 'bg-success animate-pulse-dot') 
                  : 'bg-[#6E1B2D] animate-pulse-dot'
              }`} />
              <span className="tracking-tight">
                {config.sheetCsvUrl 
                  ? (isSyncing ? 'Syncing...' : (syncError ? 'Sync Error' : `Live Sheets Sync ${lastSyncTime ? `(${lastSyncTime})` : ''}`)) 
                  : 'Live Pipeline Auto-Sync'}
              </span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => syncWithGoogleSheet()}
              disabled={isSyncing}
              title="Refresh Google Sheet Data"
              className="skeuo-btn flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-primary rounded-xl cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#6E1B2D]' : ''}`} />
              <span>Refresh Data</span>
            </button>

            {/* Google Form Link */}
            {config.formUrl && (
              <a
                href={config.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="skeuo-btn flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#6E1B2D] rounded-xl cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Google Sheet / Form</span>
              </a>
            )}

            {/* Add Sales Rep Button */}
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
                <span className="text-xs font-black text-on-surface truncate max-w-[110px]">
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

          {/* Mobile Right Controls (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Quick Refresh Icon */}
            <button
              onClick={() => syncWithGoogleSheet()}
              disabled={isSyncing}
              title="Refresh Data"
              className="skeuo-btn p-2 rounded-xl text-[#5A1424] cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-brand-pink' : ''}`} />
            </button>

            {/* Add Rep Quick Icon Button */}
            <button
              onClick={onOpenAddRep}
              className="skeuo-btn-primary p-2 rounded-xl text-white cursor-pointer active:scale-95"
              title="Add Sales Rep"
            >
              <UserPlus className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="skeuo-btn p-2 rounded-xl text-primary cursor-pointer active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-outline-variant/40 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Live Sync Status */}
            <div className="skeuo-pill p-2.5 rounded-xl flex items-center justify-between text-xs font-bold">
              <span className="text-on-surface-variant font-medium">Google Sheet Sync:</span>
              <span className="flex items-center gap-1.5 text-success">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
                <span>{lastSyncTime ? `Synced at ${lastSyncTime}` : 'Active Live Sync'}</span>
              </span>
            </div>

            {/* Action Buttons in Mobile View */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAddRep();
                }}
                className="skeuo-btn-primary py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Add Rep</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSyncConfig();
                }}
                className="skeuo-btn py-2.5 px-3 rounded-xl text-xs font-bold text-primary flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5 text-[#5A1424]" />
                <span>Sheet Settings</span>
              </button>
            </div>

            {config.formUrl && (
              <a
                href={config.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="skeuo-btn w-full py-2.5 px-3 rounded-xl text-xs font-bold text-[#6E1B2D] flex items-center justify-center gap-2 text-center"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Google Sheet / Form</span>
              </a>
            )}

            {/* Mobile User Profile Bar */}
            <div className="skeuo-inset p-2.5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#6E1B2D] to-[#470815] text-white flex items-center justify-center text-xs font-black">
                  {user?.avatar || 'T'}
                </div>
                <div>
                  <p className="text-xs font-black text-on-surface">{user?.name || 'Sales Lead'}</p>
                  <p className="text-[10px] text-on-surface-variant">{user?.email || 'manager@teeszone.com'}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="p-1.5 rounded-lg bg-red-100 text-error hover:bg-red-200 transition text-xs font-bold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
