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
  CheckCircle2, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

export const DashboardPage = () => {
  const { reps, teamMetrics, selectedMonth, setSelectedMonth } = useSalesData();
  const [selectedRep, setSelectedRep] = useState(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isAddRepModalOpen, setIsAddRepModalOpen] = useState(false);
  const [showAgendaDetails, setShowAgendaDetails] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-brand-pink selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenSyncConfig={() => setIsSyncModalOpen(true)}
        onOpenAddRep={() => setIsAddRepModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 space-y-6">
        {/* Meeting Agenda Banner */}
        <div className="bg-gradient-to-r from-[#3e0211] via-[#5a1725] to-[#3e0211] text-white rounded-2xl p-5 md:p-6 shadow-md border border-pink-900/30">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-brand-pink/30 border border-brand-pink/50 text-[11px] font-bold text-pink-200 uppercase tracking-wider">
                <Calendar className="w-3 h-3" />
                <span>Today's Pipeline Review • {selectedMonth}</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                <span>🎯 Monthly Target: ₹3,00,000 per person</span>
              </h1>
              <p className="text-xs text-pink-100/80 max-w-2xl leading-relaxed">
                Objective: Target achievement review • Target vs Actual + Current Pipeline • Individual 8-Question breakdown.
              </p>
            </div>

            {/* Target Breakdown Pills & Dropdown toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="bg-black/25 backdrop-blur-xs p-3 rounded-xl border border-white/10 flex items-center gap-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-pink-200/80">Total Team Target</div>
                  <div className="text-lg font-black text-white">{formatINR(teamMetrics.totalTeamTarget)}</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-pink-200/80">Team Size</div>
                  <div className="text-lg font-black text-white flex items-center gap-1">
                    <Users className="w-4 h-4 text-brand-pink" />
                    <span>{reps.length} Reps</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAgendaDetails(!showAgendaDetails)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition self-stretch sm:self-auto justify-center"
              >
                <span>{showAgendaDetails ? 'Hide Agenda' : 'Review 8 Questions'}</span>
                {showAgendaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expandable 8 Agenda Questions */}
          {showAgendaDetails && (
            <div className="mt-5 pt-5 border-t border-white/15 animate-in fade-in duration-200">
              <div className="text-xs font-bold uppercase tracking-wider text-pink-200 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-pink" />
                <span>8 Mandated Review Questions for Today's Pipeline Meeting:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                  <span className="font-bold text-pink-200">1️⃣ Actual sales</span> achieved till today
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                  <span className="font-bold text-pink-200">2️⃣ Balance amount</span> required to reach ₹3L
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                  <span className="font-bold text-pink-200">3️⃣ Current active leads</span> available
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                  <span className="font-bold text-pink-200">4️⃣ Expected order value</span> lead-wise
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                  <span className="font-bold text-pink-200">5️⃣ Hot / Warm / New</span> lead status breakdown
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                  <span className="font-bold text-pink-200">6️⃣ Realistic converts</span> before 31 August
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                  <span className="font-bold text-pink-200">7️⃣ Action plan</span> to achieve remaining target
                </div>
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                  <span className="font-bold text-pink-200">8️⃣ New leads needed</span> if pipeline insufficient
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4 Core KPI Cards */}
        <KPIGrid />

        {/* Mid Row: Charts & Health Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <PipelineHealthCard />
          </div>
        </div>

        {/* Bottom Row: Month-End Forecast & Team Table */}
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
