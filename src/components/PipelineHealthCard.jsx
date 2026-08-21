import React from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { Activity, Flame, Sun, Sparkles, AlertTriangle } from 'lucide-react';

export const PipelineHealthCard = () => {
  const { teamMetrics } = useSalesData();

  return (
    <div className="spatial-card p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-card-heading text-on-surface font-black flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-pink" />
            <span>Pipeline Health</span>
          </h3>
          <span className="spatial-pill text-[11px] font-bold px-3 py-1 rounded-full text-on-surface-variant">
            {teamMetrics.totalActiveLeads} Total Leads
          </span>
        </div>

        <div className="space-y-4">
          {/* Active Leads */}
          <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30 text-xs md:text-sm">
            <span className="text-on-surface-variant font-medium">Total Active Leads (Q3)</span>
            <span className="font-black text-on-surface text-lg">{teamMetrics.totalActiveLeads}</span>
          </div>

          {/* Hot / Warm / New Distribution */}
          <div className="space-y-2.5 pb-3 border-b border-outline-variant/30">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
              Lead Status Breakdown (Q5)
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-red-50/80 border border-red-200/80 rounded-2xl p-2.5 flex flex-col shadow-xs">
                <span className="text-[10px] font-black text-red-700 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-600" /> Hot
                </span>
                <span className="text-base font-black text-red-950 mt-1">{teamMetrics.hot.count}</span>
                <span className="text-[10px] text-red-700 font-semibold">{formatINR(teamMetrics.hot.value, true)}</span>
              </div>

              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-2.5 flex flex-col shadow-xs">
                <span className="text-[10px] font-black text-amber-700 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-600" /> Warm
                </span>
                <span className="text-base font-black text-amber-950 mt-1">{teamMetrics.warm.count}</span>
                <span className="text-[10px] text-amber-700 font-semibold">{formatINR(teamMetrics.warm.value, true)}</span>
              </div>

              <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-2.5 flex flex-col shadow-xs">
                <span className="text-[10px] font-black text-blue-700 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> New
                </span>
                <span className="text-base font-black text-blue-950 mt-1">{teamMetrics.newLeads.count}</span>
                <span className="text-[10px] text-blue-700 font-semibold">{formatINR(teamMetrics.newLeads.value, true)}</span>
              </div>
            </div>
          </div>

          {/* Expected Conversion */}
          <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30 text-xs md:text-sm">
            <span className="text-primary-container font-bold">Expected Realistic Conv. (Q6)</span>
            <span className="font-black text-primary-container text-lg">
              {formatINR(teamMetrics.totalRealisticConversion)}
            </span>
          </div>

          {/* New Leads Required */}
          <div className="flex justify-between items-center pt-1 text-xs md:text-sm">
            <span className="text-on-surface-variant flex items-center gap-1.5 font-semibold">
              <AlertTriangle className="w-4 h-4 text-error" />
              <span>New Leads Required (Q8)</span>
            </span>
            <span className={`font-black text-sm px-3 py-1 rounded-full border ${
              teamMetrics.totalNewLeadsNeeded > 0 
                ? 'bg-red-100/90 text-error border-red-200' 
                : 'bg-emerald-100/90 text-success border-emerald-200'
            }`}>
              {teamMetrics.totalNewLeadsNeeded > 0 ? `+${teamMetrics.totalNewLeadsNeeded} needed` : 'Pipeline Adequate'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
