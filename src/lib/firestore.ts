import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where, orderBy, Timestamp, onSnapshot, serverTimestamp } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export interface AISystemRecord {
  id?: string;
  name: string;
  description: string;
  purpose: string;
  domain: string;
  deployer: string;
  dataInputs: string[];
  outputType: string;
  affectedPersons: string;
  autonomyLevel: "fully_autonomous" | "human_in_loop" | "human_on_loop" | "human_in_command";
  modelType: string;
  trainingDataDescription: string;
  riskTier?: "UNACCEPTABLE" | "HIGH" | "LIMITED" | "MINIMAL";
  riskScore?: number;
  riskReasoning?: string[];
  complianceStatus: "COMPLIANT" | "PARTIAL" | "NON_COMPLIANT" | "NOT_ASSESSED";
  annexIVDocId?: string;
  conformityStatus?: string;
  userId: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface AnnexIVDocument {
  id?: string;
  systemId: string;
  systemName: string;
  sections: AnnexIVSection[];
  completeness: number;
  generatedAt?: any;
  userId: string;
  status: "DRAFT" | "REVIEW" | "APPROVED" | "PUBLISHED";
}

export interface AnnexIVSection {
  number: number;
  title: string;
  content: string;
  isComplete: boolean;
}

export interface ConformityRecord {
  id?: string;
  systemId: string;
  systemName: string;
  requirements: ConformityRequirement[];
  overallScore: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "PENDING_REVIEW" | "APPROVED";
  assessorName: string;
  userId: string;
  createdAt?: any;
}

export interface ConformityRequirement {
  id: string;
  article: string;
  title: string;
  description: string;
  status: "PASS" | "FAIL" | "PARTIAL" | "NOT_ASSESSED";
  evidence: string;
  notes: string;
}

// === AI SYSTEMS CRUD ===
export async function addAISystem(system: Omit<AISystemRecord, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "ai_systems"), {
    ...system,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateAISystem(id: string, data: Partial<AISystemRecord>): Promise<void> {
  await updateDoc(doc(db, "ai_systems", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteAISystem(id: string): Promise<void> {
  await deleteDoc(doc(db, "ai_systems", id));
}

export async function getAISystems(userId: string): Promise<AISystemRecord[]> {
  const q = query(collection(db, "ai_systems"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as AISystemRecord));
}

export async function getAISystem(id: string): Promise<AISystemRecord | null> {
  const snap = await getDoc(doc(db, "ai_systems", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as AISystemRecord) : null;
}

export function subscribeToSystems(userId: string, callback: (systems: AISystemRecord[]) => void) {
  const q = query(collection(db, "ai_systems"), where("userId", "==", userId));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() } as AISystemRecord)));
  });
}

// === ANNEX IV DOCUMENTS ===
export async function saveAnnexIVDoc(docData: Omit<AnnexIVDocument, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "annex_iv_docs"), {
    ...docData,
    generatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getAnnexIVDocs(userId: string): Promise<AnnexIVDocument[]> {
  const q = query(collection(db, "annex_iv_docs"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as AnnexIVDocument));
}

export async function updateAnnexIVDoc(id: string, data: Partial<AnnexIVDocument>): Promise<void> {
  await updateDoc(doc(db, "annex_iv_docs", id), data);
}

// === CONFORMITY ASSESSMENTS ===
export async function saveConformity(record: Omit<ConformityRecord, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "conformity_assessments"), {
    ...record,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getConformityRecords(userId: string): Promise<ConformityRecord[]> {
  const q = query(collection(db, "conformity_assessments"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ConformityRecord));
}

export async function updateConformity(id: string, data: Partial<ConformityRecord>): Promise<void> {
  await updateDoc(doc(db, "conformity_assessments", id), data);
}

// === AUDIT LOG ===
export async function logAudit(userId: string, action: string, details: string) {
  await addDoc(collection(db, "audit_log"), {
    userId,
    action,
    details,
    timestamp: serverTimestamp(),
  });
}
