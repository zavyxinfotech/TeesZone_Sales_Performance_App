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
          client: `${formData.name}'s Corporate Polo Batch`,
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
      actionPlan: formData.actionPlan.trim() || 'Daily follow-ups with decision makers, fast sample turnaround, and aggressive closing before 31 August.',
      pipelineAdequacyNotes: (actual + realistic) >= target 
        ? `Target ₹${target.toLocaleString('en-IN')} achievable with current realistic pipeline.` 
        : `Requires generating additional leads to bridge ₹${Math.max(0, target - actual - realistic).toLocaleString('en-IN')} gap.`
    };

    addOrUpdateRep(newRep);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="spatial-card bg-white/95 max-w-xl w-full my-8 shadow-[0_24px_60px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3e0211] via-[#5a1725] to-[#3e0211] text-white p-5 flex items-center justify-between border-b border-pink-900/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand-pink text-white shadow-xs">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black">Add Sales Representative</h2>
              <p className="text-xs text-pink-200/80 font-medium">
                Simulate Google Form submission (Dynamically updates team total & charts)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 custom-scrollbar text-on-surface">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                Representative Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Siddharth"
                value={formData.name}
                onChange={handleChange}
                className="spatial-pill w-full px-3.5 py-2 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="siddharth@teeszone.com"
                value={formData.email}
                onChange={handleChange}
                className="spatial-pill w-full px-3.5 py-2 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                Monthly Target (₹)
              </label>
              <input
                type="number"
                name="monthlyTarget"
                value={formData.monthlyTarget}
                onChange={handleChange}
                className="spatial-pill w-full px-3.5 py-2 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                1️⃣ Actual Sales Achieved (₹) *
              </label>
              <input
                type="number"
                name="actualSales"
                required
                placeholder="e.g. 175000"
                value={formData.actualSales}
                onChange={handleChange}
                className="spatial-pill w-full px-3.5 py-2 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                3️⃣ Active Leads Count *
              </label>
              <input
                type="number"
                name="activeLeadsCount"
                required
                placeholder="e.g. 15"
                value={formData.activeLeadsCount}
                onChange={handleChange}
                className="spatial-pill w-full px-3.5 py-2 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                4️⃣ Expected Order Value (₹) *
              </label>
              <input
                type="number"
                name="totalPipelineValue"
                required
                placeholder="e.g. 240000"
                value={formData.totalPipelineValue}
                onChange={handleChange}
                className="spatial-pill w-full px-3.5 py-2 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
              6️⃣ Realistic Expected Conversion (₹)
            </label>
            <input
              type="number"
              name="expectedRealisticConversion"
              placeholder="e.g. 150000"
              value={formData.expectedRealisticConversion}
              onChange={handleChange}
              className="spatial-pill w-full px-3.5 py-2 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
              6️⃣ Key Realistic Account Name (Optional)
            </label>
            <input
              type="text"
              name="keyLeadClient"
              placeholder="e.g. Infosys Marathon Team (400 custom dri-fit tees)"
              value={formData.keyLeadClient}
              onChange={handleChange}
              className="spatial-pill w-full px-3.5 py-2 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
              7️⃣ Strategy / Action Plan To Reach Target
            </label>
            <textarea
              name="actionPlan"
              rows={3}
              placeholder="e.g. Following up on 2 corporate bulk orders; conducting client sample demos this week."
              value={formData.actionPlan}
              onChange={handleChange}
              className="spatial-pill w-full px-3.5 py-2 text-xs rounded-xl focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none resize-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-primary-container text-white hover:bg-primary transition shadow-sm active:scale-95"
            >
              Save & Recalculate App
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
