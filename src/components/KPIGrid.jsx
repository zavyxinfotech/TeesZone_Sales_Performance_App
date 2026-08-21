import React from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { Target, Banknote, Scale, Network, Users } from 'lucide-react';

export const KPIGrid = () => {
  const { teamMetrics } = useSalesData();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* KPI 1: Monthly Target */}
      <div className="skeuo-card p-5 md:p-6 flex flex-col justify-between group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-label-caps text-on-surface-variant font-black uppercase tracking-wider">
            Monthly Target
          </span>
          <div className="p-2.5 rounded-2xl skeuo-inset text-primary">
            <Target className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl text-on-surface font-black tracking-tight mb-1.5 drop-shadow-xs">
            {formatINR(teamMetrics.totalTeamTarget)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-bold">
            <Users className="w-3.5 h-3.5 text-brand-pink" />
            <span>Team Target ({teamMetrics.repCount} Reps × ₹3L)</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Actual Sales */}
      <div className="skeuo-card p-5 md:p-6 flex flex-col justify-between border-l-4 border-l-[#5A1424] group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-label-caps text-[#5A1424] font-black uppercase tracking-wider">
            Actual Sales
          </span>
          <div className="p-2.5 rounded-2xl skeuo-inset text-[#5A1424]">
            <Banknote className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl text-[#5A1424] font-black tracking-tight mb-1.5 drop-shadow-xs">
            {formatINR(teamMetrics.totalActualSales)}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5A1424] font-black">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-pink-100/90 text-[#5A1424] text-[11px] border border-pink-200 shadow-2xs">
              {teamMetrics.teamAchievementPercentage}% achieved
            </span>
            <span className="text-on-surface-variant font-semibold">till today</span>
          </div>
        </div>
      </div>

      {/* KPI 3: Balance Target (Skeuomorphic Warm Panel) */}
      <div className="skeuo-card-warm p-5 md:p-6 flex flex-col justify-between group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-label-caps text-on-surface-variant font-black uppercase tracking-wider">
            Balance Target
          </span>
          <div className="p-2.5 rounded-2xl skeuo-inset text-secondary">
            <Scale className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl text-on-surface font-black tracking-tight mb-1.5 drop-shadow-xs">
            {formatINR(teamMetrics.totalBalance)}
          </div>
          <div className="text-xs text-on-surface-variant font-bold">
            Remaining to reach ₹{formatINR(teamMetrics.totalTeamTarget, true)} target
          </div>
        </div>
      </div>

      {/* KPI 4: Active Pipeline */}
      <div className="skeuo-card p-5 md:p-6 flex flex-col justify-between group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-label-caps text-on-surface-variant font-black uppercase tracking-wider">
            Active Pipeline
          </span>
          <div className="p-2.5 rounded-2xl skeuo-inset text-primary">
            <Network className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl text-on-surface font-black tracking-tight mb-1.5 drop-shadow-xs">
            {formatINR(teamMetrics.totalPipelineValue)}
          </div>
          <div className="text-xs text-on-surface-variant font-bold">
            {teamMetrics.totalActiveLeads} leads across active reps
          </div>
        </div>
      </div>
    </section>
  );
};
