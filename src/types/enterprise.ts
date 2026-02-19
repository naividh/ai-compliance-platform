// Enterprise-grade type definitions for AI Compliance Platform

export type RiskTier = 'UNACCEPTABLE' | 'HIGH' | 'LIMITED' | 'MINIMAL';
export type ComplianceStatus = 'COMPLIANT' | 'PARTIAL' | 'NON_COMPLIANT' | 'UNDER_REVIEW' | 'EXEMPTED';
export type AssessmentStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
export type DocumentStatus = 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED' | 'EXPIRED';
export type Jurisdiction = 'EU_AI_ACT' | 'COLORADO_AI_ACT' | 'NYC_LL144' | 'ILLINOIS_BIPA' | 'CALIFORNIA_CPRA' | 'CANADA_AIDA' | 'UK_AI_FRAMEWORK' | 'SINGAPORE_AI_GOVERNANCE';
export type SystemCategory = 'HIRING' | 'LENDING' | 'HEALTHCARE' | 'INSURANCE' | 'LAW_ENFORCEMENT' | 'EDUCATION' | 'CONTENT_MODERATION' | 'CUSTOMER_SERVICE' | 'FRAUD_DETECTION' | 'AUTONOMOUS_VEHICLES' | 'BIOMETRIC' | 'CRITICAL_INFRASTRUCTURE' | 'OTHER';
export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'REJECT' | 'EXPORT' | 'CLASSIFY' | 'ASSESS' | 'GENERATE_DOC' | 'LOGIN' | 'PERMISSION_CHANGE';
export type UserRole = 'ADMIN' | 'COMPLIANCE_OFFICER' | 'DPO' | 'CHIEF_AI_OFFICER' | 'AUDITOR' | 'DEVELOPER' | 'VIEWER';
export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type NotificationType = 'DEADLINE' | 'ASSESSMENT_DUE' | 'REGULATION_UPDATE' | 'SYSTEM_CHANGE' | 'APPROVAL_REQUIRED' | 'COMPLIANCE_ALERT';

export interface Organization {
  id: string;
  name: string;
  industry: string;
  size: 'STARTUP' | 'SMB' | 'ENTERPRISE' | 'GLOBAL_ENTERPRISE';
  jurisdictions: Jurisdiction[];
  createdAt: string;
  subscription: 'FREE' | 'PROFESSIONAL' | 'ENTERPRISE' | 'ENTERPRISE_PLUS';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
  avatar?: string;
  lastLogin: string;
  permissions: Permission[];
  mfaEnabled: boolean;
}

export interface Permission {
  resource: string;
  actions: ('read' | 'write' | 'delete' | 'approve')[];
}

export interface AISystem {
  id: string;
  name: string;
  description: string;
  version: string;
  category: SystemCategory;
  department: string;
  owner: string;
  ownerId: string;
  techStack: string[];
  dataTypes: string[];
  affectedPopulation: string;
  estimatedUsers: number;
  deploymentDate: string;
  lastAssessment: string | null;
  riskClassification: RiskClassification;
  complianceStatus: Record<Jurisdiction, ComplianceStatus>;
  documentation: DocumentationStatus;
  integrations: Integration[];
  modelDetails: ModelDetails;
  dataGovernance: DataGovernance;
  status: 'ACTIVE' | 'DEVELOPMENT' | 'DEPRECATED' | 'DECOMMISSIONED';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RiskClassification {
  overallTier: RiskTier;
  confidence: number;
  euAiActTier: RiskTier;
  coloradoTier: string;
  annexReference: string;
  articleReference: string;
  classifiedAt: string;
  classifiedBy: string;
  reasoning: ClassificationReasoning[];
  obligations: Obligation[];
  mitigationMeasures: MitigationMeasure[];
}

export interface ClassificationReasoning {
  factor: string;
  description: string;
  impact: 'INCREASES_RISK' | 'DECREASES_RISK' | 'NEUTRAL';
  weight: number;
}

export interface Obligation {
  id: string;
  title: string;
  article: string;
  description: string;
  deadline: string;
  status: 'MET' | 'IN_PROGRESS' | 'NOT_MET' | 'NOT_APPLICABLE';
  evidence: string[];
}

export interface MitigationMeasure {
  id: string;
  title: string;
  description: string;
  implementedAt: string | null;
  status: 'PLANNED' | 'IN_PROGRESS' | 'IMPLEMENTED' | 'VERIFIED';
}

export interface ModelDetails {
  type: string;
  framework: string;
  version: string;
  trainingDataSize: string;
  trainingDataSources: string[];
  performanceMetrics: Record<string, number>;
  biasMetrics: BiasMetric[];
  explainability: 'HIGH' | 'MEDIUM' | 'LOW' | 'BLACK_BOX';
  humanOversight: 'FULL' | 'PARTIAL' | 'MINIMAL' | 'NONE';
}

export interface BiasMetric {
  category: string;
  metric: string;
  value: number;
  threshold: number;
  status: 'PASS' | 'FAIL' | 'WARNING';
}

export interface DataGovernance {
  dataClassification: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED';
  personalDataProcessed: boolean;
  specialCategoryData: boolean;
  dataRetentionPeriod: string;
  crossBorderTransfer: boolean;
  dpiaRequired: boolean;
  dpiaCompleted: boolean;
  dataProcessingAgreements: string[];
}

export interface Integration {
  id: string;
  name: string;
  type: 'API' | 'DATABASE' | 'ML_PLATFORM' | 'MONITORING' | 'CICD';
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR';
  lastSync: string;
}

export interface DocumentationStatus {
  annexIV: { status: DocumentStatus; completeness: number; lastUpdated: string; };
  technicalDoc: { status: DocumentStatus; completeness: number; lastUpdated: string; };
  riskAssessment: { status: DocumentStatus; completeness: number; lastUpdated: string; };
  conformityDeclaration: { status: DocumentStatus; completeness: number; lastUpdated: string; };
  impactAssessment: { status: DocumentStatus; completeness: number; lastUpdated: string; };
}

export interface ConformityAssessment {
  id: string;
  systemId: string;
  systemName: string;
  jurisdiction: Jurisdiction;
  status: AssessmentStatus;
  overallScore: number;
  requirements: AssessmentRequirement[];
  assessor: string;
  startedAt: string;
  completedAt: string | null;
  nextDue: string;
  findings: Finding[];
  remediationPlan: RemediationItem[];
}

export interface AssessmentRequirement {
  id: string;
  article: string;
  title: string;
  description: string;
  category: string;
  status: 'PASS' | 'FAIL' | 'PARTIAL' | 'NOT_ASSESSED';
  evidence: Evidence[];
  notes: string;
  priority: Priority;
}

export interface Evidence {
  id: string;
  name: string;
  type: 'DOCUMENT' | 'SCREENSHOT' | 'LOG' | 'CERTIFICATE' | 'TEST_RESULT' | 'POLICY';
  uploadedAt: string;
  uploadedBy: string;
  url: string;
  verified: boolean;
}

export interface Finding {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  title: string;
  description: string;
  requirement: string;
  status: 'OPEN' | 'IN_REMEDIATION' | 'RESOLVED' | 'ACCEPTED_RISK';
  dueDate: string;
  assignee: string;
}

export interface RemediationItem {
  id: string;
  findingId: string;
  action: string;
  assignee: string;
  dueDate: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  completedAt: string | null;
}

export interface Regulation {
  id: string;
  name: string;
  shortName: string;
  jurisdiction: Jurisdiction;
  status: 'ENACTED' | 'PROPOSED' | 'IN_FORCE' | 'PARTIALLY_IN_FORCE';
  enforcementDate: string;
  description: string;
  keyProvisions: string[];
  penaltyStructure: PenaltyStructure;
  applicability: string[];
  updates: RegulationUpdate[];
  complianceRequirements: string[];
}

export interface PenaltyStructure {
  maxFine: string;
  maxFinePercentage: string;
  criminalPenalties: boolean;
  enforcementBody: string;
}

export interface RegulationUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  affectedArticles: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  changes?: { field: string; oldValue: string; newValue: string; }[];
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: Priority;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  relatedSystemId?: string;
}

export interface DashboardMetrics {
  totalSystems: number;
  highRiskSystems: number;
  compliantSystems: number;
  partiallyCompliant: number;
  nonCompliant: number;
  pendingAssessments: number;
  overdueAssessments: number;
  upcomingDeadlines: Deadline[];
  complianceByJurisdiction: Record<Jurisdiction, { total: number; compliant: number; percentage: number; }>;
  riskDistribution: Record<RiskTier, number>;
  recentActivity: AuditLogEntry[];
  complianceTrend: { month: string; score: number; }[];
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  jurisdiction: Jurisdiction;
  type: 'REGULATION' | 'ASSESSMENT' | 'DOCUMENTATION' | 'REMEDIATION';
  priority: Priority;
  relatedSystemIds: string[];
  daysRemaining: number;
}

export interface ExportOptions {
  format: 'PDF' | 'DOCX' | 'JSON' | 'CSV' | 'XML';
  includeEvidence: boolean;
  includeAuditTrail: boolean;
  sections: string[];
  watermark: boolean;
  classification: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL';
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  meta?: { page: number; pageSize: number; total: number; };
  timestamp: string;
  requestId: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
  timestamp: string;
  requestId: string;
}
