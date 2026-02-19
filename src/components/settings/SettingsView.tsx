'use client';
import { useAppStore } from '@/lib/store';

export function SettingsView() {
  const { user, organization } = useAppStore();

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl">
      <div className="glass rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Organization</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div><span className="text-slate-400">Name:</span> <span className="text-white ml-2">{organization.name}</span></div>
          <div><span className="text-slate-400">Industry:</span> <span className="text-white ml-2">{organization.industry}</span></div>
          <div><span className="text-slate-400">Size:</span> <span className="text-white ml-2">{organization.size.replace(/_/g, ' ')}</span></div>
          <div><span className="text-slate-400">Subscription:</span> <span className="text-emerald-400 ml-2">{organization.subscription.replace(/_/g, ' ')}</span></div>
          <div className="col-span-2"><span className="text-slate-400">Jurisdictions:</span> <span className="text-blue-400 ml-2">{organization.jurisdictions.map(j => j.replace(/_/g, ' ')).join(', ')}</span></div>
        </div>
      </div>
      <div className="glass rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">User Profile</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">SC</div>
          <div>
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div><span className="text-slate-400">Role:</span> <span className="text-white ml-2">{user.role.replace(/_/g, ' ')}</span></div>
          <div><span className="text-slate-400">MFA:</span> <span className={`ml-2 ${user.mfaEnabled ? 'text-emerald-400' : 'text-red-400'}`}>{user.mfaEnabled ? 'Enabled' : 'Disabled'}</span></div>
          <div><span className="text-slate-400">Last Login:</span> <span className="text-white ml-2">{new Date(user.lastLogin).toLocaleString()}</span></div>
        </div>
      </div>
      <div className="glass rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Platform Configuration</h3>
        <div className="space-y-3">
          {[
            { label: 'Auto-classify new AI systems', enabled: true },
            { label: 'Email notifications for deadlines', enabled: true },
            { label: 'Slack integration alerts', enabled: false },
            { label: 'Auto-generate documentation drafts', enabled: true },
            { label: 'Real-time regulation monitoring', enabled: true },
            { label: 'SOC 2 audit trail export', enabled: true },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
              <span className="text-xs text-slate-300">{s.label}</span>
              <div className={`w-9 h-5 rounded-full transition-colors ${s.enabled ? 'bg-blue-500' : 'bg-slate-600'} relative cursor-pointer`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${s.enabled ? 'left-4' : 'left-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">API & Integrations</h3>
        <div className="space-y-2">
          {[{ name: 'AWS SageMaker', status: 'Connected' }, { name: 'Datadog Monitoring', status: 'Connected' }, { name: 'GitHub Actions CI/CD', status: 'Connected' }, { name: 'Jira Project Management', status: 'Not Connected' }, { name: 'ServiceNow ITSM', status: 'Not Connected' }].map((int, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
              <span className={`w-2 h-2 rounded-full ${int.status === 'Connected' ? 'bg-emerald-500' : 'bg-slate-500'}`} />
              <span className="text-xs text-white flex-1">{int.name}</span>
              <span className={`text-[10px] ${int.status === 'Connected' ? 'text-emerald-400' : 'text-slate-400'}`}>{int.status}</span>
              <button className="text-[10px] px-2 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600">{int.status === 'Connected' ? 'Configure' : 'Connect'}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
