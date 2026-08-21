// Default initial data for Teeszone August Sales Pipeline Review
// If Google Sheets URL is connected, this data is dynamically overwritten with live Google Sheet / Form rows!

export const DEFAULT_REVIEW_METADATA = {
  title: "TODAY'S SALES PIPELINE REVIEW – AUGUST",
  meetingDate: "August 2026",
  defaultTargetPerPerson: 300000,
  currencySymbol: "₹",
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc_EXAMPLE_FORM_ID/viewform",
  sheetCsvUrl: "", // Users can paste their Google Sheet published CSV URL
  autoSyncIntervalSec: 30,
};

export const INITIAL_SALES_REPRESENTATIVES = [
  {
    id: "rep-ramya",
    name: "Ramya",
    avatar: "R",
    avatarColor: "bg-[#5a1725] text-white",
    email: "ramya@teeszone.com",
    monthlyTarget: 300000,
    actualSales: 190000,
    activeLeadsCount: 16,
    totalPipelineValue: 260000,
    expectedRealisticConversion: 175000,
    newLeadsRequired: 2,
    status: "On Track",
    statusType: "success", // success, warning, danger
    leadBreakdown: {
      hot: { count: 5, value: 140000 },
      warm: { count: 7, value: 85000 },
      newLeads: { count: 4, value: 35000 }
    },
    realisticLeads: [
      { id: "l-101", client: "TechCorp Bangalore (Custom Polos 500 pcs)", value: 75000, status: "Hot", date: "24 Aug 2026", prob: "90%" },
      { id: "l-102", client: "Apex Fitness Chain (Dry-fit tees 350 pcs)", value: 60000, status: "Hot", date: "27 Aug 2026", prob: "85%" },
      { id: "l-103", client: "GreenRoots Event Planners (Event Tees)", value: 40000, status: "Warm", date: "29 Aug 2026", prob: "70%" }
    ],
    // Q7: How you are going to achieve the remaining target before 31 August
    actionPlan: "Follow up daily with TechCorp procurement for PO release by Aug 24. Conduct sample demo for Apex Fitness on Aug 25 to close full advance payment before Aug 27.",
    // Q8: If the existing pipeline is insufficient, how many new leads needed
    pipelineAdequacyNotes: "Current realistic pipeline (₹1.75L) exceeds remaining gap (₹1.10L). 2 new backup leads being targeted from healthcare & college fest segments."
  },
  {
    id: "rep-vijayadarshini",
    name: "Vijayadarshini",
    avatar: "V",
    avatarColor: "bg-[#da7c89] text-[#3e0211]",
    email: "vijayadarshini@teeszone.com",
    monthlyTarget: 300000,
    actualSales: 155000,
    activeLeadsCount: 14,
    totalPipelineValue: 225000,
    expectedRealisticConversion: 135000,
    newLeadsRequired: 3,
    status: "Needs Attention",
    statusType: "warning",
    leadBreakdown: {
      hot: { count: 4, value: 95000 },
      warm: { count: 6, value: 80000 },
      newLeads: { count: 4, value: 50000 }
    },
    realisticLeads: [
      { id: "l-201", client: "StartupHub Incubator (Merch Pack 250 pcs)", value: 55000, status: "Hot", date: "25 Aug 2026", prob: "85%" },
      { id: "l-202", client: "Zenith Retail Outlets (Graphic Tees Restock)", value: 45000, status: "Hot", date: "28 Aug 2026", prob: "80%" },
      { id: "l-203", client: "Urban Cafe Chain (Staff Polos 180 pcs)", value: 35000, status: "Warm", date: "30 Aug 2026", prob: "65%" }
    ],
    actionPlan: "Push for instant design approvals on StartupHub merch pack. Offer bulk discount bundle to Zenith Retail for closing order this week.",
    pipelineAdequacyNotes: "Remaining balance is ₹1.45L vs realistic convert of ₹1.35L. Slight ₹10k buffer needed, generating 3 new inbound leads from retail distributors."
  },
  {
    id: "rep-archana",
    name: "Archana",
    avatar: "A",
    avatarColor: "bg-[#867274] text-white",
    email: "archana@teeszone.com",
    monthlyTarget: 300000,
    actualSales: 140000,
    activeLeadsCount: 12,
    totalPipelineValue: 190000,
    expectedRealisticConversion: 110000,
    newLeadsRequired: 4,
    status: "Pipeline Gap",
    statusType: "danger",
    leadBreakdown: {
      hot: { count: 3, value: 70000 },
      warm: { count: 5, value: 75000 },
      newLeads: { count: 4, value: 45000 }
    },
    realisticLeads: [
      { id: "l-301", client: "St. Xavier Alumni Meet (Commemorative Tees)", value: 45000, status: "Hot", date: "26 Aug 2026", prob: "80%" },
      { id: "l-302", client: "Matrix Esports Team (Custom Gaming Hoodies)", value: 40000, status: "Warm", date: "29 Aug 2026", prob: "70%" },
      { id: "l-303", client: "BlueWave Tech Marathon (Marathon Vests)", value: 25000, status: "Hot", date: "30 Aug 2026", prob: "85%" }
    ],
    actionPlan: "Speed up sample delivery for St. Xavier Alumni committee. Re-engage 5 past client accounts from Q2 for repeat corporate apparel orders.",
    pipelineAdequacyNotes: "Balance required is ₹1.60L while realistic leads stand at ₹1.10L. Need ₹50k additional pipeline: reaching out to 4 fresh corporate leads immediately."
  }
];
