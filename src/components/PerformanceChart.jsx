import React, { useState } from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react';

export const PerformanceChart = () => {
  const { reps, teamMetrics } = useSalesData();
  const [viewMode, setViewMode] = useState('team'); // 'team' or 'reps'

  const maxVal = Math.max(
    teamMetrics.totalTeamTarget * 1.15,
    teamMetrics.totalActualSales * 1.15,
    1000000
  );

  const teamTargetPct = Math.min(100, Math.round((teamMetrics.totalTeamTarget / maxVal) * 100));
  const teamActualPct = Math.min(100, Math.round((teamMetrics.totalActualSales / maxVal) * 100));
  const teamProjectedPct = Math.min(100, Math.round((teamMetrics.projectedTotal / maxVal) * 100));

  return (
    <div className="spatial-card p-6 flex flex-col justify-between h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-card-heading text-on-surface font-black flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-pink" />
            <span>Target vs Actual Performance</span>
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Spatial Comparison • Target vs Actual vs Projected
          </p>
        </div>

        {/* View Toggle */}
        <div className="spatial-pill p-1 flex items-center rounded-xl text-xs font-bold">
          <button
            onClick={() => setViewMode('team')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              viewMode === 'team'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Team View
          </button>
          <button
            onClick={() => setViewMode('reps')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              viewMode === 'reps'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Rep Breakdown ({reps.length})
          </button>
        </div>
      </div>

      {viewMode === 'team' ? (
        /* Team Aggregate Spatial Bar Visualizer */
        <div className="flex-1 flex flex-col justify-end relative mt-2 min-h-[240px]">
          {/* Y Axis Labels */}
          <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] md:text-label-caps text-outline w-12 z-10 select-none font-semibold">
            <span>{formatINR(maxVal, true)}</span>
            <span>{formatINR(maxVal * 0.75, true)}</span>
            <span>{formatINR(maxVal * 0.5, true)}</span>
            <span>{formatINR(maxVal * 0.25, true)}</span>
            <span>₹0</span>
          </div>

          {/* Grid Lines */}
          <div className="absolute left-14 right-0 top-1 bottom-6 flex flex-col justify-between z-0 pointer-events-none">
            <div className="border-t border-outline-variant/30 w-full" />
            <div className="border-t border-outline-variant/30 w-full" />
            <div className="border-t border-outline-variant/30 w-full" />
            <div className="border-t border-outline-variant/30 w-full" />
            <div className="border-t border-outline-variant/50 w-full" />
          </div>

          {/* Bars */}
          <div className="ml-16 mr-4 flex justify-around items-end h-[200px] z-10 gap-6 md:gap-14 relative pb-1">
            {/* Target Bar */}
            <div className="w-16 md:w-28 group relative flex flex-col items-center justify-end h-full">
              <div
                style={{ height: `${teamTargetPct}%` }}
                className="w-full bg-secondary-container/90 border border-outline-variant/60 rounded-t-xl transition-all duration-700 relative flex items-center justify-center shadow-sm group-hover:bg-secondary-container"
              >
                <span className="text-[10px] font-extrabold text-on-secondary-container opacity-0 group-hover:opacity-100 transition">
                  100%
                </span>
              </div>
              <span className="mt-2 text-xs font-bold text-on-surface">Target</span>
              {/* Tooltip */}
              <div className="absolute -top-10 bg-primary text-white text-[11px] font-bold py-1.5 px-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-xl whitespace-nowrap z-20">
                Target: {formatINR(teamMetrics.totalTeamTarget)}
              </div>
            </div>

            {/* Actual Bar */}
            <div className="w-16 md:w-28 group relative flex flex-col items-center justify-end h-full">
              <div
                style={{ height: `${teamActualPct}%` }}
                className="w-full bg-gradient-to-t from-[#3e0211] to-[#5a1725] rounded-t-xl transition-all duration-700 relative flex items-center justify-center shadow-[0_8px_20px_rgba(90,23,37,0.3)] group-hover:brightness-110"
              >
                <span className="text-[10px] font-extrabold text-white opacity-0 group-hover:opacity-100 transition">
                  {teamMetrics.teamAchievementPercentage}%
                </span>
              </div>
              <span className="mt-2 text-xs font-bold text-primary">Actual</span>
              {/* Tooltip */}
              <div className="absolute -top-10 bg-[#5a1725] text-white text-[11px] font-bold py-1.5 px-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-xl whitespace-nowrap z-20">
                Actual: {formatINR(teamMetrics.totalActualSales)} ({teamMetrics.teamAchievementPercentage}%)
              </div>
            </div>

            {/* Projected Month-End Bar */}
            <div className="w-16 md:w-28 group relative flex flex-col items-center justify-end h-full">
              <div
                style={{ height: `${teamProjectedPct}%` }}
                className="w-full bg-gradient-to-t from-brand-pink to-[#ff4081] rounded-t-xl transition-all duration-700 relative flex items-center justify-center shadow-[0_8px_24px_rgba(230,0,103,0.35)] group-hover:brightness-110"
              >
                <span className="text-[10px] font-extrabold text-white opacity-0 group-hover:opacity-100 transition">
                  {teamMetrics.projectedPercentage}%
                </span>
              </div>
              <span className="mt-2 text-xs font-bold text-brand-pink">Projected</span>
              {/* Tooltip */}
              <div className="absolute -top-10 bg-brand-pink text-white text-[11px] font-bold py-1.5 px-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-xl whitespace-nowrap z-20">
                Projected: {formatINR(teamMetrics.projectedTotal)} ({teamMetrics.projectedPercentage}%)
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Rep by Rep Comparison */
        <div className="space-y-4 py-2">
          {reps.map((rep) => {
            const achPct = rep.monthlyTarget > 0 ? Math.round((rep.actualSales / rep.monthlyTarget) * 100) : 0;
            const pipePct = rep.monthlyTarget > 0 ? Math.round((rep.expectedRealisticConversion / rep.monthlyTarget) * 100) : 0;
            
            return (
              <div key={rep.id} className="space-y-2 p-3 rounded-xl bg-surface-container/30 hover:bg-surface-container/60 transition">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-on-surface flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-[10px] font-bold shadow-xs">
                      {rep.avatar}
                    </span>
                    {rep.name}
                  </span>
                  <span className="text-on-surface-variant font-medium">
                    <strong className="text-primary font-bold">{formatINR(rep.actualSales)}</strong> / {formatINR(rep.monthlyTarget)} ({achPct}%)
                  </span>
                </div>
                {/* Dual Progress Bar */}
                <div className="w-full h-3.5 bg-surface-container rounded-full overflow-hidden flex shadow-inner">
                  <div
                    style={{ width: `${Math.min(100, achPct)}%` }}
                    className="bg-[#5a1725] h-full transition-all duration-500"
                    title={`Actual: ${formatINR(rep.actualSales)}`}
                  />
                  <div
                    style={{ width: `${Math.min(100 - achPct, pipePct)}%` }}
                    className="bg-brand-pink/70 h-full transition-all duration-500"
                    title={`Expected Conversion: ${formatINR(rep.expectedRealisticConversion)}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
