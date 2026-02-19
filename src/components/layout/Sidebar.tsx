'use client';
import { useAppStore } from '@/lib/store';

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'systems', label: 'AI Systems', icon: '🤖' },
  { id: 'classification', label: 'Risk Classification', icon: '⚡' },
  { id: 'documents', label: 'Documentation', icon: '📄' },
  { id: 'assessments', label: 'Assessments', icon: '✅' },
  { id: 'regulations', label: 'Regulations', icon: '⚖️' },
  { id: 'audit-log', label: 'Audit Log', icon: '📋' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export function Sidebar() {
  const { activeView, setActiveView, sidebarCollapsed, setSidebarCollapsed, metrics } = useAppStore();
  const daysLeft = metrics.upcomingDeadlines[0]?.daysRemaining ?? 0;

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 flex flex-col z-50 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-white truncate">AI Compliance</h1>
            <p className="text-[10px] text-slate-400">Enterprise Platform</p>
          </div>
        )}
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="ml-auto text-slate-400 hover:text-white p-1">
          {sidebarCollapsed ? '→' : '←'}
        </button>
      </div>

      {!sidebarCollapsed && (
        <div className="mx-3 mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-red-400">EU AI Act Deadline</span>
          </div>
          <p className="text-lg font-bold text-white">{daysLeft} days</p>
          <p className="text-[10px] text-slate-400">Aug 2, 2026 — High-risk provisions</p>
          <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ width: `${Math.max(5, 100 - (daysLeft / 365 * 100))}%` }} />
          </div>
        </div>
      )}

      <nav className="flex-1 py-3 overflow-y-auto scrollbar-thin">
        {nav.map(item => (
          <button key={item.id} onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${activeView === item.id ? 'bg-blue-500/15 text-blue-400 border-r-2 border-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
            <span className="text-base flex-shrink-0">{item.icon}</span>
            {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
            {!sidebarCollapsed && item.id === 'assessments' && (
              <span className="ml-auto bg-orange-500/20 text-orange-400 text-[10px] px-1.5 py-0.5 rounded-full">{metrics.pendingAssessments}</span>
            )}
          </button>
        ))}
      </nav>

      {!sidebarCollapsed && (
        <div className="p-3 border-t border-slate-700/50">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">SC</div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">Sarah Chen</p>
              <p className="text-[10px] text-slate-400">Chief AI Officer</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
