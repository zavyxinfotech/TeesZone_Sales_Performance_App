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
  Layers
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
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-6 space-y-6">
        {/* Skeuomorphic Tactile Meeting Agenda Banner */}
        <div className="rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#5A1424] via-[#480C1B] to-[#360410] text-white p-6 md:p-8 shadow-[6px_8px_24px_rgba(62,2,17,0.35),inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.5)] border border-[#2B020B]">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-b from-[#7A1E32] to-[#450A17] border border-[#9A2D45] text-[11px] font-black text-pink-200 tracking-wider uppercase shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.25)]">
                <Calendar className="w-3.5 h-3.5 text-brand-pink" />
                <span>TODAY'S SALES PIPELINE REVIEW – {selectedMonth.toUpperCase()}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                <span>🎯 Monthly Target: ₹3,00,000 per person</span>
              </h1>
              <p className="text-xs sm:text-sm text-pink-100/85 max-w-3xl leading-relaxed">
                Objective: ₹3L Target → Current Achievement → Available Pipeline → Conversion Plan → Month-End Target Achievement.
              </p>
            </div>

            {/* Skeuomorphic Debossed Stats Inset & Toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="bg-[#2D040E] px-5 py-3.5 rounded-2xl border border-[#4D0819] shadow-[inset_3px_3px_8px_rgba(0,0,0,0.7),inset_-2px_-2px_6px_rgba(255,255,255,0.1),0_1px_0_rgba(255,255,255,0.15)] flex items-center gap-6">
                <div>
                  <div className="text-[10px] uppercase font-bold text-pink-200/75 tracking-wider">Total Team Target</div>
                  <div className="text-xl sm:text-2xl font-black text-white drop-shadow-sm">{formatINR(teamMetrics.totalTeamTarget)}</div>
                </div>
                <div className="h-10 w-px bg-pink-900/60 shadow-[1px_0_0_rgba(255,255,255,0.15)]" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-pink-200/75 tracking-wider">Active Team</div>
                  <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-1.5 drop-shadow-sm">
                    <Users className="w-5 h-5 text-brand-pink" />
                    <span>{reps.length} Reps</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAgendaDetails(!showAgendaDetails)}
                className="skeuo-btn flex items-center gap-2 px-4 py-3 text-xs font-black text-primary rounded-2xl cursor-pointer justify-center"
              >
                <Sparkles className="w-4 h-4 text-brand-pink" />
                <span>{showAgendaDetails ? 'Hide Agenda' : 'Review 8 Questions'}</span>
                {showAgendaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expandable 8 Agenda Questions */}
          {showAgendaDetails && (
            <div className="mt-6 pt-6 border-t border-pink-900/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="text-xs font-black uppercase tracking-wider text-pink-200 mb-3.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-pink" />
                <span>Mandated 8-Question Agenda for Individual Rep Review:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-[#2D040E]/80 p-3.5 rounded-xl border border-[#4D0819] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]">
                  <span className="font-black text-pink-200 block mb-1">1️⃣ Actual sales</span>
                  <span className="text-pink-100/80">Achieved till today</span>
                </div>
                <div className="bg-[#2D040E]/80 p-3.5 rounded-xl border border-[#4D0819] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]">
                  <span className="font-black text-pink-200 block mb-1">2️⃣ Balance amount</span>
                  <span className="text-pink-100/80">Required to reach ₹3L</span>
                </div>
                <div className="bg-[#2D040E]/80 p-3.5 rounded-xl border border-[#4D0819] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]">
                  <span className="font-black text-pink-200 block mb-1">3️⃣ Active leads</span>
                  <span className="text-pink-100/80">Currently available in pipe</span>
                </div>
                <div className="bg-[#2D040E]/80 p-3.5 rounded-xl border border-[#4D0819] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]">
                  <span className="font-black text-pink-200 block mb-1">4️⃣ Expected order value</span>
                  <span className="text-pink-100/80">Lead-wise expected ₹ value</span>
                </div>
                <div className="bg-[#2D040E]/80 p-3.5 rounded-xl border border-[#4D0819] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]">
                  <span className="font-black text-pink-200 block mb-1">5️⃣ Lead Status</span>
                  <span className="text-pink-100/80">Hot / Warm / New status</span>
                </div>
                <div className="bg-[#2D040E]/80 p-3.5 rounded-xl border border-[#4D0819] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]">
                  <span className="font-black text-pink-200 block mb-1">6️⃣ Realistic converts</span>
                  <span className="text-pink-100/80">High-conv. leads this month</span>
                </div>
                <div className="bg-[#2D040E]/80 p-3.5 rounded-xl border border-[#4D0819] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]">
                  <span className="font-black text-pink-200 block mb-1">7️⃣ Action plan</span>
                  <span className="text-pink-100/80">Strategy before 31 August</span>
                </div>
                <div className="bg-[#2D040E]/80 p-3.5 rounded-xl border border-[#4D0819] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]">
                  <span className="font-black text-pink-200 block mb-1">8️⃣ Pipeline adequacy</span>
                  <span className="text-pink-100/80">New leads needed if gap</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4 Primary Skeuomorphic KPI Cards */}
        <KPIGrid />

        {/* Mid Row: Skeuomorphic Performance Chart & Pipeline Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <PipelineHealthCard />
          </div>
        </div>

        {/* Bottom Row: Team Performance Table & Forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
