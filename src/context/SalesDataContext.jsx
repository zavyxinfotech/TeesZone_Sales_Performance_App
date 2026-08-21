import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  fetchLiveGoogleSheetData,
  loadCachedSalesReps,
  saveCachedSalesReps,
  loadSheetConfig,
  saveSheetConfig
} from '../services/googleSheetsService';
import { INITIAL_SALES_REPRESENTATIVES, DEFAULT_REVIEW_METADATA } from '../data/defaultSalesData';

const SalesDataContext = createContext(null);

export const SalesDataProvider = ({ children }) => {
  const [reps, setReps] = useState(() => loadCachedSalesReps());
  const [config, setConfig] = useState(() => loadSheetConfig());
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [syncError, setSyncError] = useState(null);
  const [selectedRep, setSelectedRep] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // ALL, ON_TRACK, NEEDS_ATTENTION, PIPELINE_GAP
  const [selectedMonth, setSelectedMonth] = useState('August 2026');

  // Persist reps to local storage whenever reps change
  useEffect(() => {
    saveCachedSalesReps(reps);
  }, [reps]);

  // Persist config whenever config changes
  useEffect(() => {
    saveSheetConfig(config);
  }, [config]);

  // Live Sync trigger with Google Sheets
  const syncWithGoogleSheet = useCallback(async (customUrl) => {
    const urlToUse = customUrl || config.sheetCsvUrl;
    if (!urlToUse || !urlToUse.trim()) {
      setSyncError('Please provide a Google Sheet published CSV link in settings.');
      return false;
    }

    setIsSyncing(true);
    setSyncError(null);

    try {
      const result = await fetchLiveGoogleSheetData(urlToUse, config.defaultTargetPerPerson);
      if (result && result.reps && result.reps.length > 0) {
        setReps(result.reps);
        setLastSyncTime(new Date().toLocaleTimeString());
        setIsSyncing(false);
        return true;
      }
    } catch (err) {
      console.warn('Sync error:', err);
      setSyncError(err.message || 'Failed to fetch Google Sheet data');
    } finally {
      setIsSyncing(false);
    }
    return false;
  }, [config.sheetCsvUrl, config.defaultTargetPerPerson]);

  // Periodic Auto-Sync if CSV URL is configured
  useEffect(() => {
    if (!config.sheetCsvUrl) return;

    const intervalId = setInterval(() => {
      syncWithGoogleSheet();
    }, (config.autoSyncIntervalSec || 30) * 1000);

    return () => clearInterval(intervalId);
  }, [config.sheetCsvUrl, config.autoSyncIntervalSec, syncWithGoogleSheet]);

  // Add / Update a Sales Representative dynamically (simulates Google Form submission or manual input)
  const addOrUpdateRep = useCallback((newRepData) => {
    setReps((prevReps) => {
      const target = Number(newRepData.monthlyTarget) || config.defaultTargetPerPerson;
      const actual = Number(newRepData.actualSales) || 0;
      const pipeline = Number(newRepData.totalPipelineValue) || 0;
      const realistic = Number(newRepData.expectedRealisticConversion) || Math.round(pipeline * 0.7);
      const balance = Math.max(0, target - actual);

      let status = 'On Track';
      let statusType = 'success';
      if (actual + realistic < target) {
        status = 'Pipeline Gap';
        statusType = 'danger';
      } else if (actual < target * 0.5) {
        status = 'Needs Attention';
        statusType = 'warning';
      }

      const repId = newRepData.id || `rep-${newRepData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      
      const repObject = {
        id: repId,
        name: newRepData.name,
        avatar: newRepData.name.charAt(0).toUpperCase(),
        avatarColor: newRepData.avatarColor || 'bg-[#5a1725] text-white',
        email: newRepData.email || `${newRepData.name.toLowerCase().replace(/\s+/g, '')}@teeszone.com`,
        monthlyTarget: target,
        actualSales: actual,
        activeLeadsCount: Number(newRepData.activeLeadsCount) || 0,
        totalPipelineValue: pipeline,
        expectedRealisticConversion: realistic,
        newLeadsRequired: Number(newRepData.newLeadsRequired) || (balance > realistic ? Math.ceil((balance - realistic) / 25000) : 0),
        status,
        statusType,
        leadBreakdown: newRepData.leadBreakdown || {
          hot: { count: Math.max(1, Math.round((newRepData.activeLeadsCount || 5) * 0.4)), value: Math.round(pipeline * 0.6) },
          warm: { count: Math.max(1, Math.round((newRepData.activeLeadsCount || 5) * 0.4)), value: Math.round(pipeline * 0.3) },
          newLeads: { count: Math.max(0, Math.round((newRepData.activeLeadsCount || 5) * 0.2)), value: Math.round(pipeline * 0.1) }
        },
        realisticLeads: newRepData.realisticLeads || [
          { id: `${repId}-1`, client: `${newRepData.name}'s Primary Lead`, value: Math.round(realistic * 0.6), status: 'Hot', date: '28 Aug 2026', prob: '85%' },
          { id: `${repId}-2`, client: `${newRepData.name}'s Secondary Lead`, value: Math.round(realistic * 0.4), status: 'Warm', date: '30 Aug 2026', prob: '70%' }
        ],
        actionPlan: newRepData.actionPlan || 'Focusing on closing hot leads and accelerating customer approvals.',
        pipelineAdequacyNotes: newRepData.pipelineAdequacyNotes || `Target: ₹${target.toLocaleString('en-IN')}, Remaining: ₹${balance.toLocaleString('en-IN')}.`
      };

      const existingIndex = prevReps.findIndex((r) => r.id === repId || r.name.toLowerCase() === newRepData.name.toLowerCase());
      if (existingIndex >= 0) {
        const updated = [...prevReps];
        updated[existingIndex] = { ...updated[existingIndex], ...repObject };
        return updated;
      } else {
        return [...prevReps, repObject];
      }
    });
  }, [config.defaultTargetPerPerson]);

  // Reset to default Ramya, Vijayadarshini, Archana baseline
  const resetToDefault = () => {
    setReps(INITIAL_SALES_REPRESENTATIVES);
    setConfig(DEFAULT_REVIEW_METADATA);
    setSyncError(null);
  };

  // Aggregated Team Analytics
  const teamMetrics = useMemo(() => {
    const totalTeamTarget = reps.reduce((sum, r) => sum + (Number(r.monthlyTarget) || 0), 0);
    const totalActualSales = reps.reduce((sum, r) => sum + (Number(r.actualSales) || 0), 0);
    const totalBalance = Math.max(0, totalTeamTarget - totalActualSales);
    const totalPipelineValue = reps.reduce((sum, r) => sum + (Number(r.totalPipelineValue) || 0), 0);
    const totalRealisticConversion = reps.reduce((sum, r) => sum + (Number(r.expectedRealisticConversion) || 0), 0);
    const totalActiveLeads = reps.reduce((sum, r) => sum + (Number(r.activeLeadsCount) || 0), 0);
    const totalNewLeadsNeeded = reps.reduce((sum, r) => sum + (Number(r.newLeadsRequired) || 0), 0);
    const projectedTotal = totalActualSales + totalRealisticConversion;
    const teamAchievementPercentage = totalTeamTarget > 0 ? Math.round((totalActualSales / totalTeamTarget) * 100) : 0;
    const projectedPercentage = totalTeamTarget > 0 ? Math.round((projectedTotal / totalTeamTarget) * 100) : 0;

    const totalHotCount = reps.reduce((sum, r) => sum + (r.leadBreakdown?.hot?.count || 0), 0);
    const totalHotValue = reps.reduce((sum, r) => sum + (r.leadBreakdown?.hot?.value || 0), 0);
    const totalWarmCount = reps.reduce((sum, r) => sum + (r.leadBreakdown?.warm?.count || 0), 0);
    const totalWarmValue = reps.reduce((sum, r) => sum + (r.leadBreakdown?.warm?.value || 0), 0);
    const totalNewCount = reps.reduce((sum, r) => sum + (r.leadBreakdown?.newLeads?.count || 0), 0);
    const totalNewValue = reps.reduce((sum, r) => sum + (r.leadBreakdown?.newLeads?.value || 0), 0);

    return {
      repCount: reps.length,
      totalTeamTarget,
      totalActualSales,
      totalBalance,
      totalPipelineValue,
      totalRealisticConversion,
      totalActiveLeads,
      totalNewLeadsNeeded,
      projectedTotal,
      teamAchievementPercentage,
      projectedPercentage,
      hot: { count: totalHotCount, value: totalHotValue },
      warm: { count: totalWarmCount, value: totalWarmValue },
      newLeads: { count: totalNewCount, value: totalNewValue },
    };
  }, [reps]);

  // Filtered reps list based on search and status
  const filteredReps = useMemo(() => {
    return reps.filter((rep) => {
      const matchesSearch = rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.actionPlan?.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      if (filterStatus === 'ON_TRACK') return rep.status === 'On Track';
      if (filterStatus === 'NEEDS_ATTENTION') return rep.status === 'Needs Attention';
      if (filterStatus === 'PIPELINE_GAP') return rep.status === 'Pipeline Gap';
      return true;
    });
  }, [reps, searchQuery, filterStatus]);

  return (
    <SalesDataContext.Provider
      value={{
        reps,
        filteredReps,
        config,
        setConfig,
        teamMetrics,
        isSyncing,
        lastSyncTime,
        syncError,
        syncWithGoogleSheet,
        addOrUpdateRep,
        resetToDefault,
        selectedRep,
        setSelectedRep,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        selectedMonth,
        setSelectedMonth
      }}
    >
      {children}
    </SalesDataContext.Provider>
  );
};

export const useSalesData = () => {
  const context = useContext(SalesDataContext);
  if (!context) {
    throw new Error('useSalesData must be used within a SalesDataProvider');
  }
  return context;
};
