'use client';
import { getDashboardMetrics, notifications, aiSystems } from '@/lib/enterprise-data';

const metrics = getDashboardMetrics();
const unreadNotifs = notifications.filter(n => !n.read);
const riskColors: Record<string, string> = { unacceptable: 'bg-red-500', high: 'bg-orange-500', limited: 'bg-yellow-500', minimal: 'bg-green-500' };
const compColors: Record<string, string> = { compliant: 'bg-green-500', partial: 'bg-yellow-500', 'non-compliant': 'bg-red-500', 'pending-review': 'bg-blue-500', exempt: 'bg-slate-500' };
const urgColors: Record<string, string> = { critical: 'border-l-red-500 bg-red-900/20', high: 'border-l-orange-500 bg-orange-900/20', medium: 'border-l-yellow-500 bg-yellow-900/20', low: 'border-l-slate-500 bg-slate-800' };
const actIcons: Record<string, string> = { classify: '⚖️', generate: '📄', assess: '✅', approve: '✔️', create: '➕', update: '✏️', submit: '📤', export: '📦', login: '🔑', assign: '👤', delete: '🗑️' };
const sevColors: Record<string, string> = { critical: 'bg-red-600', high: 'bg-orange-600', medium: 'bg-yellow-600 text-black', low: 'bg-slate-600' };

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins + 'm ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h ago';
  return Math.floor(hrs / 24) + 'd ago';
}

export default function DashboardOverview() {
  const riskTotal = Object.values(metrics.systemsByRisk).reduce((a, b) => a + b, 0);
  return (
    <div className="space-y-6">
      {/* Header with notifications */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Compliance Dashboard</h2>
          <p className="text-slate-400 mt-1">Enterprise AI governance overview — {metrics.totalSystems} systems across {aiSystems.reduce((s, a) => { a.geographicScope.forEach(g => s.add(g)); return s; }, new Set<string>()).size} jurisdictions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="p-2 bg-slate-800 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-700">🔔</button>
            {unreadNotifs.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center text-white font-bold">{unreadNotifs.length}</span>}
          </div>
          <div className="text-right">
            <div className="text-sm text-white font-medium">Sarah Chen</div>
            <div className="text-xs text-slate-400">Compliance Officer</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">SC</div>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {unreadNotifs.filter(n => n.severity === 'critical').length > 0 && (
        <div className="bg-red-900/40 border border-red-700 rounded-lg p-4 flex items-start gap-3">
          <span className="text-red-400 text-xl">⚠️</span>
          <div className="flex-1">
            <div className="text-red-300 font-semibold text-sm">{unreadNotifs.filter(n => n.severity === 'critical').length} Critical Alerts Require Attention</div>
            {unreadNotifs.filter(n => n.severity === 'critical').map(n => (
              <div key={n.id} className="text-red-400/80 text-xs mt-1">• {n.title}: {n.message}</div>
            ))}
          </div>
          <button className="text-red-400 text-xs hover:text-red-300 whitespace-nowrap">View All →</button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-3">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-1">Total AI Systems</div>
          <div className="text-2xl font-bold text-white">{metrics.totalSystems}</div>
          <div className="text-xs text-green-400 mt-1">+2 this quarter</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-1">High Risk Systems</div>
          <div className="text-2xl font-bold text-orange-400">{metrics.systemsByRisk.high}</div>
          <div className="text-xs text-slate-500 mt-1">{Math.round(metrics.systemsByRisk.high / metrics.totalSystems * 100)}% of portfolio</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-1">Compliance Score</div>
          <div className="text-2xl font-bold text-white">{metrics.overallComplianceScore}%</div>
          <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2"><div className={`h-1.5 rounded-full ${metrics.overallComplianceScore >= 80 ? 'bg-green-500' : metrics.overallComplianceScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${metrics.overallComplianceScore}%`}}></div></div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-1">Docs Complete</div>
          <div className="text-2xl font-bold text-white">{metrics.documentsComplete}<span className="text-sm text-slate-500">/{metrics.documentsTotal}</span></div>
          <div className="text-xs text-slate-500 mt-1">{Math.round(metrics.documentsComplete / metrics.documentsTotal * 100)}% Annex IV ready</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-1">Assessments Passed</div>
          <div className="text-2xl font-bold text-white">{metrics.assessmentsPassed}<span className="text-sm text-slate-500">/{metrics.assessmentsTotal}</span></div>
          <div className="text-xs text-slate-500 mt-1">{Math.round(metrics.assessmentsPassed / metrics.assessmentsTotal * 100)}% conformant</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-red-700/50">
          <div className="text-xs text-slate-400 mb-1">EU AI Act</div>
          <div className="text-2xl font-bold text-red-400">164<span className="text-sm text-slate-500"> days</span></div>
          <div className="text-xs text-red-400/70 mt-1">Aug 2, 2026</div>
        </div>
      </div>

      {/* Risk Distribution + Compliance Trend */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-white mb-4">Risk Distribution</h3>
          <div className="space-y-3">
            {(['high', 'limited', 'minimal'] as const).map(tier => {
              const count = metrics.systemsByRisk[tier];
              const pct = Math.round(count / riskTotal * 100);
              return (
                <div key={tier}>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-300 capitalize">{tier} Risk</span><span className="text-slate-400">{count} ({pct}%)</span></div>
                  <div className="w-full bg-slate-700 rounded-full h-2"><div className={`h-2 rounded-full ${riskColors[tier]}`} style={{width: `${pct}%`}}></div></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-white mb-4">Compliance Status</h3>
          <div className="space-y-3">
            {Object.entries(metrics.systemsByCompliance).filter(([,v]) => v > 0).map(([status, count]) => {
              const pct = Math.round((count as number) / metrics.totalSystems * 100);
              return (
                <div key={status}>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-300 capitalize">{status.replace('-', ' ')}</span><span className="text-slate-400">{count as number} ({pct}%)</span></div>
                  <div className="w-full bg-slate-700 rounded-full h-2"><div className={`h-2 rounded-full ${compColors[status] || 'bg-slate-500'}`} style={{width: `${pct}%`}}></div></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-white mb-4">Compliance Trend (6mo)</h3>
          <div className="flex items-end gap-1 h-32">
            {metrics.complianceTrend.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs text-slate-400">{d.score}%</div>
                <div className="w-full bg-blue-600/80 rounded-t" style={{height: `${d.score * 1.5}px`}}></div>
                <div className="text-[9px] text-slate-500 truncate w-full text-center">{d.month.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Systems Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">AI Systems Portfolio</h3>
          <div className="flex gap-2">
            <input placeholder="Search systems..." className="px-3 py-1.5 bg-slate-750 border border-slate-600 rounded text-xs text-white placeholder-slate-500 w-48" />
            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">+ Register System</button>
          </div>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-slate-700 bg-slate-750/50">
            <th className="text-left p-3 text-xs text-slate-400 font-medium">System</th>
            <th className="text-left p-3 text-xs text-slate-400 font-medium">Department</th>
            <th className="text-left p-3 text-xs text-slate-400 font-medium">Risk</th>
            <th className="text-left p-3 text-xs text-slate-400 font-medium">Score</th>
            <th className="text-left p-3 text-xs text-slate-400 font-medium">Compliance</th>
            <th className="text-left p-3 text-xs text-slate-400 font-medium">Owner</th>
            <th className="text-left p-3 text-xs text-slate-400 font-medium">Last Assessed</th>
          </tr></thead>
          <tbody>{aiSystems.map(s => (
            <tr key={s.id} className="border-b border-slate-700/50 hover:bg-slate-750/50 cursor-pointer">
              <td className="p-3"><div className="text-sm text-white font-medium">{s.name}</div><div className="text-xs text-slate-500">{s.vendor} · v{s.version}</div></td>
              <td className="p-3 text-xs text-slate-400">{s.department}</td>
              <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${s.riskTier === 'high' ? 'bg-orange-600' : s.riskTier === 'limited' ? 'bg-yellow-600 text-black' : s.riskTier === 'minimal' ? 'bg-green-600' : 'bg-red-600'}`}>{s.riskTier.toUpperCase()}</span></td>
              <td className="p-3"><div className="flex items-center gap-2"><div className="w-12 bg-slate-700 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${s.riskScore > 80 ? 'bg-red-500' : s.riskScore > 50 ? 'bg-orange-500' : 'bg-green-500'}`} style={{width: `${s.riskScore}%`}}></div></div><span className="text-xs text-slate-400">{s.riskScore}</span></div></td>
              <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${s.complianceStatus === 'compliant' ? 'bg-green-900 text-green-300' : s.complianceStatus === 'partial' ? 'bg-yellow-900 text-yellow-300' : s.complianceStatus === 'non-compliant' ? 'bg-red-900 text-red-300' : 'bg-blue-900 text-blue-300'}`}>{s.complianceStatus.replace('-', ' ').toUpperCase()}</span></td>
              <td className="p-3 text-xs text-slate-400">{s.owner}</td>
              <td className="p-3 text-xs text-slate-500">{s.lastAssessmentDate || 'Never'}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {/* Bottom Row: Deadlines + Activity */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-white mb-3">Upcoming Compliance Deadlines</h3>
          <div className="space-y-2">
            {metrics.upcomingDeadlines.slice(0, 5).map(d => (
              <div key={d.id} className={`p-3 rounded border-l-4 ${urgColors[d.urgency]}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1"><div className="text-sm text-white">{d.description}</div><div className="text-xs text-slate-500 mt-0.5">{d.date} · {d.regulation} · {d.assignee}</div></div>
                  {d.status === 'overdue' && <span className="px-2 py-0.5 bg-red-600 rounded text-xs font-bold animate-pulse">OVERDUE</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-white mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {metrics.recentActivity.slice(0, 6).map(a => (
              <div key={a.id} className="flex items-start gap-3 p-2 rounded hover:bg-slate-750">
                <span className="text-lg">{actIcons[a.action] || '📋'}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white">{a.details}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{a.userName} · {timeAgo(a.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
