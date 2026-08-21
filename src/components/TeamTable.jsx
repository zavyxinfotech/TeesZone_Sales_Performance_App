import React from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { Search, Eye, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const TeamTable = ({ onSelectRep }) => {
  const { 
    filteredReps, 
    searchQuery, 
    setSearchQuery, 
    filterStatus, 
    setFilterStatus, 
    reps 
  } = useSalesData();

  const getStatusBadge = (status, type) => {
    switch (type) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50/90 text-success border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50/90 text-warning border border-amber-200 shadow-2xs">
            <Clock className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      case 'danger':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50/90 text-error border border-red-200 shadow-2xs">
            <AlertCircle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="spatial-card overflow-hidden flex flex-col h-full">
      {/* Header & Filter Controls */}
      <div className="p-5 md:p-6 border-b border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-card-heading text-on-surface font-black">
            Team Performance & Pipeline Review Table
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Individual target breakdown ({reps.length} Active Representatives) • Click any row for 8-question review
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search representative or lead..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="spatial-pill w-full pl-10 pr-3.5 py-2 text-xs text-on-surface rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition"
            />
          </div>

          {/* Filter Pills */}
          <div className="spatial-pill flex items-center gap-1 p-1 rounded-xl text-xs font-bold overflow-x-auto">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                filterStatus === 'ALL' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              All ({reps.length})
            </button>
            <button
              onClick={() => setFilterStatus('ON_TRACK')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                filterStatus === 'ON_TRACK' ? 'bg-emerald-700 text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              On Track
            </button>
            <button
              onClick={() => setFilterStatus('NEEDS_ATTENTION')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                filterStatus === 'NEEDS_ATTENTION' ? 'bg-amber-700 text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Needs Attention
            </button>
            <button
              onClick={() => setFilterStatus('PIPELINE_GAP')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                filterStatus === 'PIPELINE_GAP' ? 'bg-red-700 text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Pipeline Gap
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto custom-scrollbar w-full">
        <table className="w-full text-left border-collapse min-w-[780px]">
          <thead className="data-table-header text-on-surface-variant font-black text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 pl-6">Representative</th>
              <th className="p-4">Target (₹)</th>
              <th className="p-4">Actual (Q1)</th>
              <th className="p-4">Balance (Q2)</th>
              <th className="p-4">Active Leads (Q3)</th>
              <th className="p-4">Realistic Conv. (Q6)</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 pr-6 text-right">8-Q Review</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30 text-xs md:text-sm font-medium">
            {filteredReps.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-on-surface-variant">
                  No sales representatives found matching your search.
                </td>
              </tr>
            ) : (
              filteredReps.map((rep) => {
                const balance = Math.max(0, rep.monthlyTarget - rep.actualSales);
                const percentAchieved = rep.monthlyTarget > 0 ? Math.round((rep.actualSales / rep.monthlyTarget) * 100) : 0;

                return (
                  <tr
                    key={rep.id}
                    onClick={() => onSelectRep(rep)}
                    className="hover:bg-pink-50/30 transition-all cursor-pointer group"
                  >
                    {/* Representative Name & Avatar */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${rep.avatarColor || 'bg-primary text-white'} flex items-center justify-center text-xs font-black shadow-xs`}>
                          {rep.avatar || rep.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-extrabold text-on-surface group-hover:text-brand-pink transition">
                            {rep.name}
                          </div>
                          <div className="text-[11px] text-on-surface-variant">
                            {rep.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Monthly Target */}
                    <td className="p-4 text-on-surface-variant font-bold">
                      {formatINR(rep.monthlyTarget)}
                    </td>

                    {/* Q1: Actual Achieved */}
                    <td className="p-4">
                      <div className="font-black text-primary">
                        {formatINR(rep.actualSales)}
                      </div>
                      <div className="text-[11px] text-on-surface-variant font-semibold">
                        {percentAchieved}% of ₹3L
                      </div>
                    </td>

                    {/* Q2: Balance Required */}
                    <td className="p-4 font-bold text-secondary">
                      {formatINR(balance)}
                    </td>

                    {/* Q3 & Q5: Active Leads */}
                    <td className="p-4">
                      <div className="font-black text-on-surface">
                        {rep.activeLeadsCount} Leads
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant mt-0.5 font-bold">
                        <span className="text-red-700">{rep.leadBreakdown?.hot?.count || 0}H</span> / 
                        <span className="text-amber-700">{rep.leadBreakdown?.warm?.count || 0}W</span> / 
                        <span className="text-blue-700">{rep.leadBreakdown?.newLeads?.count || 0}N</span>
                      </div>
                    </td>

                    {/* Q6: Expected Realistic Conversion */}
                    <td className="p-4 font-black text-primary-container">
                      {formatINR(rep.expectedRealisticConversion)}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4 text-center">
                      {getStatusBadge(rep.status, rep.statusType)}
                    </td>

                    {/* Action Button */}
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRep(rep);
                        }}
                        className="spatial-pill inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-primary hover:bg-brand-pink hover:text-white transition-all shadow-xs group-hover:border-brand-pink/40"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View 8 Qs</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
