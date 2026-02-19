"use client";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import LoginPage from "@/components/auth/LoginPage";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import DashboardView from "@/components/dashboard/DashboardView";
import SystemsView from "@/components/systems/SystemsView";
import ClassificationView from "@/components/classification/ClassificationView";
import DocumentsView from "@/components/documents/DocumentsView";
import AssessmentsView from "@/components/assessment/AssessmentsView";
import RegulationsView from "@/components/regulations/RegulationsView";
import AuditLogView from "@/components/audit/AuditLogView";
import SettingsView from "@/components/settings/SettingsView";
import { useStore } from "@/lib/store";

function AppContent() {
  const { user, loading } = useAuth();
  const { activeView } = useStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const renderView = () => {
    switch (activeView) {
      case "dashboard": return <DashboardView />;
      case "systems": return <SystemsView />;
      case "classification": return <ClassificationView />;
      case "documents": return <DocumentsView />;
      case "assessments": return <AssessmentsView />;
      case "regulations": return <RegulationsView />;
      case "audit": return <AuditLogView />;
      case "settings": return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
