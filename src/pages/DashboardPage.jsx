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
  Target, 
  Calendar, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Activity,
  Layers,
  Award
} from 'lucide-react';

export const DashboardPage = () => {
  const { reps, teamMetrics, selectedMonth } = useSalesData();
  const [selectedRep, setSelectedRep] = useState(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isAddRepModalOpen, setIsAddRepModalOpen] = useState(false);
  const [showAgendaDetails, setShowAgendaDetails] = useState(false);

  return (
    <div className="min-h-screen spatial-bg-ambient flex flex-col selection:bg-brand-pink selection:text-white">
      {/* Top Spatial Navbar */}
      <Navbar
        onOpenSyncConfig={() => setIsSyncModalOpen(true)}
        onOpenAddRep={() => setIsAddRepModalOpen(true)}
      />

      {/* Main Full-Width Content Container */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-6 space-y-6">
        {/* Spatial Meeting Agenda Header Banner */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#3e0211] via-[#5a1725] to-[#3e0211] text-white p-6 md:p-8 shadow-[0_16px_40px_rgba(62,2,17,0.18)] border border-pink-900/40">
          
          {/* Specular Ambient Glow Effects */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-pink/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-0 w-80 h-80 bg-pink-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-bold text-pink-200 tracking-wider uppercase shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-brand-pink" />
                <span>TODAY'S SALES PIPELINE REVIEW – {selectedMonth.toUpperCase()}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                <span>🎯 Monthly Target: ₹3,00,000 per person</span>
              </h1>
              <p className="text-xs sm:text-sm text-pink-100/80 max-w-3xl leading-relaxed">
                Review Target vs Actual + Current Pipeline • Objective: ₹3L target → Current achievement → Available pipeline → Conversion plan → Month-end achievement.
              </p>
            </div>

            {/* Spatial Target Overview Stats */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="bg-black/30 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15 shadow-inner flex items-center gap-6">
                <div>
                  <div className="text-[10px] uppercase font-bold text-pink-200/75 tracking-wider">Total Team Target</div>
                  <div className="text-xl sm:text-2xl font-black text-white">{formatINR(teamMetrics.totalTeamTarget)}</div>
                </div>
                <div className="h-10 w-px bg-white/20" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-pink-200/75 tracking-wider">Active Team</div>
                  <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-1.5">
                    <Users className="w-5 h-5 text-brand-pink" />
                    <span>{reps.length} Reps</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAgendaDetails(!showAgendaDetails)}
                className="flex items-center gap-2 px-4 py-3 text-xs font-bold bg-white/15 hover:bg-white/25 backdrop-blur-md text-white rounded-2xl border border-white/25 transition-all shadow-sm active:scale-95 justify-center"
              >
                <Sparkles className="w-4 h-4 text-brand-pink" />
                <span>{showAgendaDetails ? 'Hide Agenda' : 'Review 8 Questions'}</span>
                {showAgendaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expandable 8 Agenda Questions */}
          {showAgendaDetails && (
            <div className="mt-6 pt-6 border-t border-white/15 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="text-xs font-bold uppercase tracking-wider text-pink-200 mb-3.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-pink" />
                <span>Mandated 8-Question Agenda for Individual Rep Review:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15 hover:bg-white/15 transition shadow-xs">
                  <span className="font-bold text-pink-200 block mb-1">1️⃣ Actual sales</span>
                  <span className="text-pink-100/90">Achieved till today</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15 hover:bg-white/15 transition shadow-xs">
                  <span className="font-bold text-pink-200 block mb-1">2️⃣ Balance amount</span>
                  <span className="text-pink-100/90">Required to reach ₹3L</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15 hover:bg-white/15 transition shadow-xs">
                  <span className="font-bold text-pink-200 block mb-1">3️⃣ Active leads</span>
                  <span className="text-pink-100/90">Currently available in pipe</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15 hover:bg-white/15 transition shadow-xs">
                  <span className="font-bold text-pink-200 block mb-1">4️⃣ Expected order value</span>
                  <span className="text-pink-100/90">Lead-wise expected ₹ value</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15 hover:bg-white/15 transition shadow-xs">
                  <span className="font-bold text-pink-200 block mb-1">5️⃣ Lead Status</span>
                  <span className="text-pink-100/90">Hot / Warm / New distribution</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15 hover:bg-white/15 transition shadow-xs">
                  <span className="font-bold text-pink-200 block mb-1">6️⃣ Realistic converts</span>
                  <span className="text-pink-100/90">High-conv. leads this month</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15 hover:bg-white/15 transition shadow-xs">
                  <span className="font-bold text-pink-200 block mb-1">7️⃣ Action plan</span>
                  <span className="text-pink-100/90">Strategy before 31 August</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15 hover:bg-white/15 transition shadow-xs">
                  <span className="font-bold text-pink-200 block mb-1">8️⃣ Pipeline adequacy</span>
                  <span className="text-pink-100/90">New leads needed if gap</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4 Primary KPI Grid */}
        <KPIGrid />

        {/* Mid Row: Spatial Performance Chart & Pipeline Health */}
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
