'use client';

import { useState } from 'react';

interface Regulation {
    id: string;
    name: string;
    shortName: string;
    jurisdiction: string;
    jurisdictionFlag: string;
    status: 'enacted' | 'effective' | 'proposed' | 'draft';
    effectiveDate: string;
    enforcementDate: string;
    description: string;
    keyProvisions: string[];
    impactedSystems: number;
    complianceDeadlines: { date: string; description: string; urgency: 'critical' | 'high' | 'medium' | 'low' }[];
    riskTiers: string[];
    penalties: string;
    lastUpdated: string;
}

const regulations: Regulation[] = [
  {
        id: 'reg-001',
        name: 'EU Artificial Intelligence Act',
        shortName: 'EU AI Act',
        jurisdiction: 'European Union',
        jurisdictionFlag: '🇪🇺',
        status: 'enacted',
        effectiveDate: '2024-08-01',
        enforcementDate: '2026-08-02',
        description: 'Comprehensive risk-based regulatory framework for AI systems in the EU market. Establishes requirements for providers and deployers based on risk classification.',
        keyProvisions: [
                'Risk-based classification (Unacceptable, High, Limited, Minimal)',
                'Annex IV technical documentation requirements',
                'Conformity assessment procedures (Article 43)',
                'Post-market monitoring obligations (Article 72)',
                'Transparency obligations for limited-risk systems (Article 50)',
                'EU database registration for high-risk systems (Article 71)',
                'Fundamental rights impact assessment (Article 27)',
              ],
        impactedSystems: 4,
        complianceDeadlines: [
          { date: '2025-02-02', description: 'AI literacy obligations (Article 4)', urgency: 'high' },
          { date: '2025-08-02', description: 'Prohibited AI practices ban (Title II)', urgency: 'critical' },
          { date: '2026-08-02', description: 'High-risk AI system requirements (Title III, Chapter 2)', urgency: 'critical' },
          { date: '2027-08-02', description: 'Obligations for certain AI systems (Annex I)', urgency: 'medium' },
              ],
        riskTiers: ['Unacceptable', 'High', 'Limited', 'Minimal'],
        penalties: 'Up to EUR 35 million or 7% of global annual turnover',
        lastUpdated: '2026-02-10',
  },
  {
        id: 'reg-002',
        name: 'Colorado Artificial Intelligence Act',
        shortName: 'CO AI Act',
        jurisdiction: 'Colorado, USA',
        jurisdictionFlag: '🇺🇸',
        status: 'enacted',
        effectiveDate: '2024-05-17',
        enforcementDate: '2026-02-01',
        description: 'State-level AI regulation focused on algorithmic discrimination in consequential decisions affecting consumers in Colorado.',
        keyProvisions: [
                'Developer duty of care for high-risk AI systems',
                'Deployer risk management and impact assessments',
                'Consumer notification of AI-driven consequential decisions',
                'Right to appeal and opt-out mechanisms',
                'Annual bias auditing requirements',
                'Documentation of training data and methodology',
              ],
        impactedSystems: 2,
        complianceDeadlines: [
          { date: '2026-02-01', description: 'Full compliance required for deployers', urgency: 'critical' },
          { date: '2026-02-01', description: 'Developer documentation and disclosure obligations', urgency: 'critical' },
          { date: '2026-06-01', description: 'First annual bias audit due', urgency: 'high' },
              ],
        riskTiers: ['High-Risk (Consequential Decisions)', 'General Purpose'],
        penalties: 'Enforcement by Colorado AG; UDAP violations; civil penalties',
        lastUpdated: '2026-01-28',
  },
  {
        id: 'reg-003',
        name: 'Illinois Artificial Intelligence Video Interview Act',
        shortName: 'IL AIVI Act',
        jurisdiction: 'Illinois, USA',
        jurisdictionFlag: '🇺🇸',
        status: 'effective',
        effectiveDate: '2020-01-01',
        enforcementDate: '2020-01-01',
        description: 'Requires employers to obtain consent before using AI to analyze video interviews and mandates data destruction.',
        keyProvisions: [
                'Applicant consent before AI video analysis',
                'Explanation of AI technology used',
                'Data sharing restrictions',
                'Video destruction within 30 days upon request',
              ],
        impactedSystems: 1,
        complianceDeadlines: [
          { date: '2020-01-01', description: 'Full compliance required (already effective)', urgency: 'low' },
              ],
        riskTiers: ['Employment AI Systems'],
        penalties: 'Private right of action; statutory damages',
        lastUpdated: '2025-11-15',
  },
  {
        id: 'reg-004',
        name: 'NYC Local Law 144 (Automated Employment Decision Tools)',
        shortName: 'NYC LL144',
        jurisdiction: 'New York City, USA',
        jurisdictionFlag: '🇺🇸',
        status: 'effective',
        effectiveDate: '2023-07-05',
        enforcementDate: '2023-07-05',
        description: 'Requires bias audits for automated employment decision tools used in NYC hiring and promotion decisions.',
        keyProvisions: [
                'Annual independent bias audit required',
                'Published summary of audit results',
                'Candidate notification of AEDT use',
                'Alternative selection process availability',
              ],
        impactedSystems: 1,
        complianceDeadlines: [
          { date: '2026-07-05', description: 'Annual bias audit renewal', urgency: 'medium' },
              ],
        riskTiers: ['Employment Decision Tools'],
        penalties: 'Up to $1,500 per violation per day',
        lastUpdated: '2025-12-01',
  },
  {
        id: 'reg-005',
        name: 'California AB 2013 (AI Training Data Transparency)',
        shortName: 'CA AB 2013',
        jurisdiction: 'California, USA',
        jurisdictionFlag: '🇺🇸',
        status: 'enacted',
        effectiveDate: '2024-09-28',
        enforcementDate: '2026-01-01',
        description: 'Requires generative AI developers to disclose training data details on their websites.',
        keyProvisions: [
                'Website disclosure of AI training data sources',
                'Description of data types and collection methods',
                'Disclosure of whether copyrighted material is included',
                'Applies to GenAI systems made available in California',
              ],
        impactedSystems: 1,
        complianceDeadlines: [
          { date: '2026-01-01', description: 'Training data transparency disclosures required', urgency: 'high' },
              ],
        riskTiers: ['Generative AI Systems'],
        penalties: 'AG enforcement; injunctive relief',
        lastUpdated: '2025-10-20',
  },
  ];

const statusColors: Record<string, string> = {
    enacted: 'bg-blue-600',
    effective: 'bg-green-600',
    proposed: 'bg-yellow-600 text-black',
    draft: 'bg-slate-600',
};

const urgencyColors: Record<string, string> = {
    critical: 'border-l-red-500 bg-red-900/20',
    high: 'border-l-orange-500 bg-orange-900/20',
    medium: 'border-l-yellow-500 bg-yellow-900/20',
    low: 'border-l-slate-500 bg-slate-800',
};

export default function RegulationTracker() {
    const [selectedReg, setSelectedReg] = useState<string | null>('reg-001');
    const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('all');

  const jurisdictions = [...new Set(regulations.map((r) => r.jurisdiction))];
    const filtered = jurisdictionFilter === 'all'
      ? regulations
          : regulations.filter((r) => r.jurisdiction === jurisdictionFilter);

  const selected = regulations.find((r) => r.id === selectedReg);

  // Collect all upcoming deadlines
  const allDeadlines = regulations
      .flatMap((r) => r.complianceDeadlines.map((d) => ({ ...d, regulation: r.shortName })))
      .filter((d) => new Date(d.date) >= new Date('2026-01-01'))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 8);

  return (
        <div className="space-y-6">
              <div className="flex items-center justify-between">
                      <div>
                                <h2 className="text-2xl font-bold text-white">Regulation Tracker</h2>h2>
                                <p className="text-slate-400 mt-1">
                                            Multi-jurisdictional AI regulation monitoring — EU, US States &amp; emerging markets
                                </p>p>
                      </div>div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                + Add Regulation
                      </button>button>
              </div>div>
        
          {/* Summary */}
              <div className="grid grid-cols-4 gap-4">
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-3xl font-bold text-white">{regulations.length}</div>div>
                                <div className="text-sm text-slate-400">Tracked Regulations</div>div>
                      </div>div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-3xl font-bold text-white">{jurisdictions.length}</div>div>
                                <div className="text-sm text-slate-400">Jurisdictions</div>div>
                      </div>div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-3xl font-bold text-red-400">
                                  {allDeadlines.filter((d) => d.urgency === 'critical').length}
                                </div>div>
                                <div className="text-sm text-slate-400">Critical Deadlines</div>div>
                      </div>div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                <div className="text-3xl font-bold text-orange-400">164</div>div>
                                <div className="text-sm text-slate-400">Days to EU AI Act</div>div>
                      </div>div>
              </div>div>
        
          {/* Upcoming Deadlines Timeline */}
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                      <h3 className="text-lg font-semibold text-white mb-4">Upcoming Compliance Deadlines</h3>h3>
                      <div className="space-y-2">
                        {allDeadlines.map((deadline, i) => (
                      <div key={i} className={`p-3 rounded border-l-4 ${urgencyColors[deadline.urgency]}`}>
                                    <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                                      <span className="text-sm font-mono text-slate-300">{deadline.date}</span>span>
                                                                      <span className="text-sm text-white">{deadline.description}</span>span>
                                                    </div>div>
                                                    <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
                                                      {deadline.regulation}
                                                    </span>span>
                                    </div>div>
                      </div>div>
                    ))}
                      </div>div>
              </div>div>
        
          {/* Jurisdiction Filter */}
              <div className="flex gap-2">
                      <button
                                  onClick={() => setJurisdictionFilter('all')}
                                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                                jurisdictionFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                  }`}
                                >
                                All Jurisdictions
                      </button>button>
                {jurisdictions.map((j) => (
                    <button
                                  key={j}
                                  onClick={() => setJurisdictionFilter(j)}
                                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                                  jurisdictionFilter === j ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                  }`}
                                >
                      {j}
                    </button>button>
                  ))}
              </div>div>
        
              <div className="grid grid-cols-3 gap-6">
                {/* Regulation List */}
                      <div className="col-span-1 space-y-3">
                        {filtered.map((reg) => (
                      <div
                                      key={reg.id}
                                      onClick={() => setSelectedReg(reg.id)}
                                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                                        selectedReg === reg.id
                                                          ? 'border-blue-500 bg-slate-700'
                                                          : 'border-slate-700 bg-slate-800 hover:border-slate-500'
                                      }`}
                                    >
                                    <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-white text-sm">
                                                      {reg.jurisdictionFlag} {reg.shortName}
                                                    </span>span>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[reg.status]}`}>
                                                      {reg.status.toUpperCase()}
                                                    </span>span>
                                    </div>div>
                                    <p className="text-xs text-slate-400 mb-2">{reg.jurisdiction}</p>p>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                    <span>{reg.impactedSystems} systems affected</span>span>
                                                    <span>Enforcement: {reg.enforcementDate}</span>span>
                                    </div>div>
                      </div>div>
                    ))}
                      </div>div>
              
                {/* Regulation Detail */}
                      <div className="col-span-2">
                        {selected ? (
                      <div className="space-y-4">
                                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                                    <div className="flex items-center justify-between mb-3">
                                                                      <h3 className="text-xl font-bold text-white">
                                                                        {selected.jurisdictionFlag} {selected.name}
                                                                      </h3>h3>
                                                                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selected.status]}`}>
                                                                        {selected.status.toUpperCase()}
                                                                      </span>span>
                                                    </div>div>
                                                    <p className="text-sm text-slate-300 mb-4">{selected.description}</p>p>
                                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                                                      <div>
                                                                                          <span className="text-slate-500">Effective Date</span>span>
                                                                                          <div className="text-white font-medium">{selected.effectiveDate}</div>div>
                                                                      </div>div>
                                                                      <div>
                                                                                          <span className="text-slate-500">Enforcement Date</span>span>
                                                                                          <div className="text-white font-medium">{selected.enforcementDate}</div>div>
                                                                      </div>div>
                                                                      <div>
                                                                                          <span className="text-slate-500">Penalties</span>span>
                                                                                          <div className="text-red-400 font-medium text-xs">{selected.penalties}</div>div>
                                                                      </div>div>
                                                    </div>div>
                                    </div>div>
                      
                                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                                    <h4 className="text-lg font-semibold text-white mb-3">Key Provisions</h4>h4>
                                                    <ul className="space-y-2">
                                                      {selected.keyProvisions.map((p, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                                  <span className="text-blue-400 mt-0.5">§</span>span> {p}
                                            </li>li>
                                          ))}
                                                    </ul>ul>
                                    </div>div>
                      
                                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                                    <h4 className="text-lg font-semibold text-white mb-3">Risk Tiers</h4>h4>
                                                    <div className="flex flex-wrap gap-2">
                                                      {selected.riskTiers.map((tier, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-slate-700 rounded-full text-sm text-slate-300 border border-slate-600">
                                              {tier}
                                            </span>span>
                                          ))}
                                                    </div>div>
                                    </div>div>
                      
                                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                                    <h4 className="text-lg font-semibold text-white mb-3">Compliance Deadlines</h4>h4>
                                                    <div className="space-y-2">
                                                      {selected.complianceDeadlines.map((d, i) => (
                                            <div key={i} className={`p-3 rounded border-l-4 ${urgencyColors[d.urgency]}`}>
                                                                  <div className="flex items-center gap-3">
                                                                                          <span className="text-sm font-mono text-slate-300">{d.date}</span>span>
                                                                                          <span className="text-sm text-white">{d.description}</span>span>
                                                                  </div>div>
                                            </div>div>
                                          ))}
                                                    </div>div>
                                    </div>div>
                      </div>div>
                    ) : (
                      <div className="flex items-center justify-center h-96 bg-slate-800 rounded-lg border border-slate-700">
                                    <p className="text-slate-400">Select a regulation to view details</p>p>
                      </div>div>
                                )}
                      </div>div>
              </div>div>
        </div>div>
      );
}</div>
