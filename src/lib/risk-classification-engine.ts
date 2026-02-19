/**
 * AI Risk Classification Engine
 * Implements EU AI Act (Regulation 2024/1689) risk tiers
 * and Colorado SB 24-205 requirements
 */

// ============================================================
// TYPES & ENUMS
// ============================================================

export enum RiskTier {
    UNACCEPTABLE = 'UNACCEPTABLE',
    HIGH = 'HIGH',
    LIMITED = 'LIMITED',
    MINIMAL = 'MINIMAL',
}

export enum Jurisdiction {
    EU_AI_ACT = 'EU_AI_ACT',
    COLORADO_AI_ACT = 'COLORADO_AI_ACT',
    CANADA_AIDA = 'CANADA_AIDA',
    NYC_LOCAL_144 = 'NYC_LOCAL_144',
}

export enum AISystemDomain {
    HIRING_RECRUITMENT = 'HIRING_RECRUITMENT',
    CREDIT_LENDING = 'CREDIT_LENDING',
    INSURANCE_UNDERWRITING = 'INSURANCE_UNDERWRITING',
    HEALTHCARE_DIAGNOSIS = 'HEALTHCARE_DIAGNOSIS',
    LAW_ENFORCEMENT = 'LAW_ENFORCEMENT',
    BORDER_CONTROL = 'BORDER_CONTROL',
    EDUCATION_SCORING = 'EDUCATION_SCORING',
    CRITICAL_INFRASTRUCTURE = 'CRITICAL_INFRASTRUCTURE',
    BIOMETRIC_IDENTIFICATION = 'BIOMETRIC_IDENTIFICATION',
    SOCIAL_SCORING = 'SOCIAL_SCORING',
    EMOTION_RECOGNITION = 'EMOTION_RECOGNITION',
    CONTENT_RECOMMENDATION = 'CONTENT_RECOMMENDATION',
    CHATBOT_ASSISTANT = 'CHATBOT_ASSISTANT',
    SPAM_FILTER = 'SPAM_FILTER',
    CONTENT_MODERATION = 'CONTENT_MODERATION',
    PREDICTIVE_ANALYTICS = 'PREDICTIVE_ANALYTICS',
    AUTONOMOUS_VEHICLES = 'AUTONOMOUS_VEHICLES',
    MEDICAL_DEVICES = 'MEDICAL_DEVICES',
    JUDICIAL_DECISION = 'JUDICIAL_DECISION',
    DEMOCRATIC_PROCESS = 'DEMOCRATIC_PROCESS',
    OTHER = 'OTHER',
}

export interface AISystemProfile {
    id: string;
    name: string;
    description: string;
    domain: AISystemDomain;
    vendor?: string;
    version?: string;
    deploymentDate?: Date;
    dataCategories: DataCategory[];
    capabilities: AICapability[];
    autonomyLevel: AutonomyLevel;
    affectedPersonsScale: ScaleLevel;
    decisionImpact: ImpactLevel;
    humanOversight: OversightLevel;
    trainingDataDetails?: TrainingDataProfile;
    technicalArchitecture?: TechnicalArchitecture;
}

export interface TrainingDataProfile {
    dataSourceCount: number;
    containsPersonalData: boolean;
    containsSensitiveData: boolean;
    dataSubjectCategories: string[];
    geographicScope: string[];
    biasAssessmentCompleted: boolean;
    dataGovernanceFramework: boolean;
}

export interface TechnicalArchitecture {
    modelType: string;
    isFoundationModel: boolean;
    isGenerativeAI: boolean;
    isOpenSource: boolean;
    computeRequirements: string;
    apiEndpoints: string[];
    integratedSystems: string[];
}

export enum DataCategory {
    PERSONAL_DATA = 'PERSONAL_DATA',
    SENSITIVE_PERSONAL_DATA = 'SENSITIVE_PERSONAL_DATA',
    BIOMETRIC_DATA = 'BIOMETRIC_DATA',
    HEALTH_DATA = 'HEALTH_DATA',
    FINANCIAL_DATA = 'FINANCIAL_DATA',
    CRIMINAL_DATA = 'CRIMINAL_DATA',
    CHILDREN_DATA = 'CHILDREN_DATA',
    LOCATION_DATA = 'LOCATION_DATA',
    BEHAVIORAL_DATA = 'BEHAVIORAL_DATA',
    EMPLOYMENT_DATA = 'EMPLOYMENT_DATA',
    NON_PERSONAL = 'NON_PERSONAL',
}

export enum AICapability {
    CLASSIFICATION = 'CLASSIFICATION',
    PREDICTION = 'PREDICTION',
    RECOMMENDATION = 'RECOMMENDATION',
    GENERATION = 'GENERATION',
    RECOGNITION = 'RECOGNITION',
    DECISION_MAKING = 'DECISION_MAKING',
    NATURAL_LANGUAGE = 'NATURAL_LANGUAGE',
    COMPUTER_VISION = 'COMPUTER_VISION',
    SPEECH_PROCESSING = 'SPEECH_PROCESSING',
    ANOMALY_DETECTION = 'ANOMALY_DETECTION',
    OPTIMIZATION = 'OPTIMIZATION',
}

export enum AutonomyLevel {
    FULLY_AUTOMATED = 'FULLY_AUTOMATED',
    SEMI_AUTOMATED = 'SEMI_AUTOMATED',
    HUMAN_IN_THE_LOOP = 'HUMAN_IN_THE_LOOP',
    HUMAN_ON_THE_LOOP = 'HUMAN_ON_THE_LOOP',
    ADVISORY_ONLY = 'ADVISORY_ONLY',
}

export enum ScaleLevel {
    INDIVIDUAL = 'INDIVIDUAL',
    SMALL_GROUP = 'SMALL_GROUP',
    LARGE_GROUP = 'LARGE_GROUP',
    POPULATION = 'POPULATION',
}

export enum ImpactLevel {
    CRITICAL = 'CRITICAL',
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW',
    NEGLIGIBLE = 'NEGLIGIBLE',
}

export enum OversightLevel {
    NONE = 'NONE',
    PERIODIC_REVIEW = 'PERIODIC_REVIEW',
    CONTINUOUS_MONITORING = 'CONTINUOUS_MONITORING',
    HUMAN_APPROVAL_REQUIRED = 'HUMAN_APPROVAL_REQUIRED',
    FULL_HUMAN_CONTROL = 'FULL_HUMAN_CONTROL',
}

export interface ClassificationResult {
    systemId: string;
    jurisdiction: Jurisdiction;
    riskTier: RiskTier;
    confidence: number;
    reasoning: ClassificationReasoning[];
    obligations: ComplianceObligation[];
    deadline: Date;
    assessmentDate: Date;
    assessorId?: string;
    overrideReason?: string;
}

export interface ClassificationReasoning {
    factor: string;
    weight: number;
    contribution: RiskTier;
    explanation: string;
    regulatoryReference: string;
}

export interface ComplianceObligation {
    id: string;
    title: string;
    description: string;
    regulatoryArticle: string;
    deadline: Date;
    status: ObligationStatus;
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    evidenceRequired: string[];
}

export enum ObligationStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    UNDER_REVIEW = 'UNDER_REVIEW',
    COMPLETED = 'COMPLETED',
    OVERDUE = 'OVERDUE',
}

// ============================================================
// EU AI ACT CLASSIFICATION (Regulation 2024/1689)
// ============================================================

const EU_UNACCEPTABLE_DOMAINS: AISystemDomain[] = [
    AISystemDomain.SOCIAL_SCORING,
  ];

const EU_UNACCEPTABLE_CONDITIONS = {
    subliminalManipulation: true,
    exploitVulnerabilities: true,
    realTimeBiometricPublicSpaces: true,
    socialScoring: true,
    predictivePolicingIndividual: true,
    facialRecognitionScraping: true,
    emotionRecognitionWorkplaceEducation: true,
};

const EU_HIGH_RISK_ANNEX_III: AISystemDomain[] = [
    AISystemDomain.BIOMETRIC_IDENTIFICATION,
    AISystemDomain.CRITICAL_INFRASTRUCTURE,
    AISystemDomain.EDUCATION_SCORING,
    AISystemDomain.HIRING_RECRUITMENT,
    AISystemDomain.CREDIT_LENDING,
    AISystemDomain.INSURANCE_UNDERWRITING,
    AISystemDomain.LAW_ENFORCEMENT,
    AISystemDomain.BORDER_CONTROL,
    AISystemDomain.JUDICIAL_DECISION,
    AISystemDomain.DEMOCRATIC_PROCESS,
    AISystemDomain.HEALTHCARE_DIAGNOSIS,
    AISystemDomain.MEDICAL_DEVICES,
    AISystemDomain.AUTONOMOUS_VEHICLES,
  ];

const EU_LIMITED_RISK_DOMAINS: AISystemDomain[] = [
    AISystemDomain.CHATBOT_ASSISTANT,
    AISystemDomain.CONTENT_RECOMMENDATION,
    AISystemDomain.EMOTION_RECOGNITION,
  ];

export function classifyEUAIAct(system: AISystemProfile): ClassificationResult {
    const reasoning: ClassificationReasoning[] = [];
    let riskTier = RiskTier.MINIMAL;
    let confidence = 0.85;

  // Check UNACCEPTABLE risk (Article 5)
  if (EU_UNACCEPTABLE_DOMAINS.includes(system.domain)) {
        riskTier = RiskTier.UNACCEPTABLE;
        confidence = 0.95;
        reasoning.push({
                factor: 'Prohibited Practice',
                weight: 1.0,
                contribution: RiskTier.UNACCEPTABLE,
                explanation: `System domain "${system.domain}" falls under prohibited AI practices per Article 5 of the EU AI Act.`,
                regulatoryReference: 'EU AI Act, Article 5',
        });
  }

  // Check HIGH risk (Annex III)
  if (riskTier !== RiskTier.UNACCEPTABLE && EU_HIGH_RISK_ANNEX_III.includes(system.domain)) {
        riskTier = RiskTier.HIGH;
        confidence = 0.90;
        reasoning.push({
                factor: 'Annex III High-Risk Category',
                weight: 0.9,
                contribution: RiskTier.HIGH,
                explanation: `System domain "${system.domain}" is listed in Annex III as a high-risk AI system area.`,
                regulatoryReference: 'EU AI Act, Annex III',
        });
  }

  // Elevating factors for HIGH risk
  if (riskTier === RiskTier.MINIMAL || riskTier === RiskTier.LIMITED) {
        const sensitiveData = system.dataCategories.some(dc =>
                [DataCategory.BIOMETRIC_DATA, DataCategory.HEALTH_DATA, DataCategory.CRIMINAL_DATA, DataCategory.CHILDREN_DATA, DataCategory.SENSITIVE_PERSONAL_DATA].includes(dc)
                                                             );
        if (sensitiveData) {
                riskTier = RiskTier.HIGH;
                confidence = 0.80;
                reasoning.push({
                          factor: 'Sensitive Data Processing',
                          weight: 0.7,
                          contribution: RiskTier.HIGH,
                          explanation: 'System processes sensitive personal data categories that may elevate risk classification.',
                          regulatoryReference: 'EU AI Act, Article 6(2)',
                });
        }
  }

  // Check autonomy and impact escalation
  if (system.autonomyLevel === AutonomyLevel.FULLY_AUTOMATED && system.decisionImpact === ImpactLevel.CRITICAL) {
        if (riskTier === RiskTier.MINIMAL || riskTier === RiskTier.LIMITED) {
                riskTier = RiskTier.HIGH;
                confidence = 0.75;
                reasoning.push({
                          factor: 'Autonomous Critical Decisions',
                          weight: 0.8,
                          contribution: RiskTier.HIGH,
                          explanation: 'Fully automated system making critical-impact decisions requires high-risk classification.',
                          regulatoryReference: 'EU AI Act, Article 6(1)',
                });
        }
  }

  // Check LIMITED risk (Article 50 - Transparency)
  if (riskTier === RiskTier.MINIMAL && EU_LIMITED_RISK_DOMAINS.includes(system.domain)) {
        riskTier = RiskTier.LIMITED;
        reasoning.push({
                factor: 'Transparency Obligation',
                weight: 0.5,
                contribution: RiskTier.LIMITED,
                explanation: `System domain "${system.domain}" triggers transparency obligations under Article 50.`,
                regulatoryReference: 'EU AI Act, Article 50',
        });
  }

  // Check for generative AI / GPAI model obligations
  if (system.technicalArchitecture?.isGenerativeAI || system.technicalArchitecture?.isFoundationModel) {
        reasoning.push({
                factor: 'General-Purpose AI Model',
                weight: 0.6,
                contribution: RiskTier.LIMITED,
                explanation: 'System uses or is a GPAI model, triggering additional obligations under Title IIIA.',
                regulatoryReference: 'EU AI Act, Articles 51-56',
        });
        if (riskTier === RiskTier.MINIMAL) {
                riskTier = RiskTier.LIMITED;
        }
  }

  // Scale factor adjustments
  if (system.affectedPersonsScale === ScaleLevel.POPULATION) {
        confidence = Math.min(confidence + 0.05, 0.99);
        reasoning.push({
                factor: 'Population-Scale Impact',
                weight: 0.3,
                contribution: riskTier,
                explanation: 'System affects population-scale number of persons, reinforcing current classification.',
                regulatoryReference: 'EU AI Act, Recital 47',
        });
  }

  // Human oversight mitigation
  if (system.humanOversight === OversightLevel.FULL_HUMAN_CONTROL && riskTier === RiskTier.HIGH) {
        reasoning.push({
                factor: 'Human Oversight Mitigation',
                weight: -0.1,
                contribution: RiskTier.HIGH,
                explanation: 'Full human control provides mitigation but does not reduce classification tier for Annex III systems.',
                regulatoryReference: 'EU AI Act, Article 14',
        });
  }

  const obligations = getEUObligations(riskTier, system);

  return {
        systemId: system.id,
        jurisdiction: Jurisdiction.EU_AI_ACT,
        riskTier,
        confidence,
        reasoning,
        obligations,
        deadline: new Date('2026-08-02'),
        assessmentDate: new Date(),
  };
}

// ============================================================
// COLORADO AI ACT CLASSIFICATION (SB 24-205)
// ============================================================

export function classifyColoradoAIAct(system: AISystemProfile): ClassificationResult {
    const reasoning: ClassificationReasoning[] = [];
    let riskTier = RiskTier.MINIMAL;
    let confidence = 0.85;

  const consequentialDecisionDomains: AISystemDomain[] = [
        AISystemDomain.HIRING_RECRUITMENT,
        AISystemDomain.CREDIT_LENDING,
        AISystemDomain.INSURANCE_UNDERWRITING,
        AISystemDomain.HEALTHCARE_DIAGNOSIS,
        AISystemDomain.EDUCATION_SCORING,
        AISystemDomain.JUDICIAL_DECISION,
      ];

  // Colorado focuses on "high-risk AI systems" that make or substantially factor into "consequential decisions"
  if (consequentialDecisionDomains.includes(system.domain)) {
        riskTier = RiskTier.HIGH;
        confidence = 0.90;
        reasoning.push({
                factor: 'Consequential Decision Domain',
                weight: 0.9,
                contribution: RiskTier.HIGH,
                explanation: `System operates in "${system.domain}" which involves consequential decisions affecting consumers per Colorado SB 24-205.`,
                regulatoryReference: 'Colorado AI Act, Section 6-1-1702(2)',
        });
  }

  // Check if system substantially factors into decisions
  if (system.autonomyLevel === AutonomyLevel.FULLY_AUTOMATED || system.autonomyLevel === AutonomyLevel.SEMI_AUTOMATED) {
        if (system.decisionImpact === ImpactLevel.HIGH || system.decisionImpact === ImpactLevel.CRITICAL) {
                if (riskTier !== RiskTier.HIGH) {
                          riskTier = RiskTier.HIGH;
                          confidence = 0.80;
                }
                reasoning.push({
                          factor: 'Substantial Factor in Decision',
                          weight: 0.8,
                          contribution: RiskTier.HIGH,
                          explanation: 'Automated system substantially factors into high-impact decisions affecting consumers.',
                          regulatoryReference: 'Colorado AI Act, Section 6-1-1702(5)',
                });
        }
  }

  // Algorithmic discrimination risk
  const discriminationRiskData = system.dataCategories.some(dc =>
        [DataCategory.PERSONAL_DATA, DataCategory.SENSITIVE_PERSONAL_DATA, DataCategory.EMPLOYMENT_DATA].includes(dc)
                                                              );
    if (discriminationRiskData && riskTier === RiskTier.HIGH) {
          reasoning.push({
                  factor: 'Algorithmic Discrimination Risk',
                  weight: 0.7,
                  contribution: RiskTier.HIGH,
                  explanation: 'System processes personal/sensitive data in consequential decision context, triggering discrimination risk assessment requirements.',
                  regulatoryReference: 'Colorado AI Act, Section 6-1-1703',
          });
    }

  const obligations = getColoradoObligations(riskTier, system);

  return {
        systemId: system.id,
        jurisdiction: Jurisdiction.COLORADO_AI_ACT,
        riskTier,
        confidence,
        reasoning,
        obligations,
        deadline: new Date('2026-02-01'),
        assessmentDate: new Date(),
  };
}

// ============================================================
// MULTI-JURISDICTION CLASSIFICATION
// ============================================================

export interface MultiJurisdictionResult {
    systemId: string;
    systemName: string;
    results: ClassificationResult[];
    highestRiskTier: RiskTier;
    totalObligations: number;
    criticalDeadline: Date;
    overallComplianceScore: number;
}

export function classifyAllJurisdictions(system: AISystemProfile, jurisdictions: Jurisdiction[]): MultiJurisdictionResult {
    const results: ClassificationResult[] = [];

  for (const jurisdiction of jurisdictions) {
        switch (jurisdiction) {
          case Jurisdiction.EU_AI_ACT:
                    results.push(classifyEUAIAct(system));
                    break;
          case Jurisdiction.COLORADO_AI_ACT:
                    results.push(classifyColoradoAIAct(system));
                    break;
          default:
                    break;
        }
  }

  const riskOrder = [RiskTier.UNACCEPTABLE, RiskTier.HIGH, RiskTier.LIMITED, RiskTier.MINIMAL];
    const highestRiskTier = riskOrder.find(tier => results.some(r => r.riskTier === tier)) || RiskTier.MINIMAL;

  const allObligations = results.flatMap(r => r.obligations);
    const criticalDeadline = results.reduce((earliest, r) => r.deadline < earliest ? r.deadline : earliest, new Date('2099-12-31'));

  const completedObligations = allObligations.filter(o => o.status === ObligationStatus.COMPLETED).length;
    const overallComplianceScore = allObligations.length > 0 ? (completedObligations / allObligations.length) * 100 : 0;

  return {
        systemId: system.id,
        systemName: system.name,
        results,
        highestRiskTier,
        totalObligations: allObligations.length,
        criticalDeadline,
        overallComplianceScore,
  };
}

// ============================================================
// OBLIGATION GENERATORS
// ============================================================

function getEUObligations(riskTier: RiskTier, system: AISystemProfile): ComplianceObligation[] {
    const obligations: ComplianceObligation[] = [];
    const deadline = new Date('2026-08-02');

  if (riskTier === RiskTier.UNACCEPTABLE) {
        obligations.push({
                id: `eu-prohibit-${system.id}`,
                title: 'System Prohibition',
                description: 'This AI system falls under prohibited practices and must be decommissioned before the deadline.',
                regulatoryArticle: 'Article 5',
                deadline: new Date('2025-02-02'),
                status: ObligationStatus.NOT_STARTED,
                priority: 'CRITICAL',
                evidenceRequired: ['Decommission plan', 'Migration strategy', 'Stakeholder notification'],
        });
        return obligations;
  }

  if (riskTier === RiskTier.HIGH) {
        obligations.push(
          {
                    id: `eu-rms-${system.id}`,
                    title: 'Risk Management System',
                    description: 'Establish and maintain a risk management system throughout the AI system lifecycle.',
                    regulatoryArticle: 'Article 9',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'CRITICAL',
                    evidenceRequired: ['Risk management policy', 'Risk register', 'Mitigation measures', 'Residual risk assessment'],
          },
          {
                    id: `eu-data-gov-${system.id}`,
                    title: 'Data Governance',
                    description: 'Implement data governance and management practices for training, validation, and testing data.',
                    regulatoryArticle: 'Article 10',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'CRITICAL',
                    evidenceRequired: ['Data governance framework', 'Data quality metrics', 'Bias examination records', 'Data provenance documentation'],
          },
          {
                    id: `eu-tech-doc-${system.id}`,
                    title: 'Technical Documentation (Annex IV)',
                    description: 'Prepare comprehensive technical documentation per Annex IV requirements before system deployment.',
                    regulatoryArticle: 'Article 11, Annex IV',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'CRITICAL',
                    evidenceRequired: ['System description', 'Design specifications', 'Development process', 'Monitoring capabilities', 'Performance metrics', 'Validation results'],
          },
          {
                    id: `eu-logging-${system.id}`,
                    title: 'Automatic Logging',
                    description: 'Ensure automatic recording of events (logs) throughout the AI system lifetime.',
                    regulatoryArticle: 'Article 12',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'HIGH',
                    evidenceRequired: ['Logging architecture', 'Log retention policy', 'Event catalog', 'Traceability mechanisms'],
          },
          {
                    id: `eu-transparency-${system.id}`,
                    title: 'Transparency & Information',
                    description: 'Ensure the AI system is sufficiently transparent and provide instructions for use to deployers.',
                    regulatoryArticle: 'Article 13',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'HIGH',
                    evidenceRequired: ['Instructions for use', 'System capabilities description', 'Limitations documentation', 'Intended purpose statement'],
          },
          {
                    id: `eu-oversight-${system.id}`,
                    title: 'Human Oversight Measures',
                    description: 'Design the AI system to allow effective human oversight during use.',
                    regulatoryArticle: 'Article 14',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'HIGH',
                    evidenceRequired: ['Human oversight protocol', 'Override mechanisms', 'Operator training program', 'Escalation procedures'],
          },
          {
                    id: `eu-accuracy-${system.id}`,
                    title: 'Accuracy, Robustness & Cybersecurity',
                    description: 'Ensure appropriate levels of accuracy, robustness, and cybersecurity.',
                    regulatoryArticle: 'Article 15',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'HIGH',
                    evidenceRequired: ['Performance benchmarks', 'Robustness testing results', 'Security assessment', 'Adversarial testing'],
          },
          {
                    id: `eu-conformity-${system.id}`,
                    title: 'Conformity Assessment',
                    description: 'Conduct conformity assessment prior to placing on market or putting into service.',
                    regulatoryArticle: 'Article 43',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'CRITICAL',
                    evidenceRequired: ['Conformity assessment report', 'QMS documentation', 'EU Declaration of Conformity', 'CE marking documentation'],
          },
          {
                    id: `eu-registration-${system.id}`,
                    title: 'EU Database Registration',
                    description: 'Register the high-risk AI system in the EU database before placing on market.',
                    regulatoryArticle: 'Article 49',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'HIGH',
                    evidenceRequired: ['Registration application', 'System identification details', 'Provider information'],
          },
          {
                    id: `eu-pms-${system.id}`,
                    title: 'Post-Market Surveillance',
                    description: 'Establish a post-market surveillance system proportionate to the nature of the AI system.',
                    regulatoryArticle: 'Article 72',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'MEDIUM',
                    evidenceRequired: ['PMS plan', 'Incident reporting procedures', 'Performance monitoring dashboard', 'Feedback collection mechanisms'],
          }
              );
  }

  if (riskTier === RiskTier.LIMITED) {
        obligations.push({
                id: `eu-transparency-limited-${system.id}`,
                title: 'Transparency Obligations',
                description: 'Ensure users are informed they are interacting with an AI system.',
                regulatoryArticle: 'Article 50',
                deadline,
                status: ObligationStatus.NOT_STARTED,
                priority: 'MEDIUM',
                evidenceRequired: ['User notification mechanism', 'AI disclosure documentation', 'Content labeling system'],
        });
  }

  return obligations;
}

function getColoradoObligations(riskTier: RiskTier, system: AISystemProfile): ComplianceObligation[] {
    const obligations: ComplianceObligation[] = [];
    const deadline = new Date('2026-02-01');

  if (riskTier === RiskTier.HIGH) {
        obligations.push(
          {
                    id: `co-risk-mgmt-${system.id}`,
                    title: 'Risk Management Policy',
                    description: 'Implement a risk management policy and program governing deployment of high-risk AI systems.',
                    regulatoryArticle: 'Section 6-1-1703(1)',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'CRITICAL',
                    evidenceRequired: ['Risk management policy document', 'Program implementation evidence', 'Annual review records'],
          },
          {
                    id: `co-impact-assessment-${system.id}`,
                    title: 'Impact Assessment',
                    description: 'Complete an impact assessment for the high-risk AI system before deployment.',
                    regulatoryArticle: 'Section 6-1-1703(3)',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'CRITICAL',
                    evidenceRequired: ['Impact assessment document', 'Discrimination risk analysis', 'Mitigation measures'],
          },
          {
                    id: `co-consumer-notice-${system.id}`,
                    title: 'Consumer Notification',
                    description: 'Provide notice to consumers when a high-risk AI system is used in consequential decisions.',
                    regulatoryArticle: 'Section 6-1-1703(4)',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'HIGH',
                    evidenceRequired: ['Consumer notification template', 'Delivery mechanism', 'Opt-out procedures'],
          },
          {
                    id: `co-disclosure-${system.id}`,
                    title: 'Public Disclosure',
                    description: 'Make publicly available a statement describing the types of high-risk AI systems deployed.',
                    regulatoryArticle: 'Section 6-1-1703(2)',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'HIGH',
                    evidenceRequired: ['Public disclosure statement', 'Website publication', 'System type descriptions'],
          },
          {
                    id: `co-appeal-${system.id}`,
                    title: 'Appeal & Correction Process',
                    description: 'Provide consumers an opportunity to appeal adverse consequential decisions and correct data.',
                    regulatoryArticle: 'Section 6-1-1703(5)',
                    deadline,
                    status: ObligationStatus.NOT_STARTED,
                    priority: 'HIGH',
                    evidenceRequired: ['Appeal process documentation', 'Human review mechanism', 'Data correction procedures'],
          }
              );
  }

  return obligations;
}

// ============================================================
// ANNEX IV DOCUMENTATION GENERATOR
// ============================================================

export interface AnnexIVDocument {
    systemId: string;
    generatedAt: Date;
    version: string;
    sections: AnnexIVSection[];
    completeness: number;
    missingElements: string[];
}

export interface AnnexIVSection {
    id: string;
    title: string;
    requirement: string;
    content: string;
    status: 'COMPLETE' | 'PARTIAL' | 'MISSING';
    sources: string[];
}

export function generateAnnexIVDocumentation(system: AISystemProfile): AnnexIVDocument {
    const sections: AnnexIVSection[] = [
      {
              id: 'annex-iv-1',
              title: '1. General Description',
              requirement: 'A general description of the AI system including its intended purpose, developer, version, and relationship to previous versions.',
              content: generateGeneralDescription(system),
              status: 'COMPLETE',
              sources: ['System registry', 'Development artifacts'],
      },
      {
              id: 'annex-iv-2',
              title: '2. Detailed System Description',
              requirement: 'A detailed description of the elements of the AI system and of the process for its development.',
              content: generateDetailedDescription(system),
              status: system.technicalArchitecture ? 'COMPLETE' : 'PARTIAL',
              sources: ['Technical architecture docs', 'Design documents'],
      },
      {
              id: 'annex-iv-3',
              title: '3. Monitoring, Functioning & Control',
              requirement: 'Detailed information about the monitoring, functioning, and control of the AI system.',
              content: generateMonitoringSection(system),
              status: system.humanOversight !== OversightLevel.NONE ? 'COMPLETE' : 'PARTIAL',
              sources: ['Monitoring configuration', 'Control procedures'],
      },
      {
              id: 'annex-iv-4',
              title: '4. Risk Management System',
              requirement: 'A description of the risk management system in accordance with Article 9.',
              content: generateRiskManagementSection(system),
              status: 'PARTIAL',
              sources: ['Risk register', 'Risk policies'],
      },
      {
              id: 'annex-iv-5',
              title: '5. Data Governance',
              requirement: 'A description of data governance and management practices per Article 10.',
              content: generateDataGovernanceSection(system),
              status: system.trainingDataDetails ? 'COMPLETE' : 'MISSING',
              sources: ['Data governance framework', 'Data catalog'],
      },
      {
              id: 'annex-iv-6',
              title: '6. Human Oversight',
              requirement: 'A description of the human oversight measures per Article 14.',
              content: generateHumanOversightSection(system),
              status: system.humanOversight !== OversightLevel.NONE ? 'COMPLETE' : 'MISSING',
              sources: ['Oversight procedures', 'Training records'],
      },
      {
              id: 'annex-iv-7',
              title: '7. Accuracy & Robustness',
              requirement: 'A description of the levels of accuracy and robustness per Article 15.',
              content: generateAccuracySection(system),
              status: 'PARTIAL',
              sources: ['Testing results', 'Benchmark reports'],
      },
      {
              id: 'annex-iv-8',
              title: '8. Cybersecurity Measures',
              requirement: 'A description of cybersecurity measures put in place per Article 15.',
              content: generateCybersecuritySection(system),
              status: 'PARTIAL',
              sources: ['Security assessments', 'Penetration test reports'],
      },
        ];

  const completeSections = sections.filter(s => s.status === 'COMPLETE').length;
    const completeness = (completeSections / sections.length) * 100;
    const missingElements = sections.filter(s => s.status === 'MISSING').map(s => s.title);

  return {
        systemId: system.id,
        generatedAt: new Date(),
        version: '1.0',
        sections,
        completeness,
        missingElements,
  };
}

function generateGeneralDescription(system: AISystemProfile): string {
    return `
    ## ${system.name}

    **Intended Purpose:** ${system.description}
    **Developer/Provider:** ${system.vendor || 'Internal Development'}
    **Version:** ${system.version || '1.0'}
    **Deployment Date:** ${system.deploymentDate?.toISOString().split('T')[0] || 'Pending'}
    **Domain:** ${system.domain}
    **Autonomy Level:** ${system.autonomyLevel}
    **Affected Persons Scale:** ${system.affectedPersonsScale}

    ### AI Capabilities
    ${system.capabilities.map(c => `- ${c}`).join('\n')}

    ### Data Categories Processed
    ${system.dataCategories.map(dc => `- ${dc}`).join('\n')}
      `.trim();
}

function generateDetailedDescription(system: AISystemProfile): string {
    const arch = system.technicalArchitecture;
    if (!arch) return '*Technical architecture details are required to complete this section.*';

  return `
  ### Technical Architecture
  **Model Type:** ${arch.modelType}
  **Foundation Model:** ${arch.isFoundationModel ? 'Yes' : 'No'}
  **Generative AI:** ${arch.isGenerativeAI ? 'Yes' : 'No'}
  **Open Source:** ${arch.isOpenSource ? 'Yes' : 'No'}
  **Compute Requirements:** ${arch.computeRequirements}

  ### Integration Points
  ${arch.integratedSystems.map(s => `- ${s}`).join('\n') || 'None documented'}

  ### API Endpoints
  ${arch.apiEndpoints.map(e => `- ${e}`).join('\n') || 'None documented'}
    `.trim();
}

function generateMonitoringSection(system: AISystemProfile): string {
    return `
    ### Human Oversight Level
    **Current Level:** ${system.humanOversight}

    ### Monitoring Configuration
    - Decision impact level: ${system.decisionImpact}
    - Autonomy level: ${system.autonomyLevel}
    - Scale of affected persons: ${system.affectedPersonsScale}

    ### Control Measures
    ${system.humanOversight === OversightLevel.FULL_HUMAN_CONTROL
        ? '- Full human control with manual override capability\n- All decisions require human approval'
        : system.humanOversight === OversightLevel.HUMAN_APPROVAL_REQUIRED
        ? '- Human approval required for all outputs\n- Automated flagging of edge cases'
        : '- Periodic review of system outputs\n- Automated alerting for anomalies'}
          `.trim();
}

function generateRiskManagementSection(_system: AISystemProfile): string {
    return `
    ### Risk Management Framework
    *This section requires input from your risk management team. The platform will auto-populate once risk assessments are completed.*

    Required elements:
    - Risk identification methodology
    - Risk estimation and evaluation
    - Risk treatment measures
    - Residual risk analysis
    - Testing and validation approach
      `.trim();
}

function generateDataGovernanceSection(system: AISystemProfile): string {
    const td = system.trainingDataDetails;
    if (!td) return '*Training data details are required to complete this section.*';

  return `
  ### Data Governance Framework
  **Governance Framework in Place:** ${td.dataGovernanceFramework ? 'Yes' : 'No'}
  **Data Source Count:** ${td.dataSourceCount}
  **Contains Personal Data:** ${td.containsPersonalData ? 'Yes' : 'No'}
  **Contains Sensitive Data:** ${td.containsSensitiveData ? 'Yes' : 'No'}
  **Bias Assessment Completed:** ${td.biasAssessmentCompleted ? 'Yes' : 'No'}

  ### Data Subject Categories
  ${td.dataSubjectCategories.map(c => `- ${c}`).join('\n')}

  ### Geographic Scope
  ${td.geographicScope.map(g => `- ${g}`).join('\n')}
    `.trim();
}

function generateHumanOversightSection(system: AISystemProfile): string {
    if (system.humanOversight === OversightLevel.NONE) {
          return '*No human oversight measures are currently in place. This is required for high-risk AI systems under Article 14.*';
    }
    return `
    ### Human Oversight Design
    **Oversight Level:** ${system.humanOversight}
    **Decision Impact:** ${system.decisionImpact}

    ### Oversight Measures
    - Oversight type: ${system.humanOversight}
    - Human reviewers can understand AI system outputs
    - Override mechanisms are in place
    - System can be interrupted or stopped safely
      `.trim();
}

function generateAccuracySection(_system: AISystemProfile): string {
    return `
    ### Accuracy Metrics
    *This section will be auto-populated from connected testing/MLOps platforms.*

    Required elements:
    - Accuracy metrics and confidence levels
    - Performance benchmarks
    - Known limitations and failure modes
    - Robustness under adversarial conditions
      `.trim();
}

function generateCybersecuritySection(_system: AISystemProfile): string {
    return `
    ### Cybersecurity Assessment
    *This section will be auto-populated from connected security tools.*

    Required elements:
    - Threat model analysis
    - Data integrity protections
    - Access control mechanisms
    - Adversarial attack resilience
    - Incident response plan
      `.trim();
}
