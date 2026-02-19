import { create } from 'zustand';
import type { AISystem, ConformityAssessment, Regulation, AuditLogEntry, Notification, DashboardMetrics, User, Organization } from '@/types/enterprise';
import { enterpriseSystems, enterpriseAssessments, enterpriseRegulations, enterpriseAuditLog, enterpriseNotifications, enterpriseMetrics, currentUser, currentOrg } from './mock-data';

interface AppState {
  // Auth
  user: User;
  organization: Organization;
  
  // Data
  systems: AISystem[];
  assessments: ConformityAssessment[];
  regulations: Regulation[];
  auditLog: AuditLogEntry[];
  notifications: Notification[];
  metrics: DashboardMetrics;
  
  // UI State
  sidebarCollapsed: boolean;
  activeView: string;
  searchQuery: string;
  selectedSystemId: string | null;
  filterRiskTier: string | null;
  filterJurisdiction: string | null;
  filterStatus: string | null;
  isLoading: boolean;
  
  // Actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveView: (view: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedSystemId: (id: string | null) => void;
  setFilterRiskTier: (tier: string | null) => void;
  setFilterJurisdiction: (jurisdiction: string | null) => void;
  setFilterStatus: (status: string | null) => void;
  markNotificationRead: (id: string) => void;
  addAuditEntry: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
  updateSystemStatus: (systemId: string, jurisdiction: string, status: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: currentUser,
  organization: currentOrg,
  systems: enterpriseSystems,
  assessments: enterpriseAssessments,
  regulations: enterpriseRegulations,
  auditLog: enterpriseAuditLog,
  notifications: enterpriseNotifications,
  metrics: enterpriseMetrics,
  
  sidebarCollapsed: false,
  activeView: 'dashboard',
  searchQuery: '',
  selectedSystemId: null,
  filterRiskTier: null,
  filterJurisdiction: null,
  filterStatus: null,
  isLoading: false,
  
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setActiveView: (view) => set({ activeView: view, selectedSystemId: null }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedSystemId: (id) => set({ selectedSystemId: id }),
  setFilterRiskTier: (tier) => set({ filterRiskTier: tier }),
  setFilterJurisdiction: (jurisdiction) => set({ filterJurisdiction: jurisdiction }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  
  addAuditEntry: (entry) => set((state) => ({
    auditLog: [{ ...entry, id: `audit-${Date.now()}`, timestamp: new Date().toISOString() }, ...state.auditLog]
  })),
  
  updateSystemStatus: (systemId, jurisdiction, status) => set((state) => ({
    systems: state.systems.map(s => s.id === systemId ? {
      ...s, complianceStatus: { ...s.complianceStatus, [jurisdiction]: status }
    } : s)
  })),
}));

export const useStore = useAppStore;
