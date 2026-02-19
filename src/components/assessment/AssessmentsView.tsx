'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export function AssessmentsView() {
  const { assessments } = useAppStore();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? assessments : assessments.filter(a => a.status === filter);
  const statusCounts = { all: assessments.length, IN_PROGRESS: assessments.filter(a => a.status === 'IN_PROGRESS').length, APPROVED: assessments.filter(a => a.status === 'APPROVED').length, PENDING_REVIEW: assessments.filter(a => a.status === 'PENDING_REVIEW').length, NOT_STARTED: assessments.filter(a => a.status === 'NOT_STARTED').length };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex gap-2 flex-wrap">
        {Object.entries(statusCounts).map(([k, v]) => (
          <button key={k} onClick={() => setFilter(k)} className={`text-[11px] px-3 py-1.5 rounded-lg transition-all ${filter === k ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white bg-slate-800/50'}`}>
            {k === 'all' ? 'All' : k.replace(/_/g, ' ')} ({v})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(a => (
          <div key={a.id} className="glass rounded-xl p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${a.overallScore >= 80 ? 'bg-emerald-500/20 text-emerald-400' : a.overallScore >= 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                {a.overallScore}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">{a.systemName}</h3>
                <p className="text-[10px] text-slate-400">{a.jurisdiction.replace(/_/g, ' ')} • Assessor: {a.assessor}</p>
              </div>
              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${a.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400' : a.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-400' : a.status === 'PENDING_REVIEW' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-500/10 text-slate-400'}`}>
                {a.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {a.requirements.map(r => (
                <div key={r.id} className="p-2 rounded-lg bg-slate-800/30">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${r.status === 'PASS' ? 'bg-emerald-500' : r.status === 'PARTIAL' ? 'bg-yellow-500' : r.status === 'FAIL' ? 'bg-red-500' : 'bg-slate-500'}`} />
                    <span className="text-[10px] font-medium text-white truncate">{r.title}</span>
                  </div>
                  <span className="text-[9px] text-slate-500">{r.article}</span>
                </div>
              ))}
            </div>

            {a.findings.length > 0 && (
              <div className="border-t border-slate-700/50 pt-3">
                <p className="text-[10px] font-semibold text-slate-400 mb-2">Findings ({a.findings.length})</p>
                <div className="space-y-1.5">
                  {a.findings.map(f => (
                    <div key={f.id} className="flex items-center gap-2 text-[10px] p-2 rounded bg-slate-800/20">
                      <span className={`w-1.5 h-1.5 rounded-full ${f.severity === 'CRITICAL' ? 'bg-red-500' : f.severity === 'HIGH' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                      <span className="text-slate-300 flex-1">{f.title}</span>
                      <span className="text-slate-500">{f.assignee}</span>
                      <span className={`${f.status === 'OPEN' ? 'text-red-400' : f.status === 'IN_REMEDIATION' ? 'text-yellow-400' : 'text-emerald-400'}`}>{f.status.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
