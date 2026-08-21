import React from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { Activity, Flame, Sun, Sparkles, AlertTriangle } from 'lucide-react';

export const PipelineHealthCard = () => {
  const { teamMetrics } = useSalesData();

  return (
    <div className="card-surface p-4 md:p-6 rounded-xl flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-card-heading text-on-surface font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-pink" />
            <span>Pipeline Health</span>
          </h3>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
            {teamMetrics.totalActiveLeads} Total Leads
          </span>
        </div>

        <div className="space-y-3.5">
          {/* Active Leads */}
          <div className="flex justify-between items-center pb-2.5 border-b border-outline-variant/30 text-xs md:text-sm">
            <span className="text-on-surface-variant font-medium">Total Active Leads</span>
            <span className="font-bold text-on-surface text-base">{teamMetrics.totalActiveLeads}</span>
          </div>

          {/* Hot / Warm / New Distribution */}
          <div className="space-y-2 pb-2.5 border-b border-outline-variant/30">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
              Lead Status Breakdown (Q5)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex flex-col">
                <span className="text-[10px] font-bold text-red-700 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Hot
                </span>
                <span className="text-sm font-extrabold text-red-900 mt-0.5">{teamMetrics.hot.count} leads</span>
                <span className="text-[10px] text-red-600 font-medium">{formatINR(teamMetrics.hot.value, true)}</span>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 flex flex-col">
                <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1">
                  <Sun className="w-3 h-3" /> Warm
                </span>
                <span className="text-sm font-extrabold text-amber-900 mt-0.5">{teamMetrics.warm.count} leads</span>
                <span className="text-[10px] text-amber-600 font-medium">{formatINR(teamMetrics.warm.value, true)}</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 flex flex-col">
                <span className="text-[10px] font-bold text-blue-700 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> New
                </span>
                <span className="text-sm font-extrabold text-blue-900 mt-0.5">{teamMetrics.newLeads.count} leads</span>
                <span className="text-[10px] text-blue-600 font-medium">{formatINR(teamMetrics.newLeads.value, true)}</span>
              </div>
            </div>
          </div>

          {/* Expected Conversion */}
          <div className="flex justify-between items-center pb-2.5 border-b border-outline-variant/30 text-xs md:text-sm">
            <span className="text-primary-container font-semibold">Expected Realistic Conv. (Q6)</span>
            <span className="font-extrabold text-primary-container text-base">
              {formatINR(teamMetrics.totalRealisticConversion)}
            </span>
          </div>

          {/* New Leads Required */}
          <div className="flex justify-between items-center pt-1 text-xs md:text-sm">
            <span className="text-on-surface-variant flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-4 h-4 text-error" />
              <span>New Leads Required (Q8)</span>
            </span>
            <span className={`font-extrabold text-base px-2 py-0.5 rounded ${
              teamMetrics.totalNewLeadsNeeded > 0 ? 'bg-red-100 text-error' : 'bg-emerald-100 text-success'
            }`}>
              {teamMetrics.totalNewLeadsNeeded > 0 ? `+${teamMetrics.totalNewLeadsNeeded} leads needed` : 'Pipeline Sufficient'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
