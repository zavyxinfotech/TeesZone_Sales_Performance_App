import React from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { Activity, Flame, Sun, Sparkles, AlertTriangle } from 'lucide-react';

export const PipelineHealthCard = () => {
  const { teamMetrics } = useSalesData();

  return (
    <div className="skeuo-card p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-card-heading text-on-surface font-black flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-pink" />
            <span>Pipeline Health</span>
          </h3>
          <span className="skeuo-pill text-[11px] font-black px-3 py-1 rounded-full text-on-surface-variant">
            {teamMetrics.totalActiveLeads} Total Leads
          </span>
        </div>

        <div className="space-y-4">
          {/* Active Leads */}
          <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40 text-xs md:text-sm">
            <span className="text-on-surface-variant font-bold">Total Active Leads (Q3)</span>
            <span className="font-black text-on-surface text-lg drop-shadow-2xs">{teamMetrics.totalActiveLeads}</span>
          </div>

          {/* Hot / Warm / New Distribution */}
          <div className="space-y-2.5 pb-3 border-b border-outline-variant/40">
            <span className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider block">
              Lead Status Breakdown (Q5)
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-gradient-to-b from-[#FFF5F5] to-[#FED7D7] border border-[#FEB2B2] rounded-2xl p-2.5 flex flex-col shadow-[2px_3px_6px_rgba(229,62,62,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]">
                <span className="text-[10px] font-black text-red-800 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-600" /> Hot
                </span>
                <span className="text-lg font-black text-red-950 mt-1 drop-shadow-2xs">{teamMetrics.hot.count}</span>
                <span className="text-[10px] text-red-800 font-bold">{formatINR(teamMetrics.hot.value, true)}</span>
              </div>

              <div className="bg-gradient-to-b from-[#FFFAF0] to-[#FEEBC8] border border-[#FBD38D] rounded-2xl p-2.5 flex flex-col shadow-[2px_3px_6px_rgba(221,107,32,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]">
                <span className="text-[10px] font-black text-amber-800 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-600" /> Warm
                </span>
                <span className="text-lg font-black text-amber-950 mt-1 drop-shadow-2xs">{teamMetrics.warm.count}</span>
                <span className="text-[10px] text-amber-800 font-bold">{formatINR(teamMetrics.warm.value, true)}</span>
              </div>

              <div className="bg-gradient-to-b from-[#EBF8FF] to-[#BEE3F8] border border-[#90CDF4] rounded-2xl p-2.5 flex flex-col shadow-[2px_3px_6px_rgba(49,130,206,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]">
                <span className="text-[10px] font-black text-blue-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> New
                </span>
                <span className="text-lg font-black text-blue-950 mt-1 drop-shadow-2xs">{teamMetrics.newLeads.count}</span>
                <span className="text-[10px] text-blue-800 font-bold">{formatINR(teamMetrics.newLeads.value, true)}</span>
              </div>
            </div>
          </div>

          {/* Expected Conversion */}
          <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40 text-xs md:text-sm">
            <span className="text-[#5A1424] font-black">Expected Realistic Conv. (Q6)</span>
            <span className="font-black text-[#5A1424] text-lg drop-shadow-2xs">
              {formatINR(teamMetrics.totalRealisticConversion)}
            </span>
          </div>

          {/* New Leads Required */}
          <div className="flex justify-between items-center pt-1 text-xs md:text-sm">
            <span className="text-on-surface-variant flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-error" />
              <span>New Leads Required (Q8)</span>
            </span>
            <span className={`font-black text-sm px-3 py-1 rounded-full border shadow-2xs ${
              teamMetrics.totalNewLeadsNeeded > 0 
                ? 'bg-red-100 text-error border-red-300' 
                : 'bg-emerald-100 text-success border-emerald-300'
            }`}>
              {teamMetrics.totalNewLeadsNeeded > 0 ? `+${teamMetrics.totalNewLeadsNeeded} needed` : 'Pipeline Adequate'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
