import React, { useState } from 'react';
import { useSalesData } from '../context/SalesDataContext';
import { X, UserPlus } from 'lucide-react';

export const AddRepModal = ({ onClose }) => {
  const { addOrUpdateRep, config } = useSalesData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    monthlyTarget: config.defaultTargetPerPerson || 300000,
    actualSales: '',
    activeLeadsCount: '',
    totalPipelineValue: '',
    expectedRealisticConversion: '',
    hotLeadsCount: '',
    warmLeadsCount: '',
    newLeadsCount: '',
    actionPlan: '',
    keyLeadClient: '',
    keyLeadValue: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const actual = Number(formData.actualSales) || 0;
    const target = Number(formData.monthlyTarget) || config.defaultTargetPerPerson;
    const pipeline = Number(formData.totalPipelineValue) || 0;
    const realistic = Number(formData.expectedRealisticConversion) || Math.round(pipeline * 0.7);
    const activeLeads = Number(formData.activeLeadsCount) || 5;

    const hotCount = Number(formData.hotLeadsCount) || Math.max(1, Math.round(activeLeads * 0.4));
    const warmCount = Number(formData.warmLeadsCount) || Math.max(1, Math.round(activeLeads * 0.4));
    const newCount = Number(formData.newLeadsCount) || Math.max(0, activeLeads - hotCount - warmCount);

    const newRep = {
      name: formData.name.trim(),
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '')}@teeszone.com`,
      monthlyTarget: target,
      actualSales: actual,
      activeLeadsCount: activeLeads,
      totalPipelineValue: pipeline,
      expectedRealisticConversion: realistic,
      leadBreakdown: {
        hot: { count: hotCount, value: Math.round(pipeline * 0.55) },
        warm: { count: warmCount, value: Math.round(pipeline * 0.35) },
        newLeads: { count: newCount, value: Math.round(pipeline * 0.10) }
      },
      realisticLeads: formData.keyLeadClient ? [
        {
          id: `lead-custom-1`,
          client: formData.keyLeadClient,
          value: Number(formData.keyLeadValue) || Math.round(realistic * 0.6),
          status: 'Hot',
          date: '28 Aug 2026',
          prob: '85%'
        },
        {
          id: `lead-custom-2`,
          client: `${formData.name}'s Corporate Order`,
          value: Math.round(realistic * 0.4),
          status: 'Warm',
          date: '30 Aug 2026',
          prob: '75%'
        }
      ] : [
        {
          id: `lead-custom-1`,
          client: `${formData.name}'s Enterprise Client (500 pcs)`,
          value: Math.round(realistic * 0.6),
          status: 'Hot',
          date: '28 Aug 2026',
          prob: '85%'
        }
      ],
      actionPlan: formData.actionPlan.trim() || 'Daily follow-ups with corporate clients, sample approvals, and active deal closing before 31 August.',
      pipelineAdequacyNotes: (actual + realistic) >= target 
        ? `Target ₹${target.toLocaleString('en-IN')} achievable with current realistic pipeline.` 
        : `Requires generating additional leads to bridge ₹${Math.max(0, target - actual - realistic).toLocaleString('en-IN')} gap.`
    };

    addOrUpdateRep(newRep);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="skeuo-card max-w-xl w-full my-auto shadow-[10px_14px_35px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#5A1424] via-[#480C1B] to-[#360410] text-white p-3.5 sm:p-5 flex items-center justify-between border-b border-[#2B020B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#7A1E32] to-[#450A17] text-white shadow-md border border-[#9A2D45] flex-shrink-0">
              <UserPlus className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black truncate">Add Sales Representative</h2>
              <p className="text-[10px] sm:text-xs text-pink-200/85 font-medium truncate">
                Dynamically updates team totals & charts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="skeuo-btn p-1.5 sm:p-2 text-primary rounded-xl cursor-pointer active:scale-95 flex-shrink-0 ml-2"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-3.5 sm:p-6 overflow-y-auto space-y-3.5 custom-scrollbar text-on-surface">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                Representative Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Siddharth"
                value={formData.name}
                onChange={handleChange}
                className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="siddharth@teeszone.com"
                value={formData.email}
                onChange={handleChange}
                className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                Monthly Target (₹)
              </label>
              <input
                type="number"
                name="monthlyTarget"
                value={formData.monthlyTarget}
                onChange={handleChange}
                className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                1️⃣ Actual Sales Achieved (₹) *
              </label>
              <input
                type="number"
                name="actualSales"
                required
                placeholder="e.g. 175000"
                value={formData.actualSales}
                onChange={handleChange}
                className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                3️⃣ Active Leads Count *
              </label>
              <input
                type="number"
                name="activeLeadsCount"
                required
                placeholder="e.g. 15"
                value={formData.activeLeadsCount}
                onChange={handleChange}
                className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
                4️⃣ Expected Order Value (₹) *
              </label>
              <input
                type="number"
                name="totalPipelineValue"
                required
                placeholder="e.g. 240000"
                value={formData.totalPipelineValue}
                onChange={handleChange}
                className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
              6️⃣ Realistic Expected Conversion (₹)
            </label>
            <input
              type="number"
              name="expectedRealisticConversion"
              placeholder="e.g. 150000"
              value={formData.expectedRealisticConversion}
              onChange={handleChange}
              className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-on-surface mb-1">
              7️⃣ Strategy / Action Plan To Reach Target
            </label>
            <textarea
              name="actionPlan"
              rows={2}
              placeholder="e.g. Following up on 2 corporate bulk orders; closing this week."
              value={formData.actionPlan}
              onChange={handleChange}
              className="skeuo-inset w-full px-3 py-2 text-xs rounded-xl focus:border-brand-pink outline-none resize-none font-medium"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="skeuo-btn px-3.5 py-2 rounded-xl text-xs font-black text-on-surface-variant cursor-pointer active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="skeuo-btn-primary px-5 py-2 rounded-xl text-xs font-black cursor-pointer active:scale-95"
            >
              Save Rep
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
