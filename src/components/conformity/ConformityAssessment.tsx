'use client';

import { useState } from 'react';

interface AssessmentItem {
    id: string;
    requirement: string;
    article: string;
    category: string;
    status: 'passed' | 'failed' | 'pending' | 'not-applicable';
    evidence: string[];
    notes: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
}

interface ConformityPackage {
    id: string;
    systemName: string;
    assessmentDate: string;
    assessor: string;
    overallStatus: 'conformant' | 'non-conformant' | 'in-progress';
    items: AssessmentItem[];
}

const samplePackage: ConformityPackage = {
    id: 'ca-001',
    systemName: 'Resume Screening AI',
    assessmentDate: '2026-02-15',
    assessor: 'Internal Compliance Team',
    overallStatus: 'in-progress',
    items: [
      {
              id: 'req-001',
              requirement: 'Risk Management System',
              article: 'Article 9',
              category: 'Risk Management',
              status: 'passed',
              evidence: ['risk-assessment-v3.pdf', 'risk-matrix-2026.xlsx', 'mitigation-plan.docx'],
              notes: 'Comprehensive risk management system implemented with continuous monitoring',
              priority: 'critical',
      },
      {
              id: 'req-002',
              requirement: 'Data Governance',
              article: 'Article 10',
              category: 'Data & Training',
              status: 'passed',
              evidence: ['data-governance-policy.pdf', 'training-data-audit.xlsx', 'bias-assessment.pdf'],
              notes: 'Training data quality measures in place. Bias testing conducted quarterly.',
              priority: 'critical',
      },
      {
              id: 'req-003',
              requirement: 'Technical Documentation',
              article: 'Article 11 / Annex IV',
              category: 'Documentation',
              status: 'pending',
              evidence: ['annex-iv-draft-v2.pdf'],
              notes: 'Documentation 45% complete. Sections on monitoring and cybersecurity still needed.',
              priority: 'critical',
      },
      {
              id: 'req-004',
              requirement: 'Record-keeping / Logging',
              article: 'Article 12',
              category: 'Transparency',
              status: 'passed',
              evidence: ['logging-architecture.pdf', 'audit-trail-config.yaml'],
              notes: 'Automatic logging enabled for all decisions with 5-year retention.',
              priority: 'high',
      },
      {
              id: 'req-005',
              requirement: 'Transparency & Information to Deployers',
              article: 'Article 13',
              category: 'Transparency',
              status: 'passed',
              evidence: ['deployer-instructions.pdf', 'system-card.md'],
              notes: 'Instructions for use and system limitations documented and provided.',
              priority: 'high',
      },
      {
              id: 'req-006',
              requirement: 'Human Oversight',
              article: 'Article 14',
              category: 'Oversight',
              status: 'pending',
              evidence: ['oversight-procedure-draft.pdf'],
              notes: 'Human-in-the-loop process defined but not yet validated in production.',
              priority: 'critical',
      },
      {
              id: 'req-007',
              requirement: 'Accuracy, Robustness, Cybersecurity',
              article: 'Article 15',
              category: 'Technical',
              status: 'failed',
              evidence: ['accuracy-report-q4.pdf'],
              notes: 'Robustness testing incomplete. Adversarial testing not yet conducted. Cybersecurity assessment overdue.',
              priority: 'critical',
      },
      {
              id: 'req-008',
              requirement: 'Quality Management System',
              article: 'Article 17',
              category: 'Governance',
              status: 'passed',
              evidence: ['qms-manual-v2.pdf', 'iso-27001-cert.pdf'],
              notes: 'QMS aligned with ISO standards. Internal audit completed January 2026.',
              priority: 'high',
      },
      {
              id: 'req-009',
              requirement: 'Corrective Actions',
              article: 'Article 20',
              category: 'Post-Market',
              status: 'pending',
              evidence: [],
              notes: 'Corrective action procedure drafted but incident response plan needs testing.',
              priority: 'medium',
      },
      {
              id: 'req-010',
              requirement: 'Post-Market Monitoring',
              article: 'Article 72',
              category: 'Post-Market',
              status: 'pending',
              evidence: ['monitoring-plan-draft.pdf'],
              notes: 'Post-market monitoring plan in draft. Needs integration with production observability stack.',
              priority: 'high',
      },
        ],
};

const statusIcons: Record<string, string> = {
    passed: '✅',
    failed: '❌',
    pending: '⏳',
    'not-applicable': '➖',
};

const statusColors: Record<string, string> = {
    passed: 'text-green-400',
    failed: 'text-red-400',
    pending: 'text-yellow-400',
    'not-applicable': 'text-slate-500',
};

const priorityColors: Record<string, string> = {
    critical: 'bg-red-600',
    high: 'bg-orange-600',
    medium: 'bg-yellow-600 text-black',
    low: 'bg-slate-600',
};

export default function ConformityAssessment() {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>('all');

  const pkg = samplePackage;
    const categories = [...new Set(pkg.items.map((i) => i.category))];
    const filteredItems = filterCategory === 'all'
      ? pkg.items
          : pkg.items.filter((i) => i.category === filterCategory);

  const passed = pkg.items.filter((i) => i.status === 'passed').length;
    const failed = pkg.items.filter((i) => i.status === 'failed').length;
    const pending = pkg.items.filter((i) => i.status === 'pending').length;
    const total = pkg.items.length;
    const conformityScore = Math.round((passed / total) * 100);

  const selected = pkg.items.find((i) => i.id === selectedItem);

  return (
        <div className="space-y-6">
              <div className="flex items-center justify-between">
                      <div>
                                <h2 className="text-2xl font-bold text-white">Conformity Assessment</h2>h2>
                                <p className="text-slate-400 mt-1">
                                            Audit-ready conformity evidence packages per EU AI Act Articles 43 &amp; 49
                                </p>p>
                      </div>div>
                      <div className="flex gap-3">
                                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                                            📋 Export Evidence Package
                                </button>button>
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                            + New Assessment
                                </button>button>
                      </div>div>
              </div>div>
        
          {/* System Info Bar */}
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center justify-between">
                      <div>
                                <span className="text-white font-semibold">{pkg.systemName}</span>span>
                                <span className="text-slate-500 ml-3">Assessment Date: {pkg.assessmentDate}</span>span>
                                <span className="text-slate-500 ml-3">Assessor: {pkg.assessor}</span>span>
                      </div>div>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    pkg.overallStatus === 'conformant' ? 'bg-green-600' :
                    pkg.overallStatus === 'non-conformant' ? 'bg-red-600' : 'bg-yellow-600 text-black'
        }`}>
                        {pkg.overallStatus.toUpperCase()}
                      </span>span>
              </div>div>
        
          {/* Score Overview */}
              <div className="grid grid-cols-5 gap-4">
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-3xl font-bold text-white">{conformityScore}%</div>div>
                                <div className="text-sm text-slate-400">Conformity Score</div>div>
                      </div>div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-3xl font-bold text-green-400">{passed}</div>div>
                                <div className="text-sm text-slate-400">Passed</div>div>
                      </div>div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-3xl font-bold text-red-400">{failed}</div>div>
                                <div className="text-sm text-slate-400">Failed</div>div>
                      </div>div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-3xl font-bold text-yellow-400">{pending}</div>div>
                                <div className="text-sm text-slate-400">Pending</div>div>
                      </div>div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-3xl font-bold text-white">{total}</div>div>
                                <div className="text-sm text-slate-400">Total Requirements</div>div>
                      </div>div>
              </div>div>
        
          {/* Category Filter */}
              <div className="flex gap-2">
                      <button
                                  onClick={() => setFilterCategory('all')}
                                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                                filterCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                  }`}
                                >
                                All
                      </button>button>
                {categories.map((cat) => (
                    <button
                                  key={cat}
                                  onClick={() => setFilterCategory(cat)}
                                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                                  filterCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                  }`}
                                >
                      {cat}
                    </button>button>
                  ))}
              </div>div>
        
          {/* Requirements Table */}
              <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                      <table className="w-full">
                                <thead>
                                            <tr className="border-b border-slate-700">
                                                          <th className="text-left p-3 text-xs text-slate-400 font-medium">Status</th>th>
                                                          <th className="text-left p-3 text-xs text-slate-400 font-medium">Requirement</th>th>
                                                          <th className="text-left p-3 text-xs text-slate-400 font-medium">Article</th>th>
                                                          <th className="text-left p-3 text-xs text-slate-400 font-medium">Category</th>th>
                                                          <th className="text-left p-3 text-xs text-slate-400 font-medium">Priority</th>th>
                                                          <th className="text-left p-3 text-xs text-slate-400 font-medium">Evidence</th>th>
                                            </tr>tr>
                                </thead>thead>
                                <tbody>
                                  {filteredItems.map((item) => (
                        <tr
                                          key={item.id}
                                          onClick={() => setSelectedItem(item.id)}
                                          className={`border-b border-slate-700/50 cursor-pointer transition-colors ${
                                                              selectedItem === item.id ? 'bg-slate-700' : 'hover:bg-slate-750'
                                          }`}
                                        >
                                        <td className={`p-3 ${statusColors[item.status]}`}>
                                          {statusIcons[item.status]}
                                        </td>td>
                                        <td className="p-3 text-sm text-white">{item.requirement}</td>td>
                                        <td className="p-3 text-sm text-slate-400">{item.article}</td>td>
                                        <td className="p-3 text-sm text-slate-400">{item.category}</td>td>
                                        <td className="p-3">
                                                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityColors[item.priority]}`}>
                                                            {item.priority.toUpperCase()}
                                                          </span>span>
                                        </td>td>
                                        <td className="p-3 text-sm text-slate-400">{item.evidence.length} files</td>td>
                        </tr>tr>
                      ))}
                                </tbody>tbody>
                      </table>table>
              </div>div>
        
          {/* Selected Item Detail */}
          {selected && (
                  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <div className="flex items-center gap-3 mb-4">
                                        <span className={`text-xl ${statusColors[selected.status]}`}>
                                          {statusIcons[selected.status]}
                                        </span>span>
                                        <div>
                                                      <h3 className="text-lg font-semibold text-white">{selected.requirement}</h3>h3>
                                                      <span className="text-sm text-slate-400">{selected.article}</span>span>
                                        </div>div>
                            </div>div>
                            <div className="mb-4">
                                        <h4 className="text-sm font-medium text-slate-300 mb-2">Assessment Notes</h4>h4>
                                        <p className="text-sm text-slate-400 bg-slate-750 p-3 rounded border border-slate-600">
                                          {selected.notes}
                                        </p>p>
                            </div>div>
                    {selected.evidence.length > 0 && (
                                <div>
                                              <h4 className="text-sm font-medium text-slate-300 mb-2">Evidence Documents</h4>h4>
                                              <div className="flex flex-wrap gap-2">
                                                {selected.evidence.map((file, i) => (
                                                    <span key={i} className="px-3 py-1.5 bg-slate-700 rounded text-xs text-slate-300 border border-slate-600">
                                                                        📄 {file}
                                                    </span>span>
                                                  ))}
                                              </div>div>
                                </div>div>
                            )}
                  </div>div>
              )}
        </div>div>
      );
}</div>
