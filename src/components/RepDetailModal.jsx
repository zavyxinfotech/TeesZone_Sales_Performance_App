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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="skeuo-card max-w-3xl w-full my-8 shadow-[10px_14px_35px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-b from-[#5A1424] via-[#480C1B] to-[#360410] text-white p-5 md:p-6 flex items-center justify-between border-b border-[#2B020B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#7A1E32] to-[#450A17] flex items-center justify-center text-lg font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_3px_6px_rgba(0,0,0,0.4)] border border-[#9A2D45]">
              {rep.avatar || rep.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl md:text-2xl font-black drop-shadow-sm">{rep.name}</h2>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border shadow-2xs ${
                  rep.statusType === 'success' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600' :
                  rep.statusType === 'warning' ? 'bg-amber-950/80 text-amber-300 border-amber-600' :
                  'bg-red-950/80 text-red-300 border-red-600'
                }`}>
                  {rep.status}
                </span>
              </div>
              <p className="text-xs text-pink-200/85 mt-0.5 font-bold">{rep.email} • August 2026 Sales Review</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="skeuo-btn p-2 text-primary rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar text-on-surface">
          {/* Target Progress Bar Card */}
          <div className="skeuo-card-warm p-4 rounded-2xl">
            <div className="flex justify-between items-center text-xs font-black text-on-surface mb-2">
              <span className="flex items-center gap-1.5 text-[#5A1424]">
                <Target className="w-4 h-4 text-brand-pink" />
                Monthly Target Progress ({percentAchieved}%)
              </span>
              <span>{formatINR(actual)} / {formatINR(target)}</span>
            </div>
            <div className="w-full h-4 bg-[#D8CEBF] rounded-full overflow-hidden flex shadow-[inset_2px_2px_4px_rgba(0,0,0,0.25)] border border-[#C5BAAC]">
              <div
                style={{ width: `${Math.min(100, percentAchieved)}%` }}
                className="bg-gradient-to-r from-[#4A0A17] to-[#7A1E32] h-full rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500"
              />
            </div>
          </div>

          {/* Review Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1️⃣ & 2️⃣ Actual Sales & Balance */}
            <div className="skeuo-card p-4 rounded-2xl">
              <span className="text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider mb-2">
                <Banknote className="w-4 h-4 text-brand-pink" />
                1️⃣ Actual Sales & 2️⃣ Balance Required
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-outline-variant/40">
                <div>
                  <span className="text-[11px] text-on-surface-variant font-bold">Actual Achieved:</span>
                  <div className="text-lg font-black text-[#5A1424] drop-shadow-2xs">{formatINR(actual)}</div>
                </div>
                <div>
                  <span className="text-[11px] text-on-surface-variant font-bold">Balance to ₹3L:</span>
                  <div className="text-lg font-black text-secondary drop-shadow-2xs">{formatINR(balance)}</div>
                </div>
              </div>
            </div>

            {/* 3️⃣ & 4️⃣ Active Leads & Pipeline Value */}
            <div className="skeuo-card p-4 rounded-2xl">
              <span className="text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4 text-brand-pink" />
                3️⃣ Active Leads & 4️⃣ Pipeline Value
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-outline-variant/40">
                <div>
                  <span className="text-[11px] text-on-surface-variant font-bold">Active Leads:</span>
                  <div className="text-lg font-black text-on-surface drop-shadow-2xs">{rep.activeLeadsCount} Leads</div>
                </div>
                <div>
                  <span className="text-[11px] text-on-surface-variant font-bold">Expected Order Value:</span>
                  <div className="text-lg font-black text-[#5A1424] drop-shadow-2xs">{formatINR(rep.totalPipelineValue)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 5️⃣ Hot / Warm / New Lead Status */}
          <div className="skeuo-card p-4 rounded-2xl">
            <span className="text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider mb-3">
              <Flame className="w-4 h-4 text-red-600" />
              5️⃣ Hot / Warm / New Lead Status Breakdown
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-b from-[#FFF5F5] to-[#FED7D7] border border-[#FEB2B2] rounded-xl p-3 shadow-[2px_3px_6px_rgba(229,62,62,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]">
                <div className="flex items-center gap-1 text-xs font-black text-red-800">
                  <Flame className="w-3.5 h-3.5" />
                  <span>HOT LEADS</span>
                </div>
                <div className="text-xl font-black text-red-950 mt-1 drop-shadow-2xs">
                  {rep.leadBreakdown?.hot?.count || 0}
                </div>
                <div className="text-xs text-red-800 font-black mt-0.5">
                  {formatINR(rep.leadBreakdown?.hot?.value || 0)}
                </div>
              </div>

              <div className="bg-gradient-to-b from-[#FFFAF0] to-[#FEEBC8] border border-[#FBD38D] rounded-xl p-3 shadow-[2px_3px_6px_rgba(221,107,32,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]">
                <div className="flex items-center gap-1 text-xs font-black text-amber-800">
                  <Sun className="w-3.5 h-3.5" />
                  <span>WARM LEADS</span>
                </div>
                <div className="text-xl font-black text-amber-950 mt-1 drop-shadow-2xs">
                  {rep.leadBreakdown?.warm?.count || 0}
                </div>
                <div className="text-xs text-amber-800 font-black mt-0.5">
                  {formatINR(rep.leadBreakdown?.warm?.value || 0)}
                </div>
              </div>

              <div className="bg-gradient-to-b from-[#EBF8FF] to-[#BEE3F8] border border-[#90CDF4] rounded-xl p-3 shadow-[2px_3px_6px_rgba(49,130,206,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]">
                <div className="flex items-center gap-1 text-xs font-black text-blue-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NEW LEADS</span>
                </div>
                <div className="text-xl font-black text-blue-950 mt-1 drop-shadow-2xs">
                  {rep.leadBreakdown?.newLeads?.count || 0}
                </div>
                <div className="text-xs text-blue-800 font-black mt-0.5">
                  {formatINR(rep.leadBreakdown?.newLeads?.value || 0)}
                </div>
              </div>
            </div>
          </div>

          {/* 6️⃣ Which leads can realistically be converted this month */}
          <div className="skeuo-card p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                6️⃣ Realistic Lead Conversions Before 31 August
              </span>
              <span className="text-xs font-black text-[#5A1424]">
                Total: {formatINR(rep.expectedRealisticConversion)}
              </span>
            </div>

            <div className="space-y-2">
              {rep.realisticLeads && rep.realisticLeads.length > 0 ? (
                rep.realisticLeads.map((lead) => (
                  <div key={lead.id} className="p-3 skeuo-inset rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-secondary flex-shrink-0" />
                      <div>
                        <div className="text-xs font-black text-on-surface">{lead.client}</div>
                        <div className="text-[11px] text-on-surface-variant flex items-center gap-2 mt-0.5 font-bold">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-outline" /> {lead.date}
                          </span>
                          <span>• Prob: {lead.prob}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border shadow-2xs ${
                        lead.status === 'Hot' ? 'bg-red-100 text-red-800 border-red-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {lead.status}
                      </span>
                      <span className="text-sm font-black text-primary drop-shadow-2xs">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 7️⃣ Action Plan */}
            <div className="skeuo-card p-4 rounded-2xl">
              <span className="text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4 text-brand-pink" />
                7️⃣ How to achieve remaining target before Aug 31
              </span>
              <p className="text-xs text-on-surface leading-relaxed mt-2 bg-[#FBF4EB] p-3 rounded-xl border border-[#E8DCce] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.06)] font-medium">
                {rep.actionPlan}
              </p>
            </div>

            {/* 8️⃣ Pipeline Sufficiency & New Leads */}
            <div className="skeuo-card p-4 rounded-2xl">
              <span className="text-[11px] font-black text-[#5A1424] flex items-center gap-1 uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                8️⃣ Pipeline Gap & New Leads Needed
              </span>
              <div className="p-3 rounded-xl skeuo-inset space-y-2 mt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant font-bold">New Leads To Generate:</span>
                  <span className={`font-black text-sm px-2.5 py-0.5 rounded-full border shadow-2xs ${
                    rep.newLeadsRequired > 0 ? 'bg-red-100 text-error border-red-300' : 'bg-emerald-100 text-success border-emerald-300'
                  }`}>
                    {rep.newLeadsRequired > 0 ? `+${rep.newLeadsRequired} Leads Needed` : 'Pipeline Adequate'}
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed">
                  {rep.pipelineAdequacyNotes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#EDE4D8] border-t border-[#D5C7B8] flex justify-end shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <button
            onClick={onClose}
            className="skeuo-btn-primary px-6 py-2 rounded-xl text-xs font-black cursor-pointer"
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
};
