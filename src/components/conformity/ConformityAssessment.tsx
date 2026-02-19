'use client';
export default function ConformityAssessment() {
  const items = [
    { req: 'Risk Management System', art: 'Article 9', status: 'passed', priority: 'critical', evidence: 3 },
    { req: 'Data Governance', art: 'Article 10', status: 'passed', priority: 'critical', evidence: 3 },
    { req: 'Technical Documentation', art: 'Article 11', status: 'pending', priority: 'critical', evidence: 1 },
    { req: 'Record-keeping', art: 'Article 12', status: 'passed', priority: 'high', evidence: 2 },
    { req: 'Human Oversight', art: 'Article 14', status: 'pending', priority: 'critical', evidence: 1 },
    { req: 'Accuracy & Robustness', art: 'Article 15', status: 'failed', priority: 'critical', evidence: 1 },
    { req: 'Quality Management', art: 'Article 17', status: 'passed', priority: 'high', evidence: 2 },
    { req: 'Post-Market Monitoring', art: 'Article 72', status: 'pending', priority: 'high', evidence: 1 },
  ];
  const icons: Record<string, string> = { passed: '✅', failed: '❌', pending: '⏳' };
  const prioColors: Record<string, string> = { critical: 'bg-red-600', high: 'bg-orange-600', medium: 'bg-yellow-600 text-black' };
  const passed = items.filter(i => i.status === 'passed').length;
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-white">Conformity Assessment</h2><p className="text-slate-400 mt-1">Audit-ready conformity evidence per EU AI Act Articles 43 and 49</p></div>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center"><div className="text-3xl font-bold text-white">{Math.round(passed/items.length*100)}%</div><div className="text-sm text-slate-400">Score</div></div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center"><div className="text-3xl font-bold text-green-400">{passed}</div><div className="text-sm text-slate-400">Passed</div></div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center"><div className="text-3xl font-bold text-red-400">{items.filter(i=>i.status==='failed').length}</div><div className="text-sm text-slate-400">Failed</div></div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center"><div className="text-3xl font-bold text-yellow-400">{items.filter(i=>i.status==='pending').length}</div><div className="text-sm text-slate-400">Pending</div></div>
      </div>
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700"><th className="text-left p-3 text-xs text-slate-400">Status</th><th className="text-left p-3 text-xs text-slate-400">Requirement</th><th className="text-left p-3 text-xs text-slate-400">Article</th><th className="text-left p-3 text-xs text-slate-400">Priority</th><th className="text-left p-3 text-xs text-slate-400">Evidence</th></tr></thead>
          <tbody>{items.map((item, i) => (
            <tr key={i} className="border-b border-slate-700/50"><td className="p-3">{icons[item.status]}</td><td className="p-3 text-sm text-white">{item.req}</td><td className="p-3 text-sm text-slate-400">{item.art}</td><td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${prioColors[item.priority]}`}>{item.priority.toUpperCase()}</span></td><td className="p-3 text-sm text-slate-400">{item.evidence} files</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
