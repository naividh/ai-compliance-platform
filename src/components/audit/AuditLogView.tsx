'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';

const actionIcons: Record<string, string> = { LOGIN: '🔑', UPDATE: '✏️', APPROVE: '✅', GENERATE_DOC: '📄', CLASSIFY: '⚡', ASSESS: '📋', EXPORT: '📥', CREATE: '➕', DELETE: '🗑️', REJECT: '❌', PERMISSION_CHANGE: '🔒' };

export function AuditLogView() {
  const { auditLog } = useAppStore();
  const [filterAction, setFilterAction] = useState('all');
  const actions = ['all', ...new Set(auditLog.map(e => e.action))];
  const filtered = filterAction === 'all' ? auditLog : auditLog.filter(e => e.action === filterAction);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex gap-1 flex-wrap">
          {actions.map(a => (
            <button key={a} onClick={() => setFilterAction(a)} className={`text-[10px] px-2.5 py-1 rounded-lg transition-all ${filterAction === a ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white bg-slate-800/50'}`}>
              {a === 'all' ? 'All Actions' : a.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <span className="text-[10px] text-slate-400">{filtered.length} entries</span>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-slate-400 border-b border-slate-700/50">
              <th className="text-left p-3 font-medium">Timestamp</th>
              <th className="text-left p-3 font-medium">User</th>
              <th className="text-left p-3 font-medium">Action</th>
              <th className="text-left p-3 font-medium">Resource</th>
              <th className="text-left p-3 font-medium">Details</th>
              <th className="text-left p-3 font-medium">IP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                <td className="p-3 text-[10px] text-slate-400 whitespace-nowrap">{new Date(e.timestamp).toLocaleString()}</td>
                <td className="p-3"><span className="text-xs text-white">{e.userName}</span></td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300">
                    {actionIcons[e.action] || '📋'} {e.action}
                  </span>
                </td>
                <td className="p-3 text-[10px] text-slate-300">{e.resource} <span className="text-slate-500">({e.resourceId})</span></td>
                <td className="p-3 text-[10px] text-slate-400 max-w-xs truncate">{e.details}</td>
                <td className="p-3 text-[10px] text-slate-500 font-mono">{e.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
