import type { AISystem, ConformityAssessment, Regulation, AuditLogEntry, Notification, DashboardMetrics, User, Organization } from "@/types/enterprise";

export const currentUser: User = {
  id: "usr-001", email: "sarah.chen@acmecorp.com", name: "Sarah Chen",
  role: "CHIEF_AI_OFFICER", organizationId: "org-001", lastLogin: "2026-02-19T09:30:00Z",
  permissions: [{ resource: "*", actions: ["read", "write", "delete", "approve"] }], mfaEnabled: true
};

export const currentOrg: Organization = {
  id: "org-001", name: "Acme Global Technologies", industry: "Financial Services & Technology",
  size: "GLOBAL_ENTERPRISE", jurisdictions: ["EU_AI_ACT", "COLORADO_AI_ACT", "NYC_LL144", "CALIFORNIA_CPRA", "UK_AI_FRAMEWORK"],
  createdAt: "2024-03-15T00:00:00Z", subscription: "ENTERPRISE_PLUS"
};

const mkSystem = (id: string, name: string, desc: string, cat: any, dept: string, owner: string, tier: any, confidence: number, euTier: any, annex: string, article: string, status: any, tags: string[], techStack: string[], population: string, users: number): AISystem => ({
  id, name, description: desc, version: "2.1.0", category: cat, department: dept,
  owner, ownerId: "usr-002", techStack, dataTypes: ["PII", "behavioral", "financial"],
  affectedPopulation: population, estimatedUsers: users, deploymentDate: "2025-06-15",
  lastAssessment: "2026-01-15", status: "ACTIVE", tags, createdAt: "2025-01-10T00:00:00Z", updatedAt: "2026-02-15T00:00:00Z",
  riskClassification: {
    overallTier: tier, confidence, euAiActTier: euTier, coloradoTier: tier === "HIGH" ? "High-Risk" : "Standard",
    annexReference: annex, articleReference: article, classifiedAt: "2026-01-20T00:00:00Z",
    classifiedBy: "AI Classification Engine v3.2", reasoning: [
      { factor: "Domain Impact", description: `System operates in ${cat.toLowerCase()} domain`, impact: "INCREASES_RISK", weight: 0.35 },
      { factor: "Population Scale", description: `Affects ${population}`, impact: tier === "HIGH" ? "INCREASES_RISK" : "NEUTRAL", weight: 0.25 },
      { factor: "Automation Level", description: "Semi-autonomous decision making", impact: "INCREASES_RISK", weight: 0.2 },
      { factor: "Human Oversight", description: "Human-in-the-loop controls present", impact: "DECREASES_RISK", weight: 0.2 }
    ],
    obligations: [
      { id: `obl-${id}-1`, title: "Risk Management System", article: "Article 9", description: "Establish and maintain risk management system", deadline: "2026-08-02", status: status === "COMPLIANT" ? "MET" : "IN_PROGRESS", evidence: ["risk-mgmt-doc.pdf"] },
      { id: `obl-${id}-2`, title: "Data Governance", article: "Article 10", description: "Data quality and governance measures", deadline: "2026-08-02", status: status === "COMPLIANT" ? "MET" : "IN_PROGRESS", evidence: [] },
      { id: `obl-${id}-3`, title: "Technical Documentation", article: "Article 11", description: "Maintain up-to-date technical documentation", deadline: "2026-08-02", status: "IN_PROGRESS", evidence: ["tech-doc-v2.pdf"] },
      { id: `obl-${id}-4`, title: "Transparency", article: "Article 13", description: "Provide clear information to deployers", deadline: "2026-08-02", status: status === "COMPLIANT" ? "MET" : "NOT_MET", evidence: [] },
      { id: `obl-${id}-5`, title: "Human Oversight", article: "Article 14", description: "Enable effective human oversight", deadline: "2026-08-02", status: "MET", evidence: ["oversight-policy.pdf"] },
      { id: `obl-${id}-6`, title: "Accuracy & Robustness", article: "Article 15", description: "Appropriate levels of accuracy and robustness", deadline: "2026-08-02", status: "IN_PROGRESS", evidence: [] }
    ],
    mitigationMeasures: [
      { id: `mit-${id}-1`, title: "Bias Monitoring Pipeline", description: "Continuous bias detection and alerting", implementedAt: "2025-11-01", status: "IMPLEMENTED" },
      { id: `mit-${id}-2`, title: "Explainability Module", description: "SHAP/LIME integration for decision explanations", implementedAt: null, status: "IN_PROGRESS" },
      { id: `mit-${id}-3`, title: "Human Review Workflow", description: "Mandatory human review for high-impact decisions", implementedAt: "2025-09-15", status: "VERIFIED" }
    ]
  },
  complianceStatus: {
    EU_AI_ACT: status, COLORADO_AI_ACT: status === "COMPLIANT" ? "PARTIAL" : status,
    NYC_LL144: cat === "HIRING" ? status : "EXEMPTED", ILLINOIS_BIPA: "EXEMPTED",
    CALIFORNIA_CPRA: "PARTIAL", CANADA_AIDA: "UNDER_REVIEW", UK_AI_FRAMEWORK: "PARTIAL", SINGAPORE_AI_GOVERNANCE: "EXEMPTED"
  },
  documentation: {
    annexIV: { status: status === "COMPLIANT" ? "APPROVED" : "IN_REVIEW", completeness: status === "COMPLIANT" ? 100 : 72, lastUpdated: "2026-02-10" },
    technicalDoc: { status: "IN_REVIEW", completeness: 85, lastUpdated: "2026-02-08" },
    riskAssessment: { status: status === "COMPLIANT" ? "APPROVED" : "DRAFT", completeness: status === "COMPLIANT" ? 100 : 45, lastUpdated: "2026-01-28" },
    conformityDeclaration: { status: "DRAFT", completeness: 30, lastUpdated: "2026-01-15" },
    impactAssessment: { status: "IN_REVIEW", completeness: 68, lastUpdated: "2026-02-05" }
  },
  integrations: [
    { id: `int-${id}-1`, name: "AWS SageMaker", type: "ML_PLATFORM", status: "CONNECTED", lastSync: "2026-02-19T08:00:00Z" },
    { id: `int-${id}-2`, name: "Datadog", type: "MONITORING", status: "CONNECTED", lastSync: "2026-02-19T09:00:00Z" },
    { id: `int-${id}-3`, name: "GitHub Actions", type: "CICD", status: "CONNECTED", lastSync: "2026-02-18T22:00:00Z" }
  ],
  modelDetails: {
    type: "Gradient Boosted Trees + Neural Network Ensemble", framework: "PyTorch 2.2 + XGBoost",
    version: "3.1.4", trainingDataSize: "2.4M records", trainingDataSources: ["Internal CRM", "Public datasets", "Partner feeds"],
    performanceMetrics: { accuracy: 0.94, precision: 0.91, recall: 0.89, f1Score: 0.90, auc: 0.96 },
    biasMetrics: [
      { category: "Gender", metric: "Demographic Parity", value: 0.03, threshold: 0.05, status: "PASS" },
      { category: "Race/Ethnicity", metric: "Equalized Odds", value: 0.07, threshold: 0.08, status: "WARNING" },
      { category: "Age", metric: "Calibration", value: 0.02, threshold: 0.05, status: "PASS" },
      { category: "Disability", metric: "Equal Opportunity", value: 0.04, threshold: 0.05, status: "PASS" }
    ],
    explainability: "MEDIUM", humanOversight: "PARTIAL"
  },
  dataGovernance: {
    dataClassification: "CONFIDENTIAL", personalDataProcessed: true, specialCategoryData: cat === "HEALTHCARE",
    dataRetentionPeriod: "36 months", crossBorderTransfer: true, dpiaRequired: true, dpiaCompleted: tier === "HIGH",
    dataProcessingAgreements: ["DPA-AWS-2025", "DPA-GCP-2025"]
  }
});

export const enterpriseSystems: AISystem[] = [
  mkSystem("sys-001", "TalentMatch AI", "ML-powered candidate screening and ranking system for enterprise recruitment", "HIRING", "Human Resources", "Marcus Johnson", "HIGH", 94, "HIGH", "Annex III, Section 4(a)", "Article 6(2)", "PARTIAL", ["hiring", "ML", "NLP", "bias-critical"], ["Python", "PyTorch", "PostgreSQL", "Redis", "Docker"], "Job applicants across 12 EU member states", 45000),
  mkSystem("sys-002", "CreditDecision Engine", "Automated credit scoring and loan approval system for consumer and SMB lending", "LENDING", "Financial Products", "Elena Rodriguez", "HIGH", 97, "HIGH", "Annex III, Section 5(b)", "Article 6(2)", "COMPLIANT", ["lending", "credit", "financial", "regulated"], ["Python", "TensorFlow", "Spark", "Kafka", "PostgreSQL"], "Loan applicants in EU and US markets", 120000),
  mkSystem("sys-003", "ClaimIQ Processor", "Insurance claims triage and fraud detection using computer vision and NLP", "INSURANCE", "Claims Operations", "David Park", "HIGH", 91, "HIGH", "Annex III, Section 5(c)", "Article 6(2)", "NON_COMPLIANT", ["insurance", "fraud", "CV", "claims"], ["Python", "OpenCV", "BERT", "MongoDB", "Kubernetes"], "Insurance policyholders across EU", 85000),
  mkSystem("sys-004", "PatientRisk Analyzer", "Clinical decision support system for patient risk stratification", "HEALTHCARE", "Digital Health", "Dr. Aisha Patel", "HIGH", 96, "HIGH", "Annex III, Section 5(a)", "Article 6(2)", "PARTIAL", ["healthcare", "clinical", "risk", "HIPAA"], ["Python", "scikit-learn", "FHIR API", "PostgreSQL", "Docker"], "Hospital patients in partner network", 200000),
  mkSystem("sys-005", "ContentGuard AI", "Automated content moderation for user-generated content platforms", "CONTENT_MODERATION", "Trust & Safety", "Lisa Wang", "LIMITED", 82, "LIMITED", "N/A", "Article 52", "COMPLIANT", ["content", "moderation", "NLP", "safety"], ["Python", "Transformers", "Redis", "Elasticsearch"], "Platform users globally", 2500000),
  mkSystem("sys-006", "FraudShield Pro", "Real-time transaction fraud detection and prevention system", "FRAUD_DETECTION", "Security Operations", "James Mitchell", "HIGH", 89, "HIGH", "Annex III, Section 5(b)", "Article 6(2)", "PARTIAL", ["fraud", "real-time", "financial", "security"], ["Java", "Kafka Streams", "Flink", "Cassandra", "Kubernetes"], "All payment processing customers", 500000),
  mkSystem("sys-007", "SmartAssist Chatbot", "Customer service virtual assistant with multi-language support", "CUSTOMER_SERVICE", "Customer Experience", "Rachel Green", "LIMITED", 75, "LIMITED", "N/A", "Article 52", "COMPLIANT", ["chatbot", "NLP", "customer-service", "multilingual"], ["TypeScript", "GPT-4", "Node.js", "MongoDB"], "Customer base across all markets", 1800000),
  mkSystem("sys-008", "BiometricAccess System", "Facial recognition based access control for secure facilities", "BIOMETRIC", "Physical Security", "Tom Bradley", "HIGH", 98, "HIGH", "Annex III, Section 1(a)", "Article 6(2)", "NON_COMPLIANT", ["biometric", "facial-recognition", "access-control", "privacy-critical"], ["C++", "TensorRT", "CUDA", "PostgreSQL"], "Employees and contractors at EU facilities", 15000)
];

const mkAssessment = (id: string, sysId: string, sysName: string, jur: any, status: any, score: number): ConformityAssessment => ({
  id, systemId: sysId, systemName: sysName, jurisdiction: jur, status, overallScore: score,
  assessor: "Sarah Chen", startedAt: "2026-01-10T00:00:00Z", completedAt: status === "APPROVED" ? "2026-02-01T00:00:00Z" : null,
  nextDue: "2026-07-01T00:00:00Z",
  requirements: [
    { id: `${id}-r1`, article: "Art. 9", title: "Risk Management System", description: "Establishment, implementation, documentation and maintenance of a risk management system", category: "Risk Management", status: score > 80 ? "PASS" : "PARTIAL", evidence: [{ id: "ev1", name: "RMS-Policy-v3.pdf", type: "POLICY", uploadedAt: "2026-01-15", uploadedBy: "Sarah Chen", url: "#", verified: true }], notes: "Risk management framework implemented", priority: "CRITICAL" },
    { id: `${id}-r2`, article: "Art. 10", title: "Data Governance", description: "Training, validation and testing data requirements", category: "Data Quality", status: score > 70 ? "PASS" : "FAIL", evidence: [], notes: "", priority: "HIGH" },
    { id: `${id}-r3`, article: "Art. 11", title: "Technical Documentation", description: "Technical documentation as referred to in Annex IV", category: "Documentation", status: "PARTIAL", evidence: [{ id: "ev2", name: "AnnexIV-draft.pdf", type: "DOCUMENT", uploadedAt: "2026-02-05", uploadedBy: "Marcus Johnson", url: "#", verified: false }], notes: "Documentation 72% complete", priority: "HIGH" },
    { id: `${id}-r4`, article: "Art. 12", title: "Record Keeping", description: "Automatic logging of events", category: "Transparency", status: score > 80 ? "PASS" : "PARTIAL", evidence: [], notes: "Audit logging enabled", priority: "MEDIUM" },
    { id: `${id}-r5`, article: "Art. 13", title: "Transparency", description: "Transparency and provision of information to deployers", category: "Transparency", status: score > 85 ? "PASS" : "PARTIAL", evidence: [], notes: "", priority: "HIGH" },
    { id: `${id}-r6`, article: "Art. 14", title: "Human Oversight", description: "Human oversight measures", category: "Oversight", status: "PASS", evidence: [{ id: "ev3", name: "HITL-Process.pdf", type: "DOCUMENT", uploadedAt: "2026-01-20", uploadedBy: "Dr. Aisha Patel", url: "#", verified: true }], notes: "HITL process documented and verified", priority: "CRITICAL" },
    { id: `${id}-r7`, article: "Art. 15", title: "Accuracy & Robustness", description: "Accuracy, robustness and cybersecurity", category: "Performance", status: score > 75 ? "PASS" : "FAIL", evidence: [], notes: "", priority: "HIGH" },
    { id: `${id}-r8`, article: "Art. 17", title: "Quality Management", description: "Quality management system", category: "Quality", status: score > 80 ? "PASS" : "PARTIAL", evidence: [], notes: "", priority: "MEDIUM" }
  ],
  findings: [
    { id: `${id}-f1`, severity: "HIGH", title: "Incomplete bias testing documentation", description: "Bias testing results not fully documented for all protected categories", requirement: "Art. 10", status: "IN_REMEDIATION", dueDate: "2026-04-01", assignee: "Marcus Johnson" },
    { id: `${id}-f2`, severity: "MEDIUM", title: "Missing data lineage tracking", description: "Training data provenance not fully traceable", requirement: "Art. 10", status: "OPEN", dueDate: "2026-05-01", assignee: "Elena Rodriguez" }
  ],
  remediationPlan: [
    { id: `${id}-rem1`, findingId: `${id}-f1`, action: "Complete bias audit for all 8 protected categories", assignee: "Marcus Johnson", dueDate: "2026-04-01", status: "IN_PROGRESS", completedAt: null },
    { id: `${id}-rem2`, findingId: `${id}-f2`, action: "Implement ML metadata tracking with MLflow", assignee: "Elena Rodriguez", dueDate: "2026-05-01", status: "PLANNED", completedAt: null }
  ]
});

export const enterpriseAssessments: ConformityAssessment[] = [
  mkAssessment("asmt-001", "sys-001", "TalentMatch AI", "EU_AI_ACT", "IN_PROGRESS", 68),
  mkAssessment("asmt-002", "sys-002", "CreditDecision Engine", "EU_AI_ACT", "APPROVED", 92),
  mkAssessment("asmt-003", "sys-003", "ClaimIQ Processor", "EU_AI_ACT", "IN_PROGRESS", 41),
  mkAssessment("asmt-004", "sys-004", "PatientRisk Analyzer", "EU_AI_ACT", "PENDING_REVIEW", 78),
  mkAssessment("asmt-005", "sys-006", "FraudShield Pro", "EU_AI_ACT", "IN_PROGRESS", 65),
  mkAssessment("asmt-006", "sys-008", "BiometricAccess System", "EU_AI_ACT", "NOT_STARTED", 12),
  mkAssessment("asmt-007", "sys-001", "TalentMatch AI", "COLORADO_AI_ACT", "IN_PROGRESS", 55),
  mkAssessment("asmt-008", "sys-001", "TalentMatch AI", "NYC_LL144", "APPROVED", 95)
];

export const enterpriseRegulations: Regulation[] = [
  {
    id: "reg-001", name: "European Union Artificial Intelligence Act", shortName: "EU AI Act",
    jurisdiction: "EU_AI_ACT", status: "PARTIALLY_IN_FORCE", enforcementDate: "2026-08-02",
    description: "Comprehensive EU regulation establishing harmonized rules for AI systems based on risk classification",
    keyProvisions: ["Risk-based classification (Unacceptable/High/Limited/Minimal)", "Mandatory conformity assessments for high-risk AI", "Annex IV technical documentation requirements", "Transparency obligations for all AI systems", "EU AI database registration", "Post-market monitoring"],
    penaltyStructure: { maxFine: "\u20ac35,000,000", maxFinePercentage: "7% of global annual turnover", criminalPenalties: false, enforcementBody: "National Market Surveillance Authorities + EU AI Office" },
    applicability: ["All AI systems placed on EU market", "AI systems whose output is used in the EU", "Providers and deployers established in the EU"],
    updates: [
      { id: "upd-001", date: "2026-02-01", title: "AI Office publishes Annex IV guidance", description: "Detailed guidance on technical documentation requirements for high-risk AI", impact: "HIGH", affectedArticles: ["Article 11", "Annex IV"] },
      { id: "upd-002", date: "2026-01-15", title: "Harmonized standards draft released", description: "CEN-CENELEC published draft harmonized standards for AI risk management", impact: "MEDIUM", affectedArticles: ["Article 40", "Article 41"] }
    ],
    complianceRequirements: ["Risk management system (Art. 9)", "Data governance (Art. 10)", "Technical documentation (Art. 11)", "Record-keeping (Art. 12)", "Transparency (Art. 13)", "Human oversight (Art. 14)", "Accuracy & robustness (Art. 15)"]
  },
  {
    id: "reg-002", name: "Colorado Artificial Intelligence Act", shortName: "Colorado AI Act",
    jurisdiction: "COLORADO_AI_ACT", status: "ENACTED", enforcementDate: "2026-02-01",
    description: "Colorado state law requiring developers and deployers of high-risk AI to take reasonable care to avoid algorithmic discrimination",
    keyProvisions: ["Algorithmic discrimination prevention", "Impact assessments for high-risk AI", "Developer disclosure requirements", "Consumer notification rights", "Risk management programs"],
    penaltyStructure: { maxFine: "$20,000 per violation", maxFinePercentage: "N/A", criminalPenalties: false, enforcementBody: "Colorado Attorney General" },
    applicability: ["AI used in consequential decisions affecting Colorado residents", "Employment, education, financial, housing, insurance, legal decisions"],
    updates: [{ id: "upd-003", date: "2026-01-20", title: "AG issues enforcement guidance", description: "Colorado AG published initial enforcement priorities and safe harbor provisions", impact: "HIGH", affectedArticles: ["Section 6-1-1702", "Section 6-1-1703"] }],
    complianceRequirements: ["Impact assessment", "Risk management program", "Developer disclosures", "Consumer notifications"]
  },
  {
    id: "reg-003", name: "NYC Local Law 144", shortName: "NYC LL144",
    jurisdiction: "NYC_LL144", status: "IN_FORCE", enforcementDate: "2023-07-05",
    description: "NYC law requiring bias audits for automated employment decision tools",
    keyProvisions: ["Annual bias audits by independent auditor", "Public posting of audit results", "Candidate notification requirements", "Impact ratio calculations"],
    penaltyStructure: { maxFine: "$1,500 per violation per day", maxFinePercentage: "N/A", criminalPenalties: false, enforcementBody: "NYC DCWP" },
    applicability: ["Automated employment decision tools used in NYC"], updates: [],
    complianceRequirements: ["Annual independent bias audit", "Summary of results posted publicly", "10-day advance notice to candidates"]
  },
  {
    id: "reg-004", name: "UK AI Regulation Framework", shortName: "UK AI Framework",
    jurisdiction: "UK_AI_FRAMEWORK", status: "PROPOSED", enforcementDate: "2027-01-01",
    description: "UK principles-based approach to AI regulation through existing regulators",
    keyProvisions: ["Cross-sectoral principles", "Regulator-led implementation", "Safety, transparency, fairness, accountability, contestability"],
    penaltyStructure: { maxFine: "TBD", maxFinePercentage: "TBD", criminalPenalties: false, enforcementBody: "Sector-specific regulators (FCA, Ofcom, ICO, etc.)" },
    applicability: ["AI systems deployed in the UK across regulated sectors"], updates: [],
    complianceRequirements: ["Principle adherence", "Sector-specific compliance", "Transparency reporting"]
  },
  {
    id: "reg-005", name: "Canada Artificial Intelligence and Data Act", shortName: "AIDA",
    jurisdiction: "CANADA_AIDA", status: "PROPOSED", enforcementDate: "2027-06-01",
    description: "Canadian federal legislation for responsible AI development and deployment",
    keyProvisions: ["High-impact AI system requirements", "Algorithmic transparency", "Mandatory reporting of serious harm"],
    penaltyStructure: { maxFine: "CAD $25,000,000", maxFinePercentage: "5% of global revenue", criminalPenalties: true, enforcementBody: "AI and Data Commissioner" },
    applicability: ["High-impact AI systems in Canada"], updates: [],
    complianceRequirements: ["Impact assessment", "Mitigation measures", "Transparency obligations", "Record keeping"]
  }
];

export const enterpriseAuditLog: AuditLogEntry[] = [
  { id: "aud-001", timestamp: "2026-02-19T09:30:00Z", userId: "usr-001", userName: "Sarah Chen", action: "LOGIN", resource: "Platform", resourceId: "session-4521", details: "Successful login via SSO", ipAddress: "10.0.1.45" },
  { id: "aud-002", timestamp: "2026-02-19T08:15:00Z", userId: "usr-002", userName: "Marcus Johnson", action: "UPDATE", resource: "AI System", resourceId: "sys-001", details: "Updated risk classification for TalentMatch AI", ipAddress: "10.0.1.67", changes: [{ field: "riskTier", oldValue: "LIMITED", newValue: "HIGH" }] },
  { id: "aud-003", timestamp: "2026-02-18T16:45:00Z", userId: "usr-001", userName: "Sarah Chen", action: "APPROVE", resource: "Assessment", resourceId: "asmt-002", details: "Approved conformity assessment for CreditDecision Engine", ipAddress: "10.0.1.45" },
  { id: "aud-004", timestamp: "2026-02-18T14:20:00Z", userId: "usr-003", userName: "Elena Rodriguez", action: "GENERATE_DOC", resource: "Document", resourceId: "doc-003", details: "Generated Annex IV documentation for ClaimIQ Processor", ipAddress: "10.0.2.12" },
  { id: "aud-005", timestamp: "2026-02-18T11:00:00Z", userId: "usr-004", userName: "David Park", action: "CLASSIFY", resource: "AI System", resourceId: "sys-003", details: "Re-classified ClaimIQ Processor risk tier", ipAddress: "10.0.2.34" },
  { id: "aud-006", timestamp: "2026-02-17T09:30:00Z", userId: "usr-005", userName: "Dr. Aisha Patel", action: "ASSESS", resource: "Assessment", resourceId: "asmt-004", details: "Submitted PatientRisk Analyzer assessment for review", ipAddress: "10.0.3.15" },
  { id: "aud-007", timestamp: "2026-02-16T15:00:00Z", userId: "usr-001", userName: "Sarah Chen", action: "EXPORT", resource: "Report", resourceId: "rpt-012", details: "Exported compliance summary report (PDF)", ipAddress: "10.0.1.45" },
  { id: "aud-008", timestamp: "2026-02-15T10:30:00Z", userId: "usr-006", userName: "Lisa Wang", action: "CREATE", resource: "AI System", resourceId: "sys-009", details: "Registered new AI system: PredictiveChurn Model", ipAddress: "10.0.4.22" }
];

export const enterpriseNotifications: Notification[] = [
  { id: "notif-001", type: "DEADLINE", title: "EU AI Act High-Risk Deadline", message: "164 days until EU AI Act high-risk provisions take effect. 3 systems require conformity assessments.", priority: "CRITICAL", read: false, createdAt: "2026-02-19T08:00:00Z", actionUrl: "/regulations" },
  { id: "notif-002", type: "ASSESSMENT_DUE", title: "Assessment Overdue: ClaimIQ Processor", message: "Conformity assessment for ClaimIQ Processor is 15 days overdue. Current score: 41%.", priority: "HIGH", read: false, createdAt: "2026-02-18T09:00:00Z", relatedSystemId: "sys-003" },
  { id: "notif-003", type: "REGULATION_UPDATE", title: "EU AI Office: New Annex IV Guidance", message: "The EU AI Office published detailed guidance on Annex IV technical documentation requirements.", priority: "HIGH", read: false, createdAt: "2026-02-01T12:00:00Z", actionUrl: "/regulations" },
  { id: "notif-004", type: "COMPLIANCE_ALERT", title: "BiometricAccess: Non-Compliant Status", message: "BiometricAccess System has been flagged as non-compliant across 2 jurisdictions.", priority: "CRITICAL", read: true, createdAt: "2026-02-15T14:00:00Z", relatedSystemId: "sys-008" },
  { id: "notif-005", type: "APPROVAL_REQUIRED", title: "Assessment Pending Review", message: "PatientRisk Analyzer conformity assessment requires your approval.", priority: "MEDIUM", read: false, createdAt: "2026-02-17T09:30:00Z", relatedSystemId: "sys-004" },
  { id: "notif-006", type: "SYSTEM_CHANGE", title: "TalentMatch AI Risk Reclassified", message: "TalentMatch AI has been reclassified from LIMITED to HIGH risk tier.", priority: "HIGH", read: true, createdAt: "2026-02-19T08:15:00Z", relatedSystemId: "sys-001" }
];

export const enterpriseMetrics: DashboardMetrics = {
  totalSystems: 8, highRiskSystems: 5, compliantSystems: 2, partiallyCompliant: 3, nonCompliant: 2,
  pendingAssessments: 4, overdueAssessments: 2,
  upcomingDeadlines: [
    { id: "dl-001", title: "EU AI Act High-Risk Provisions", date: "2026-08-02", jurisdiction: "EU_AI_ACT", type: "REGULATION", priority: "CRITICAL", relatedSystemIds: ["sys-001", "sys-002", "sys-003", "sys-004", "sys-006", "sys-008"], daysRemaining: 164 },
    { id: "dl-002", title: "Colorado AI Act Enforcement", date: "2026-02-01", jurisdiction: "COLORADO_AI_ACT", type: "REGULATION", priority: "CRITICAL", relatedSystemIds: ["sys-001", "sys-002"], daysRemaining: 0 },
    { id: "dl-003", title: "ClaimIQ Assessment Due", date: "2026-03-01", jurisdiction: "EU_AI_ACT", type: "ASSESSMENT", priority: "HIGH", relatedSystemIds: ["sys-003"], daysRemaining: 10 },
    { id: "dl-004", title: "BiometricAccess Documentation", date: "2026-04-15", jurisdiction: "EU_AI_ACT", type: "DOCUMENTATION", priority: "HIGH", relatedSystemIds: ["sys-008"], daysRemaining: 55 },
    { id: "dl-005", title: "FraudShield Assessment Due", date: "2026-05-01", jurisdiction: "EU_AI_ACT", type: "ASSESSMENT", priority: "MEDIUM", relatedSystemIds: ["sys-006"], daysRemaining: 71 },
    { id: "dl-006", title: "NYC LL144 Annual Audit", date: "2026-07-05", jurisdiction: "NYC_LL144", type: "ASSESSMENT", priority: "MEDIUM", relatedSystemIds: ["sys-001"], daysRemaining: 136 }
  ],
  complianceByJurisdiction: {
    EU_AI_ACT: { total: 8, compliant: 2, percentage: 25 },
    COLORADO_AI_ACT: { total: 4, compliant: 1, percentage: 25 },
    NYC_LL144: { total: 1, compliant: 1, percentage: 100 },
    ILLINOIS_BIPA: { total: 0, compliant: 0, percentage: 0 },
    CALIFORNIA_CPRA: { total: 6, compliant: 0, percentage: 0 },
    CANADA_AIDA: { total: 2, compliant: 0, percentage: 0 },
    UK_AI_FRAMEWORK: { total: 5, compliant: 0, percentage: 0 },
    SINGAPORE_AI_GOVERNANCE: { total: 0, compliant: 0, percentage: 0 }
  },
  riskDistribution: { UNACCEPTABLE: 0, HIGH: 5, LIMITED: 2, MINIMAL: 1 },
  recentActivity: [],
  complianceTrend: [
    { month: "Sep 2025", score: 18 }, { month: "Oct 2025", score: 25 }, { month: "Nov 2025", score: 32 },
    { month: "Dec 2025", score: 38 }, { month: "Jan 2026", score: 45 }, { month: "Feb 2026", score: 52 }
  ]
};
