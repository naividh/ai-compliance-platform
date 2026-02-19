'use client';
export default function RiskClassificationView() {
  const systems = [
    { name: 'Resume Screening AI', tier: 'HIGH', confidence: 92, domain: 'Employment', article: 'Article 6(2), Annex III(4a)' },
    { name: 'Customer Chatbot', tier: 'LIMITED', confidence: 88, domain: 'Customer Service', article: 'Article 50' },
    { name: 'Credit Scoring Model', tier: 'HIGH', confidence: 95, domain: 'Financial Services', article: 'Article 6(2), Annex III(5b)' },
    { name: 'Fraud Detection', tier: 'HIGH', confidence: 85, domain: 'Financial Services', article: 'Article 6(2), Annex III(5a)' },
  ];
  const tierColors: Record<string, string> = { HIGH: 'bg-orange-600', LIMITED: 'bg-yellow-600 text-black', MINIMAL: 'bg-green-600', UNACCEPTABLE: 'bg-red-600' };
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-white">Risk Classification Engine</h2><p className="text-slate-400 mt-1">Automated risk tier classification per EU AI Act Article 6 and Annex III</p></div>
      <div className="grid grid-cols-4 gap-4">
        {['UNACCEPTABLE', 'HIGH', 'LIMITED', 'MINIMAL'].map(t => (
          <div key={t} className={`p-4 rounded-lg border border-slate-600 ${t === 'UNACCEPTABLE' ? 'bg-red-900' : t === 'HIGH' ? 'bg-orange-900' : t === 'LIMITED' ? 'bg-yellow-900' : 'bg-green-900'}`}>
            <div className="text-3xl font-bold">{systems.filter(s => s.tier === t).length}</div>
            <div className="text-sm opacity-80">{t} Risk</div>
          </div>
        ))}
      </div>
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            <th className="text-left p-3 text-xs text-slate-400">System</th>
            <th className="text-left p-3 text-xs text-slate-400">Risk Tier</th>
            <th className="text-left p-3 text-xs text-slate-400">Confidence</th>
            <th className="text-left p-3 text-xs text-slate-400">Domain</th>
            <th className="text-left p-3 text-xs text-slate-400">EU AI Act Reference</th>
          </tr></thead>
          <tbody>{systems.map((s, i) => (
            <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-750">
              <td className="p-3 text-sm text-white font-medium">{s.name}</td>
              <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${tierColors[s.tier]}`}>{s.tier}</span></td>
              <td className="p-3 text-sm text-slate-300">{s.confidence}%</td>
              <td className="p-3 text-sm text-slate-400">{s.domain}</td>
              <td className="p-3 text-sm text-slate-400">{s.article}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
