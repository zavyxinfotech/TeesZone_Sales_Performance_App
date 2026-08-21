import React from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { Target, Banknote, Scale, Network, Users } from 'lucide-react';

export const KPIGrid = () => {
  const { teamMetrics } = useSalesData();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {/* KPI 1: Monthly Target */}
      <div className="card-surface p-4 md:p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <span className="text-label-caps text-on-surface-variant font-bold uppercase tracking-wider">
            Monthly Target
          </span>
          <div className="p-2 rounded-lg bg-surface-container text-primary">
            <Target className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl md:text-kpi-value text-on-surface font-extrabold mb-1">
            {formatINR(teamMetrics.totalTeamTarget)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <Users className="w-3.5 h-3.5" />
            <span>Team Target ({teamMetrics.repCount} Reps × ₹3L)</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Actual Sales */}
      <div className="card-surface p-4 md:p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary-container bg-gradient-to-br from-white to-pink-50/20">
        <div className="flex justify-between items-start mb-3">
          <span className="text-label-caps text-primary-container font-bold uppercase tracking-wider">
            Actual Sales
          </span>
          <div className="p-2 rounded-lg bg-pink-100/70 text-primary-container">
            <Banknote className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl md:text-kpi-value text-primary-container font-extrabold mb-1">
            {formatINR(teamMetrics.totalActualSales)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-primary-container font-semibold">
            <span className="inline-block px-1.5 py-0.5 rounded bg-pink-100 text-primary-container text-[11px]">
              {teamMetrics.teamAchievementPercentage}% achieved
            </span>
            <span className="text-on-surface-variant">till today</span>
          </div>
        </div>
      </div>

      {/* KPI 3: Balance Target (Warm styling) */}
      <div className="card-surface-warm p-4 md:p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-[#E5DED4]">
        <div className="flex justify-between items-start mb-3">
          <span className="text-label-caps text-on-surface-variant font-bold uppercase tracking-wider">
            Balance Target
          </span>
          <div className="p-2 rounded-lg bg-[#ebd9c5] text-secondary">
            <Scale className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl md:text-kpi-value text-on-surface font-extrabold mb-1">
            {formatINR(teamMetrics.totalBalance)}
          </div>
          <div className="text-xs text-on-surface-variant font-medium">
            Remaining to reach ₹{formatINR(teamMetrics.totalTeamTarget, true)}
          </div>
        </div>
      </div>

      {/* KPI 4: Active Pipeline */}
      <div className="card-surface p-4 md:p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <span className="text-label-caps text-on-surface-variant font-bold uppercase tracking-wider">
            Active Pipeline
          </span>
          <div className="p-2 rounded-lg bg-surface-container text-primary">
            <Network className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl md:text-kpi-value text-on-surface font-extrabold mb-1">
            {formatINR(teamMetrics.totalPipelineValue)}
          </div>
          <div className="text-xs text-on-surface-variant">
            {teamMetrics.totalActiveLeads} leads across team
          </div>
        </div>
      </div>
    </section>
  );
};
