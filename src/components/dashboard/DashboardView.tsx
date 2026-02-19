'use client';
import { useAppStore } from '@/lib/store';

const riskColors: Record<string, string> = { HIGH: 'bg-red-500', LIMITED: 'bg-yellow-500', MINIMAL: 'bg-green-500', UNACCEPTABLE: 'bg-purple-500' };
const statusColors: Record<string, string> = { COMPLIANT: 'text-emerald-400 bg-emerald-500/10', PARTIAL: 'text-yellow-400 bg-yellow-500/10', NON_COMPLIANT: 'text-red-400 bg-red-500/10', UNDER_REVIEW: 'text-blue-400 bg-blue-500/10', EXEMPTED: 'text-slate-400 bg-slate-500/10' };

export function DashboardView() {
  const { metrics, systems, notifications, auditLog, setActiveView } = useAppStore();
  const unreadNotifs = notifications.filter(n => !n.read);
  const trend = metrics.complianceTrend;
  const maxScore = Math.max(...trend.map(t => t.score));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Critical Alerts Banner */}
      {unreadNotifs.filter(n => n.priority === 'CRITICAL').length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <span className="text-xl">🚨</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-400">{unreadNotifs.filter(n => n.priority === 'CRITICAL').length} Critical Alerts Require Attention</p>
            <p className="text-xs text-slate-400 mt-0.5">{unreadNotifs.filter(n => n.priority === 'CRITICAL').map(n => n.title).join(' • ')}</p>
          </div>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">View All</button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-medium">Total AI Systems</span>
            <span className="text-2xl">🤖</span>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.totalSystems}</p>
          <p className="text-[11px] text-slate-400 mt-1">{metrics.highRiskSystems} high-risk systems</p>
        </div>
        <div className="stat-card border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-medium">Compliant</span>
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{metrics.compliantSystems}</p>
          <p className="text-[11px] text-slate-400 mt-1">{Math.round(metrics.compliantSystems / metrics.totalSystems * 100)}% of total systems</p>
        </div>
        <div className="stat-card border-yellow-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-medium">Partially Compliant</span>
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">{metrics.partiallyCompliant}</p>
          <p className="text-[11px] text-slate-400 mt-1">{metrics.pendingAssessments} assessments pending</p>
        </div>
        <div className="stat-card border-red-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-medium">Non-Compliant</span>
            <span className="text-2xl">❌</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{metrics.nonCompliant}</p>
          <p className="text-[11px] text-slate-400 mt-1">{metrics.overdueAssessments} overdue assessments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Trend */}
        <div className="lg:col-span-2 glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Compliance Score Trend</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">+14% this month</span>
          </div>
          <div className="flex items-end gap-2 h-40">
            {trend.map((t, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-slate-400">{t.score}%</span>
                <div className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-500"
                  style={{ height: `${(t.score / maxScore) * 120}px` }} />
                <span className="text-[9px] text-slate-500">{t.month.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Risk Distribution</h3>
          <div className="space-y-3">
            {Object.entries(metrics.riskDistribution).map(([tier, count]) => (
              <div key={tier} className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${riskColors[tier] || 'bg-slate-500'}`} />
                <span className="text-xs text-slate-300 flex-1">{tier}</span>
                <span className="text-sm font-bold text-white">{count}</span>
                <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${riskColors[tier] || 'bg-slate-500'}`} style={{ width: `${(count / metrics.totalSystems) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="text-center">
              <p className="text-xs text-slate-400">High-Risk Ratio</p>
              <p className="text-xl font-bold text-red-400">{Math.round(metrics.highRiskSystems / metrics.totalSystems * 100)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Upcoming Deadlines</h3>
            <button onClick={() => setActiveView('regulations')} className="text-[10px] text-blue-400 hover:text-blue-300">View All →</button>
          </div>
          <div className="space-y-2">
            {metrics.upcomingDeadlines.slice(0, 5).map(d => (
              <div key={d.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className={`w-1 h-8 rounded-full ${d.priority === 'CRITICAL' ? 'bg-red-500' : d.priority === 'HIGH' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{d.title}</p>
                  <p className="text-[10px] text-slate-400">{d.date} • {d.relatedSystemIds.length} systems</p>
                </div>
                <span className={`text-xs font-bold ${d.daysRemaining <= 0 ? 'text-red-400' : d.daysRemaining <= 30 ? 'text-orange-400' : 'text-slate-300'}`}>
                  {d.daysRemaining <= 0 ? 'OVERDUE' : `${d.daysRemaining}d`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Jurisdiction Compliance */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Compliance by Jurisdiction</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(metrics.complianceByJurisdiction).filter(([, v]) => v.total > 0).map(([jur, data]) => (
              <div key={jur}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-300">{jur.replace(/_/g, ' ')}</span>
                  <span className="text-xs font-medium text-white">{data.compliant}/{data.total} ({data.percentage}%)</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${data.percentage >= 80 ? 'bg-emerald-500' : data.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.max(3, data.percentage)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Systems Overview Table */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">AI Systems Overview</h3>
          <button onClick={() => setActiveView('systems')} className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">View Registry →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[11px] text-slate-400 border-b border-slate-700/50">
                <th className="text-left py-2 pr-4 font-medium">System</th>
                <th className="text-left py-2 pr-4 font-medium">Category</th>
                <th className="text-left py-2 pr-4 font-medium">Risk Tier</th>
                <th className="text-left py-2 pr-4 font-medium">EU AI Act</th>
                <th className="text-left py-2 pr-4 font-medium">Documentation</th>
                <th className="text-left py-2 font-medium">Owner</th>
              </tr>
            </thead>
            <tbody>
              {systems.map(s => (
                <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={() => setActiveView('systems')}>
                  <td className="py-2.5 pr-4">
                    <p className="text-xs font-medium text-white">{s.name}</p>
                    <p className="text-[10px] text-slate-400">{s.department}</p>
                  </td>
                  <td className="py-2.5 pr-4"><span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{s.category.replace(/_/g, ' ')}</span></td>
                  <td className="py-2.5 pr-4">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.riskClassification.overallTier === 'HIGH' ? 'bg-red-500/15 text-red-400' : s.riskClassification.overallTier === 'LIMITED' ? 'bg-yellow-500/15 text-yellow-400' : 'bg-green-500/15 text-green-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${riskColors[s.riskClassification.overallTier]}`} />{s.riskClassification.overallTier}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[s.complianceStatus.EU_AI_ACT] || ''}`}>{s.complianceStatus.EU_AI_ACT.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.documentation.annexIV.completeness}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-400">{s.documentation.annexIV.completeness}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-xs text-slate-300">{s.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
          <button onClick={() => setActiveView('audit-log')} className="text-[10px] text-blue-400 hover:text-blue-300">Full Audit Log →</button>
        </div>
        <div className="space-y-2">
          {auditLog.slice(0, 5).map(entry => (
            <div key={entry.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/30">
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs">
                {entry.action === 'LOGIN' ? '🔑' : entry.action === 'APPROVE' ? '✅' : entry.action === 'UPDATE' ? '✏️' : entry.action === 'GENERATE_DOC' ? '📄' : entry.action === 'CLASSIFY' ? '⚡' : entry.action === 'EXPORT' ? '📥' : '📋'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white"><span className="font-medium">{entry.userName}</span> {entry.details}</p>
                <p className="text-[10px] text-slate-500">{new Date(entry.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
