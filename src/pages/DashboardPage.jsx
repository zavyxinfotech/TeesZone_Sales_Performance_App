import React, { useState } from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { formatINR } from '../services/googleSheetsService';
import { Navbar } from '../components/Navbar';
import { KPIGrid } from '../components/KPIGrid';
import { PerformanceChart } from '../components/PerformanceChart';
import { PipelineHealthCard } from '../components/PipelineHealthCard';
import { MonthEndForecastCard } from '../components/MonthEndForecastCard';
import { TeamTable } from '../components/TeamTable';
import { RepDetailModal } from '../components/RepDetailModal';
import { SyncConfigModal } from '../components/SyncConfigModal';
import { AddRepModal } from '../components/AddRepModal';
import { 
  Calendar, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Target
} from 'lucide-react';

export const DashboardPage = () => {
  const { reps, teamMetrics, selectedMonth } = useSalesData();
  const [selectedRep, setSelectedRep] = useState(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isAddRepModalOpen, setIsAddRepModalOpen] = useState(false);
  const [showAgendaDetails, setShowAgendaDetails] = useState(false);

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-pink selection:text-white">
      {/* Top Skeuomorphic Navbar */}
      <Navbar
        onOpenSyncConfig={() => setIsSyncModalOpen(true)}
        onOpenAddRep={() => setIsAddRepModalOpen(true)}
      />

      {/* Main Full-Width Content Container */}
      <main className="flex-1 w-full px-3.5 sm:px-6 lg:px-10 py-4 sm:py-6 space-y-4 sm:space-y-6">
        
        {/* Open Header Section (NO CARD DESIGN for Monthly Target) */}
        <div className="w-full space-y-3 pt-1 sm:pt-2">
          {/* Top Agenda Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full skeuo-inset text-[10px] sm:text-xs font-black text-[#5A1424] uppercase tracking-wider">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7A1E32]" />
              <span>TODAY'S SALES PIPELINE REVIEW – {selectedMonth.toUpperCase()}</span>
            </div>

            {/* Quick Toggle for Agenda */}
            <button
              onClick={() => setShowAgendaDetails(!showAgendaDetails)}
              className="skeuo-btn px-3 py-1 rounded-xl text-[11px] sm:text-xs font-black text-primary flex items-center gap-1.5 cursor-pointer active:scale-95 ml-auto"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-pink" />
              <span>{showAgendaDetails ? 'Hide Agenda' : 'Review 8 Questions'}</span>
              {showAgendaDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* Headline & Subtitle (Open, No Card Design) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#3E0211] leading-tight flex items-center gap-2">
                <span>🎯 Monthly Target: ₹3,00,000 per person</span>
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium max-w-3xl leading-relaxed">
                Objective: ₹3L Target → Current Achievement → Available Pipeline → Conversion Plan → Month-End Target Achievement.
              </p>
            </div>

            {/* Responsive Compact Stats Badges */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="skeuo-card px-3 sm:px-4 py-2 rounded-xl flex items-center gap-3">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-on-surface-variant">Team Target:</div>
                <div className="text-sm sm:text-lg font-black text-[#3E0211]">{formatINR(teamMetrics.totalTeamTarget)}</div>
              </div>

              <div className="skeuo-card px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-brand-pink" />
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-on-surface-variant">Active:</div>
                <div className="text-sm sm:text-lg font-black text-[#3E0211]">{reps.length} Reps</div>
              </div>
            </div>
          </div>

          {/* Expandable 8 Agenda Questions */}
          {showAgendaDetails && (
            <div className="skeuo-inset p-3.5 sm:p-5 rounded-2xl mt-3 animate-in fade-in slide-in-from-top-2 duration-300 space-y-3">
              <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#5A1424] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                <span>Mandated 8-Question Agenda for Individual Rep Review:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-xs">
                <div className="skeuo-card p-3 rounded-xl">
                  <span className="font-black text-[#5A1424] block mb-0.5">1️⃣ Actual sales</span>
                  <span className="text-on-surface-variant text-[11px]">Achieved till today</span>
                </div>
                <div className="skeuo-card p-3 rounded-xl">
                  <span className="font-black text-[#5A1424] block mb-0.5">2️⃣ Balance amount</span>
                  <span className="text-on-surface-variant text-[11px]">Required to reach ₹3L</span>
                </div>
                <div className="skeuo-card p-3 rounded-xl">
                  <span className="font-black text-[#5A1424] block mb-0.5">3️⃣ Active leads</span>
                  <span className="text-on-surface-variant text-[11px]">Currently in pipeline</span>
                </div>
                <div className="skeuo-card p-3 rounded-xl">
                  <span className="font-black text-[#5A1424] block mb-0.5">4️⃣ Expected order value</span>
                  <span className="text-on-surface-variant text-[11px]">Lead-wise expected value</span>
                </div>
                <div className="skeuo-card p-3 rounded-xl">
                  <span className="font-black text-[#5A1424] block mb-0.5">5️⃣ Lead status</span>
                  <span className="text-on-surface-variant text-[11px]">Hot / Warm / New status</span>
                </div>
                <div className="skeuo-card p-3 rounded-xl">
                  <span className="font-black text-[#5A1424] block mb-0.5">6️⃣ Realistic converts</span>
                  <span className="text-on-surface-variant text-[11px]">High-conv. leads this month</span>
                </div>
                <div className="skeuo-card p-3 rounded-xl">
                  <span className="font-black text-[#5A1424] block mb-0.5">7️⃣ Action plan</span>
                  <span className="text-on-surface-variant text-[11px]">Strategy before 31 August</span>
                </div>
                <div className="skeuo-card p-3 rounded-xl">
                  <span className="font-black text-[#5A1424] block mb-0.5">8️⃣ Pipeline gap</span>
                  <span className="text-on-surface-variant text-[11px]">New leads needed if short</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4 Primary Skeuomorphic KPI Cards */}
        <KPIGrid />

        {/* Mid Row: Performance Chart & Pipeline Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <PipelineHealthCard />
          </div>
        </div>

        {/* Bottom Row: Team Performance Table & Forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <TeamTable onSelectRep={(rep) => setSelectedRep(rep)} />
          </div>
          <div>
            <MonthEndForecastCard />
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedRep && (
        <RepDetailModal
          rep={selectedRep}
          onClose={() => setSelectedRep(null)}
        />
      )}

      {isSyncModalOpen && (
        <SyncConfigModal
          onClose={() => setIsSyncModalOpen(false)}
        />
      )}

      {isAddRepModalOpen && (
        <AddRepModal
          onClose={() => setIsAddRepModalOpen(false)}
        />
      )}
    </div>
  );
};
