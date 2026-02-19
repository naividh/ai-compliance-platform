'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export function SystemsView() {
  const { systems, searchQuery, setSelectedSystemId } = useAppStore();
  const [selectedId, setSelected] = useState<string | null>(null);
  const [filterTier, setFilterTier] = useState<string>('all');
  const filtered = systems.filter(s => {
    const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTier = filterTier === 'all' || s.riskClassification.overallTier === filterTier;
    return matchSearch && matchTier;
  });
  const selected = systems.find(s => s.id === selectedId);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-1">
          {['all', 'HIGH', 'LIMITED', 'MINIMAL'].map(t => (
            <button key={t} onClick={() => setFilterTier(t)} className={`text-[11px] px-3 py-1.5 rounded-lg transition-all ${filterTier === t ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              {t === 'all' ? 'All Systems' : t}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <span className="text-xs text-slate-400">{filtered.length} systems</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(s => (
          <div key={s.id} onClick={() => setSelected(selectedId === s.id ? null : s.id)}
            className={`glass rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-blue-500/30 ${selectedId === s.id ? 'border-blue-500/50 bg-blue-500/5' : ''} ${s.riskClassification.overallTier === 'HIGH' ? 'risk-glow-high' : s.riskClassification.overallTier === 'LIMITED' ? 'risk-glow-limited' : 'risk-glow-minimal'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-white">{s.name}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{s.department} • v{s.version}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.riskClassification.overallTier === 'HIGH' ? 'bg-red-500/15 text-red-400' : s.riskClassification.overallTier === 'LIMITED' ? 'bg-yellow-500/15 text-yellow-400' : 'bg-green-500/15 text-green-400'}`}>
                {s.riskClassification.overallTier}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">{s.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {s.tags.slice(0, 3).map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">{t}</span>)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div><span className="text-slate-500">EU AI Act:</span> <span className={s.complianceStatus.EU_AI_ACT === 'COMPLIANT' ? 'text-emerald-400' : s.complianceStatus.EU_AI_ACT === 'PARTIAL' ? 'text-yellow-400' : 'text-red-400'}>{s.complianceStatus.EU_AI_ACT.replace(/_/g, ' ')}</span></div>
              <div><span className="text-slate-500">Confidence:</span> <span className="text-white">{s.riskClassification.confidence}%</span></div>
              <div><span className="text-slate-500">Users:</span> <span className="text-white">{s.estimatedUsers.toLocaleString()}</span></div>
              <div><span className="text-slate-500">Annex IV:</span> <span className="text-white">{s.documentation.annexIV.completeness}%</span></div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.documentation.annexIV.completeness}%` }} />
              </div>
              <span className="text-[9px] text-slate-500">Doc Progress</span>
            </div>

            {selectedId === s.id && (
              <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3 animate-slide-in">
                <div>
                  <h4 className="text-[11px] font-semibold text-slate-300 mb-2">Model Details</h4>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                    <div><span className="text-slate-500">Type:</span> <span className="text-white">{s.modelDetails.type}</span></div>
                    <div><span className="text-slate-500">Framework:</span> <span className="text-white">{s.modelDetails.framework}</span></div>
                    <div><span className="text-slate-500">Training Data:</span> <span className="text-white">{s.modelDetails.trainingDataSize}</span></div>
                    <div><span className="text-slate-500">Explainability:</span> <span className="text-white">{s.modelDetails.explainability}</span></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-slate-300 mb-2">Bias Metrics</h4>
                  <div className="space-y-1">
                    {s.modelDetails.biasMetrics.map(b => (
                      <div key={b.category} className="flex items-center gap-2 text-[10px]">
                        <span className="text-slate-400 w-20">{b.category}</span>
                        <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${b.status === 'PASS' ? 'bg-emerald-500' : b.status === 'WARNING' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${(b.value / b.threshold) * 100}%` }} />
                        </div>
                        <span className={`font-medium ${b.status === 'PASS' ? 'text-emerald-400' : b.status === 'WARNING' ? 'text-yellow-400' : 'text-red-400'}`}>{b.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-slate-300 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    {s.techStack.map(t => <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{t}</span>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-slate-300 mb-2">Integrations</h4>
                  <div className="space-y-1">
                    {s.integrations.map(i => (
                      <div key={i.id} className="flex items-center gap-2 text-[10px]">
                        <span className={`w-1.5 h-1.5 rounded-full ${i.status === 'CONNECTED' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className="text-slate-300">{i.name}</span>
                        <span className="text-slate-500">{i.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
