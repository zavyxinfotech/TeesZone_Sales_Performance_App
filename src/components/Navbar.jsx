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

export const Navbar = ({ onOpenSyncConfig, onOpenAddRep, isMobileMenuOpen, setIsMobileMenuOpen }) => {
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full skeuo-header shadow-[0_2px_10px_rgba(150,130,110,0.15)] border-b border-[#D5C7B8] transition-all">
      {/* Top Main Navigation Bar */}
      <div className="w-full px-3 sm:px-6 lg:px-10 py-2.5 sm:py-3 max-w-full">
        <div className="w-full flex items-center justify-between gap-2">
          
          {/* Logo Section */}
          <div className="flex items-center min-w-0">
            <TeeszoneLogo className="h-7 sm:h-9 md:h-11 w-auto" />
          </div>

          {/* Desktop Action Bar (>= 768px) */}
          <div className="hidden md:flex items-center gap-2.5 flex-nowrap flex-shrink-0">
            {/* Live Sync Status Indicator Pill */}
            <div 
              title={config.sheetCsvUrl ? (lastSyncTime ? `Live Google Sheet synced at ${lastSyncTime}` : 'Live Google Sheet Sync Active') : 'Live Auto-Sync'}
              className={`skeuo-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                config.sheetCsvUrl 
                  ? (syncError ? 'text-error' : 'text-success') 
                  : 'text-[#6E1B2D]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
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
              className="skeuo-btn px-3 py-1.5 rounded-xl text-xs font-bold text-[#4A0A17] flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#7A1E32]' : ''}`} />
              <span>Refresh</span>
            </button>

            {/* Google Form / Sheet Link */}
            {config.formUrl && (
              <a
                href={config.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Google Sheet / Form"
                className="skeuo-btn px-3 py-1.5 rounded-xl text-xs font-bold text-[#6E1B2D] flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Google Sheet</span>
              </a>
            )}

            {/* Add Sales Rep Button */}
            <button
              onClick={onOpenAddRep}
              title="Add Sales Representative"
              className="skeuo-btn-primary px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Rep</span>
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
                className="skeuo-btn p-1.5 pl-2 pr-3 rounded-full flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="User Menu"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-b from-[#6E1B2D] to-[#470815] text-white flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0">
                  {user?.avatar || 'T'}
                </div>
                <span className="text-xs font-black text-on-surface truncate max-w-[80px]">
                  {user?.name || 'Lead'}
                </span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 skeuo-card p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 shadow-xl">
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

          {/* Mobile Right Controls (< 768px) */}
          <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
            {/* Quick Refresh Icon Button */}
            <button
              onClick={() => syncWithGoogleSheet()}
              disabled={isSyncing}
              title="Refresh Data"
              className="skeuo-btn p-1.5 rounded-xl text-[#4A0A17] cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-brand-pink' : ''}`} />
            </button>

            {/* Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="skeuo-btn p-1.5 rounded-xl text-primary cursor-pointer active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Liquid Glass UI Panel (< 768px) */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-3 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_12px_32px_rgba(58,3,15,0.18),inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Live Sync Status */}
            <div className="skeuo-pill p-2 rounded-xl flex items-center justify-between text-xs font-bold">
              <span className="text-on-surface-variant font-medium text-[11px]">Sync Status:</span>
              <span className="flex items-center gap-1 text-success text-[11px]">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
                <span>{lastSyncTime ? `Live (${lastSyncTime})` : 'Live Auto-Sync'}</span>
              </span>
            </div>

            {/* Action Buttons in Mobile View */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAddRep();
                }}
                className="skeuo-btn-primary py-2 px-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Add Rep</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSyncConfig();
                }}
                className="skeuo-btn py-2 px-2.5 rounded-xl text-xs font-bold text-primary flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Settings className="w-3.5 h-3.5 text-[#5A1424]" />
                <span>Settings</span>
              </button>
            </div>

            {config.formUrl && (
              <a
                href={config.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="skeuo-btn w-full py-2 px-2.5 rounded-xl text-xs font-bold text-[#6E1B2D] flex items-center justify-center gap-1.5 text-center active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Google Sheet / Form</span>
              </a>
            )}

            {/* Mobile User Profile Bar */}
            <div className="skeuo-inset p-2 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#6E1B2D] to-[#470815] text-white flex items-center justify-center text-xs font-black flex-shrink-0">
                  {user?.avatar || 'T'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-on-surface truncate">{user?.name || 'Sales Lead'}</p>
                  <p className="text-[10px] text-on-surface-variant truncate">{user?.email || 'manager@teeszone.com'}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="p-1.5 rounded-lg bg-red-100 text-error hover:bg-red-200 transition text-[11px] font-bold flex items-center gap-1 flex-shrink-0"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
