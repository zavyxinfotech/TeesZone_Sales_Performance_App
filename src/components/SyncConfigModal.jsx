import React, { useState } from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { 
  X, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  RefreshCw, 
  RotateCcw
} from 'lucide-react';

export const SyncConfigModal = ({ onClose }) => {
  const { 
    config, 
    setConfig, 
    syncWithGoogleSheet, 
    isSyncing, 
    syncError, 
    lastSyncTime, 
    resetToDefault 
  } = useSalesData();

  const [sheetCsvUrl, setSheetCsvUrl] = useState(config.sheetCsvUrl || '');
  const [formUrl, setFormUrl] = useState(config.formUrl || '');
  const [targetAmount, setTargetAmount] = useState(config.defaultTargetPerPerson || 300000);
  const [autoSyncSec, setAutoSyncSec] = useState(config.autoSyncIntervalSec || 15);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedConfig = {
      ...config,
      sheetCsvUrl: sheetCsvUrl.trim(),
      formUrl: formUrl.trim(),
      defaultTargetPerPerson: Number(targetAmount) || 300000,
      autoSyncIntervalSec: Number(autoSyncSec) || 15,
    };
    setConfig(updatedConfig);
    setSaveSuccess(true);

    if (sheetCsvUrl.trim()) {
      await syncWithGoogleSheet(sheetCsvUrl.trim());
    }

    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="skeuo-card max-w-2xl w-full my-auto shadow-[10px_14px_35px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#EDE4D8] border-b border-[#D5C7B8] p-3.5 sm:p-5 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl skeuo-inset text-[#5A1424] flex-shrink-0">
              <FileSpreadsheet className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black text-on-surface truncate">
                Google Sheets Live Sync
              </h2>
              <p className="text-[10px] sm:text-xs text-on-surface-variant font-bold truncate">
                Zero-backend live sync integration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="skeuo-btn p-1.5 sm:p-2 text-primary rounded-xl cursor-pointer active:scale-95 flex-shrink-0 ml-2"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 custom-scrollbar text-on-surface">
          {/* Status Message */}
          {syncError && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-error flex items-start gap-2 shadow-2xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-black">Sync Notice: </span>
                {syncError}
              </div>
            </div>
          )}

          {saveSuccess && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs text-success flex items-center gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span className="font-black">Settings saved and synced successfully!</span>
            </div>
          )}

          {/* Form Configuration Inputs */}
          <form onSubmit={handleSave} className="space-y-3.5 sm:space-y-4">
            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                Google Sheet Published CSV or Edit Link
              </label>
              <input
                type="url"
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={sheetCsvUrl}
                onChange={(e) => setSheetCsvUrl(e.target.value)}
                className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                Google Form / Sheet Link (For Team Submissions)
              </label>
              <input
                type="url"
                placeholder="https://docs.google.com/forms/d/..."
                value={formUrl}
                onChange={(e) => setFormUrl(e.target.value)}
                className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                  Default Target Per Person (₹)
                </label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                  Auto-Sync Interval
                </label>
                <select
                  value={autoSyncSec}
                  onChange={(e) => setAutoSyncSec(e.target.value)}
                  className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-bold"
                >
                  <option value={15}>Every 15 seconds (Recommended)</option>
                  <option value={30}>Every 30 seconds</option>
                  <option value={60}>Every 1 minute</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2">
              <button
                type="button"
                onClick={resetToDefault}
                className="flex items-center justify-center gap-1.5 text-xs text-on-surface-variant hover:text-error transition font-black cursor-pointer py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Baseline</span>
              </button>

              <button
                type="submit"
                disabled={isSyncing}
                className="skeuo-btn-primary flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Save & Sync</span>
              </button>
            </div>
          </form>

          {/* 3-Step Setup Guide */}
          <div className="skeuo-card-warm p-3.5 sm:p-4 rounded-xl sm:rounded-2xl space-y-2">
            <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#5A1424] flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-brand-pink flex-shrink-0" />
              <span>How to Connect Your Sheet:</span>
            </h4>
            <ol className="text-[11px] sm:text-xs space-y-1.5 text-on-surface list-decimal list-inside leading-relaxed font-medium">
              <li>Open your <strong>Google Sheet</strong>.</li>
              <li>Click <strong>File &gt; Share &gt; Publish to web</strong> &gt; select <strong>CSV</strong> &gt; <strong>Publish</strong>.</li>
              <li>Paste the link above and click <strong>Save & Sync</strong>.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
