import React from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { TrendingUp, Plus, CheckCircle, AlertCircle } from 'lucide-react';

export const MonthEndForecastCard = () => {
  const { teamMetrics } = useSalesData();

  const isAchievable = teamMetrics.projectedTotal >= teamMetrics.totalTeamTarget;
  const gapOrSurplus = teamMetrics.projectedTotal - teamMetrics.totalTeamTarget;

  return (
    <div className="spatial-card-warm p-6 flex flex-col justify-between relative overflow-hidden h-full group">
      {/* Decorative background watermark */}
      <div className="absolute -right-6 -bottom-6 text-outline-variant/15 pointer-events-none select-none group-hover:scale-105 transition-transform duration-500">
        <TrendingUp className="w-40 h-40" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-card-heading text-on-surface font-black flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Month-End Forecast</span>
          </h3>
          <span className="spatial-pill text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full text-secondary">
            August Goal
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-on-surface-variant font-medium mb-1">
              Current Achievement (Till Today)
            </div>
            <div className="text-xl sm:text-2xl font-black text-on-surface">
              {formatINR(teamMetrics.totalActualSales)}
            </div>
          </div>

          <div className="flex items-center gap-2 text-outline text-xs font-bold pl-2">
            <Plus className="w-4 h-4 text-primary-container" />
            <span>Expected Realistic Pipeline Conversion</span>
          </div>

          <div>
            <div className="text-lg sm:text-xl font-extrabold text-primary-container">
              {formatINR(teamMetrics.totalRealisticConversion)}
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/40">
            <div className="text-label-caps text-on-surface-variant font-bold uppercase tracking-wider mb-1.5">
              Projected Month-End Total
            </div>
            <div className="flex flex-wrap items-baseline gap-2.5 mb-2">
              <span className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight">
                {formatINR(teamMetrics.projectedTotal)}
              </span>
              <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                isAchievable 
                  ? 'bg-emerald-100/90 text-success border-emerald-300' 
                  : 'bg-red-100/90 text-error border-red-300'
              }`}>
                {teamMetrics.projectedPercentage}% of Target
              </span>
            </div>

            <div className={`mt-2 flex items-center gap-2 text-xs font-bold ${
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
