import React from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { Target, Banknote, Scale, Network, Users } from 'lucide-react';

export const KPIGrid = () => {
  const { teamMetrics } = useSalesData();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* KPI 1: Monthly Target */}
      <div className="spatial-card p-5 md:p-6 flex flex-col justify-between group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-label-caps text-on-surface-variant font-bold uppercase tracking-wider">
            Monthly Target
          </span>
          <div className="p-2.5 rounded-2xl bg-surface-container/80 text-primary group-hover:bg-primary-fixed group-hover:text-primary transition-all">
            <Target className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl text-on-surface font-black tracking-tight mb-1.5">
            {formatINR(teamMetrics.totalTeamTarget)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
            <Users className="w-3.5 h-3.5 text-brand-pink" />
            <span>Team Target ({teamMetrics.repCount} Reps × ₹3L)</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Actual Sales */}
      <div className="spatial-card p-5 md:p-6 flex flex-col justify-between border-l-4 border-l-primary-container bg-gradient-to-br from-white/90 via-white/80 to-pink-50/40 group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-label-caps text-primary-container font-bold uppercase tracking-wider">
            Actual Sales
          </span>
          <div className="p-2.5 rounded-2xl bg-pink-100/70 text-primary-container group-hover:bg-pink-200/80 transition-all">
            <Banknote className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl text-primary-container font-black tracking-tight mb-1.5">
            {formatINR(teamMetrics.totalActualSales)}
          </div>
          <div className="flex items-center gap-2 text-xs text-primary-container font-bold">
            <span className="inline-block px-2 py-0.5 rounded-full bg-pink-100/90 text-primary-container text-[11px] border border-pink-200">
              {teamMetrics.teamAchievementPercentage}% achieved
            </span>
            <span className="text-on-surface-variant font-normal">till today</span>
          </div>
        </div>
      </div>

      {/* KPI 3: Balance Target (Spatial Warm styling) */}
      <div className="spatial-card-warm p-5 md:p-6 flex flex-col justify-between group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-label-caps text-on-surface-variant font-bold uppercase tracking-wider">
            Balance Target
          </span>
          <div className="p-2.5 rounded-2xl bg-[#ebd9c5] text-secondary group-hover:bg-[#dfc8b0] transition-all">
            <Scale className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl text-on-surface font-black tracking-tight mb-1.5">
            {formatINR(teamMetrics.totalBalance)}
          </div>
          <div className="text-xs text-on-surface-variant font-medium">
            Remaining to reach ₹{formatINR(teamMetrics.totalTeamTarget, true)} target
          </div>
        </div>
      </div>

      {/* KPI 4: Active Pipeline */}
      <div className="spatial-card p-5 md:p-6 flex flex-col justify-between group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-label-caps text-on-surface-variant font-bold uppercase tracking-wider">
            Active Pipeline
          </span>
          <div className="p-2.5 rounded-2xl bg-surface-container/80 text-primary group-hover:bg-primary-fixed transition-all">
            <Network className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl text-on-surface font-black tracking-tight mb-1.5">
            {formatINR(teamMetrics.totalPipelineValue)}
          </div>
          <div className="text-xs text-on-surface-variant font-medium">
            {teamMetrics.totalActiveLeads} leads across active reps
          </div>
        </div>
      </div>
    </section>
  );
};
