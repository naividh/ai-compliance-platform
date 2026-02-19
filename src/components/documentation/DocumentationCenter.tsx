'use client';
export default function DocumentationCenter() {
  const docs = [
    { title: 'Resume Screening AI - Annex IV', reg: 'EU AI Act', status: 'in-progress', pct: 45 },
    { title: 'Credit Scoring Model - Annex IV', reg: 'EU AI Act', status: 'draft', pct: 15 },
    { title: 'Customer Chatbot - Transparency', reg: 'EU AI Act', status: 'complete', pct: 100 },
    { title: 'Fraud Detection - Impact Assessment', reg: 'Colorado AI Act', status: 'review', pct: 85 },
  ];
  const stColors: Record<string,string> = { draft:'bg-slate-600', 'in-progress':'bg-blue-600', review:'bg-purple-600', complete:'bg-green-600' };
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-white">Documentation Center</h2><p className="text-slate-400 mt-1">Auto-generate Annex IV technical documentation and compliance reports</p></div>
      <div className="grid grid-cols-2 gap-4">{docs.map((d,i) => (
        <div key={i} className="p-5 rounded-lg border border-slate-700 bg-slate-800">
          <div className="flex justify-between mb-2"><h3 className="font-semibold text-white text-sm">{d.title}</h3><span className={`px-2 py-0.5 rounded text-xs ${stColors[d.status]}`}>{d.status.toUpperCase()}</span></div>
          <p className="text-xs text-slate-500 mb-3">{d.reg}</p>
          <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Progress</span><span>{d.pct}%</span></div>
          <div className="w-full bg-slate-700 rounded-full h-2"><div className={`h-2 rounded-full ${d.pct===100?'bg-green-500':d.pct>50?'bg-blue-500':'bg-orange-500'}`} style={{width:`${d.pct}%`}}></div></div>
        </div>
      ))}</div>
    </div>
  );
}
