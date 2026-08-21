import React from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { Search, Filter, Eye, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

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
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-success border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            {status}
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-warning border border-amber-200">
            <Clock className="w-3 h-3" />
            {status}
          </span>
        );
      case 'danger':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-error border border-red-200">
            <AlertCircle className="w-3 h-3" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="card-surface rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Header & Filter Controls */}
      <div className="p-4 md:p-6 border-b border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-card-heading text-on-surface font-bold">
            Team Performance & Pipeline Details
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Individual target breakdown ({reps.length} Representatives) - Click row for complete 8-question review
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search representative or lead..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container border border-outline-variant rounded-lg focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none transition"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-surface-container rounded-lg text-xs font-medium overflow-x-auto">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-2.5 py-1 rounded transition whitespace-nowrap ${
                filterStatus === 'ALL' ? 'bg-white font-bold text-primary shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              All ({reps.length})
            </button>
            <button
              onClick={() => setFilterStatus('ON_TRACK')}
              className={`px-2.5 py-1 rounded transition whitespace-nowrap ${
                filterStatus === 'ON_TRACK' ? 'bg-white font-bold text-success shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              On Track
            </button>
            <button
              onClick={() => setFilterStatus('NEEDS_ATTENTION')}
              className={`px-2.5 py-1 rounded transition whitespace-nowrap ${
                filterStatus === 'NEEDS_ATTENTION' ? 'bg-white font-bold text-warning shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Needs Attention
            </button>
            <button
              onClick={() => setFilterStatus('PIPELINE_GAP')}
              className={`px-2.5 py-1 rounded transition whitespace-nowrap ${
                filterStatus === 'PIPELINE_GAP' ? 'bg-white font-bold text-error shadow-xs' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Pipeline Gap
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead className="data-table-header text-on-surface-variant font-bold text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4">Representative</th>
              <th className="p-4">Target (₹)</th>
              <th className="p-4">Actual Achieved (Q1)</th>
              <th className="p-4">Balance Required (Q2)</th>
              <th className="p-4">Active Leads (Q3)</th>
              <th className="p-4">Realistic Conv. (Q6)</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">8-Q Review</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30 text-xs md:text-sm font-medium">
            {filteredReps.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-on-surface-variant">
                  No sales representatives matched your search/filter criteria.
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
                    className="hover:bg-surface-container/40 transition cursor-pointer group"
                  >
                    {/* Representative Name & Avatar */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${rep.avatarColor || 'bg-primary text-white'} flex items-center justify-center text-xs font-bold shadow-xs`}>
                          {rep.avatar || rep.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-on-surface group-hover:text-brand-pink transition">
                            {rep.name}
                          </div>
                          <div className="text-[11px] text-on-surface-variant">
                            {rep.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Monthly Target */}
                    <td className="p-4 text-on-surface-variant font-semibold">
                      {formatINR(rep.monthlyTarget)}
                    </td>

                    {/* Q1: Actual Achieved */}
                    <td className="p-4">
                      <div className="font-bold text-primary">
                        {formatINR(rep.actualSales)}
                      </div>
                      <div className="text-[11px] text-on-surface-variant">
                        {percentAchieved}% target
                      </div>
                    </td>

                    {/* Q2: Balance Required */}
                    <td className="p-4 font-semibold text-secondary">
                      {formatINR(balance)}
                    </td>

                    {/* Q3 & Q5: Active Leads */}
                    <td className="p-4">
                      <div className="font-bold text-on-surface">
                        {rep.activeLeadsCount} Leads
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-on-surface-variant mt-0.5">
                        <span className="text-red-600 font-bold">{rep.leadBreakdown?.hot?.count || 0}H</span> / 
                        <span className="text-amber-600 font-bold">{rep.leadBreakdown?.warm?.count || 0}W</span> / 
                        <span className="text-blue-600 font-bold">{rep.leadBreakdown?.newLeads?.count || 0}N</span>
                      </div>
                    </td>

                    {/* Q6: Expected Realistic Conversion */}
                    <td className="p-4 font-bold text-primary-container">
                      {formatINR(rep.expectedRealisticConversion)}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4 text-center">
                      {getStatusBadge(rep.status, rep.statusType)}
                    </td>

                    {/* Action Button */}
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRep(rep);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary bg-surface-container hover:bg-brand-pink hover:text-white border border-outline-variant transition shadow-xs"
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
