'use client';

import { useState } from 'react';
import { RiskClassificationEngine, type AISystemProfile } from '@/lib/risk-classification-engine';

const engine = new RiskClassificationEngine();

const sampleSystems: AISystemProfile[] = [
  {
        id: 'sys-001',
        name: 'Resume Screening AI',
        description: 'Automated CV screening and candidate ranking for recruitment',
        vendor: 'Internal',
        department: 'Human Resources',
        deployers: ['HR Team'],
        aiCapabilities: ['natural-language-processing', 'decision-making', 'profiling'],
        domain: 'employment',
        subDomain: 'recruitment',
        usesPersonalData: true,
        usesBiometricData: false,
        affectsVulnerableGroups: false,
        isAutonomous: false,
        humanOversightLevel: 'human-in-the-loop',
        deploymentDate: '2024-03-15',
        lastAssessmentDate: '2025-01-10',
        dataCategories: ['personal', 'professional', 'educational'],
        outputTypes: ['scores', 'rankings', 'recommendations'],
        intendedPurpose: 'Screen job applications and rank candidates based on qualifications',
        geographicScope: ['EU', 'US'],
        regulatoryFrameworks: ['eu-ai-act', 'colorado-ai-act'],
  },
  {
        id: 'sys-002',
        name: 'Customer Chatbot',
        description: 'AI-powered customer service chatbot for product inquiries',
        vendor: 'OpenAI',
        department: 'Customer Service',
        deployers: ['Support Team'],
        aiCapabilities: ['natural-language-processing', 'content-generation'],
        domain: 'customer-service',
        subDomain: 'support',
        usesPersonalData: true,
        usesBiometricData: false,
        affectsVulnerableGroups: false,
        isAutonomous: false,
        humanOversightLevel: 'human-on-the-loop',
        deploymentDate: '2024-06-01',
        lastAssessmentDate: '2025-02-01',
        dataCategories: ['personal', 'transactional'],
        outputTypes: ['text', 'recommendations'],
        intendedPurpose: 'Provide automated customer support responses',
        geographicScope: ['EU', 'US'],
        regulatoryFrameworks: ['eu-ai-act'],
  },
  {
        id: 'sys-003',
        name: 'Credit Scoring Model',
        description: 'ML model for creditworthiness assessment of loan applicants',
        vendor: 'Internal',
        department: 'Finance',
        deployers: ['Lending Team'],
        aiCapabilities: ['decision-making', 'profiling', 'scoring'],
        domain: 'financial-services',
        subDomain: 'credit-assessment',
        usesPersonalData: true,
        usesBiometricData: false,
        affectsVulnerableGroups: true,
        isAutonomous: false,
        humanOversightLevel: 'human-in-the-loop',
        deploymentDate: '2023-11-20',
        lastAssessmentDate: '2024-12-15',
        dataCategories: ['personal', 'financial', 'behavioral'],
        outputTypes: ['scores', 'decisions', 'explanations'],
        intendedPurpose: 'Assess creditworthiness of loan applicants',
        geographicScope: ['EU'],
        regulatoryFrameworks: ['eu-ai-act'],
  },
  {
        id: 'sys-004',
        name: 'Fraud Detection System',
        description: 'Real-time transaction fraud detection using ML',
        vendor: 'Featurespace',
        department: 'Security',
        deployers: ['Risk Team'],
        aiCapabilities: ['anomaly-detection', 'pattern-recognition', 'decision-making'],
        domain: 'financial-services',
        subDomain: 'fraud-prevention',
        usesPersonalData: true,
        usesBiometricData: false,
        affectsVulnerableGroups: false,
        isAutonomous: true,
        humanOversightLevel: 'human-on-the-loop',
        deploymentDate: '2024-01-10',
        lastAssessmentDate: '2025-01-20',
        dataCategories: ['personal', 'financial', 'transactional'],
        outputTypes: ['alerts', 'decisions', 'scores'],
        intendedPurpose: 'Detect and flag potentially fraudulent transactions',
        geographicScope: ['EU', 'US'],
        regulatoryFrameworks: ['eu-ai-act', 'colorado-ai-act'],
  },
  ];

const riskColors: Record<string, string> = {
    unacceptable: 'bg-red-900 text-red-200 border-red-700',
    high: 'bg-orange-900 text-orange-200 border-orange-700',
    limited: 'bg-yellow-900 text-yellow-200 border-yellow-700',
    minimal: 'bg-green-900 text-green-200 border-green-700',
};

const riskBadgeColors: Record<string, string> = {
    unacceptable: 'bg-red-600',
    high: 'bg-orange-600',
    limited: 'bg-yellow-600 text-black',
    minimal: 'bg-green-600',
};

export default function RiskClassificationView() {
    const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
    const [classifications] = useState(() =>
          sampleSystems.map((sys) => ({
                  system: sys,
                  result: engine.classifySystem(sys),
          }))
                                         );

  const selected = classifications.find((c) => c.system.id === selectedSystem);

  return (
        <div className="space-y-6">
              <div className="flex items-center justify-between">
                      <div>
                                <h2 className="text-2xl font-bold text-white">Risk Classification Engine</h2>h2>
                                <p className="text-slate-400 mt-1">
                                            Automated risk tier classification per EU AI Act Article 6 &amp; Annex III
                                </p>p>
                      </div>div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                + Classify New System
                      </button>button>
              </div>div>
        
          {/* Summary Cards */}
              <div className="grid grid-cols-4 gap-4">
                {(['unacceptable', 'high', 'limited', 'minimal'] as const).map((tier) => {
                    const count = classifications.filter((c) => c.result.riskTier === tier).length;
                    return (
                                  <div key={tier} className={`p-4 rounded-lg border ${riskColors[tier]}`}>
                                                <div className="text-3xl font-bold">{count}</div>div>
                                                <div className="text-sm capitalize">{tier} Risk</div>div>
                                  </div>div>
                                );
        })}
              </div>div>
        
              <div className="grid grid-cols-3 gap-6">
                {/* Systems List */}
                      <div className="col-span-1 space-y-3">
                                <h3 className="text-lg font-semibold text-white">AI Systems</h3>h3>
                        {classifications.map(({ system, result }) => (
                      <div
                                      key={system.id}
                                      onClick={() => setSelectedSystem(system.id)}
                                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                                        selectedSystem === system.id
                                                          ? 'border-blue-500 bg-slate-700'
                                                          : 'border-slate-700 bg-slate-800 hover:border-slate-500'
                                      }`}
                                    >
                                    <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-white text-sm">{system.name}</span>span>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${riskBadgeColors[result.riskTier]}`}>
                                                      {result.riskTier.toUpperCase()}
                                                    </span>span>
                                    </div>div>
                                    <p className="text-xs text-slate-400">{system.description}</p>p>
                                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                                    <span>{system.department}</span>span>
                                                    <span>•</span>span>
                                                    <span>Confidence: {Math.round(result.confidence * 100)}%</span>span>
                                    </div>div>
                      </div>div>
                    ))}
                      </div>div>
              
                {/* Classification Detail */}
                      <div className="col-span-2">
                        {selected ? (
                      <div className="space-y-4">
                                    <div className={`p-6 rounded-lg border ${riskColors[selected.result.riskTier]}`}>
                                                    <div className="flex items-center justify-between mb-4">
                                                                      <h3 className="text-xl font-bold">{selected.system.name}</h3>h3>
                                                                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${riskBadgeColors[selected.result.riskTier]}`}>
                                                                        {selected.result.riskTier.toUpperCase()} RISK
                                                                      </span>span>
                                                    </div>div>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                                      <div>
                                                                                          <span className="opacity-70">Confidence:</span>span>{' '}
                                                                                          <span className="font-bold">{Math.round(selected.result.confidence * 100)}%</span>span>
                                                                      </div>div>
                                                                      <div>
                                                                                          <span className="opacity-70">Domain:</span>span>{' '}
                                                                                          <span className="font-bold capitalize">{selected.system.domain.replace('-', ' ')}</span>span>
                                                                      </div>div>
                                                                      <div>
                                                                                          <span className="opacity-70">EU AI Act Article:</span>span>{' '}
                                                                                          <span className="font-bold">{selected.result.euAIActArticle}</span>span>
                                                                      </div>div>
                                                                      <div>
                                                                                          <span className="opacity-70">Annex Reference:</span>span>{' '}
                                                                                          <span className="font-bold">{selected.result.annexReference || 'N/A'}</span>span>
                                                                      </div>div>
                                                    </div>div>
                                    </div>div>
                      
                        {/* Classification Reasons */}
                                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                                    <h4 className="text-lg font-semibold text-white mb-3">Classification Reasoning</h4>h4>
                                                    <ul className="space-y-2">
                                                      {selected.result.classificationReasons.map((reason, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                                  <span className="text-blue-400 mt-1">•</span>span>
                                              {reason}
                                            </li>li>
                                          ))}
                                                    </ul>ul>
                                    </div>div>
                      
                        {/* Obligations */}
                                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                                    <h4 className="text-lg font-semibold text-white mb-3">Compliance Obligations</h4>h4>
                                                    <div className="grid grid-cols-2 gap-3">
                                                      {selected.result.obligations.map((obligation, i) => (
                                            <div key={i} className="flex items-start gap-2 p-3 bg-slate-750 rounded border border-slate-600">
                                                                  <span className="text-yellow-400">⚠</span>span>
                                                                  <div>
                                                                                          <div className="text-sm font-medium text-white">{obligation.title}</div>div>
                                                                                          <div className="text-xs text-slate-400 mt-1">{obligation.description}</div>div>
                                                                                          <div className="text-xs text-slate-500 mt-1">Deadline: {obligation.deadline}</div>div>
                                                                  </div>div>
                                            </div>div>
                                          ))}
                                                    </div>div>
                                    </div>div>
                      
                        {/* Jurisdictional Analysis */}
                                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                                    <h4 className="text-lg font-semibold text-white mb-3">Multi-Jurisdictional Analysis</h4>h4>
                                                    <div className="space-y-3">
                                                      {selected.result.jurisdictionalNotes.map((note, i) => (
                                            <div key={i} className="p-3 bg-slate-750 rounded border border-slate-600">
                                                                  <div className="flex items-center gap-2 mb-1">
                                                                                          <span className="text-sm font-bold text-white">{note.jurisdiction}</span>span>
                                                                                          <span className={`px-2 py-0.5 rounded text-xs ${
                                                                        note.status === 'compliant' ? 'bg-green-600' :
                                                                        note.status === 'action-required' ? 'bg-orange-600' : 'bg-red-600'
                                            }`}>
                                                                                            {note.status.replace('-', ' ').toUpperCase()}
                                                                                            </span>span>
                                                                  </div>div>
                                                                  <p className="text-xs text-slate-400">{note.details}</p>p>
                                            </div>div>
                                          ))}
                                                    </div>div>
                                    </div>div>
                      </div>div>
                    ) : (
                      <div className="flex items-center justify-center h-96 bg-slate-800 rounded-lg border border-slate-700">
                                    <div className="text-center">
                                                    <div className="text-4xl mb-3">🔍</div>div>
                                                    <p className="text-slate-400">Select an AI system to view its risk classification</p>p>
                                    </div>div>
                      </div>div>
                                )}
                      </div>div>
              </div>div>
        </div>div>
      );
}</div>
