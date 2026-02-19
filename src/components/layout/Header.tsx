'use client';

import type { ActiveView } from '@/app/page';

interface HeaderProps {
    onMenuToggle: () => void;
    activeView: ActiveView;
}

const VIEW_TITLES: Record<ActiveView, string> = {
    dashboard: 'Compliance Dashboard',
    systems: 'AI Systems Registry',
    classification: 'Risk Classification',
    documentation: 'Documentation Center',
    conformity: 'Conformity Assessment',
    regulations: 'Regulation Tracker',
};

export function Header({ onMenuToggle, activeView }: HeaderProps) {
    return (
          <header className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                                  <button
                                                onClick={onMenuToggle}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                              >
                                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                              </svg>svg>
                                  </button>button>
                                  <div>
                                              <h1 className="text-lg font-semibold text-gray-900">{VIEW_TITLES[activeView]}</h1>h1>
                                  </div>div>
                        </div>div>
                
                        <div className="flex items-center gap-4">
                          {/* Search */}
                                  <div className="relative">
                                              <input
                                                              type="text"
                                                              placeholder="Search systems, regulations..."
                                                              className="w-64 pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                            />
                                              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                              </svg>svg>
                                  </div>div>
                        
                          {/* Notifications */}
                                  <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                              </svg>svg>
                                              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                                  </button>button>
                        
                          {/* User */}
                                  <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                                              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                            <span className="text-sm font-medium text-indigo-600">SC</span>span>
                                              </div>div>
                                              <div className="text-sm">
                                                            <div className="font-medium text-gray-900">Sarah Chen</div>div>
                                                            <div className="text-xs text-gray-500">Chief AI Officer</div>div>
                                              </div>div>
                                  </div>div>
                        </div>div>
                </div>div>
          </header>header>
        );
}</header>
