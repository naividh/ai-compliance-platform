import type { AISystemRecord, AnnexIVSection } from "./firestore";
import type { RiskClassificationResult } from "./risk-engine";

export function generateAnnexIV(system: AISystemRecord, classification: RiskClassificationResult): AnnexIVSection[] {
  const now = new Date().toISOString().split("T")[0];
  
  return [
    {
      number: 1,
      title: "General Description of the AI System",
      content: `1.1 System Name: ${system.name}\n1.2 Intended Purpose: ${system.purpose}\n1.3 System Description: ${system.description}\n1.4 Version: 1.0\n1.5 Date: ${now}\n1.6 Provider/Deployer: ${system.deployer}\n1.7 Risk Classification: ${classification.tier} (Score: ${classification.score}/100, Confidence: ${classification.confidence}%)\n1.8 EU AI Act References: ${classification.euAiActArticles.join(", ")}\n1.9 Domain: ${system.domain}\n1.10 Output Type: ${system.outputType}`,
      isComplete: true,
    },
    {
      number: 2,
      title: "Detailed Description of Elements and Development Process",
      content: `2.1 Model Type: ${system.modelType}\n2.2 Training Data Description: ${system.trainingDataDescription}\n2.3 Data Inputs: ${system.dataInputs.join(", ")}\n2.4 Development Methodology: The system was developed following [methodology]. Key development phases included data collection, preprocessing, model training, validation, and testing.\n2.5 Design Choices: Key architectural decisions include [architecture details].\n2.6 Computational Resources: [To be completed with training infrastructure details]\n2.7 Third-Party Components: [List any third-party AI models, libraries, or datasets used]`,
      isComplete: false,
    },
    {
      number: 3,
      title: "Detailed Information on Monitoring, Functioning and Control",
      content: `3.1 Autonomy Level: ${system.autonomyLevel.replace(/_/g, " ")}\n3.2 Human Oversight Measures: ${system.autonomyLevel === "human_in_command" ? "Full human control over all decisions" : system.autonomyLevel === "human_in_loop" ? "Human approval required before each decision is executed" : system.autonomyLevel === "human_on_loop" ? "Human monitors system outputs with ability to intervene" : "System operates autonomously - enhanced monitoring required"}\n3.3 Performance Metrics: [Accuracy, precision, recall, F1 scores to be documented]\n3.4 Output Interpretation: The system produces ${system.outputType}. Deployers should interpret outputs as [guidance].\n3.5 Control Mechanisms: [Override, pause, shutdown capabilities]`,
      isComplete: false,
    },
    {
      number: 4,
      title: "Risk Management System",
      content: `4.1 Known Risks: Based on risk classification (${classification.tier}), the following risks have been identified:\n${classification.reasoning.map(r => "  - " + r.factor + ": " + r.explanation + " (Score: " + r.score + ")").join("\n")}\n4.2 Risk Mitigation Measures: [Document specific measures for each identified risk]\n4.3 Residual Risks: [Document remaining risks after mitigation]\n4.4 Risk Monitoring: Continuous monitoring of system performance and risk indicators.\n4.5 Foreseeable Misuse: [Document potential misuse scenarios and preventive measures]`,
      isComplete: false,
    },
    {
      number: 5,
      title: "Data Governance and Management",
      content: `5.1 Training Data: ${system.trainingDataDescription}\n5.2 Data Categories: ${system.dataInputs.join(", ")}\n5.3 Data Quality Measures: [Document data quality assurance processes]\n5.4 Bias Detection: [Document bias testing methodology and results]\n5.5 Data Protection: Processing of personal data complies with GDPR requirements.\n5.6 Data Retention: [Document data retention policies]\n5.7 Affected Persons: ${system.affectedPersons}`,
      isComplete: false,
    },
    {
      number: 6,
      title: "Testing and Validation",
      content: `6.1 Testing Methodology: [Describe testing approach]\n6.2 Test Datasets: [Describe test data composition]\n6.3 Performance Results: [Accuracy: %, Precision: %, Recall: %, F1: %]\n6.4 Bias Testing Results: [Document fairness metrics across demographic groups]\n6.5 Robustness Testing: [Adversarial testing results]\n6.6 Validation Against Intended Purpose: [Confirm system meets stated purpose]`,
      isComplete: false,
    },
    {
      number: 7,
      title: "Changes and Updates Log",
      content: `7.1 Version History:\n  - v1.0 (${now}): Initial system documentation\n7.2 Change Management Process: All changes to the AI system are logged and assessed for compliance impact.\n7.3 Post-Market Monitoring: System performance is continuously monitored after deployment.`,
      isComplete: true,
    },
    {
      number: 8,
      title: "Conformity Assessment Information",
      content: `8.1 Applicable Conformity Assessment: ${classification.tier === "HIGH" ? "Conformity assessment required under Art. 43" : "Self-assessment sufficient"}\n8.2 Applied Standards: [List harmonised standards applied]\n8.3 Obligations:\n${classification.obligations.map(o => "  - [" + o.priority + "] " + o.title + " (" + o.article + "): " + o.description).join("\n")}\n8.4 ${classification.coloradoMapping?.applicable ? "Colorado AI Act: This system is also subject to Colorado SB 21-169 requirements." : "Colorado AI Act: Not applicable to this system."}`,
      isComplete: false,
    },
    {
      number: 9,
      title: "Instructions for Use",
      content: `9.1 Intended Users: ${system.deployer}\n9.2 Intended Use: ${system.purpose}\n9.3 Known Limitations: [Document system limitations]\n9.4 Prohibited Uses: [Document uses the system is not designed for]\n9.5 Installation and Configuration: [Deployment instructions]\n9.6 Maintenance Requirements: [Ongoing maintenance procedures]`,
      isComplete: false,
    },
    {
      number: 10,
      title: "EU Declaration of Conformity",
      content: `10.1 This declaration is issued under the sole responsibility of the provider.\n10.2 AI System: ${system.name}\n10.3 Provider: ${system.deployer}\n10.4 Risk Classification: ${classification.tier}\n10.5 The AI system described above is in conformity with Regulation (EU) 2024/1689 (AI Act).\n10.6 Applicable provisions: ${classification.euAiActArticles.join(", ")}\n10.7 Signed: [Authorized Representative]\n10.8 Date: ${now}`,
      isComplete: false,
    },
  ];
}

export function calculateCompleteness(sections: AnnexIVSection[]): number {
  if (sections.length === 0) return 0;
  const complete = sections.filter(s => s.isComplete).length;
  return Math.round((complete / sections.length) * 100);
}

export function generatePlainText(sections: AnnexIVSection[], systemName: string): string {
  let text = "ANNEX IV - TECHNICAL DOCUMENTATION\n";
  text += "EU AI Act - Regulation (EU) 2024/1689\n";
  text += "=".repeat(60) + "\n\n";
  text += "System: " + systemName + "\n";
  text += "Generated: " + new Date().toISOString() + "\n\n";
  
  for (const section of sections) {
    text += "-".repeat(60) + "\n";
    text += "Section " + section.number + ": " + section.title + "\n";
    text += (section.isComplete ? "[COMPLETE]" : "[DRAFT - REQUIRES COMPLETION]") + "\n";
    text += "-".repeat(60) + "\n\n";
    text += section.content + "\n\n";
  }
  
  return text;
}
