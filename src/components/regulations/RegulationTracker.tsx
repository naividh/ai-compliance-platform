'use client';
export default function RegulationTracker() {
  const regs = [
    { flag: '🇪🇺', name: 'EU AI Act', status: 'ENACTED', enforcement: '2026-08-02', penalty: 'EUR 35M / 7% revenue', systems: 4 },
    { flag: '🇺🇸', name: 'Colorado AI Act', status: 'ENACTED', enforcement: '2026-02-01', penalty: 'AG enforcement', systems: 2 },
    { flag: '🇺🇸', name: 'NYC LL144', status: 'EFFECTIVE', enforcement: '2023-07-05', penalty: '$1,500/violation/day', systems: 1 },
    { flag: '🇺🇸', name: 'IL AIVI Act', status: 'EFFECTIVE', enforcement: '2020-01-01', penalty: 'Statutory damages', systems: 1 },
    { flag: '🇺🇸', name: 'CA AB 2013', status: 'ENACTED', enforcement: '2026-01-01', penalty: 'AG enforcement', systems: 1 },
  ];
  const stColors: Record<string,string> = { ENACTED: 'bg-blue-600', EFFECTIVE: 'bg-green-600' };
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-white">Regulation Tracker</h2><p className="text-slate-400 mt-1">Multi-jurisdictional AI regulation monitoring</p></div>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700"><div className="text-3xl font-bold text-white">{regs.length}</div><div className="text-sm text-slate-400">Regulations</div></div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700"><div className="text-3xl font-bold text-white">3</div><div className="text-sm text-slate-400">Jurisdictions</div></div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700"><div className="text-3xl font-bold text-red-400">3</div><div className="text-sm text-slate-400">Critical Deadlines</div></div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700"><div className="text-3xl font-bold text-orange-400">164</div><div className="text-sm text-slate-400">Days to EU AI Act</div></div>
      </div>
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700"><th className="text-left p-3 text-xs text-slate-400">Regulation</th><th className="text-left p-3 text-xs text-slate-400">Status</th><th className="text-left p-3 text-xs text-slate-400">Enforcement</th><th className="text-left p-3 text-xs text-slate-400">Penalties</th><th className="text-left p-3 text-xs text-slate-400">Systems</th></tr></thead>
          <tbody>{regs.map((r,i)=>(
            <tr key={i} className="border-b border-slate-700/50"><td className="p-3 text-sm text-white">{r.flag} {r.name}</td><td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${stColors[r.status]}`}>{r.status}</span></td><td className="p-3 text-sm text-slate-400">{r.enforcement}</td><td className="p-3 text-sm text-red-400">{r.penalty}</td><td className="p-3 text-sm text-slate-400">{r.systems}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
