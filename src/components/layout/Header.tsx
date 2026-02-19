'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export function Header() {
  const { activeView, searchQuery, setSearchQuery, notifications, markNotificationRead } = useAppStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = notifications.filter(n => !n.read).length;
  const titles: Record<string, string> = {
    dashboard: 'Compliance Dashboard', systems: 'AI Systems Registry', classification: 'Risk Classification Engine',
    documents: 'Documentation Center', assessments: 'Conformity Assessments', regulations: 'Regulation Tracker',
    'audit-log': 'Audit Log', settings: 'Platform Settings'
  };

  return (
    <header className="h-14 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl flex items-center px-6 gap-4 flex-shrink-0">
      <h2 className="text-base font-semibold text-white">{titles[activeView] || 'Dashboard'}</h2>
      <div className="flex-1" />
      <div className="relative">
        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search systems, regulations..." className="w-64 h-8 pl-8 pr-3 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
      </div>
      <div className="relative">
        <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <span className="text-base">🔔</span>
          {unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">{unread}</span>}
        </button>
        {showNotifs && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto scrollbar-thin">
            <div className="p-3 border-b border-slate-700 flex justify-between items-center">
              <span className="text-sm font-semibold text-white">Notifications</span>
              <span className="text-[10px] text-slate-400">{unread} unread</span>
            </div>
            {notifications.slice(0, 5).map(n => (
              <div key={n.id} onClick={() => markNotificationRead(n.id)}
                className={`p-3 border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/30 transition-colors ${!n.read ? 'bg-blue-500/5' : ''}`}>
                <div className="flex items-start gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.priority === 'CRITICAL' ? 'bg-red-500' : n.priority === 'HIGH' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                  <div>
                    <p className="text-xs font-medium text-white">{n.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-6 w-px bg-slate-700" />
      <div className="flex items-center gap-2">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">ENTERPRISE</span>
      </div>
    </header>
  );
}
