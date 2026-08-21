import React from 'react';
import { formatINR } from '../services/googleSheetsService';
import { 
  X, 
  Target, 
  Banknote, 
  Layers, 
  Flame, 
  Sun, 
  Sparkles, 
  CheckCircle, 
  Compass, 
  AlertTriangle,
  Calendar,
  Building2
} from 'lucide-react';

export const RepDetailModal = ({ rep, onClose }) => {
  if (!rep) return null;

  const target = Number(rep.monthlyTarget) || 300000;
  const actual = Number(rep.actualSales) || 0;
  const balance = Math.max(0, target - actual);
  const percentAchieved = target > 0 ? Math.round((actual / target) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="skeuo-card max-w-2xl w-full my-auto shadow-[10px_14px_35px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-b from-[#5A1424] via-[#480C1B] to-[#360410] text-white p-3.5 sm:p-5 flex items-center justify-between border-b border-[#2B020B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#7A1E32] to-[#450A17] flex items-center justify-center text-sm sm:text-base font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.4)] border border-[#9A2D45] flex-shrink-0">
              {rep.avatar || rep.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-black drop-shadow-sm truncate">{rep.name}</h2>
                <span className={`text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full border shadow-2xs ${
                  rep.statusType === 'success' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600' :
                  rep.statusType === 'warning' ? 'bg-amber-950/80 text-amber-300 border-amber-600' :
                  'bg-red-950/80 text-red-300 border-red-600'
                }`}>
                  {rep.status}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-pink-200/85 mt-0.5 font-medium truncate">{rep.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="skeuo-btn p-1.5 sm:p-2 text-primary rounded-xl cursor-pointer active:scale-95 flex-shrink-0 ml-2"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-3.5 sm:space-y-5 custom-scrollbar text-on-surface">
          {/* Target Progress Bar Card */}
          <div className="skeuo-card-warm p-3 sm:p-4 rounded-xl sm:rounded-2xl">
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-black text-on-surface mb-1.5">
              <span className="flex items-center gap-1 text-[#5A1424]">
                <Target className="w-3.5 h-3.5 text-brand-pink" />
                Target Progress ({percentAchieved}%)
              </span>
              <span>{formatINR(actual)} / {formatINR(target, true)}</span>
            </div>
            <div className="w-full h-3 sm:h-3.5 bg-[#D8CEBF] rounded-full overflow-hidden flex shadow-[inset_2px_2px_4px_rgba(0,0,0,0.25)] border border-[#C5BAAC]">
              <div
                style={{ width: `${Math.min(100, percentAchieved)}%` }}
                className="bg-gradient-to-r from-[#4A0A17] to-[#7A1E32] h-full rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500"
              />
            </div>
          </div>

          {/* Review Questions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
            {/* 1️⃣ & 2️⃣ Actual Sales & Balance */}
            <div className="skeuo-card p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <span className="text-[10px] sm:text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider mb-1.5">
                <Banknote className="w-3.5 h-3.5 text-brand-pink" />
                1️⃣ Actual & 2️⃣ Balance
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-outline-variant/40">
                <div className="min-w-0">
                  <span className="text-[10px] text-on-surface-variant font-bold block truncate">Actual:</span>
                  <div className="text-sm sm:text-base font-black text-[#5A1424] truncate">{formatINR(actual)}</div>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-on-surface-variant font-bold block truncate">Balance:</span>
                  <div className="text-sm sm:text-base font-black text-secondary truncate">{formatINR(balance)}</div>
                </div>
              </div>
            </div>

            {/* 3️⃣ & 4️⃣ Active Leads & Pipeline Value */}
            <div className="skeuo-card p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <span className="text-[10px] sm:text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider mb-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-pink" />
                3️⃣ Leads & 4️⃣ Value
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-outline-variant/40">
                <div className="min-w-0">
                  <span className="text-[10px] text-on-surface-variant font-bold block truncate">Active Leads:</span>
                  <div className="text-sm sm:text-base font-black text-on-surface truncate">{rep.activeLeadsCount} Leads</div>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-on-surface-variant font-bold block truncate">Order Value:</span>
                  <div className="text-sm sm:text-base font-black text-[#5A1424] truncate">{formatINR(rep.totalPipelineValue)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 5️⃣ Hot / Warm / New Lead Status */}
          <div className="skeuo-card p-3 sm:p-4 rounded-xl sm:rounded-2xl">
            <span className="text-[10px] sm:text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-red-600" />
              5️⃣ Lead Status Breakdown
            </span>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              <div className="bg-gradient-to-b from-[#FFF5F5] to-[#FED7D7] border border-[#FEB2B2] rounded-xl p-2 sm:p-2.5 shadow-xs flex flex-col min-w-0">
                <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] font-black text-red-800">
                  <Flame className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">HOT</span>
                </div>
                <div className="text-sm sm:text-lg font-black text-red-950 mt-0.5 truncate">
                  {rep.leadBreakdown?.hot?.count || 0}
                </div>
                <div className="text-[9px] sm:text-[10px] text-red-800 font-bold truncate mt-0.5">
                  {formatINR(rep.leadBreakdown?.hot?.value || 0, true)}
                </div>
              </div>

              <div className="bg-gradient-to-b from-[#FFFAF0] to-[#FEEBC8] border border-[#FBD38D] rounded-xl p-2 sm:p-2.5 shadow-xs flex flex-col min-w-0">
                <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] font-black text-amber-800">
                  <Sun className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">WARM</span>
                </div>
                <div className="text-sm sm:text-lg font-black text-amber-950 mt-0.5 truncate">
                  {rep.leadBreakdown?.warm?.count || 0}
                </div>
                <div className="text-[9px] sm:text-[10px] text-amber-800 font-bold truncate mt-0.5">
                  {formatINR(rep.leadBreakdown?.warm?.value || 0, true)}
                </div>
              </div>

              <div className="bg-gradient-to-b from-[#EBF8FF] to-[#BEE3F8] border border-[#90CDF4] rounded-xl p-2 sm:p-2.5 shadow-xs flex flex-col min-w-0">
                <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] font-black text-blue-800">
                  <Sparkles className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">NEW</span>
                </div>
                <div className="text-sm sm:text-lg font-black text-blue-950 mt-0.5 truncate">
                  {rep.leadBreakdown?.newLeads?.count || 0}
                </div>
                <div className="text-[9px] sm:text-[10px] text-blue-800 font-bold truncate mt-0.5">
                  {formatINR(rep.leadBreakdown?.newLeads?.value || 0, true)}
                </div>
              </div>
            </div>
          </div>

          {/* 6️⃣ Which leads can realistically be converted this month */}
          <div className="skeuo-card p-3 sm:p-4 rounded-xl sm:rounded-2xl">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] sm:text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider truncate">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                6️⃣ Realistic Conversions
              </span>
              <span className="text-[11px] sm:text-xs font-black text-[#5A1424] flex-shrink-0">
                {formatINR(rep.expectedRealisticConversion)}
              </span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              {rep.realisticLeads && rep.realisticLeads.length > 0 ? (
                rep.realisticLeads.map((lead) => (
                  <div key={lead.id} className="p-2.5 skeuo-inset rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Building2 className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-black text-on-surface truncate">{lead.client}</div>
                        <div className="text-[10px] text-on-surface-variant flex items-center gap-1.5 mt-0.5 font-bold truncate">
                          <span>{lead.date}</span>
                          <span>• Prob: {lead.prob}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-between sm:justify-end flex-shrink-0">
                      <span className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full border shadow-2xs ${
                        lead.status === 'Hot' ? 'bg-red-100 text-red-800 border-red-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {lead.status}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-primary drop-shadow-2xs">
                        {formatINR(lead.value)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-on-surface-variant italic">No specific leads itemized.</p>
              )}
            </div>
          </div>

          {/* 7️⃣ Action Plan & 8️⃣ Pipeline Adequacy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
            {/* 7️⃣ Action Plan */}
            <div className="skeuo-card p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <span className="text-[10px] sm:text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider mb-1.5">
                <Compass className="w-3.5 h-3.5 text-brand-pink flex-shrink-0" />
                7️⃣ Action Plan Strategy
              </span>
              <p className="text-[11px] sm:text-xs text-on-surface leading-relaxed bg-[#FBF4EB] p-2.5 rounded-xl border border-[#E8DCce] font-medium">
                {rep.actionPlan}
              </p>
            </div>

            {/* 8️⃣ Pipeline Sufficiency & New Leads */}
            <div className="skeuo-card p-3 sm:p-4 rounded-xl sm:rounded-2xl">
              <span className="text-[10px] sm:text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-warning flex-shrink-0" />
                8️⃣ Pipeline Gap & Backup Leads
              </span>
              <div className="p-2.5 rounded-xl skeuo-inset space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant text-[10px] sm:text-xs font-bold">New Leads Needed:</span>
                  <span className={`font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-full border shadow-2xs ${
                    rep.newLeadsRequired > 0 ? 'bg-red-100 text-error border-red-300' : 'bg-emerald-100 text-success border-emerald-300'
                  }`}>
                    {rep.newLeadsRequired > 0 ? `+${rep.newLeadsRequired} Needed` : 'Adequate'}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-on-surface-variant font-medium leading-relaxed">
                  {rep.pipelineAdequacyNotes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-[#EDE4D8] border-t border-[#D5C7B8] flex justify-end shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] flex-shrink-0">
          <button
            onClick={onClose}
            className="skeuo-btn-primary w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-black cursor-pointer active:scale-95 text-center"
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
};
