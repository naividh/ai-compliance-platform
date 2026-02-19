'use client';

import { useState } from 'react';

interface AISystem {
    id: string;
    name: string;
    description: string;
    domain: string;
    vendor: string;
    version: string;
    deployedDate: string;
    riskTier: 'HIGH' | 'LIMITED' | 'MINIMAL' | 'UNACCEPTABLE' | 'UNCLASSIFIED';
    status: 'Active' | 'In Development' | 'Retired' | 'Under Review';
    owner: string;
    department: string;
    dataCategories: string[];
    jurisdictions: string[];
}

const MOCK_SYSTEMS: AISystem[] = [
  {
        id: 'sys-001', name: 'Resume Screening AI', description: 'Automated resume screening and candidate ranking for hiring pipeline',
        domain: 'Hiring & Recruitment', vendor: 'Internal', version: '2.3.1', deployedDate: '2024-03-15',
        riskTier: 'HIGH', status: 'Active', owner: 'Sarah Chen', department: 'HR Technology',
        dataCategories: ['Personal Data', 'Employment Data', 'Sensitive Personal Data'],
        jurisdictions: ['EU AI Act', 'Colorado AI Act'],
  },
  {
        id: 'sys-002', name: 'Credit Risk Model v3', description: 'ML model for consumer credit risk scoring and lending decisions',
        domain: 'Credit & Lending', vendor: 'Internal', version: '3.0.2', deployedDate: '2024-01-10',
        riskTier: 'HIGH', status: 'Active', owner: 'Marcus Johnson', department: 'Risk Analytics',
        dataCategories: ['Financial Data', 'Personal Data', 'Behavioral Data'],
        jurisdictions: ['EU AI Act', 'Colorado AI Act'],
  },
  {
        id: 'sys-003', name: 'Claims Fraud Detector', description: 'Neural network for identifying potentially fraudulent insurance claims',
        domain: 'Insurance Underwriting', vendor: 'FraudGuard AI', version: '1.8.0', deployedDate: '2023-09-20',
        riskTier: 'HIGH', status: 'Active', owner: 'Lisa Wang', department: 'Insurance Operations',
        dataCategories: ['Financial Data', 'Personal Data', 'Health Data'],
        jurisdictions: ['EU AI Act', 'Colorado AI Act'],
  },
  {
        id: 'sys-004', name: 'Patient Triage Assistant', description: 'AI-assisted patient triage for emergency department prioritization',
        domain: 'Healthcare Diagnosis', vendor: 'MedAI Corp', version: '1.2.0', deployedDate: '2025-01-05',
        riskTier: 'HIGH', status: 'Under Review', owner: 'Dr. Emily Park', department: 'Clinical AI',
        dataCategories: ['Health Data', 'Sensitive Personal Data', 'Biometric Data'],
        jurisdictions: ['EU AI Act'],
  },
  {
        id: 'sys-005', name: 'Customer Chatbot', description: 'Conversational AI for customer service interactions',
        domain: 'Customer Service', vendor: 'OpenAI', version: 'GPT-4', deployedDate: '2024-06-01',
        riskTier: 'LIMITED', status: 'Active', owner: 'Tom Harris', department: 'Customer Experience',
        dataCategories: ['Personal Data', 'Behavioral Data'],
        jurisdictions: ['EU AI Act'],
  },
  {
        id: 'sys-006', name: 'Content Recommendation Engine', description: 'Personalized content and product recommendation system',
        domain: 'Marketing', vendor: 'Internal', version: '4.1.0', deployedDate: '2023-11-15',
        riskTier: 'LIMITED', status: 'Active', owner: 'Alex Rivera', department: 'Digital Marketing',
        dataCategories: ['Behavioral Data', 'Personal Data'],
        jurisdictions: ['EU AI Act'],
  },
  {
        id: 'sys-007', name: 'Email Spam Filter', description: 'ML-based email classification and spam detection',
        domain: 'IT Operations', vendor: 'Microsoft', version: 'Exchange AI', deployedDate: '2023-01-01',
        riskTier: 'MINIMAL', status: 'Active', owner: 'IT Operations', department: 'IT',
        dataCategories: ['Non-Personal'],
        jurisdictions: ['EU AI Act'],
  },
  {
        id: 'sys-008', name: 'Predictive Maintenance', description: 'Equipment failure prediction for manufacturing lines',
        domain: 'Manufacturing', vendor: 'Internal', version: '1.5.0', deployedDate: '2024-04-20',
        riskTier: 'MINIMAL', status: 'Active', owner: 'James Wilson', department: 'Manufacturing',
        dataCategories: ['Non-Personal'],
        jurisdictions: ['EU AI Act'],
  },
  ];

export function AISystemsRegistry() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRisk, setFilterRisk] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState<AISystem | null>(null);

  const filteredSystems = MOCK_SYSTEMS.filter(system => {
        const matchesSearch = system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                system.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                system.vendor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRisk = filterRisk === 'all' || system.riskTier === filterRisk;
        const matchesStatus = filterStatus === 'all' || system.status === filterStatus;
        return matchesSearch && matchesRisk && matchesStatus;
  });

  return (
        <div className="space-y-6">
          {/* Header */}
              <div className="flex items-center justify-between">
                      <div>
                                <h1 className="text-2xl font-bold text-gray-900">AI Systems Registry</h1>h1>
                                <p className="text-sm text-gray-500 mt-1">
                                            Discover, register, and manage all AI systems across your organization
                                </p>p>
                      </div>div>
                      <button
                                  onClick={() => setShowRegisterModal(true)}
                                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                                >
                                + Register New System
                      </button>button>
              </div>div>
        
          {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <div className="text-sm text-gray-500">Total Systems</div>div>
                                <div className="text-2xl font-bold text-gray-900 mt-1">{MOCK_SYSTEMS.length}</div>div>
                      </div>div>
                      <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
                                <div className="text-sm text-orange-600">High Risk</div>div>
                                <div className="text-2xl font-bold text-orange-700 mt-1">{MOCK_SYSTEMS.filter(s => s.riskTier === 'HIGH').length}</div>div>
                      </div>div>
                      <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
                                <div className="text-sm text-yellow-600">Limited Risk</div>div>
                                <div className="text-2xl font-bold text-yellow-700 mt-1">{MOCK_SYSTEMS.filter(s => s.riskTier === 'LIMITED').length}</div>div>
                      </div>div>
                      <div className="bg-green-50 rounded-xl border border-green-200 p-4">
                                <div className="text-sm text-green-600">Minimal Risk</div>div>
                                <div className="text-2xl font-bold text-green-700 mt-1">{MOCK_SYSTEMS.filter(s => s.riskTier === 'MINIMAL').length}</div>div>
                      </div>div>
              </div>div>
        
          {/* Filters */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex flex-wrap items-center gap-4">
                                <div className="flex-1 min-w-[200px]">
                                            <input
                                                            type="text"
                                                            placeholder="Search systems by name, domain, or vendor..."
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                          />
                                </div>div>
                                <select
                                              value={filterRisk}
                                              onChange={(e) => setFilterRisk(e.target.value)}
                                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                                            >
                                            <option value="all">All Risk Tiers</option>option>
                                            <option value="HIGH">High Risk</option>option>
                                            <option value="LIMITED">Limited Risk</option>option>
                                            <option value="MINIMAL">Minimal Risk</option>option>
                                            <option value="UNCLASSIFIED">Unclassified</option>option>
                                </select>select>
                                <select
                                              value={filterStatus}
                                              onChange={(e) => setFilterStatus(e.target.value)}
                                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                                            >
                                            <option value="all">All Statuses</option>option>
                                            <option value="Active">Active</option>option>
                                            <option value="In Development">In Development</option>option>
                                            <option value="Under Review">Under Review</option>option>
                                            <option value="Retired">Retired</option>option>
                                </select>select>
                      </div>div>
              </div>div>
        
          {/* Systems Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredSystems.map((system) => (
                    <div
                                  key={system.id}
                                  onClick={() => setSelectedSystem(system)}
                                  className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                                >
                                <div className="flex items-start justify-between mb-3">
                                              <div>
                                                              <h3 className="font-semibold text-gray-900">{system.name}</h3>h3>
                                                              <p className="text-xs text-gray-500 mt-0.5">{system.id} · v{system.version}</p>p>
                                              </div>div>
                                              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                                                  system.riskTier === 'HIGH' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                                                  system.riskTier === 'LIMITED' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                  system.riskTier === 'MINIMAL' ? 'bg-green-100 text-green-800 border-green-200' :
                                                  'bg-gray-100 text-gray-800 border-gray-200'
                                }`}>
                                                {system.riskTier}
                                              </span>span>
                                </div>div>
                                <p className="text-sm text-gray-600 mb-3">{system.description}</p>p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{system.domain}</span>span>
                                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{system.vendor}</span>span>
                                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                                  system.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                  system.status === 'Under Review' ? 'bg-yellow-100 text-yellow-700' :
                                                  'bg-gray-100 text-gray-600'
                                }`}>{system.status}</span>span>
                                </div>div>
                                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                                              <span>Owner: {system.owner}</span>span>
                                              <span>Deployed: {system.deployedDate}</span>span>
                                </div>div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {system.jurisdictions.map((j, i) => (
                                                  <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded">
                                                    {j}
                                                  </span>span>
                                                ))}
                                </div>div>
                    </div>div>
                  ))}
              </div>div>
        
          {/* System Detail Modal */}
          {selectedSystem && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
                                        <div className="flex items-start justify-between mb-4">
                                                      <div>
                                                                      <h2 className="text-xl font-bold text-gray-900">{selectedSystem.name}</h2>h2>
                                                                      <p className="text-sm text-gray-500">{selectedSystem.id}</p>p>
                                                      </div>div>
                                                      <button onClick={() => setSelectedSystem(null)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>button>
                                        </div>div>
                                        <div className="space-y-4">
                                                      <div>
                                                                      <div className="text-sm font-medium text-gray-500 mb-1">Description</div>div>
                                                                      <div className="text-sm text-gray-900">{selectedSystem.description}</div>div>
                                                      </div>div>
                                                      <div className="grid grid-cols-2 gap-4">
                                                                      <div>
                                                                                        <div className="text-sm font-medium text-gray-500">Domain</div>div>
                                                                                        <div className="text-sm text-gray-900">{selectedSystem.domain}</div>div>
                                                                      </div>div>
                                                                      <div>
                                                                                        <div className="text-sm font-medium text-gray-500">Risk Tier</div>div>
                                                                                        <div className="text-sm text-gray-900">{selectedSystem.riskTier}</div>div>
                                                                      </div>div>
                                                                      <div>
                                                                                        <div className="text-sm font-medium text-gray-500">Vendor</div>div>
                                                                                        <div className="text-sm text-gray-900">{selectedSystem.vendor}</div>div>
                                                                      </div>div>
                                                                      <div>
                                                                                        <div className="text-sm font-medium text-gray-500">Version</div>div>
                                                                                        <div className="text-sm text-gray-900">{selectedSystem.version}</div>div>
                                                                      </div>div>
                                                                      <div>
                                                                                        <div className="text-sm font-medium text-gray-500">Owner</div>div>
                                                                                        <div className="text-sm text-gray-900">{selectedSystem.owner}</div>div>
                                                                      </div>div>
                                                                      <div>
                                                                                        <div className="text-sm font-medium text-gray-500">Department</div>div>
                                                                                        <div className="text-sm text-gray-900">{selectedSystem.department}</div>div>
                                                                      </div>div>
                                                      </div>div>
                                                      <div>
                                                                      <div className="text-sm font-medium text-gray-500 mb-2">Data Categories</div>div>
                                                                      <div className="flex flex-wrap gap-2">
                                                                        {selectedSystem.dataCategories.map((cat, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{cat}</span>span>
                                      ))}
                                                                      </div>div>
                                                      </div>div>
                                                      <div>
                                                                      <div className="text-sm font-medium text-gray-500 mb-2">Applicable Jurisdictions</div>div>
                                                                      <div className="flex flex-wrap gap-2">
                                                                        {selectedSystem.jurisdictions.map((j, i) => (
                                        <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">{j}</span>span>
                                      ))}
                                                                      </div>div>
                                                      </div>div>
                                        </div>div>
                                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                                                      <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                                                                      Run Classification
                                                      </button>button>
                                                      <button className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                                      Generate Documentation
                                                      </button>button>
                                                      <button onClick={() => setSelectedSystem(null)} className="px-4 py-2 text-gray-500 text-sm hover:text-gray-700">
                                                                      Close
                                                      </button>button>
                                        </div>div>
                            </div>div>
                  </div>div>
              )}
        
          {/* Register Modal */}
          {showRegisterModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
                                        <div className="flex items-center justify-between mb-4">
                                                      <h2 className="text-xl font-bold text-gray-900">Register New AI System</h2>h2>
                                                      <button onClick={() => setShowRegisterModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>button>
                                        </div>div>
                                        <div className="space-y-4">
                                                      <div>
                                                                      <label className="block text-sm font-medium text-gray-700 mb-1">System Name</label>label>
                                                                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g., Customer Churn Predictor" />
                                                      </div>div>
                                                      <div>
                                                                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>label>
                                                                      <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} placeholder="Describe the AI system's purpose and functionality" />
                                                      </div>div>
                                                      <div className="grid grid-cols-2 gap-4">
                                                                      <div>
                                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>label>
                                                                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                                                                                                            <option>Select domain...</option>option>
                                                                                                            <option>Hiring & Recruitment</option>option>
                                                                                                            <option>Credit & Lending</option>option>
                                                                                                            <option>Insurance Underwriting</option>option>
                                                                                                            <option>Healthcare Diagnosis</option>option>
                                                                                                            <option>Customer Service</option>option>
                                                                                                            <option>Marketing</option>option>
                                                                                                            <option>IT Operations</option>option>
                                                                                                            <option>Manufacturing</option>option>
                                                                                                            <option>Other</option>option>
                                                                                          </select>select>
                                                                      </div>div>
                                                                      <div>
                                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>label>
                                                                                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Internal or vendor name" />
                                                                      </div>div>
                                                      </div>div>
                                                      <div className="grid grid-cols-2 gap-4">
                                                                      <div>
                                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>label>
                                                                                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g., 1.0.0" />
                                                                      </div>div>
                                                                      <div>
                                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>label>
                                                                                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="System owner name" />
                                                                      </div>div>
                                                      </div>div>
                                                      <div>
                                                                      <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Jurisdictions</label>label>
                                                                      <div className="flex flex-wrap gap-2">
                                                                                        <label className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm cursor-pointer hover:bg-gray-50">
                                                                                                            <input type="checkbox" defaultChecked className="rounded" /> EU AI Act
                                                                                          </label>label>
                                                                                        <label className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm cursor-pointer hover:bg-gray-50">
                                                                                                            <input type="checkbox" className="rounded" /> Colorado AI Act
                                                                                          </label>label>
                                                                                        <label className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm cursor-pointer hover:bg-gray-50">
                                                                                                            <input type="checkbox" className="rounded" /> NYC Local Law 144
                                                                                          </label>label>
                                                                      </div>div>
                                                      </div>div>
                                        </div>div>
                                        <div className="flex gap-3 mt-6">
                                                      <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                                                                      Register & Classify
                                                      </button>button>
                                                      <button onClick={() => setShowRegisterModal(false)} className="px-4 py-2 text-gray-500 text-sm hover:text-gray-700">
                                                                      Cancel
                                                      </button>button>
                                        </div>div>
                            </div>div>
                  </div>div>
              )}
        </div>div>
      );
}</div>
