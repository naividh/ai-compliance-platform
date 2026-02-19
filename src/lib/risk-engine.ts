import type { AISystemRecord } from "./firestore";

export interface RiskClassificationResult {
  tier: "UNACCEPTABLE" | "HIGH" | "LIMITED" | "MINIMAL";
  score: number;
  confidence: number;
  reasoning: RiskFactor[];
  euAiActArticles: string[];
  obligations: Obligation[];
  coloradoMapping?: { applicable: boolean; reason: string };
}

interface RiskFactor {
  factor: string;
  weight: number;
  score: number;
  explanation: string;
}

interface Obligation {
  id: string;
  title: string;
  article: string;
  description: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}

const HIGH_RISK_DOMAINS: Record<string, { annexRef: string; articles: string[] }> = {
  "hiring": { annexRef: "Annex III, 4(a)", articles: ["Art. 6(2)", "Art. 9-15"] },
  "recruitment": { annexRef: "Annex III, 4(a)", articles: ["Art. 6(2)", "Art. 9-15"] },
  "employment": { annexRef: "Annex III, 4(a)", articles: ["Art. 6(2)", "Art. 9-15"] },
  "credit": { annexRef: "Annex III, 5(b)", articles: ["Art. 6(2)", "Art. 9-15"] },
  "lending": { annexRef: "Annex III, 5(b)", articles: ["Art. 6(2)", "Art. 9-15"] },
  "insurance": { annexRef: "Annex III, 5(a)", articles: ["Art. 6(2)", "Art. 9-15"] },
  "healthcare": { annexRef: "Annex III, 1(a)", articles: ["Art. 6(2)", "Art. 9-15"] },
  "medical": { annexRef: "Annex III, 1(a)", articles: ["Art. 6(2)", "Art. 9-15"] },
  "education": { annexRef: "Annex III, 3(a)", articles: ["Art. 6(2)", "Art. 9-15"] },
  "law_enforcement": { annexRef: "Annex III, 6", articles: ["Art. 6(2)", "Art. 9-15", "Art. 26"] },
  "migration": { annexRef: "Annex III, 7", articles: ["Art. 6(2)", "Art. 9-15"] },
  "justice": { annexRef: "Annex III, 8", articles: ["Art. 6(2)", "Art. 9-15"] },
  "biometric": { annexRef: "Annex III, 1", articles: ["Art. 5", "Art. 6(2)"] },
  "critical_infrastructure": { annexRef: "Annex III, 2", articles: ["Art. 6(2)", "Art. 9-15"] },
};

const UNACCEPTABLE_PATTERNS = [
  { pattern: /social.?scoring/i, reason: "Social scoring by public authorities (Art. 5(1)(c))" },
  { pattern: /subliminal/i, reason: "Subliminal manipulation techniques (Art. 5(1)(a))" },
  { pattern: /exploit.*(vulnerabilit|age|disabilit)/i, reason: "Exploitation of vulnerabilities (Art. 5(1)(b))" },
  { pattern: /real.?time.*biometric.*public/i, reason: "Real-time biometric identification in public spaces (Art. 5(1)(d))" },
  { pattern: /emotion.?recognition.*(workplace|education)/i, reason: "Emotion recognition in workplace/education (Art. 5(1)(f))" },
  { pattern: /predictive.?policing/i, reason: "Individual predictive policing (Art. 5(1)(d))" },
  { pattern: /facial.?recognition.*scraping/i, reason: "Untargeted scraping for facial recognition DB (Art. 5(1)(e))" },
];

const LIMITED_RISK_PATTERNS = [
  { pattern: /chatbot|conversational/i, reason: "AI system interacting with natural persons (Art. 50(1))" },
  { pattern: /deepfake|synthetic.*media/i, reason: "AI generating synthetic content (Art. 50(4))" },
  { pattern: /content.?generat/i, reason: "AI-generated content disclosure (Art. 50(2))" },
  { pattern: /emotion.?detect/i, reason: "Emotion recognition system (Art. 50(3))" },
];

export function classifyAISystem(system: AISystemRecord): RiskClassificationResult {
  const factors: RiskFactor[] = [];
  let totalScore = 0;
  let totalWeight = 0;
  const articles: string[] = [];

  // Factor 1: Domain analysis (weight 35%)
  const domainLower = system.domain.toLowerCase();
  const purposeLower = (system.purpose + " " + system.description).toLowerCase();
  let domainScore = 0;
  let domainExplanation = "Domain does not match any high-risk categories";
  
  for (const [key, val] of Object.entries(HIGH_RISK_DOMAINS)) {
    if (domainLower.includes(key) || purposeLower.includes(key)) {
      domainScore = 85;
      domainExplanation = "Matches high-risk domain: " + val.annexRef;
      articles.push(...val.articles);
      break;
    }
  }
  factors.push({ factor: "Domain Risk", weight: 0.35, score: domainScore, explanation: domainExplanation });
  totalScore += domainScore * 0.35;
  totalWeight += 0.35;

  // Factor 2: Unacceptable risk check (weight: instant override)
  for (const { pattern, reason } of UNACCEPTABLE_PATTERNS) {
    if (pattern.test(purposeLower) || pattern.test(system.description)) {
      return {
        tier: "UNACCEPTABLE",
        score: 100,
        confidence: 95,
        reasoning: [{ factor: "Prohibited Practice", weight: 1, score: 100, explanation: reason }],
        euAiActArticles: ["Art. 5"],
        obligations: [{ id: "ban", title: "System Prohibited", article: "Art. 5", description: "This AI system falls under prohibited practices and cannot be placed on the EU market.", priority: "CRITICAL" }],
      };
    }
  }

  // Factor 3: Autonomy level (weight 20%)
  const autonomyScores: Record<string, number> = { fully_autonomous: 90, human_on_loop: 60, human_in_loop: 40, human_in_command: 20 };
  const autonomyScore = autonomyScores[system.autonomyLevel] || 50;
  factors.push({ factor: "Autonomy Level", weight: 0.20, score: autonomyScore, explanation: system.autonomyLevel === "fully_autonomous" ? "Fully autonomous decisions increase risk significantly" : "Human oversight reduces risk tier consideration" });
  totalScore += autonomyScore * 0.20;
  totalWeight += 0.20;

  // Factor 4: Population impact (weight 25%)
  const popMap: Record<string, number> = { "general_public": 90, "employees": 60, "customers": 70, "patients": 85, "students": 80, "applicants": 75 };
  let popScore = 50;
  for (const [key, val] of Object.entries(popMap)) {
    if (system.affectedPersons.toLowerCase().includes(key)) { popScore = val; break; }
  }
  factors.push({ factor: "Population Impact", weight: 0.25, score: popScore, explanation: "Affected population: " + system.affectedPersons });
  totalScore += popScore * 0.25;
  totalWeight += 0.25;

  // Factor 5: Data sensitivity (weight 20%)
  const sensitivePatterns = [/biometric/i, /health/i, /financial/i, /criminal/i, /ethnic/i, /political/i, /sexual/i, /genetic/i, /location/i, /behavioral/i];
  const dataStr = system.dataInputs.join(" ") + " " + system.trainingDataDescription;
  let dataScore = 20;
  const matches = sensitivePatterns.filter(p => p.test(dataStr));
  dataScore = Math.min(95, 20 + matches.length * 15);
  factors.push({ factor: "Data Sensitivity", weight: 0.20, score: dataScore, explanation: matches.length > 0 ? "Processes sensitive data categories (" + matches.length + " types detected)" : "No sensitive data categories detected" });
  totalScore += dataScore * 0.20;
  totalWeight += 0.20;

  // Determine tier
  let tier: RiskClassificationResult["tier"];
  if (totalScore >= 70) tier = "HIGH";
  else if (totalScore >= 40) tier = "LIMITED";
  else tier = "MINIMAL";

  // Check limited risk patterns
  if (tier === "MINIMAL") {
    for (const { pattern, reason } of LIMITED_RISK_PATTERNS) {
      if (pattern.test(purposeLower) || pattern.test(system.description)) {
        tier = "LIMITED";
        factors.push({ factor: "Transparency Obligation", weight: 0, score: 50, explanation: reason });
        articles.push("Art. 50");
        break;
      }
    }
  }

  // Generate obligations based on tier
  const obligations: Obligation[] = [];
  if (tier === "HIGH") {
    obligations.push(
      { id: "rms", title: "Risk Management System", article: "Art. 9", description: "Establish, implement, document and maintain a risk management system.", priority: "CRITICAL" },
      { id: "dg", title: "Data Governance", article: "Art. 10", description: "Training, validation and testing data sets shall meet quality criteria.", priority: "CRITICAL" },
      { id: "td", title: "Technical Documentation", article: "Art. 11", description: "Draw up technical documentation (Annex IV) before placing on market.", priority: "CRITICAL" },
      { id: "rl", title: "Record-Keeping", article: "Art. 12", description: "Enable automatic recording of events (logging).", priority: "HIGH" },
      { id: "ti", title: "Transparency & Information", article: "Art. 13", description: "Designed to enable deployers to interpret output and use appropriately.", priority: "HIGH" },
      { id: "ho", title: "Human Oversight", article: "Art. 14", description: "Designed to be effectively overseen by natural persons.", priority: "CRITICAL" },
      { id: "ar", title: "Accuracy, Robustness & Cybersecurity", article: "Art. 15", description: "Achieve appropriate level of accuracy, robustness and cybersecurity.", priority: "HIGH" },
      { id: "ca", title: "Conformity Assessment", article: "Art. 43", description: "Undergo conformity assessment procedure before placing on market.", priority: "CRITICAL" },
    );
    if (!articles.includes("Art. 9-15")) articles.push("Art. 9-15");
    articles.push("Art. 43");
  } else if (tier === "LIMITED") {
    obligations.push(
      { id: "trans", title: "Transparency Obligations", article: "Art. 50", description: "Ensure persons are informed they are interacting with an AI system.", priority: "MEDIUM" },
    );
    if (!articles.includes("Art. 50")) articles.push("Art. 50");
  }

  // Colorado AI Act mapping
  const coloradoApplicable = tier === "HIGH" && ["hiring", "recruitment", "employment", "credit", "lending", "insurance", "healthcare", "education"].some(d => domainLower.includes(d) || purposeLower.includes(d));

  return {
    tier,
    score: Math.round(totalScore),
    confidence: Math.min(95, 60 + factors.filter(f => f.score > 50).length * 10),
    reasoning: factors,
    euAiActArticles: [...new Set(articles)],
    obligations,
    coloradoMapping: { applicable: coloradoApplicable, reason: coloradoApplicable ? "System makes consequential decisions in a covered domain under Colorado SB 21-169" : "System does not fall under Colorado AI Act scope" },
  };
}
