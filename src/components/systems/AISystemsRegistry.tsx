'use client';
export default function AISystemsRegistry() {
  const systems = [
    { name: 'Resume Screening AI', vendor: 'Internal', dept: 'HR', risk: 'HIGH', deployed: '2024-03-15', scope: 'EU, US' },
    { name: 'Customer Chatbot', vendor: 'OpenAI', dept: 'Support', risk: 'LIMITED', deployed: '2024-06-01', scope: 'EU, US' },
    { name: 'Credit Scoring Model', vendor: 'Internal', dept: 'Finance', risk: 'HIGH', deployed: '2023-11-20', scope: 'EU' },
    { name: 'Fraud Detection', vendor: 'Featurespace', dept: 'Security', risk: 'HIGH', deployed: '2024-01-10', scope: 'EU, US' },
  ];
  const riskBg: Record<string,string> = { HIGH: 'bg-orange-600', LIMITED: 'bg-yellow-600 text-black', MINIMAL: 'bg-green-600' };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><div><h2 className="text-2xl font-bold text-white">AI Systems Registry</h2><p className="text-slate-400 mt-1">Inventory of all AI systems across your organization</p></div><button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">+ Add System</button></div>
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700"><th className="text-left p-3 text-xs text-slate-400">System</th><th className="text-left p-3 text-xs text-slate-400">Vendor</th><th className="text-left p-3 text-xs text-slate-400">Department</th><th className="text-left p-3 text-xs text-slate-400">Risk Tier</th><th className="text-left p-3 text-xs text-slate-400">Deployed</th><th className="text-left p-3 text-xs text-slate-400">Scope</th></tr></thead>
          <tbody>{systems.map((s,i) => (
            <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-750"><td className="p-3 text-sm text-white font-medium">{s.name}</td><td className="p-3 text-sm text-slate-400">{s.vendor}</td><td className="p-3 text-sm text-slate-400">{s.dept}</td><td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${riskBg[s.risk]}`}>{s.risk}</span></td><td className="p-3 text-sm text-slate-400">{s.deployed}</td><td className="p-3 text-sm text-slate-400">{s.scope}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
