// ============================================================
// AI COMPLIANCE PLATFORM — ENTERPRISE TYPE DEFINITIONS
// ============================================================

// --- Core Enums ---
export type RiskTier = 'unacceptable' | 'high' | 'limited' | 'minimal';
export type ComplianceStatus = 'compliant' | 'partial' | 'non-compliant' | 'pending-review' | 'exempt';
export type DocumentStatus = 'draft' | 'in-progress' | 'review' | 'approved' | 'submitted' | 'expired';
export type AssessmentStatus = 'not-started' | 'in-progress' | 'passed' | 'failed' | 'pending' | 'waived';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Jurisdiction = 'eu' | 'us-federal' | 'us-colorado' | 'us-california' | 'us-illinois' | 'us-nyc' | 'uk' | 'canada' | 'brazil' | 'china';
export type AuditAction = 'create' | 'update' | 'delete' | 'classify' | 'assess' | 'generate' | 'approve' | 'submit' | 'export' | 'login' | 'assign';
export type UserRole = 'admin' | 'compliance-officer' | 'dpo' | 'chief-ai-officer' | 'auditor' | 'viewer';

// --- User & Auth ---
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  avatar?: string;
  lastLogin: string;
  permissions: string[];
  mfaEnabled: boolean;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: string;
  ipAddress: string;
}

// --- AI System ---
export interface AISystem {
  id: string;
  name: string;
  description: string;
  version: string;
  vendor: string;
  department: string;
  owner: string;
  deployers: string[];
  aiCapabilities: string[];
  domain: string;
  subDomain: string;
  usesPersonalData: boolean;
  usesBiometricData: boolean;
  affectsVulnerableGroups: boolean;
  isAutonomous: boolean;
  humanOversightLevel: 'human-in-the-loop' | 'human-on-the-loop' | 'human-in-command' | 'fully-autonomous';
  deploymentDate: string;
  lastAssessmentDate?: string;
  nextAssessmentDue?: string;
  dataCategories: string[];
  outputTypes: string[];
  intendedPurpose: string;
  geographicScope: Jurisdiction[];
  regulatoryFrameworks: string[];
  riskTier: RiskTier;
  riskScore: number;
  complianceStatus: ComplianceStatus;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// --- Risk Classification ---
export interface ClassificationResult {
  systemId: string;
  riskTier: RiskTier;
  confidence: number;
  riskScore: number;
  classificationReasons: ClassificationReason[];
  obligations: Obligation[];
  jurisdictionalResults: JurisdictionalResult[];
  euAIActArticle: string;
  annexReference?: string;
  classifiedAt: string;
  classifiedBy: string;
  methodology: string;
  version: string;
}

export interface ClassificationReason {
  factor: string;
  weight: number;
  description: string;
  regulatoryBasis: string;
}

export interface Obligation {
  id: string;
  title: string;
  description: string;
  article: string;
  deadline: string;
  priority: Priority;
  status: AssessmentStatus;
  assignee?: string;
}

export interface JurisdictionalResult {
  jurisdiction: Jurisdiction;
  regulationName: string;
  applicability: 'applicable' | 'not-applicable' | 'uncertain';
  riskTier: string;
  status: ComplianceStatus;
  keyRequirements: string[];
  deadline?: string;
}

// --- Conformity Assessment ---
export interface ConformityAssessment {
  id: string;
  systemId: string;
  systemName: string;
  assessmentType: 'internal' | 'third-party' | 'notified-body';
  assessor: string;
  assessorOrg: string;
  startDate: string;
  completionDate?: string;
  status: 'in-progress' | 'conformant' | 'non-conformant' | 'conditionally-conformant';
  overallScore: number;
  requirements: AssessmentRequirement[];
  findings: Finding[];
  remediation: RemediationPlan[];
  evidencePackage: EvidenceItem[];
  signoff: Signoff[];
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentRequirement {
  id: string;
  requirement: string;
  article: string;
  category: string;
  status: AssessmentStatus;
  evidence: string[];
  notes: string;
  priority: Priority;
  testedBy?: string;
  testedAt?: string;
  findings: string[];
}

export interface Finding {
  id: string;
  severity: Priority;
  title: string;
  description: string;
  requirement: string;
  recommendation: string;
  status: 'open' | 'in-remediation' | 'resolved' | 'accepted-risk';
  dueDate: string;
  assignee?: string;
}

export interface RemediationPlan {
  findingId: string;
  action: string;
  owner: string;
  dueDate: string;
  status: 'planned' | 'in-progress' | 'completed' | 'overdue';
  completedAt?: string;
  evidence?: string[];
}

export interface EvidenceItem {
  id: string;
  name: string;
  type: 'document' | 'screenshot' | 'log' | 'report' | 'certificate' | 'test-result';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  size: number;
  hash: string;
  tags: string[];
}

export interface Signoff {
  role: string;
  name: string;
  signedAt?: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
}

// --- Documentation (Annex IV) ---
export interface AnnexIVDocument {
  id: string;
  systemId: string;
  systemName: string;
  version: string;
  status: DocumentStatus;
  generatedAt: string;
  lastModified: string;
  modifiedBy: string;
  sections: AnnexIVSection[];
  overallCompleteness: number;
  reviewers: Signoff[];
  exportHistory: ExportRecord[];
}

export interface AnnexIVSection {
  sectionNumber: string;
  title: string;
  description: string;
  requiredContent: string[];
  status: 'complete' | 'partial' | 'missing';
  generatedContent?: string;
  manualContent?: string;
  sourceArtifacts: string[];
  lastGenerated?: string;
  reviewStatus: 'draft' | 'reviewed' | 'approved';
  reviewer?: string;
}

export interface ExportRecord {
  id: string;
  format: 'pdf' | 'docx' | 'html' | 'json';
  exportedBy: string;
  exportedAt: string;
  fileUrl: string;
  fileSize: number;
}

// --- Regulation ---
export interface Regulation {
  id: string;
  name: string;
  shortName: string;
  jurisdiction: Jurisdiction;
  jurisdictionLabel: string;
  status: 'draft' | 'proposed' | 'enacted' | 'effective' | 'repealed';
  effectiveDate: string;
  enforcementDate: string;
  description: string;
  keyProvisions: string[];
  riskTiers: string[];
  penalties: string;
  impactedSystemCount: number;
  complianceDeadlines: ComplianceDeadline[];
  lastUpdated: string;
  sourceUrl?: string;
}

export interface ComplianceDeadline {
  id: string;
  date: string;
  description: string;
  urgency: Priority;
  regulation: string;
  status: 'upcoming' | 'overdue' | 'met' | 'waived';
  assignee?: string;
}

// --- Audit Log ---
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  userId: string;
  userName: string;
  userRole: UserRole;
  entityType: 'system' | 'assessment' | 'document' | 'regulation' | 'user' | 'setting';
  entityId: string;
  entityName: string;
  details: string;
  ipAddress: string;
  metadata?: Record<string, unknown>;
}

// --- Dashboard Analytics ---
export interface DashboardMetrics {
  totalSystems: number;
  systemsByRisk: Record<RiskTier, number>;
  systemsByCompliance: Record<ComplianceStatus, number>;
  overallComplianceScore: number;
  documentsComplete: number;
  documentsTotal: number;
  assessmentsPassed: number;
  assessmentsTotal: number;
  upcomingDeadlines: ComplianceDeadline[];
  recentActivity: AuditLogEntry[];
  riskTrend: { month: string; score: number }[];
  complianceTrend: { month: string; score: number }[];
}

// --- Notification ---
export interface Notification {
  id: string;
  type: 'deadline' | 'assessment' | 'finding' | 'regulation-update' | 'system-alert';
  severity: Priority;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  expiresAt?: string;
}

// --- API Response ---
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  meta?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
