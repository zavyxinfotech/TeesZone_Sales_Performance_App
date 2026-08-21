import React, { useState } from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { BarChart3 } from 'lucide-react';

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
    <div className="skeuo-card p-6 flex flex-col justify-between h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-card-heading text-on-surface font-black flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-pink" />
            <span>Target vs Actual Performance</span>
          </h3>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5">
            Tactile Comparison • Target vs Actual vs Projected
          </p>
        </div>

        {/* View Toggle */}
        <div className="skeuo-inset p-1 flex items-center rounded-xl text-xs font-black">
          <button
            onClick={() => setViewMode('team')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'team'
                ? 'skeuo-btn-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Team View
          </button>
          <button
            onClick={() => setViewMode('reps')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'reps'
                ? 'skeuo-btn-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Rep Breakdown ({reps.length})
          </button>
        </div>
      </div>

      {viewMode === 'team' ? (
        /* Team Aggregate Skeuomorphic Bar Visualizer */
        <div className="flex-1 flex flex-col justify-end relative mt-2 min-h-[240px] skeuo-inset p-4 rounded-2xl">
          {/* Y Axis Labels */}
          <div className="absolute left-3 top-4 bottom-8 flex flex-col justify-between text-[10px] md:text-label-caps text-outline w-12 z-10 select-none font-bold">
            <span>{formatINR(maxVal, true)}</span>
            <span>{formatINR(maxVal * 0.75, true)}</span>
            <span>{formatINR(maxVal * 0.5, true)}</span>
            <span>{formatINR(maxVal * 0.25, true)}</span>
            <span>₹0</span>
          </div>

          {/* Grid Lines */}
          <div className="absolute left-16 right-4 top-5 bottom-8 flex flex-col justify-between z-0 pointer-events-none">
            <div className="border-t border-[#D5C7B8]/60 w-full" />
            <div className="border-t border-[#D5C7B8]/60 w-full" />
            <div className="border-t border-[#D5C7B8]/60 w-full" />
            <div className="border-t border-[#D5C7B8]/60 w-full" />
            <div className="border-t border-[#B5A595] w-full" />
          </div>

          {/* 3D Skeuomorphic Columns */}
          <div className="ml-16 mr-4 flex justify-around items-end h-[190px] z-10 gap-6 md:gap-14 relative pb-1">
            {/* Target Column */}
            <div className="w-16 md:w-28 group relative flex flex-col items-center justify-end h-full">
              <div
                style={{ height: `${teamTargetPct}%` }}
                className="w-full bg-gradient-to-r from-[#D8CEBF] via-[#ECE3D5] to-[#D0C4B2] border border-[#BDB09E] rounded-t-xl transition-all duration-700 relative flex items-center justify-center shadow-[2px_3px_8px_rgba(0,0,0,0.18),inset_0_2px_2px_rgba(255,255,255,0.9),inset_0_-2px_2px_rgba(0,0,0,0.15)]"
              >
                <span className="text-[10px] font-black text-on-secondary-container opacity-0 group-hover:opacity-100 transition">
                  100%
                </span>
              </div>
              <span className="mt-2 text-xs font-black text-on-surface">Target</span>
              {/* Tooltip */}
              <div className="absolute -top-10 bg-[#3e0211] text-white text-[11px] font-black py-1.5 px-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-xl whitespace-nowrap z-20">
                Target: {formatINR(teamMetrics.totalTeamTarget)}
              </div>
            </div>

            {/* Actual Column - Deep 3D Burgundy Cylinder */}
            <div className="w-16 md:w-28 group relative flex flex-col items-center justify-end h-full">
              <div
                style={{ height: `${teamActualPct}%` }}
                className="w-full bg-gradient-to-r from-[#4A0A17] via-[#6B1A2C] to-[#3B050E] border border-[#2B020A] rounded-t-xl transition-all duration-700 relative flex items-center justify-center shadow-[3px_4px_12px_rgba(62,2,17,0.4),inset_0_2px_3px_rgba(255,255,255,0.4),inset_0_-2px_3px_rgba(0,0,0,0.5)]"
              >
                <span className="text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition">
                  {teamMetrics.teamAchievementPercentage}%
                </span>
              </div>
              <span className="mt-2 text-xs font-black text-primary">Actual</span>
              {/* Tooltip */}
              <div className="absolute -top-10 bg-[#5a1725] text-white text-[11px] font-black py-1.5 px-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-xl whitespace-nowrap z-20">
                Actual: {formatINR(teamMetrics.totalActualSales)} ({teamMetrics.teamAchievementPercentage}%)
              </div>
            </div>

            {/* Projected Month-End Column */}
            <div className="w-16 md:w-28 group relative flex flex-col items-center justify-end h-full">
              <div
                style={{ height: `${teamProjectedPct}%` }}
                className="w-full bg-gradient-to-r from-[#B80053] via-[#FF0073] to-[#990044] border border-[#800037] rounded-t-xl transition-all duration-700 relative flex items-center justify-center shadow-[3px_4px_14px_rgba(230,0,103,0.4),inset_0_2px_3px_rgba(255,255,255,0.5),inset_0_-2px_3px_rgba(0,0,0,0.4)]"
              >
                <span className="text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition">
                  {teamMetrics.projectedPercentage}%
                </span>
              </div>
              <span className="mt-2 text-xs font-black text-brand-pink">Projected</span>
              {/* Tooltip */}
              <div className="absolute -top-10 bg-brand-pink text-white text-[11px] font-black py-1.5 px-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-xl whitespace-nowrap z-20">
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
              <div key={rep.id} className="space-y-2 p-3 rounded-2xl skeuo-inset">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-on-surface flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-b from-[#6E1B2D] to-[#470815] text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                      {rep.avatar}
                    </span>
                    {rep.name}
                  </span>
                  <span className="text-on-surface-variant font-medium">
                    <strong className="text-primary font-black">{formatINR(rep.actualSales)}</strong> / {formatINR(rep.monthlyTarget)} ({achPct}%)
                  </span>
                </div>
                {/* 3D Debossed Progress Bar */}
                <div className="w-full h-4 bg-[#D6CCBF] rounded-full overflow-hidden flex shadow-[inset_2px_2px_4px_rgba(0,0,0,0.25)] border border-[#C5BAAC]">
                  <div
                    style={{ width: `${Math.min(100, achPct)}%` }}
                    className="bg-gradient-to-r from-[#4A0A17] to-[#6B1A2C] h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                    title={`Actual: ${formatINR(rep.actualSales)}`}
                  />
                  <div
                    style={{ width: `${Math.min(100 - achPct, pipePct)}%` }}
                    className="bg-gradient-to-r from-[#D90060] to-[#FF2E88] h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
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
