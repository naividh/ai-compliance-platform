'use client';

import { useState } from 'react';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { AISystemsRegistry } from '@/components/systems/AISystemsRegistry';
import { RiskClassificationView } from '@/components/classification/RiskClassificationView';
import { DocumentationCenter } from '@/components/documentation/DocumentationCenter';
import { ConformityAssessment } from '@/components/conformity/ConformityAssessment';
import { RegulationTracker } from '@/components/regulations/RegulationTracker';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export type ActiveView = 
  | 'dashboard' 
  | 'systems' 
  | 'classification' 
  | 'documentation' 
  | 'conformity' 
  | 'regulations';

export default function HomePage() {
    const [activeView, setActiveView] = useState<ActiveView>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
        switch (activeView) {
          case 'dashboard':
                    return <DashboardOverview onNavigate={setActiveView} />;
          case 'systems':
                    return <AISystemsRegistry />;
          case 'classification':
                    return <RiskClassificationView />;
          case 'documentation':
                    return <DocumentationCenter />;
          case 'conformity':
                    return <ConformityAssessment />;
          case 'regulations':
                    return <RegulationTracker />;
          default:
                    return <DashboardOverview onNavigate={setActiveView} />;
        }
  };

  return (
        <div className="flex h-screen bg-gray-50">
              <Sidebar 
                        activeView={activeView} 
                onNavigate={setActiveView}
                        isOpen={sidebarOpen}
                        onToggle={() => setSidebarOpen(!sidebarOpen)}
                      />
              <div className="flex-1 flex flex-col overflow-hidden">
                      <Header 
                                  onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
                                  activeView={activeView}
                                />
                      <main className="flex-1 overflow-y-auto p-6">
                        {renderView()}
                      </main>main>
              </div>div>
        </div>div>
      );
}</div>
