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
  const [autoSyncSec, setAutoSyncSec] = useState(config.autoSyncIntervalSec || 30);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedConfig = {
      ...config,
      sheetCsvUrl: sheetCsvUrl.trim(),
      formUrl: formUrl.trim(),
      defaultTargetPerPerson: Number(targetAmount) || 300000,
      autoSyncIntervalSec: Number(autoSyncSec) || 30,
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="skeuo-card max-w-2xl w-full my-8 shadow-[10px_14px_35px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#EDE4D8] border-b border-[#D5C7B8] p-5 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl skeuo-inset text-[#5A1424]">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-on-surface">
                Google Sheets & Forms Live Sync
              </h2>
              <p className="text-xs text-on-surface-variant font-bold">
                Zero-backend automatic real-time pipeline integration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="skeuo-btn p-2 text-primary rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar text-on-surface">
          {/* Status Message */}
          {syncError && (
            <div className="p-3.5 bg-red-100 border border-red-300 rounded-2xl text-xs text-error flex items-start gap-2 shadow-2xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-black">Sync Notice: </span>
                {syncError}
              </div>
            </div>
          )}

          {saveSuccess && (
            <div className="p-3.5 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs text-success flex items-center gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span className="font-black">Settings saved successfully!</span>
            </div>
          )}

          {/* Form Configuration Inputs */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                Google Sheet Published CSV URL
              </label>
              <input
                type="url"
                placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                value={sheetCsvUrl}
                onChange={(e) => setSheetCsvUrl(e.target.value)}
                className="skeuo-inset w-full px-3.5 py-2.5 text-xs rounded-xl focus:border-brand-pink outline-none transition font-medium"
              />
              <p className="text-[11px] text-on-surface-variant mt-1 font-bold">
                Paste your Google Sheet's "Publish to Web" CSV link or sheet share URL.
              </p>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                Google Form Link (For Sales Rep Submissions)
              </label>
              <input
                type="url"
                placeholder="https://docs.google.com/forms/d/e/.../viewform"
                value={formUrl}
                onChange={(e) => setFormUrl(e.target.value)}
                className="skeuo-inset w-full px-3.5 py-2.5 text-xs rounded-xl focus:border-brand-pink outline-none transition font-medium"
              />
              <p className="text-[11px] text-on-surface-variant mt-1 font-bold">
                Sales reps can click "Open Google Form" from the top navigation to submit their daily updates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                  Default Target Per Person (₹)
                </label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="skeuo-inset w-full px-3.5 py-2.5 text-xs rounded-xl focus:border-brand-pink outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                  Auto-Sync Interval (Seconds)
                </label>
                <select
                  value={autoSyncSec}
                  onChange={(e) => setAutoSyncSec(e.target.value)}
                  className="skeuo-inset w-full px-3.5 py-2.5 text-xs rounded-xl focus:border-brand-pink outline-none transition font-bold"
                >
                  <option value={15}>Every 15 seconds</option>
                  <option value={30}>Every 30 seconds (Recommended)</option>
                  <option value={60}>Every 1 minute</option>
                  <option value={300}>Every 5 minutes</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              <button
                type="button"
                onClick={resetToDefault}
                className="flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-error transition font-black cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default (Ramya, Vijayadarshini, Archana)</span>
              </button>

              <button
                type="submit"
                disabled={isSyncing}
                className="skeuo-btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Save & Sync</span>
              </button>
            </div>
          </form>

          {/* 3-Step Setup Guide */}
          <div className="skeuo-card-warm p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#5A1424] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-pink" />
              How to Publish Google Sheet in 3 Simple Steps:
            </h4>
            <ol className="text-xs space-y-2 text-on-surface list-decimal list-inside leading-relaxed font-bold">
              <li>
                Open your <strong>Google Sheet</strong> connected to your Google Form responses.
              </li>
              <li>
                Click <strong>File &gt; Share &gt; Publish to web</strong>.
              </li>
              <li>
                Select <strong>Entire Document (or Form Responses 1)</strong> &gt; choose <strong>Comma-separated values (.csv)</strong> &gt; click <strong>Publish</strong>.
              </li>
              <li>
                Paste the generated link above. Any time a sales representative submits the form, this dashboard refreshes automatically!
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
