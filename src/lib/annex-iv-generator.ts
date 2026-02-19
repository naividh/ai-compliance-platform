/**
 * Annex IV Technical Documentation Generator
 * 
 * EU AI Act Annex IV specifies the technical documentation that must be drawn up
 * before a high-risk AI system is placed on the market or put into service.
 * This generator auto-creates documentation from development artifacts.
 * 
 * Reference: Regulation (EU) 2024/1689 - Annex IV
 */

import type { AISystemProfile } from './risk-classification-engine';

export interface AnnexIVSection {
    sectionNumber: string;
    title: string;
    description: string;
    requiredContent: string[];
    status: 'complete' | 'partial' | 'missing';
    generatedContent?: string;
    sourceArtifacts?: string[];
    lastGenerated?: string;
}

export interface AnnexIVDocument {
    systemId: string;
    systemName: string;
    version: string;
    generatedDate: string;
    lastModified: string;
    status: 'draft' | 'review' | 'approved' | 'submitted';
    sections: AnnexIVSection[];
    overallCompleteness: number;
}

/**
 * Annex IV Section Templates
 * Based on EU AI Act Annex IV requirements for high-risk AI systems
 */
const ANNEX_IV_TEMPLATE: Omit<AnnexIVSection, 'status' | 'generatedContent' | 'sourceArtifacts' | 'lastGenerated'>[] = [
  {
        sectionNumber: '1',
        title: 'General Description of the AI System',
        description: 'A general description including the intended purpose, the name of the provider, the version of the system, and how the AI system interacts with hardware or software.',
        requiredContent: [
                'System name, version, and unique identifier',
                'Provider name and contact information',
                'Intended purpose and conditions of use',
                'Interaction with hardware/software that is not part of the AI system',
                'Versions of relevant software or firmware',
                'Description of the forms in which the AI system is placed on the market',
                'Hardware on which the AI system is intended to run',
                'Product photos or illustrations (where applicable)',
                'Instructions for use provided to the deployer',
              ],
  },
  {
        sectionNumber: '2',
        title: 'Detailed Description of Elements and Development Process',
        description: 'A detailed description of the elements of the AI system and of the process for its development.',
        requiredContent: [
                'Methods and steps for development of the AI system',
                'Design specifications: general logic, algorithms, key design choices',
                'Architecture description and computational resources used',
                'Description of data requirements (datasheets, training methodologies)',
                'Assessment of human oversight measures per Article 14',
                'Pre-determined changes to the system and its performance',
                'Third-party tools, components, or resources used',
                'Validation and testing procedures and results',
                'Cybersecurity measures taken per Article 15',
              ],
  },
  {
        sectionNumber: '3',
        title: 'Monitoring, Functioning and Control',
        description: 'Detailed information about the monitoring, functioning and control of the AI system.',
        requiredContent: [
                'Description of capabilities and limitations in performance',
                'Degrees of accuracy for specific persons or groups',
                'Foreseeable unintended outcomes and risks to health/safety/fundamental rights',
                'Human interface measures: human oversight per Article 14',
                'Specifications on input data (where applicable)',
                'Description of built-in mechanisms for accuracy monitoring',
              ],
  },
  {
        sectionNumber: '4',
        title: 'Risk Management System',
        description: 'A description of the risk management system in accordance with Article 9.',
        requiredContent: [
                'Description of the risk management process',
                'Identification and analysis of known and foreseeable risks',
                'Estimation and evaluation of risks from intended use and misuse',
                'Risk mitigation and control measures adopted',
                'Residual risks and their acceptability',
                'Testing procedures for risk management',
              ],
  },
  {
        sectionNumber: '5',
        title: 'Data Governance',
        description: 'A description of the data governance measures in accordance with Article 10.',
        requiredContent: [
                'Training, validation, and testing data sets description',
                'Data collection processes and origin of data',
                'Data preparation operations (annotation, labelling, cleaning)',
                'Formulation of assumptions regarding data',
                'Assessment of data availability, quantity, and suitability',
                'Examination of possible biases',
                'Measures to detect, prevent, and mitigate bias',
                'Gaps or deficiencies in data and how addressed',
              ],
  },
  {
        sectionNumber: '6',
        title: 'Human Oversight Measures',
        description: 'Description of measures in accordance with Article 14.',
        requiredContent: [
                'Technical measures for human oversight',
                'Measures to facilitate interpretation of outputs',
                'Human-in-the-loop / human-on-the-loop / human-in-command specification',
                'Competencies and authority of persons conducting oversight',
              ],
  },
  {
        sectionNumber: '7',
        title: 'Accuracy, Robustness and Cybersecurity',
        description: 'Description of measures in accordance with Article 15.',
        requiredContent: [
                'Levels of accuracy and accuracy metrics',
                'Expected level of accuracy declared in instructions for use',
                'Robustness measures: technical redundancy, fail-safe mechanisms',
                'Cybersecurity measures against unauthorized access/manipulation',
                'Resilience to errors, faults, or inconsistencies',
              ],
  },
  {
        sectionNumber: '8',
        title: 'Quality Management System',
        description: 'A description of the quality management system per Article 17.',
        requiredContent: [
                'Compliance strategy and regulatory framework mapping',
                'Design and development procedures',
                'Examination, testing, and validation pre/during/post development',
                'Technical specifications and standards applied',
                'Systems and procedures for data management',
                'Risk management system details',
                'Post-market monitoring system',
                'Procedures for incident reporting per Article 73',
                'Communication with authorities and competent bodies',
                'Record-keeping policies',
                'Resource management and allocation',
                'Accountability framework',
              ],
  },
  {
        sectionNumber: '9',
        title: 'Changes Through Lifecycle',
        description: 'Description of changes made to the system through its lifecycle.',
        requiredContent: [
                'Change log with dates and descriptions',
                'Impact assessment of changes on compliance',
                'Version history and release notes',
                'Pre-determined changes described at initial assessment',
              ],
  },
  {
        sectionNumber: '10',
        title: 'Harmonised Standards and Common Specifications',
        description: 'A list of the harmonised standards applied in full or in part.',
        requiredContent: [
                'List of harmonised standards applied (full or partial)',
                'Where partial: which parts were applied',
                'Common specifications applied (if no harmonised standards)',
                'Other standards, certifications, or specifications relied upon',
              ],
  },
  {
        sectionNumber: '11',
        title: 'EU Declaration of Conformity',
        description: 'A copy of the EU declaration of conformity referred to in Article 47.',
        requiredContent: [
                'Copy of the signed EU declaration of conformity',
                'Identification of the AI system and provider',
                'Statement of conformity with applicable requirements',
                'Reference to harmonised standards or specifications used',
                'Notified body involvement (if applicable)',
              ],
  },
  {
        sectionNumber: '12',
        title: 'Post-Market Monitoring Plan',
        description: 'A description of the post-market monitoring system per Article 72.',
        requiredContent: [
                'Post-market monitoring plan and procedures',
                'Data collection strategy for ongoing performance monitoring',
                'Procedures for addressing identified issues',
                'Incident reporting mechanisms per Article 73',
                'Corrective action procedures',
                'Communication plan for relevant stakeholders',
              ],
  },
  ];

export class AnnexIVGenerator {
    /**
     * Generate a blank Annex IV document template for a given AI system
     */
  generateTemplate(system: AISystemProfile): AnnexIVDocument {
        const sections: AnnexIVSection[] = ANNEX_IV_TEMPLATE.map((template) => ({
                ...template,
                status: 'missing' as const,
                sourceArtifacts: [],
        }));

      return {
              systemId: system.id,
              systemName: system.name,
              version: '1.0.0-draft',
              generatedDate: new Date().toISOString(),
              lastModified: new Date().toISOString(),
              status: 'draft',
              sections,
              overallCompleteness: 0,
      };
  }

  /**
     * Auto-generate Section 1 (General Description) from system profile
     */
  generateSection1(system: AISystemProfile): string {
        return [
                `# 1. General Description of the AI System`,
                ``,
                `## 1.1 System Identification`,
                `- **System Name:** ${system.name}`,
                `- **System ID:** ${system.id}`,
                `- **Provider:** ${system.vendor}`,
                `- **Department:** ${system.department}`,
                `- **Deployment Date:** ${system.deploymentDate}`,
                ``,
                `## 1.2 Intended Purpose`,
                `${system.intendedPurpose}`,
                ``,
                `## 1.3 Description`,
                `${system.description}`,
                ``,
                `## 1.4 AI Capabilities`,
                system.aiCapabilities.map((c) => `- ${c}`).join('\n'),
                ``,
                `## 1.5 Geographic Scope`,
                system.geographicScope.map((g) => `- ${g}`).join('\n'),
                ``,
                `## 1.6 Regulatory Frameworks`,
                system.regulatoryFrameworks.map((r) => `- ${r}`).join('\n'),
                ``,
                `## 1.7 Data Categories Processed`,
                system.dataCategories.map((d) => `- ${d}`).join('\n'),
                ``,
                `## 1.8 Output Types`,
                system.outputTypes.map((o) => `- ${o}`).join('\n'),
                ``,
                `## 1.9 Personal Data Usage`,
                `- Uses Personal Data: ${system.usesPersonalData ? 'Yes' : 'No'}`,
                `- Uses Biometric Data: ${system.usesBiometricData ? 'Yes' : 'No'}`,
                ``,
                `## 1.10 Human Oversight Level`,
                `- Oversight Model: ${system.humanOversightLevel}`,
                `- Autonomous Operation: ${system.isAutonomous ? 'Yes' : 'No'}`,
              ].join('\n');
  }

  /**
     * Calculate overall document completeness
     */
  calculateCompleteness(doc: AnnexIVDocument): number {
        const total = doc.sections.length;
        const complete = doc.sections.filter((s) => s.status === 'complete').length;
        const partial = doc.sections.filter((s) => s.status === 'partial').length;
        return Math.round(((complete + partial * 0.5) / total) * 100);
  }

  /**
     * Get the Annex IV section template
     */
  getTemplate(): typeof ANNEX_IV_TEMPLATE {
        return ANNEX_IV_TEMPLATE;
  }
}
