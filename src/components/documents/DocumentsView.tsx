'use client';
import { useAppStore } from '@/lib/store';

const docTypes = ['Annex IV', 'Technical Doc', 'Risk Assessment', 'Conformity Declaration', 'Impact Assessment'];
const statusIcon: Record<string, string> = { APPROVED: '✅', IN_REVIEW: '🔄', DRAFT: '📝', PUBLISHED: '🌐', ARCHIVED: '📦', EXPIRED: '⏰' };
const statusColor: Record<string, string> = { APPROVED: 'text-emerald-400 bg-emerald-500/10', IN_REVIEW: 'text-blue-400 bg-blue-500/10', DRAFT: 'text-slate-400 bg-slate-500/10' };

export function DocumentsView() {
  const { systems } = useAppStore();

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {docTypes.map(dt => {
          const count = systems.length;
          const approved = systems.filter(s => {
            const key = dt === 'Annex IV' ? 'annexIV' : dt === 'Technical Doc' ? 'technicalDoc' : dt === 'Risk Assessment' ? 'riskAssessment' : dt === 'Conformity Declaration' ? 'conformityDeclaration' : 'impactAssessment';
            return s.documentation[key as keyof typeof s.documentation].status === 'APPROVED';
          }).length;
          return (
            <div key={dt} className="glass rounded-xl p-4">
              <p className="text-[10px] text-slate-400 mb-1">{dt}</p>
              <p className="text-lg font-bold text-white">{approved}/{count}</p>
              <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(approved/count)*100}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {systems.map(s => (
        <div key={s.id} className="glass rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-2 h-8 rounded-full ${s.riskClassification.overallTier === 'HIGH' ? 'bg-red-500' : s.riskClassification.overallTier === 'LIMITED' ? 'bg-yellow-500' : 'bg-green-500'}`} />
            <div>
              <h3 className="text-sm font-semibold text-white">{s.name}</h3>
              <p className="text-[10px] text-slate-400">{s.riskClassification.overallTier} Risk • {s.department}</p>
            </div>
            <div className="flex-1" />
            <button className="text-[10px] px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Generate All Docs</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {Object.entries(s.documentation).map(([key, doc]) => (
              <div key={key} className="p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">{statusIcon[doc.status] || '📄'}</span>
                  <span className="text-[10px] font-medium text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${doc.completeness >= 100 ? 'bg-emerald-500' : doc.completeness >= 50 ? 'bg-blue-500' : 'bg-orange-500'}`} style={{ width: `${doc.completeness}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400">{doc.completeness}%</span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${statusColor[doc.status] || 'text-slate-400 bg-slate-500/10'}`}>{doc.status.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
