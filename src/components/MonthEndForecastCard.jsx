import React from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { TrendingUp, Plus, CheckCircle, AlertCircle } from 'lucide-react';

export const MonthEndForecastCard = () => {
  const { teamMetrics } = useSalesData();

  const isAchievable = teamMetrics.projectedTotal >= teamMetrics.totalTeamTarget;
  const gapOrSurplus = teamMetrics.projectedTotal - teamMetrics.totalTeamTarget;

  return (
    <div className="card-surface-warm rounded-xl p-4 md:p-6 flex flex-col justify-between relative overflow-hidden shadow-sm border border-[#E5DED4]">
      {/* Decorative background watermark */}
      <div className="absolute -right-6 -bottom-6 text-outline-variant/15 pointer-events-none select-none">
        <TrendingUp className="w-36 h-36" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-card-heading text-on-surface font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Month-End Forecast</span>
          </h3>
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/80 text-secondary border border-outline-variant/30">
            August Goal
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-on-surface-variant font-medium mb-1">
              Current Achievement (Till Today)
            </div>
            <div className="text-xl md:text-2xl font-bold text-on-surface">
              {formatINR(teamMetrics.totalActualSales)}
            </div>
          </div>

          <div className="flex items-center gap-2 text-outline text-xs font-bold pl-2">
            <Plus className="w-4 h-4 text-primary-container" />
            <span>Expected Realistic Pipeline Conversion</span>
          </div>

          <div>
            <div className="text-lg md:text-xl font-bold text-primary-container">
              {formatINR(teamMetrics.totalRealisticConversion)}
            </div>
          </div>

          <div className="pt-3 border-t border-outline-variant/40">
            <div className="text-label-caps text-on-surface-variant font-bold uppercase tracking-wider mb-1.5">
              Projected Month-End Total
            </div>
            <div className="flex flex-wrap items-baseline gap-2 mb-2">
              <span className="text-2xl md:text-3xl font-extrabold text-on-surface">
                {formatINR(teamMetrics.projectedTotal)}
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                isAchievable 
                  ? 'bg-emerald-100/80 text-success border-emerald-300' 
                  : 'bg-red-100/80 text-error border-red-300'
              }`}>
                {teamMetrics.projectedPercentage}% of Target
              </span>
            </div>

            <div className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${
              isAchievable ? 'text-success' : 'text-error'
            }`}>
              {isAchievable ? (
                <>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Target achievable with current pipeline ({formatINR(gapOrSurplus, true)} buffer)</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Gap of {formatINR(Math.abs(gapOrSurplus))} to reach ₹{formatINR(teamMetrics.totalTeamTarget, true)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
