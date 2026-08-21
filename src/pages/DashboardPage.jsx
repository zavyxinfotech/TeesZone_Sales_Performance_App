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
  Sparkles
} from 'lucide-react';

export const DashboardPage = () => {
  const { reps, teamMetrics, selectedMonth } = useSalesData();
  const [selectedRep, setSelectedRep] = useState(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isAddRepModalOpen, setIsAddRepModalOpen] = useState(false);
  const [showAgendaDetails, setShowAgendaDetails] = useState(false);

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-pink selection:text-white w-full overflow-x-hidden">
      {/* Top Skeuomorphic Navbar */}
      <Navbar
        onOpenSyncConfig={() => setIsSyncModalOpen(true)}
        onOpenAddRep={() => setIsAddRepModalOpen(true)}
      />

      {/* FULL-WIDTH DEEP BURGUNDY BANNER (Edge-to-Edge Banner Design - No Card Box) */}
      <section className="w-full bg-gradient-to-r from-[#4A0A17] via-[#5A1424] to-[#360410] text-white shadow-[0_4px_20px_rgba(58,3,15,0.35)] border-b border-[#2C020A] px-3.5 sm:px-6 lg:px-10 py-4 sm:py-6">
        <div className="w-full max-w-full space-y-3.5">
          
          {/* Top Agenda Pill & Toggle */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/25 text-[10px] sm:text-xs font-black text-pink-200 tracking-wider uppercase border border-white/10 shadow-xs">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-pink flex-shrink-0" />
              <span className="truncate">TODAY'S PIPELINE REVIEW – {selectedMonth.toUpperCase()}</span>
            </div>

            <button
              onClick={() => setShowAgendaDetails(!showAgendaDetails)}
              className="skeuo-btn px-2.5 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-black text-[#4A0A17] flex items-center gap-1.5 cursor-pointer active:scale-95 ml-auto flex-shrink-0 shadow-sm"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-pink" />
              <span>{showAgendaDetails ? 'Hide Agenda' : 'Review 8 Qs'}</span>
              {showAgendaDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* Banner Heading & Debossed Quick Stats */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
            <div className="space-y-1">
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2 drop-shadow-sm">
                <span>🎯 Monthly Target: ₹3,00,000 per person</span>
              </h1>
              <p className="text-[11px] sm:text-xs text-pink-100/80 max-w-3xl leading-relaxed font-medium">
                Objective: ₹3L Target → Current Achievement → Available Pipeline → Conversion Plan → Month-End Target Achievement.
              </p>
            </div>

            {/* Inner Debossed Stats Well */}
            <div className="bg-[#24030B] px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-white/10 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6)] flex items-center gap-4 sm:gap-6 self-start lg:self-auto">
              <div>
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-pink-200/70 tracking-wider">Team Target</div>
                <div className="text-base sm:text-xl font-black text-white">{formatINR(teamMetrics.totalTeamTarget)}</div>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div>
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-pink-200/70 tracking-wider">Active Team</div>
                <div className="text-base sm:text-xl font-black text-white flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-brand-pink" />
                  <span>{reps.length} Reps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expandable 8 Agenda Questions */}
          {showAgendaDetails && (
            <div className="mt-3 pt-3 border-t border-white/15 animate-in fade-in slide-in-from-top-2 duration-300 space-y-2.5">
              <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-pink-200 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                <span>Mandated 8-Question Agenda for Individual Rep Review:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                <div className="bg-[#24030B]/80 p-2.5 sm:p-3 rounded-xl border border-white/5 shadow-inner">
                  <span className="font-black text-pink-200 block mb-0.5">1️⃣ Actual sales</span>
                  <span className="text-pink-100/80 text-[11px]">Achieved till today</span>
                </div>
                <div className="bg-[#24030B]/80 p-2.5 sm:p-3 rounded-xl border border-white/5 shadow-inner">
                  <span className="font-black text-pink-200 block mb-0.5">2️⃣ Balance amount</span>
                  <span className="text-pink-100/80 text-[11px]">Required to reach ₹3L</span>
                </div>
                <div className="bg-[#24030B]/80 p-2.5 sm:p-3 rounded-xl border border-white/5 shadow-inner">
                  <span className="font-black text-pink-200 block mb-0.5">3️⃣ Active leads</span>
                  <span className="text-pink-100/80 text-[11px]">Currently in pipeline</span>
                </div>
                <div className="bg-[#24030B]/80 p-2.5 sm:p-3 rounded-xl border border-white/5 shadow-inner">
                  <span className="font-black text-pink-200 block mb-0.5">4️⃣ Expected order value</span>
                  <span className="text-pink-100/80 text-[11px]">Lead-wise expected value</span>
                </div>
                <div className="bg-[#24030B]/80 p-2.5 sm:p-3 rounded-xl border border-white/5 shadow-inner">
                  <span className="font-black text-pink-200 block mb-0.5">5️⃣ Lead status</span>
                  <span className="text-pink-100/80 text-[11px]">Hot / Warm / New status</span>
                </div>
                <div className="bg-[#24030B]/80 p-2.5 sm:p-3 rounded-xl border border-white/5 shadow-inner">
                  <span className="font-black text-pink-200 block mb-0.5">6️⃣ Realistic converts</span>
                  <span className="text-pink-100/80 text-[11px]">High-conv. leads this month</span>
                </div>
                <div className="bg-[#24030B]/80 p-2.5 sm:p-3 rounded-xl border border-white/5 shadow-inner">
                  <span className="font-black text-pink-200 block mb-0.5">7️⃣ Action plan</span>
                  <span className="text-pink-100/80 text-[11px]">Strategy before 31 August</span>
                </div>
                <div className="bg-[#24030B]/80 p-2.5 sm:p-3 rounded-xl border border-white/5 shadow-inner">
                  <span className="font-black text-pink-200 block mb-0.5">8️⃣ Pipeline gap</span>
                  <span className="text-pink-100/80 text-[11px]">New leads needed if short</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Dashboard Content */}
      <main className="flex-1 w-full px-3.5 sm:px-6 lg:px-10 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full">
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
