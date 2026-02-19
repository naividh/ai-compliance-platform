'use client';

import { useState } from 'react';
import type { ActiveView } from '@/app/page';

// ============================================================
// MOCK DATA - Replace with API calls in production
// ============================================================

const MOCK_STATS = {
    totalSystems: 23,
    highRiskSystems: 8,
    complianceScore: 34,
    daysToDeadline: 164,
    pendingObligations: 47,
    completedObligations: 18,
    totalObligations: 65,
    criticalAlerts: 5,
};

const MOCK_DEADLINE_TRACKER = [
  { regulation: 'EU AI Act - High Risk Provisions', deadline: '2026-08-02', daysLeft: 164, status: 'active' as const },
  { regulation: 'Colorado AI Act (SB 24-205)', deadline: '2026-02-01', daysLeft: -18, status: 'overdue' as const },
  { regulation: 'EU AI Act - GPAI Code of Practice', deadline: '2025-08-02', daysLeft: -201, status: 'overdue' as const },
  { regulation: 'NYC Local Law 144 - AEDT', deadline: '2023-07-05', daysLeft: -960, status: 'overdue' as const },
  { regulation: 'Canada AIDA (C-27)', deadline: '2026-12-01', daysLeft: 285, status: 'upcoming' as const },
  ];

const MOCK_SYSTEMS = [
  { id: '1', name: 'Resume Screening AI', domain: 'Hiring & Recruitment', riskTier: 'HIGH' as const, euCompliance: 22, coCompliance: 15, status: 'Non-Compliant' as const },
  { id: '2', name: 'Credit Risk Model v3', domain: 'Credit & Lending', riskTier: 'HIGH' as const, euCompliance: 45, coCompliance: 40, status: 'In Progress' as const },
  { id: '3', name: 'Claims Fraud Detector', domain: 'Insurance', riskTier: 'HIGH' as const, euCompliance: 60, coCompliance: 55, status: 'In Progress' as const },
  { id: '4', name: 'Patient Triage Assistant', domain: 'Healthcare', riskTier: 'HIGH' as const, euCompliance: 12, coCompliance: 0, status: 'Non-Compliant' as const },
  { id: '5', name: 'Customer Chatbot', domain: 'Customer Service', riskTier: 'LIMITED' as const, euCompliance: 80, coCompliance: 100, status: 'Near Compliant' as const },
  { id: '6', name: 'Content Recommendation', domain: 'Marketing', riskTier: 'LIMITED' as const, euCompliance: 90, coCompliance: 100, status: 'Compliant' as const },
  { id: '7', name: 'Email Spam Filter', domain: 'IT Operations', riskTier: 'MINIMAL' as const, euCompliance: 100, coCompliance: 100, status: 'Compliant' as const },
  { id: '8', name: 'Predictive Maintenance', domain: 'Manufacturing', riskTier: 'MINIMAL' as const, euCompliance: 100, coCompliance: 100, status: 'Compliant' as const },
  ];

const MOCK_RECENT_ACTIVITY = [
  { id: '1', action: 'Risk classification completed', system: 'Resume Screening AI', user: 'Sarah Chen', time: '2 hours ago', type: 'classification' as const },
  { id: '2', action: 'Annex IV documentation generated', system: 'Credit Risk Model v3', user: 'System', time: '4 hours ago', type: 'documentation' as const },
  { id: '3', action: 'Conformity evidence uploaded', system: 'Claims Fraud Detector', user: 'Marcus Johnson', time: '6 hours ago', type: 'conformity' as const },
  { id: '4', action: 'New AI system registered', system: 'Patient Triage Assistant', user: 'Dr. Emily Park', time: '1 day ago', type: 'system' as const },
  { id: '5', action: 'Risk management policy approved', system: 'Credit Risk Model v3', user: 'Legal Team', time: '2 days ago', type: 'obligation' as const },
  ];

// ============================================================
// COMPONENT
// ============================================================

interface DashboardOverviewProps {
    onNavigate: (view: ActiveView) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
    const [selectedJurisdiction, setSelectedJurisdiction] = useState<'all' | 'eu' | 'colorado'>('all');

  const riskDistribution = {
        unacceptable: 0,
        high: MOCK_SYSTEMS.filter(s => s.riskTier === 'HIGH').length,
        limited: MOCK_SYSTEMS.filter(s => s.riskTier === 'LIMITED').length,
        minimal: MOCK_SYSTEMS.filter(s => s.riskTier === 'MINIMAL').length,
  };

  return (
        <div className="space-y-6">
          {/* Page Header */}
              <div className="flex items-center justify-between">
                      <div>
                                <h1 className="text-2xl font-bold text-gray-900">Compliance Dashboard</h1>h1>
                                <p className="text-sm text-gray-500 mt-1">
                                            Overview of your AI systems compliance status across all jurisdictions
                                </p>p>
                      </div>div>
                      <div className="flex items-center gap-3">
                                <select 
                                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                                              value={selectedJurisdiction}
                                              onChange={(e) => setSelectedJurisdiction(e.target.value as typeof selectedJurisdiction)}
                                            >
                                            <option value="all">All Jurisdictions</option>option>
                                            <option value="eu">EU AI Act</option>option>
                                            <option value="colorado">Colorado AI Act</option>option>
                                </select>select>
                                <button 
                                              onClick={() => onNavigate('systems')}
                                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                                            >
                                            + Register AI System
                                </button>button>
                      </div>div>
              </div>div>
        
          {/* Critical Alert Banner */}
          {MOCK_STATS.criticalAlerts > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-red-600 text-lg">!</span>span>
                            </div>div>
                            <div className="flex-1">
                                        <h3 className="font-semibold text-red-800">
                                          {MOCK_STATS.criticalAlerts} Critical Compliance Alerts
                                        </h3>h3>
                                        <p className="text-sm text-red-700 mt-1">
                                          {MOCK_STATS.highRiskSystems} high-risk AI systems require immediate attention.
                                                      EU AI Act high-risk provisions deadline: August 2, 2026 ({MOCK_STATS.daysToDeadline} days remaining).
                                                      Colorado AI Act deadline has passed.
                                        </p>p>
                                        <button className="text-sm font-medium text-red-800 underline mt-2 hover:text-red-900">
                                                      View all alerts →
                                        </button>button>
                            </div>div>
                  </div>div>
              )}
        
          {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <MetricCard
                                  title="Total AI Systems"
                                  value={MOCK_STATS.totalSystems}
                                  subtitle={`${MOCK_STATS.highRiskSystems} high-risk`}
                                  icon="🤖"
                                  trend={{ value: 3, label: 'new this month', direction: 'up' }}
                                  color="blue"
                                />
                      <MetricCard
                                  title="Compliance Score"
                                  value={`${MOCK_STATS.complianceScore}%`}
                                  subtitle="Overall readiness"
                                  icon="📊"
                                  trend={{ value: 8, label: 'vs last month', direction: 'up' }}
                                  color="amber"
                                />
                      <MetricCard
                                  title="Days to EU AI Act"
                                  value={MOCK_STATS.daysToDeadline}
                                  subtitle="August 2, 2026"
                                  icon="📅"
                                  trend={{ value: 164, label: 'days remaining', direction: 'down' }}
                                  color="red"
                                />
                      <MetricCard
                                  title="Obligations"
                                  value={`${MOCK_STATS.completedObligations}/${MOCK_STATS.totalObligations}`}
                                  subtitle={`${MOCK_STATS.pendingObligations} pending`}
                                  icon="✅"
                                  trend={{ value: 5, label: 'completed this week', direction: 'up' }}
                                  color="green"
                                />
              </div>div>
        
          {/* Middle Section: Risk Distribution + Deadline Tracker */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Distribution */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Classification Distribution</h2>h2>
                                <div className="space-y-4">
                                            <RiskBar label="Unacceptable" count={riskDistribution.unacceptable} total={MOCK_STATS.totalSystems} color="bg-red-600" />
                                            <RiskBar label="High Risk" count={riskDistribution.high} total={MOCK_STATS.totalSystems} color="bg-orange-500" />
                                            <RiskBar label="Limited Risk" count={riskDistribution.limited} total={MOCK_STATS.totalSystems} color="bg-yellow-500" />
                                            <RiskBar label="Minimal Risk" count={riskDistribution.minimal} total={MOCK_STATS.totalSystems} color="bg-green-500" />
                                </div>div>
                                <div className="mt-6 pt-4 border-t border-gray-100">
                                            <div className="grid grid-cols-4 gap-2 text-center">
                                                          <div>
                                                                          <div className="text-2xl font-bold text-red-600">{riskDistribution.unacceptable}</div>div>
                                                                          <div className="text-xs text-gray-500">Prohibited</div>div>
                                                          </div>div>
                                                          <div>
                                                                          <div className="text-2xl font-bold text-orange-500">{riskDistribution.high}</div>div>
                                                                          <div className="text-xs text-gray-500">High</div>div>
                                                          </div>div>
                                                          <div>
                                                                          <div className="text-2xl font-bold text-yellow-500">{riskDistribution.limited}</div>div>
                                                                          <div className="text-xs text-gray-500">Limited</div>div>
                                                          </div>div>
                                                          <div>
                                                                          <div className="text-2xl font-bold text-green-500">{riskDistribution.minimal}</div>div>
                                                                          <div className="text-xs text-gray-500">Minimal</div>div>
                                                          </div>div>
                                            </div>div>
                                </div>div>
                      </div>div>
              
                {/* Deadline Tracker */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Deadline Tracker</h2>h2>
                                <div className="space-y-3">
                                  {MOCK_DEADLINE_TRACKER.map((item, idx) => (
                        <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${
                                          item.status === 'overdue' ? 'border-red-200 bg-red-50' :
                                          item.status === 'active' ? 'border-orange-200 bg-orange-50' :
                                          'border-gray-200 bg-gray-50'
                        }`}>
                                        <div className="flex-1">
                                                          <div className="font-medium text-sm text-gray-900">{item.regulation}</div>div>
                                                          <div className="text-xs text-gray-500">{item.deadline}</div>div>
                                        </div>div>
                                        <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                                            item.status === 'overdue' ? 'bg-red-100 text-red-700' :
                                            item.status === 'active' ? 'bg-orange-100 text-orange-700' :
                                            'bg-blue-100 text-blue-700'
                        }`}>
                                          {item.status === 'overdue' ? `${Math.abs(item.daysLeft)}d overdue` :
                                                               `${item.daysLeft}d left`}
                                        </div>div>
                        </div>div>
                      ))}
                                </div>div>
                      </div>div>
              </div>div>
        
          {/* Systems Table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">AI Systems Compliance Status</h2>h2>
                                <button 
                                              onClick={() => onNavigate('systems')}
                                              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                            >
                                            View all systems →
                                </button>button>
                      </div>div>
                      <div className="overflow-x-auto">
                                <table className="w-full">
                                            <thead>
                                                          <tr className="bg-gray-50 border-b border-gray-200">
                                                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System</th>th>
                                                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>th>
                                                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Tier</th>th>
                                                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EU Compliance</th>th>
                                                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO Compliance</th>th>
                                                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>th>
                                                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>th>
                                                          </tr>tr>
                                            </thead>thead>
                                            <tbody className="divide-y divide-gray-200">
                                              {MOCK_SYSTEMS.map((system) => (
                          <tr key={system.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                                <div className="font-medium text-gray-900">{system.name}</div>div>
                                            </td>td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{system.domain}</td>td>
                                            <td className="px-6 py-4">
                                                                <RiskBadge tier={system.riskTier} />
                                            </td>td>
                                            <td className="px-6 py-4">
                                                                <ComplianceBar value={system.euCompliance} />
                                            </td>td>
                                            <td className="px-6 py-4">
                                                                <ComplianceBar value={system.coCompliance} />
                                            </td>td>
                                            <td className="px-6 py-4">
                                                                <StatusBadge status={system.status} />
                                            </td>td>
                                            <td className="px-6 py-4">
                                                                <button 
                                                                                        onClick={() => onNavigate('classification')}
                                                                                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                                                                      >
                                                                                      Review
                                                                </button>button>
                                            </td>td>
                          </tr>tr>
                        ))}
                                            </tbody>tbody>
                                </table>table>
                      </div>div>
              </div>div>
        
          {/* Bottom Section: Activity + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>h2>
                                <div className="space-y-4">
                                  {MOCK_RECENT_ACTIVITY.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            activity.type === 'classification' ? 'bg-orange-100' :
                                            activity.type === 'documentation' ? 'bg-blue-100' :
                                            activity.type === 'conformity' ? 'bg-green-100' :
                                            activity.type === 'system' ? 'bg-purple-100' :
                                            'bg-gray-100'
                        }`}>
                                                          <span className="text-sm">
                                                            {activity.type === 'classification' ? '⚡' :
                                                                                   activity.type === 'documentation' ? '📄' :
                                                                                   activity.type === 'conformity' ? '✓' :
                                                                                   activity.type === 'system' ? '🔧' : '📋'}
                                                          </span>span>
                                        </div>div>
                                        <div className="flex-1">
                                                          <div className="text-sm font-medium text-gray-900">{activity.action}</div>div>
                                                          <div className="text-xs text-gray-500">
                                                            {activity.system} · {activity.user} · {activity.time}
                                                          </div>div>
                                        </div>div>
                        </div>div>
                      ))}
                                </div>div>
                      </div>div>
              
                {/* Quick Actions */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>h2>
                                <div className="space-y-3">
                                            <QuickAction
                                                            icon="🤖"
                                                            title="Register New AI System"
                                                            description="Add a new AI system to your compliance registry"
                                                            onClick={() => onNavigate('systems')}
                                                          />
                                            <QuickAction
                                                            icon="⚡"
                                                            title="Run Risk Classification"
                                                            description="Classify a system against EU AI Act & Colorado"
                                                            onClick={() => onNavigate('classification')}
                                                          />
                                            <QuickAction
                                                            icon="📄"
                                                            title="Generate Documentation"
                                                            description="Auto-generate Annex IV technical documentation"
                                                            onClick={() => onNavigate('documentation')}
                                                          />
                                            <QuickAction
                                                            icon="✅"
                                                            title="Start Conformity Assessment"
                                                            description="Begin conformity evidence collection"
                                                            onClick={() => onNavigate('conformity')}
                                                          />
                                            <QuickAction
                                                            icon="🌍"
                                                            title="Check Regulation Updates"
                                                            description="View latest regulatory changes and deadlines"
                                                            onClick={() => onNavigate('regulations')}
                                                          />
                                </div>div>
                      </div>div>
              </div>div>
        </div>div>
      );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function MetricCard({ title, value, subtitle, icon, trend, color }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: string;
    trend: { value: number; label: string; direction: 'up' | 'down' };
    color: 'blue' | 'amber' | 'red' | 'green';
}) {
    const colorMap = {
          blue: 'bg-blue-50 border-blue-200',
          amber: 'bg-amber-50 border-amber-200',
          red: 'bg-red-50 border-red-200',
          green: 'bg-green-50 border-green-200',
    };
  
    return (
          <div className={`rounded-xl border p-5 ${colorMap[color]}`}>
                <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{icon}</span>span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      trend.direction === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
                          {trend.direction === 'up' ? '↑' : '↓'} {trend.value} {trend.label}
                        </span>span>
                </div>div>
                <div className="text-3xl font-bold text-gray-900">{value}</div>div>
                <div className="text-sm text-gray-600 mt-1">{subtitle}</div>div>
          </div>div>
        );
}

function RiskBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
          <div>
                <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">{label}</span>span>
                        <span className="text-gray-500">{count} systems ({percentage.toFixed(0)}%)</span>span>
                </div>div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
                </div>div>
          </div>div>
        );
}

function RiskBadge({ tier }: { tier: 'HIGH' | 'LIMITED' | 'MINIMAL' | 'UNACCEPTABLE' }) {
    const styles = {
          UNACCEPTABLE: 'bg-red-100 text-red-800 border-red-200',
          HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
          LIMITED: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          MINIMAL: 'bg-green-100 text-green-800 border-green-200',
    };
    return (
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[tier]}`}>
            {tier}
          </span>span>
        );
}

function ComplianceBar({ value }: { value: number }) {
    const color = value >= 80 ? 'bg-green-500' : value >= 50 ? 'bg-yellow-500' : 'bg-red-500';
    return (
          <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
                </div>div>
                <span className="text-xs text-gray-600 font-medium">{value}%</span>span>
          </div>div>
        );
}

function StatusBadge({ status }: { status: 'Compliant' | 'Near Compliant' | 'In Progress' | 'Non-Compliant' }) {
    const styles = {
          'Compliant': 'bg-green-100 text-green-800',
          'Near Compliant': 'bg-blue-100 text-blue-800',
          'In Progress': 'bg-yellow-100 text-yellow-800',
          'Non-Compliant': 'bg-red-100 text-red-800',
    };
    return (
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
            {status}
          </span>span>
        );
}

function QuickAction({ icon, title, description, onClick }: {
    icon: string; title: string; description: string; onClick: () => void;
}) {
    return (
          <button
                  onClick={onClick}
                  className="w-full flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left"
                >
                <span className="text-xl mt-0.5">{icon}</span>span>
                <div>
                        <div className="text-sm font-medium text-gray-900">{title}</div>div>
                        <div className="text-xs text-gray-500">{description}</div>div>
                </div>div>
          </button>button>
        );
}</div>
