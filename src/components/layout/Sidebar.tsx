'use client';

import type { ActiveView } from '@/app/page';

interface SidebarProps {
    activeView: ActiveView;
    onNavigate: (view: ActiveView) => void;
    isOpen: boolean;
    onToggle: () => void;
}

const NAV_ITEMS: { id: ActiveView; label: string; icon: string; badge?: number }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'systems', label: 'AI Systems Registry', icon: '🤖', badge: 23 },
  { id: 'classification', label: 'Risk Classification', icon: '⚡' },
  { id: 'documentation', label: 'Documentation', icon: '📄', badge: 3 },
  { id: 'conformity', label: 'Conformity Assessment', icon: '✅' },
  { id: 'regulations', label: 'Regulation Tracker', icon: '🌍' },
  ];

export function Sidebar({ activeView, onNavigate, isOpen, onToggle }: SidebarProps) {
    return (
          <aside className={`bg-gray-900 text-white transition-all duration-300 flex flex-col ${isOpen ? 'w-64' : 'w-16'}`}>
            {/* Logo */}
                  <div className="p-4 border-b border-gray-800">
                          <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                AI
                                    </div>div>
                            {isOpen && (
                        <div>
                                      <div className="font-bold text-sm">ComplianceAI</div>div>
                                      <div className="text-xs text-gray-400">Regulation Platform</div>div>
                        </div>div>
                                    )}
                          </div>div>
                  </div>div>
          
            {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1">
                  {isOpen && <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Main</div>div>}
                  {NAV_ITEMS.map((item) => (
                      <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                                    activeView === item.id
                                                      ? 'bg-indigo-600 text-white'
                                                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                  >
                                  <span className="text-lg flex-shrink-0">{item.icon}</span>span>
                        {isOpen && (
                                                  <>
                                                                  <span className="flex-1 text-left">{item.label}</span>span>
                                                    {item.badge && (
                                                                      <span className="bg-gray-700 text-xs px-2 py-0.5 rounded-full">{item.badge}</span>span>
                                                                  )}
                                                  </>>
                                                )}
                      </button>button>
                    ))}
                </nav>nav>
          
            {/* Deadline Widget */}
            {isOpen && (
                    <div className="p-3">
                              <div className="bg-red-900/50 border border-red-800 rounded-lg p-3">
                                          <div className="text-xs font-semibold text-red-300">EU AI Act Deadline</div>div>
                                          <div className="text-xl font-bold text-white mt-1">164 days</div>div>
                                          <div className="text-xs text-red-400 mt-1">August 2, 2026</div>div>
                                          <div className="w-full bg-red-800 rounded-full h-1.5 mt-2">
                                                        <div className="bg-red-400 h-1.5 rounded-full" style={{ width: '55%' }} />
                                          </div>div>
                              </div>div>
                    </div>div>
                )}
          
            {/* Toggle Button */}
                <div className="p-3 border-t border-gray-800">
                        <button
                                    onClick={onToggle}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                                  >
                          {isOpen ? '← Collapse' : '→'}
                        </button>button>
                </div>div>
          </aside>aside>
        );
}</></div>
