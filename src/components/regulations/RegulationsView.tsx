'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export function RegulationsView() {
  const { regulations } = useAppStore();
  const [expanded, setExpanded] = useState<string | null>(regulations[0]?.id || null);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="text-[10px] text-slate-400 mb-1">Active Regulations</p>
          <p className="text-2xl font-bold text-white">{regulations.filter(r => r.status === 'IN_FORCE' || r.status === 'PARTIALLY_IN_FORCE').length}</p>
        </div>
        <div className="stat-card border-orange-500/20">
          <p className="text-[10px] text-slate-400 mb-1">Upcoming Enforcement</p>
          <p className="text-2xl font-bold text-orange-400">{regulations.filter(r => r.status === 'ENACTED' || r.status === 'PARTIALLY_IN_FORCE').length}</p>
        </div>
        <div className="stat-card border-blue-500/20">
          <p className="text-[10px] text-slate-400 mb-1">Jurisdictions Tracked</p>
          <p className="text-2xl font-bold text-blue-400">{new Set(regulations.map(r => r.jurisdiction)).size}</p>
        </div>
      </div>

      {regulations.map(r => (
        <div key={r.id} className="glass rounded-xl overflow-hidden">
          <div className="p-5 cursor-pointer hover:bg-slate-800/30 transition-colors" onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${r.status === 'IN_FORCE' ? 'bg-emerald-500/20' : r.status === 'PARTIALLY_IN_FORCE' ? 'bg-orange-500/20' : 'bg-blue-500/20'}`}>
                ⚖️
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">{r.shortName}</h3>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${r.status === 'IN_FORCE' ? 'bg-emerald-500/10 text-emerald-400' : r.status === 'PARTIALLY_IN_FORCE' ? 'bg-orange-500/10 text-orange-400' : r.status === 'ENACTED' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-500/10 text-slate-400'}`}>{r.status.replace(/_/g, ' ')}</span>
                </div>
                <p className="text-[11px] text-slate-400">{r.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-white">{r.enforcementDate}</p>
                <p className="text-[10px] text-slate-400">{r.jurisdiction.replace(/_/g, ' ')}</p>
              </div>
              <span className="text-slate-500 text-sm">{expanded === r.id ? '▾' : '▸'}</span>
            </div>
          </div>

          {expanded === r.id && (
            <div className="px-5 pb-5 space-y-4 animate-slide-in border-t border-slate-700/50 pt-4">
              <p className="text-xs text-slate-300">{r.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[11px] font-semibold text-white mb-2">Key Provisions</h4>
                  <div className="space-y-1">
                    {r.keyProvisions.map((p, i) => (
                      <div key={i} className="flex items-start gap-2 text-[10px]">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span className="text-slate-300">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-white mb-2">Penalty Structure</h4>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between"><span className="text-slate-400">Max Fine</span><span className="text-red-400 font-medium">{r.penaltyStructure.maxFine}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Revenue %</span><span className="text-red-400 font-medium">{r.penaltyStructure.maxFinePercentage}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Criminal</span><span className={r.penaltyStructure.criminalPenalties ? 'text-red-400' : 'text-emerald-400'}>{r.penaltyStructure.criminalPenalties ? 'Yes' : 'No'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Enforcer</span><span className="text-white">{r.penaltyStructure.enforcementBody}</span></div>
                  </div>
                </div>
              </div>

              {r.updates.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold text-white mb-2">Recent Updates</h4>
                  <div className="space-y-2">
                    {r.updates.map(u => (
                      <div key={u.id} className="p-2.5 rounded-lg bg-slate-800/30 border-l-2 border-blue-500">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-medium text-white">{u.title}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${u.impact === 'HIGH' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{u.impact}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">{u.description}</p>
                        <p className="text-[9px] text-slate-500 mt-1">{u.date} • Affects: {u.affectedArticles.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[11px] font-semibold text-white mb-2">Compliance Requirements</h4>
                <div className="flex flex-wrap gap-1.5">
                  {r.complianceRequirements.map((cr, i) => (
                    <span key={i} className="text-[9px] px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{cr}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
