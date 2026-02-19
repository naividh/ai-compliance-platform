'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export function ClassificationView() {
  const { systems } = useAppStore();
  const [selectedSystem, setSelectedSystem] = useState(systems[0]?.id);
  const system = systems.find(s => s.id === selectedSystem);
  if (!system) return null;
  const rc = system.riskClassification;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        {systems.map(s => (
          <button key={s.id} onClick={() => setSelectedSystem(s.id)}
            className={`text-[11px] px-3 py-1.5 rounded-lg transition-all ${selectedSystem === s.id ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white bg-slate-800/50 border border-slate-700/50'}`}>
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Classification Result */}
          <div className={`glass rounded-xl p-6 ${rc.overallTier === 'HIGH' ? 'risk-glow-high border-red-500/20' : rc.overallTier === 'LIMITED' ? 'risk-glow-limited border-yellow-500/20' : 'risk-glow-minimal border-green-500/20'}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold ${rc.overallTier === 'HIGH' ? 'bg-red-500/20 text-red-400' : rc.overallTier === 'LIMITED' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                {rc.overallTier === 'HIGH' ? '⚠️' : rc.overallTier === 'LIMITED' ? '⚡' : '✅'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{system.name}</h3>
                <p className="text-sm text-slate-400">{system.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 mb-1">EU AI Act Tier</p>
                <p className={`text-lg font-bold ${rc.euAiActTier === 'HIGH' ? 'text-red-400' : rc.euAiActTier === 'LIMITED' ? 'text-yellow-400' : 'text-green-400'}`}>{rc.euAiActTier}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 mb-1">Confidence</p>
                <p className="text-lg font-bold text-white">{rc.confidence}%</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 mb-1">Annex Ref</p>
                <p className="text-xs font-medium text-blue-400">{rc.annexReference}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 mb-1">Article</p>
                <p className="text-xs font-medium text-blue-400">{rc.articleReference}</p>
              </div>
            </div>
          </div>

          {/* Classification Reasoning */}
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Classification Reasoning</h3>
            <div className="space-y-3">
              {rc.reasoning.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30">
                  <span className={`mt-0.5 text-sm ${r.impact === 'INCREASES_RISK' ? '🔴' : r.impact === 'DECREASES_RISK' ? '🟢' : '⚪'}`}>
                    {r.impact === 'INCREASES_RISK' ? '↑' : r.impact === 'DECREASES_RISK' ? '↓' : '—'}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-white">{r.factor}</p>
                      <span className="text-[10px] text-slate-400">Weight: {(r.weight * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Obligations */}
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Compliance Obligations ({rc.obligations.length})</h3>
            <div className="space-y-2">
              {rc.obligations.map(o => (
                <div key={o.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <span className={`w-2 h-2 rounded-full ${o.status === 'MET' ? 'bg-emerald-500' : o.status === 'IN_PROGRESS' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-white">{o.title}</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">{o.article}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{o.description}</p>
                  </div>
                  <span className={`text-[10px] font-medium ${o.status === 'MET' ? 'text-emerald-400' : o.status === 'IN_PROGRESS' ? 'text-yellow-400' : 'text-red-400'}`}>{o.status.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Mitigation Measures</h3>
            <div className="space-y-2">
              {rc.mitigationMeasures.map(m => (
                <div key={m.id} className="p-2.5 rounded-lg bg-slate-800/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'VERIFIED' ? 'bg-emerald-500' : m.status === 'IMPLEMENTED' ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                    <p className="text-[11px] font-medium text-white">{m.title}</p>
                  </div>
                  <p className="text-[10px] text-slate-400">{m.description}</p>
                  <p className="text-[9px] text-slate-500 mt-1">{m.status} {m.implementedAt ? `• ${m.implementedAt}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Multi-Jurisdiction Status</h3>
            <div className="space-y-2">
              {Object.entries(system.complianceStatus).filter(([,v]) => v !== 'EXEMPTED').map(([jur, status]) => (
                <div key={jur} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30">
                  <span className="text-[10px] text-slate-300">{jur.replace(/_/g, ' ')}</span>
                  <span className={`text-[10px] font-medium ${status === 'COMPLIANT' ? 'text-emerald-400' : status === 'PARTIAL' ? 'text-yellow-400' : status === 'NON_COMPLIANT' ? 'text-red-400' : 'text-blue-400'}`}>{status.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Data Governance</h3>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between"><span className="text-slate-400">Classification</span><span className="text-white">{system.dataGovernance.dataClassification}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Personal Data</span><span className={system.dataGovernance.personalDataProcessed ? 'text-yellow-400' : 'text-emerald-400'}>{system.dataGovernance.personalDataProcessed ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Cross-Border</span><span className={system.dataGovernance.crossBorderTransfer ? 'text-yellow-400' : 'text-emerald-400'}>{system.dataGovernance.crossBorderTransfer ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">DPIA Required</span><span className={system.dataGovernance.dpiaRequired ? 'text-yellow-400' : 'text-slate-300'}>{system.dataGovernance.dpiaRequired ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">DPIA Completed</span><span className={system.dataGovernance.dpiaCompleted ? 'text-emerald-400' : 'text-red-400'}>{system.dataGovernance.dpiaCompleted ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Retention</span><span className="text-white">{system.dataGovernance.dataRetentionPeriod}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
