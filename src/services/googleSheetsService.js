import Papa from 'papaparse';
import { INITIAL_SALES_REPRESENTATIVES, DEFAULT_REVIEW_METADATA } from '../data/defaultSalesData';

const STORAGE_KEYS = {
  REPS_DATA: 'teeszone_sales_reps_data_v1',
  SHEET_CONFIG: 'teeszone_sheet_config_v1',
  LAST_SYNC: 'teeszone_last_sync_time_v1',
};

// Helper: clean and parse Indian currency strings like "₹3,00,000", "300000", "3L", "1.5L"
export function parseCurrencyOrNumber(val, defaultVal = 0) {
  if (val === undefined || val === null || val === '') return defaultVal;
  if (typeof val === 'number') return val;
  
  let str = String(val).trim().toUpperCase();
  // Handle 3L, 3.5L, 3 Lakhs
  if (str.endsWith('L') || str.endsWith('LAKH') || str.endsWith('LAKHS')) {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? defaultVal : Math.round(num * 100000);
  }
  // Handle 50k, 50K
  if (str.endsWith('K')) {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? defaultVal : Math.round(num * 1000);
  }
  // Clean all characters except digits and decimal
  const clean = str.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? defaultVal : Math.round(parsed);
}

// Helper: format currency into INR format (e.g. ₹3,00,000 or ₹1.9L)
export function formatINR(val, compact = false) {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  const num = Math.round(Number(val));
  
  if (compact) {
    if (Math.abs(num) >= 100000) {
      return `₹${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 2)}L`;
    }
    if (Math.abs(num) >= 1000) {
      return `₹${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}k`;
    }
    return `₹${num}`;
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

// Convert Google Sheet public link into a direct CSV export URL
export function convertToExportCsvUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  
  // If already a CSV published URL
  if (trimmed.includes('output=csv') || trimmed.includes('tqx=out:csv')) {
    return trimmed;
  }
  
  // If standard Google Sheet edit link: https://docs.google.com/spreadsheets/d/{ID}/edit#gid=0
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const sheetId = match[1];
    // Check for gid
    const gidMatch = trimmed.match(/gid=([0-9]+)/);
    const gid = gidMatch ? gidMatch[1] : '0';
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  }
  
  return trimmed;
}

// Parse Google Sheet / Form CSV data rows into structured Sales Reps
export function parseSheetRowsToReps(rows, defaultTarget = 300000) {
  if (!Array.isArray(rows) || rows.length === 0) return [];
  
  const repMap = new Map();
  const avatarColors = [
    'bg-[#5a1725] text-white',
    'bg-[#da7c89] text-[#3e0211]',
    'bg-[#867274] text-white',
    'bg-[#E60067] text-white',
    'bg-[#3e0211] text-white',
    'bg-[#645e53] text-white',
    'bg-[#954552] text-white',
  ];

  rows.forEach((row, index) => {
    // Find representative name across potential column headers
    const nameKey = Object.keys(row).find(k => 
      /name|representative|salesperson|person|team member|rep/i.test(k)
    );
    const rawName = nameKey ? row[nameKey] : (row['Name'] || row['Rep'] || `Sales Rep ${index + 1}`);
    const name = String(rawName || '').trim();
    if (!name) return; // Skip empty row

    // Find Target
    const targetKey = Object.keys(row).find(k => /target|monthly target/i.test(k));
    const target = targetKey ? parseCurrencyOrNumber(row[targetKey], defaultTarget) : defaultTarget;

    // Q1: Actual sales achieved
    const actualKey = Object.keys(row).find(k => /1|actual|achieved|sales achieved|current sales/i.test(k));
    const actualSales = actualKey ? parseCurrencyOrNumber(row[actualKey], 0) : 0;

    // Q3: Active leads available
    const activeLeadsKey = Object.keys(row).find(k => /3|active leads|current active|leads count/i.test(k));
    const activeLeadsCount = activeLeadsKey ? parseCurrencyOrNumber(row[activeLeadsKey], 0) : 0;

    // Q4: Lead-wise expected order value / Total pipeline
    const pipelineKey = Object.keys(row).find(k => /4|expected order value|pipeline value|lead-wise/i.test(k));
    const totalPipelineValue = pipelineKey ? parseCurrencyOrNumber(row[pipelineKey], 0) : 0;

    // Q5: Hot / Warm / New status
    const hotKey = Object.keys(row).find(k => /hot/i.test(k));
    const warmKey = Object.keys(row).find(k => /warm/i.test(k));
    const newLeadKey = Object.keys(row).find(k => /new lead|new status/i.test(k));

    const hotCount = hotKey ? parseCurrencyOrNumber(row[hotKey], Math.max(1, Math.round(activeLeadsCount * 0.35))) : Math.max(1, Math.round(activeLeadsCount * 0.35));
    const warmCount = warmKey ? parseCurrencyOrNumber(row[warmKey], Math.max(1, Math.round(activeLeadsCount * 0.45))) : Math.max(1, Math.round(activeLeadsCount * 0.45));
    const newCount = newLeadKey ? parseCurrencyOrNumber(row[newLeadKey], Math.max(0, activeLeadsCount - hotCount - warmCount)) : Math.max(0, activeLeadsCount - hotCount - warmCount);

    // Q6: Realistic converted leads
    const realisticConvKey = Object.keys(row).find(k => /6|realistic|converted this month|can realistically/i.test(k));
    const rawRealistic = realisticConvKey ? row[realisticConvKey] : '';
    const expectedRealisticConversion = parseCurrencyOrNumber(rawRealistic, Math.round(totalPipelineValue * 0.65));

    // Q7: Action Plan
    const actionKey = Object.keys(row).find(k => /7|action plan|achieve the remaining|strategy|how you are going/i.test(k));
    const actionPlan = actionKey && row[actionKey] ? String(row[actionKey]).trim() : 'Aggressive outreach on high-probability opportunities, daily pipeline reviews, and prioritizing immediate closing accounts.';

    // Q8: New Leads Needed / Pipe Adequacy
    const newLeadsKey = Object.keys(row).find(k => /8|insufficient|how many new leads|new leads needed/i.test(k));
    const newLeadsRequired = newLeadsKey ? parseCurrencyOrNumber(row[newLeadsKey], 0) : 0;

    const balance = Math.max(0, target - actualSales);
    let status = 'On Track';
    let statusType = 'success';
    
    if (actualSales + expectedRealisticConversion < target) {
      status = 'Pipeline Gap';
      statusType = 'danger';
    } else if (actualSales < target * 0.5) {
      status = 'Needs Attention';
      statusType = 'warning';
    }

    const repId = `rep-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const avatar = name.charAt(0).toUpperCase();
    const avatarColor = avatarColors[repMap.size % avatarColors.length];

    // Create / Merge representation
    repMap.set(repId, {
      id: repId,
      name,
      avatar,
      avatarColor,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@teeszone.com`,
      monthlyTarget: target,
      actualSales,
      activeLeadsCount,
      totalPipelineValue,
      expectedRealisticConversion,
      newLeadsRequired: newLeadsRequired || (balance > expectedRealisticConversion ? Math.ceil((balance - expectedRealisticConversion) / 25000) : 0),
      status,
      statusType,
      leadBreakdown: {
        hot: { count: hotCount, value: Math.round(totalPipelineValue * 0.55) },
        warm: { count: warmCount, value: Math.round(totalPipelineValue * 0.35) },
        newLeads: { count: newCount, value: Math.round(totalPipelineValue * 0.10) }
      },
      realisticLeads: [
        { id: `${repId}-l1`, client: `${name}'s Key Account (Bulk Tees Order)`, value: Math.round(expectedRealisticConversion * 0.55), status: 'Hot', date: '26 Aug 2026', prob: '85%' },
        { id: `${repId}-l2`, client: `${name}'s Secondary Lead (Custom Merch)`, value: Math.round(expectedRealisticConversion * 0.45), status: 'Hot', date: '29 Aug 2026', prob: '80%' }
      ],
      actionPlan,
      pipelineAdequacyNotes: typeof rawRealistic === 'string' && rawRealistic.length > 20 ? rawRealistic : `Remaining balance required is ${formatINR(balance)}. Target is achievable with current warm/hot pipeline.`
    });
  });

  return Array.from(repMap.values());
}

// Fetch and synchronize from live Google Sheet CSV URL
export async function fetchLiveGoogleSheetData(csvUrl, defaultTarget = 300000) {
  if (!csvUrl || !csvUrl.trim()) {
    throw new Error('Google Sheet URL is empty');
  }

  const directUrl = convertToExportCsvUrl(csvUrl);

  return new Promise((resolve, reject) => {
    Papa.parse(directUrl, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const parsedReps = parseSheetRowsToReps(results.data, defaultTarget);
          if (parsedReps.length > 0) {
            resolve({
              reps: parsedReps,
              rowCount: results.data.length,
              timestamp: new Date().toISOString()
            });
            return;
          }
        }
        reject(new Error('No valid sales representative rows found in the sheet. Please ensure headers include Rep Name and Sales data.'));
      },
      error: (error) => {
        reject(new Error(`Failed to load Google Sheet: ${error.message || 'Network / CORS error. Ensure sheet is published as Web CSV.'}`));
      }
    });
  });
}

// Local Storage helpers
export function loadCachedSalesReps() {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.REPS_DATA);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading cached reps', e);
  }
  return INITIAL_SALES_REPRESENTATIVES;
}

export function saveCachedSalesReps(reps) {
  try {
    localStorage.setItem(STORAGE_KEYS.REPS_DATA, JSON.stringify(reps));
  } catch (e) {
    console.error('Error saving cached reps', e);
  }
}

export function loadSheetConfig() {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.SHEET_CONFIG);
    if (cached) {
      return { ...DEFAULT_REVIEW_METADATA, ...JSON.parse(cached) };
    }
  } catch (e) {
    console.error('Error loading sheet config', e);
  }
  return DEFAULT_REVIEW_METADATA;
}

export function saveSheetConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEYS.SHEET_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving sheet config', e);
  }
}
