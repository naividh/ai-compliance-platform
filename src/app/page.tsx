'use client';

import { useAppStore } from '@/lib/store';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { SystemsView } from '@/components/systems/SystemsView';
import { ClassificationView } from '@/components/classification/ClassificationView';
import { DocumentsView } from '@/components/documents/DocumentsView';
import { AssessmentsView } from '@/components/assessment/AssessmentsView';
import { RegulationsView } from '@/components/regulations/RegulationsView';
import { AuditLogView } from '@/components/audit/AuditLogView';
import { SettingsView } from '@/components/settings/SettingsView';

const views: Record<string, React.ComponentType> = {
  dashboard: DashboardView,
  systems: SystemsView,
  classification: ClassificationView,
  documents: DocumentsView,
  assessments: AssessmentsView,
  regulations: RegulationsView,
  'audit-log': AuditLogView,
  settings: SettingsView,
};

export default function Home() {
  const { activeView, sidebarCollapsed } = useAppStore();
  const View = views[activeView] || DashboardView;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-6">
          <View />
        </main>
      </div>
    </div>
  );
}
