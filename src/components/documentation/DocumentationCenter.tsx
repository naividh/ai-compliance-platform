'use client';

import { useState } from 'react';

interface DocumentTemplate {
    id: string;
    title: string;
    regulation: string;
    annexReference: string;
    description: string;
    sections: string[];
    status: 'draft' | 'in-progress' | 'review' | 'complete';
    lastUpdated: string;
    completionPercent: number;
    assignee: string;
}

const templates: DocumentTemplate[] = [
  {
        id: 'doc-001',
        title: 'Technical Documentation — Resume Screening AI',
        regulation: 'EU AI Act',
        annexReference: 'Annex IV',
        description: 'Complete technical documentation package per Annex IV requirements for high-risk AI system used in recruitment',
        sections: [
                '1. General description of the AI system',
                '2. Detailed description of elements and development process',
                '3. Monitoring, functioning and control of the AI system',
                '4. Risk management system (Article 9)',
                '5. Data governance measures (Article 10)',
                '6. Human oversight measures (Article 14)',
                '7. Accuracy, robustness and cybersecurity (Article 15)',
                '8. Quality management system description',
                '9. Detailed description of changes through lifecycle',
                '10. List of harmonised standards applied',
                '11. Copy of EU declaration of conformity',
                '12. Post-market monitoring plan',
              ],
        status: 'in-progress',
        lastUpdated: '2026-02-15',
        completionPercent: 45,
        assignee: 'Sarah Chen',
  },
  {
        id: 'doc-002',
        title: 'Technical Documentation — Credit Scoring Model',
        regulation: 'EU AI Act',
        annexReference: 'Annex IV',
        description: 'Annex IV documentation for ML credit scoring system deployed in EU markets',
        sections: [
                '1. General description of the AI system',
                '2. Detailed description of elements and development process',
                '3. Monitoring, functioning and control of the AI system',
                '4. Risk management system (Article 9)',
                '5. Data governance measures (Article 10)',
                '6. Human oversight measures (Article 14)',
                '7. Accuracy, robustness and cybersecurity (Article 15)',
                '8. Quality management system description',
              ],
        status: 'draft',
        lastUpdated: '2026-02-10',
        completionPercent: 15,
        assignee: 'Marcus Johnson',
  },
  {
        id: 'doc-003',
        title: 'Transparency Report — Customer Chatbot',
        regulation: 'EU AI Act',
        annexReference: 'Article 52',
        description: 'Transparency obligations documentation for limited-risk AI chatbot system',
        sections: [
                '1. AI system identification and disclosure',
                '2. User notification mechanisms',
                '3. Content labeling procedures',
                '4. Human interaction disclosure',
              ],
        status: 'complete',
        lastUpdated: '2026-01-28',
        completionPercent: 100,
        assignee: 'Emily Park',
  },
  {
        id: 'doc-004',
        title: 'Impact Assessment — Fraud Detection System',
        regulation: 'Colorado AI Act',
        annexReference: 'SB 21-169',
        description: 'Algorithmic impact assessment required under Colorado AI Act for consequential decisions',
        sections: [
                '1. System purpose and intended use',
                '2. Data inputs and training methodology',
                '3. Bias testing results and mitigation',
                '4. Consumer notification procedures',
                '5. Opt-out mechanisms',
                '6. Human review processes',
              ],
        status: 'review',
        lastUpdated: '2026-02-12',
        completionPercent: 85,
        assignee: 'David Kim',
  },
  ];

const statusColors: Record<string, string> = {
    draft: 'bg-slate-600 text-slate-200',
    'in-progress': 'bg-blue-600 text-blue-100',
    review: 'bg-purple-600 text-purple-100',
    complete: 'bg-green-600 text-green-100',
};

export default function DocumentationCenter() {
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
    const [generatingDoc, setGeneratingDoc] = useState<string | null>(null);

  const selected = templates.find((t) => t.id === selectedDoc);

  const handleGenerate = (docId: string) => {
        setGeneratingDoc(docId);
        setTimeout(() => setGeneratingDoc(null), 3000);
  };

  return (
        <div className="space-y-6">
              <div className="flex items-center justify-between">
                      <div>
                                <h2 className="text-2xl font-bold text-white">Documentation Center</h2>h2>
                                <p className="text-slate-400 mt-1">
                                            Auto-generate Annex IV technical documentation &amp; compliance reports
                                </p>p>
                      </div>div>
                      <div className="flex gap-3">
                                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                                            Import Artifacts
                                </button>button>
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                            + New Document
                                </button>button>
                      </div>div>
              </div>div>
        
          {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4">
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-3xl font-bold text-white">{templates.length}</div>div>
                                <div className="text-sm text-slate-400">Total Documents</div>div>
                      </div>div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-3xl font-bold text-green-400">{templates.filter(t => t.status === 'complete').length}</div>div>
                                <div className="text-sm text-slate-400">Complete</div>div>
                      </div>div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-3xl font-bold text-blue-400">{templates.filter(t => t.status === 'in-progress').length}</div>div>
                                <div className="text-sm text-slate-400">In Progress</div>div>
                      </div>div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-3xl font-bold text-orange-400">
                                  {Math.round(templates.reduce((sum, t) => sum + t.completionPercent, 0) / templates.length)}%
                                </div>div>
                                <div className="text-sm text-slate-400">Avg. Completion</div>div>
                      </div>div>
              </div>div>
        
          {/* Document Grid */}
              <div className="grid grid-cols-2 gap-4">
                {templates.map((doc) => (
                    <div
                                  key={doc.id}
                                  onClick={() => setSelectedDoc(doc.id)}
                                  className={`p-5 rounded-lg border cursor-pointer transition-all ${
                                                  selectedDoc === doc.id
                                                    ? 'border-blue-500 bg-slate-700'
                                                    : 'border-slate-700 bg-slate-800 hover:border-slate-500'
                                  }`}
                                >
                                <div className="flex items-start justify-between mb-3">
                                              <div className="flex-1">
                                                              <h3 className="font-semibold text-white text-sm">{doc.title}</h3>h3>
                                                              <div className="flex items-center gap-2 mt-1">
                                                                                <span className="text-xs text-slate-500">{doc.regulation}</span>span>
                                                                                <span className="text-xs text-slate-600">|</span>span>
                                                                                <span className="text-xs text-slate-500">{doc.annexReference}</span>span>
                                                              </div>div>
                                              </div>div>
                                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[doc.status]}`}>
                                                {doc.status.replace('-', ' ').toUpperCase()}
                                              </span>span>
                                </div>div>
                                <p className="text-xs text-slate-400 mb-3">{doc.description}</p>p>
                                <div className="mb-2">
                                              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                                                              <span>Progress</span>span>
                                                              <span>{doc.completionPercent}%</span>span>
                                              </div>div>
                                              <div className="w-full bg-slate-700 rounded-full h-2">
                                                              <div
                                                                                  className={`h-2 rounded-full transition-all ${
                                                                                                        doc.completionPercent === 100 ? 'bg-green-500' :
                                                                                                        doc.completionPercent > 50 ? 'bg-blue-500' : 'bg-orange-500'
                                                                                    }`}
                                                                                  style={{ width: `${doc.completionPercent}%` }}
                                                                                />
                                              </div>div>
                                </div>div>
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                              <span>Assignee: {doc.assignee}</span>span>
                                              <span>Updated: {doc.lastUpdated}</span>span>
                                </div>div>
                    </div>div>
                  ))}
              </div>div>
        
          {/* Selected Document Detail */}
          {selected && (
                  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">{selected.title}</h3>h3>
                                        <div className="flex gap-2">
                                                      <button
                                                                        onClick={() => handleGenerate(selected.id)}
                                                                        disabled={generatingDoc === selected.id}
                                                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors text-sm"
                                                                      >
                                                        {generatingDoc === selected.id ? '⏳ Generating...' : '🤖 Auto-Generate'}
                                                      </button>button>
                                                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                                                                      📥 Export PDF
                                                      </button>button>
                                        </div>div>
                            </div>div>
                            <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-slate-300">Document Sections</h4>h4>
                              {selected.sections.map((section, i) => {
                                  const isComplete = (i / selected.sections.length) * 100 < selected.completionPercent;
                                  return (
                                                    <div
                                                                        key={i}
                                                                        className={`flex items-center gap-3 p-3 rounded border ${
                                                                                              isComplete
                                                                                                ? 'bg-green-900/20 border-green-800 text-green-300'
                                                                                                : 'bg-slate-750 border-slate-600 text-slate-400'
                                                                        }`}
                                                                      >
                                                                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                                                                            isComplete ? 'bg-green-600 text-white' : 'bg-slate-600 text-slate-400'
                                                                      }`}>
                                                                        {isComplete ? '✓' : (i + 1)}
                                                                      </span>span>
                                                                      <span className="text-sm">{section}</span>span>
                                                    </div>div>
                                                  );
                  })}
                            </div>div>
                  </div>div>
              )}
        </div>div>
      );
}</div>
