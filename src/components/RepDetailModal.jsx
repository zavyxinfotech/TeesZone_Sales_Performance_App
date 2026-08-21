import React from 'react';
import { formatINR } from '../services/googleSheetsService';
import { 
  X, 
  Target, 
  Banknote, 
  Scale, 
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
  const isTargetAchievable = (actual + rep.expectedRealisticConversion) >= target;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-outline-variant rounded-2xl max-w-3xl w-full my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#3e0211] text-white p-5 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${rep.avatarColor || 'bg-brand-pink text-white'} flex items-center justify-center text-lg font-bold shadow-md border-2 border-white/20`}>
              {rep.avatar || rep.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold">{rep.name}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  rep.statusType === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  rep.statusType === 'warning' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}>
                  {rep.status}
                </span>
              </div>
              <p className="text-xs text-pink-200/80 mt-0.5">{rep.email} • August 2026 Sales Pipeline Review</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar text-on-surface">
          {/* Target Progress Bar Card */}
          <div className="card-surface-warm p-4 rounded-xl border border-[#E5DED4]">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface mb-2">
              <span className="flex items-center gap-1.5 text-primary">
                <Target className="w-4 h-4" />
                Monthly Target Progress ({percentAchieved}%)
              </span>
              <span>{formatINR(actual)} / {formatINR(target)}</span>
            </div>
            <div className="w-full h-3.5 bg-[#e5ded4] rounded-full overflow-hidden flex">
              <div
                style={{ width: `${Math.min(100, percentAchieved)}%` }}
                className="bg-primary-container h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>

          {/* Review Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1️⃣ & 2️⃣ Actual Sales & Balance */}
            <div className="card-surface p-4 rounded-xl border border-outline-variant/60">
              <span className="text-[11px] font-bold text-primary flex items-center gap-1 uppercase tracking-wider mb-2">
                <Banknote className="w-4 h-4 text-brand-pink" />
                1️⃣ Actual Sales & 2️⃣ Balance Required
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-outline-variant/30">
                <div>
                  <span className="text-[11px] text-on-surface-variant font-medium">Actual Achieved:</span>
                  <div className="text-lg font-bold text-primary">{formatINR(actual)}</div>
                </div>
                <div>
                  <span className="text-[11px] text-on-surface-variant font-medium">Balance to ₹3L:</span>
                  <div className="text-lg font-bold text-secondary">{formatINR(balance)}</div>
                </div>
              </div>
            </div>

            {/* 3️⃣ & 4️⃣ Active Leads & Pipeline Value */}
            <div className="card-surface p-4 rounded-xl border border-outline-variant/60">
              <span className="text-[11px] font-bold text-primary flex items-center gap-1 uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4 text-brand-pink" />
                3️⃣ Active Leads & 4️⃣ Pipeline Value
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-outline-variant/30">
                <div>
                  <span className="text-[11px] text-on-surface-variant font-medium">Active Leads:</span>
                  <div className="text-lg font-bold text-on-surface">{rep.activeLeadsCount} Leads</div>
                </div>
                <div>
                  <span className="text-[11px] text-on-surface-variant font-medium">Expected Order Value:</span>
                  <div className="text-lg font-bold text-primary-container">{formatINR(rep.totalPipelineValue)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 5️⃣ Hot / Warm / New Lead Status */}
          <div className="card-surface p-4 rounded-xl border border-outline-variant/60">
            <span className="text-[11px] font-bold text-primary flex items-center gap-1 uppercase tracking-wider mb-3">
              <Flame className="w-4 h-4 text-red-600" />
              5️⃣ Hot / Warm / New Lead Status Breakdown
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-50/70 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-1 text-xs font-bold text-red-700">
                  <Flame className="w-3.5 h-3.5" />
                  <span>HOT LEADS</span>
                </div>
                <div className="text-lg font-extrabold text-red-900 mt-1">
                  {rep.leadBreakdown?.hot?.count || 0}
                </div>
                <div className="text-xs text-red-600 font-semibold mt-0.5">
                  {formatINR(rep.leadBreakdown?.hot?.value || 0)}
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                  <Sun className="w-3.5 h-3.5" />
                  <span>WARM LEADS</span>
                </div>
                <div className="text-lg font-extrabold text-amber-900 mt-1">
                  {rep.leadBreakdown?.warm?.count || 0}
                </div>
                <div className="text-xs text-amber-600 font-semibold mt-0.5">
                  {formatINR(rep.leadBreakdown?.warm?.value || 0)}
                </div>
              </div>

              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-1 text-xs font-bold text-blue-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NEW LEADS</span>
                </div>
                <div className="text-lg font-extrabold text-blue-900 mt-1">
                  {rep.leadBreakdown?.newLeads?.count || 0}
                </div>
                <div className="text-xs text-blue-600 font-semibold mt-0.5">
                  {formatINR(rep.leadBreakdown?.newLeads?.value || 0)}
                </div>
              </div>
            </div>
          </div>

          {/* 6️⃣ Which leads can realistically be converted this month */}
          <div className="card-surface p-4 rounded-xl border border-outline-variant/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-primary flex items-center gap-1 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                6️⃣ Realistic Lead Conversions Before 31 August
              </span>
              <span className="text-xs font-bold text-primary-container">
                Total: {formatINR(rep.expectedRealisticConversion)}
              </span>
            </div>

            <div className="space-y-2">
              {rep.realisticLeads && rep.realisticLeads.length > 0 ? (
                rep.realisticLeads.map((lead) => (
                  <div key={lead.id} className="p-3 bg-surface-container/50 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-outline-variant/30">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-secondary flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-on-surface">{lead.client}</div>
                        <div className="text-[11px] text-on-surface-variant flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-outline" /> {lead.date}
                          </span>
                          <span>• Prob: {lead.prob}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        lead.status === 'Hot' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {lead.status}
                      </span>
                      <span className="text-sm font-extrabold text-primary">
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
            <div className="card-surface p-4 rounded-xl border border-outline-variant/60">
              <span className="text-[11px] font-bold text-primary flex items-center gap-1 uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4 text-brand-pink" />
                7️⃣ How to achieve remaining target before Aug 31
              </span>
              <p className="text-xs text-on-surface leading-relaxed mt-2 bg-pink-50/30 p-3 rounded-lg border border-pink-100">
                {rep.actionPlan}
              </p>
            </div>

            {/* 8️⃣ Pipeline Sufficiency & New Leads */}
            <div className="card-surface p-4 rounded-xl border border-outline-variant/60">
              <span className="text-[11px] font-bold text-primary flex items-center gap-1 uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                8️⃣ Pipeline Gap & New Leads Needed
              </span>
              <div className="p-3 rounded-lg bg-surface-container/50 border border-outline-variant/40 space-y-2 mt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant font-medium">New Leads To Generate:</span>
                  <span className={`font-extrabold text-sm px-2 py-0.5 rounded ${
                    rep.newLeadsRequired > 0 ? 'bg-red-100 text-error' : 'bg-emerald-100 text-success'
                  }`}>
                    {rep.newLeadsRequired > 0 ? `+${rep.newLeadsRequired} Leads Required` : 'Pipeline Adequate'}
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {rep.pipelineAdequacyNotes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container border-t border-outline-variant/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-container transition shadow-xs"
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
};
