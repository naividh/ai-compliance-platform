'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth, AuthProvider } from '../lib/auth-context';
import LoginPage from '../components/auth/LoginPage';
import { addAISystem, getAISystems, updateAISystem, deleteAISystem, saveAnnexIVDoc, getAnnexIVDocs, logAudit } from '../lib/firestore';
import type { AISystemRecord, AnnexIVDocument } from '../lib/firestore';
import { classifyAISystem } from '../lib/risk-engine';
import type { RiskClassificationResult } from '../lib/risk-engine';
import { generateAnnexIV, calculateCompleteness, generatePlainText } from '../lib/annex-iv-generator';

const DOMAINS = ["hiring","credit","insurance","healthcare","education","law_enforcement","biometric","critical_infrastructure","marketing","customer_service","content_generation","internal_analytics"];
const AUTONOMY_LEVELS = [{v:"fully_autonomous",l:"Fully Autonomous"},{v:"human_in_loop",l:"Human-in-the-Loop"},{v:"human_on_loop",l:"Human-on-the-Loop"},{v:"human_in_command",l:"Human-in-Command"}];
const TIER_COLORS: Record<string,string> = { UNACCEPTABLE:"bg-black text-white", HIGH:"bg-red-600 text-white", LIMITED:"bg-yellow-500 text-black", MINIMAL:"bg-green-600 text-white" };
const STATUS_COLORS: Record<string,string> = { COMPLIANT:"bg-emerald-600", PARTIAL:"bg-amber-500", NON_COMPLIANT:"bg-red-600", NOT_ASSESSED:"bg-gray-500" };

type View = "dashboard"|"systems"|"add_system"|"classify"|"documents"|"system_detail";

function AppContent() {
  const { user, logout } = useAuth();
  const [view, setView] = useState<View>("dashboard");
  const [systems, setSystems] = useState<AISystemRecord[]>([]);
  const [docs, setDocs] = useState<AnnexIVDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState<AISystemRecord|null>(null);
  const [classification, setClassification] = useState<RiskClassificationResult|null>(null);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name:"", description:"", purpose:"", domain:"hiring", deployer:"", dataInputs:"",
    outputType:"", affectedPersons:"", autonomyLevel:"human_in_loop" as any,
    modelType:"", trainingDataDescription:""
  });

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [s, d] = await Promise.all([getAISystems(user.uid), getAnnexIVDocs(user.uid)]);
      setSystems(s);
      setDocs(d);
    } catch(e) { console.error(e); }
    setLoading(false);
  }, [user]);

  useEffect(() => { loadData(); }, [loadData]);

  if (!user) return <LoginPage />;

  const handleAddSystem = async (e: React.FormEvent) => {
    e.preventDefault();
    const system: Omit<AISystemRecord,"id"> = {
      ...formData,
      dataInputs: formData.dataInputs.split(",").map(s=>s.trim()).filter(Boolean),
      complianceStatus: "NOT_ASSESSED",
      userId: user.uid,
    };
    const result = classifyAISystem(system as AISystemRecord);
    system.riskTier = result.tier;
    system.riskScore = result.score;
    system.riskReasoning = result.reasoning.map(r=>r.explanation);
    await addAISystem(system);
    await logAudit(user.uid, "ADD_SYSTEM", "Added AI system: " + formData.name);
    setFormData({name:"",description:"",purpose:"",domain:"hiring",deployer:"",dataInputs:"",outputType:"",affectedPersons:"",autonomyLevel:"human_in_loop",modelType:"",trainingDataDescription:""});
    await loadData();
    setView("systems");
  };

  const handleClassify = (sys: AISystemRecord) => {
    const result = classifyAISystem(sys);
    setSelectedSystem(sys);
    setClassification(result);
    setView("classify");
  };

  const handleGenerateDoc = async (sys: AISystemRecord) => {
    setGenerating(true);
    const result = classifyAISystem(sys);
    const sections = generateAnnexIV(sys, result);
    const completeness = calculateCompleteness(sections);
    await saveAnnexIVDoc({ systemId: sys.id!, systemName: sys.name, sections, completeness, userId: user.uid, status: "DRAFT" });
    await logAudit(user.uid, "GENERATE_DOC", "Generated Annex IV for: " + sys.name);
    await loadData();
    setGenerating(false);
    setView("documents");
  };

  const handleExportDoc = (doc: AnnexIVDocument) => {
    const text = generatePlainText(doc.sections, doc.systemName);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AnnexIV_${doc.systemName.replace(/\s/g,"_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteSystem = async (id: string) => {
    if (!confirm("Delete this AI system?")) return;
    await deleteAISystem(id);
    await logAudit(user.uid, "DELETE_SYSTEM", "Deleted system: " + id);
    await loadData();
  };

  const daysUntilDeadline = Math.ceil((new Date("2026-08-02").getTime() - Date.now()) / 86400000);
  const highRiskCount = systems.filter(s=>s.riskTier==="HIGH").length;
  const compliantCount = systems.filter(s=>s.complianceStatus==="COMPLIANT").length;

  const nav = [
    {id:"dashboard" as View, label:"Dashboard", icon:"📊"},
    {id:"systems" as View, label:"AI Systems", icon:"🤖"},
    {id:"add_system" as View, label:"Register System", icon:"➕"},
    {id:"documents" as View, label:"Documents", icon:"📄"},
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Compliance Platform</h1>
          <div className="mt-2 text-xs text-gray-400">EU AI Act Deadline</div>
          <div className="text-2xl font-bold text-red-400">{daysUntilDeadline} days</div>
        </div>
        <nav className="flex-1 p-2">
          {nav.map(n=>(
            <button key={n.id} onClick={()=>setView(n.id)} className={`w-full text-left px-3 py-2 rounded-lg mb-1 text-sm flex items-center gap-2 ${view===n.id?"bg-blue-600/20 text-blue-400":"text-gray-400 hover:bg-gray-800"}`}>
              <span>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            {user.photoURL && <img src={user.photoURL} className="w-8 h-8 rounded-full" alt="" />}
            <div className="text-xs truncate">
              <div className="text-white font-medium">{user.displayName}</div>
              <div className="text-gray-500">{user.email}</div>
            </div>
          </div>
          <button onClick={logout} className="text-xs text-gray-500 hover:text-red-400">Sign out</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">

        {/* DASHBOARD VIEW */}
        {view === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Compliance Dashboard</h2>
            {daysUntilDeadline < 180 && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
                <div className="font-bold text-red-400">EU AI Act High-Risk Provisions</div>
                <div className="text-sm text-red-300">{daysUntilDeadline} days until August 2, 2026 deadline. {highRiskCount} high-risk system(s) require conformity assessment.</div>
              </div>
            )}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800"><div className="text-3xl font-bold text-blue-400">{systems.length}</div><div className="text-xs text-gray-500">Total Systems</div></div>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800"><div className="text-3xl font-bold text-red-400">{highRiskCount}</div><div className="text-xs text-gray-500">High Risk</div></div>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800"><div className="text-3xl font-bold text-emerald-400">{compliantCount}</div><div className="text-xs text-gray-500">Compliant</div></div>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800"><div className="text-3xl font-bold text-purple-400">{docs.length}</div><div className="text-xs text-gray-500">Documents</div></div>
            </div>
            {systems.length === 0 ? (
              <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-800">
                <div className="text-4xl mb-4">🤖</div>
                <div className="text-lg font-medium mb-2">No AI Systems Registered</div>
                <div className="text-sm text-gray-400 mb-4">Start by registering your first AI system to begin compliance assessment.</div>
                <button onClick={()=>setView("add_system")} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium">Register AI System</button>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg border border-gray-800">
                <div className="p-4 border-b border-gray-800 font-medium">AI Systems Overview</div>
                <table className="w-full text-sm">
                  <thead><tr className="text-gray-500 text-xs"><th className="text-left p-3">System</th><th className="text-left p-3">Domain</th><th className="text-left p-3">Risk</th><th className="text-left p-3">Status</th><th className="text-left p-3">Actions</th></tr></thead>
                  <tbody>
                    {systems.map(s=>(
                      <tr key={s.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                        <td className="p-3 font-medium">{s.name}</td>
                        <td className="p-3 text-gray-400 capitalize">{s.domain?.replace(/_/g," ")}</td>
                        <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${TIER_COLORS[s.riskTier||"MINIMAL"]}`}>{s.riskTier||"N/A"}</span></td>
                        <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${STATUS_COLORS[s.complianceStatus]} text-white`}>{s.complianceStatus?.replace(/_/g," ")}</span></td>
                        <td className="p-3 flex gap-2">
                          <button onClick={()=>handleClassify(s)} className="text-blue-400 hover:text-blue-300 text-xs">Classify</button>
                          <button onClick={()=>handleGenerateDoc(s)} className="text-purple-400 hover:text-purple-300 text-xs">{generating?"...":"Generate Doc"}</button>
                          <button onClick={()=>handleDeleteSystem(s.id!)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ADD SYSTEM VIEW */}
        {view === "add_system" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Register AI System</h2>
            <form onSubmit={handleAddSystem} className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-400 mb-1">System Name *</label><input required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" placeholder="e.g., TalentMatch AI" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Deployer / Provider *</label><input required value={formData.deployer} onChange={e=>setFormData({...formData,deployer:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" placeholder="e.g., Acme Corp" /></div>
              </div>
              <div><label className="block text-xs text-gray-400 mb-1">Purpose *</label><textarea required value={formData.purpose} onChange={e=>setFormData({...formData,purpose:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm h-20" placeholder="Describe what this AI system does..." /></div>
              <div><label className="block text-xs text-gray-400 mb-1">Description *</label><textarea required value={formData.description} onChange={e=>setFormData({...formData,description:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm h-20" placeholder="Detailed description of how the system works..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-400 mb-1">Domain *</label><select value={formData.domain} onChange={e=>setFormData({...formData,domain:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">{DOMAINS.map(d=><option key={d} value={d}>{d.replace(/_/g," ")}</option>)}</select></div>
                <div><label className="block text-xs text-gray-400 mb-1">Autonomy Level *</label><select value={formData.autonomyLevel} onChange={e=>setFormData({...formData,autonomyLevel:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">{AUTONOMY_LEVELS.map(a=><option key={a.v} value={a.v}>{a.l}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-400 mb-1">Data Inputs (comma-separated) *</label><input required value={formData.dataInputs} onChange={e=>setFormData({...formData,dataInputs:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" placeholder="e.g., resumes, job descriptions, behavioral data" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Output Type *</label><input required value={formData.outputType} onChange={e=>setFormData({...formData,outputType:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" placeholder="e.g., candidate rankings, risk scores" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-400 mb-1">Affected Persons *</label><input required value={formData.affectedPersons} onChange={e=>setFormData({...formData,affectedPersons:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" placeholder="e.g., job applicants, employees" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Model Type *</label><input required value={formData.modelType} onChange={e=>setFormData({...formData,modelType:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" placeholder="e.g., Transformer, Random Forest, LLM" /></div>
              </div>
              <div><label className="block text-xs text-gray-400 mb-1">Training Data Description *</label><textarea required value={formData.trainingDataDescription} onChange={e=>setFormData({...formData,trainingDataDescription:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm h-20" placeholder="Describe the training dataset..." /></div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium">Register & Classify System</button>
            </form>
          </div>
        )}

        {/* SYSTEMS VIEW */}
        {view === "systems" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">AI Systems Registry</h2>
              <button onClick={()=>setView("add_system")} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">+ Register System</button>
            </div>
            {loading ? <div className="text-gray-400">Loading...</div> : systems.length === 0 ? (
              <div className="text-center py-12 text-gray-400">No systems registered yet. <button onClick={()=>setView("add_system")} className="text-blue-400 underline">Add one now</button></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systems.map(s=>(
                  <div key={s.id} className={`bg-gray-900 rounded-lg border border-gray-800 p-4 ${s.riskTier==="HIGH"?"ring-1 ring-red-500/30":""}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div><div className="font-bold text-lg">{s.name}</div><div className="text-xs text-gray-500 capitalize">{s.domain?.replace(/_/g," ")} | {s.deployer}</div></div>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${TIER_COLORS[s.riskTier||"MINIMAL"]}`}>{s.riskTier||"N/A"}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{s.purpose}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${STATUS_COLORS[s.complianceStatus]} text-white`}>{s.complianceStatus?.replace(/_/g," ")}</span>
                      {s.riskScore !== undefined && <span className="text-xs text-gray-500">Score: {s.riskScore}/100</span>}
                    </div>
                    <div className="flex gap-2 text-xs">
                      <button onClick={()=>handleClassify(s)} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-600/30">Classify</button>
                      <button onClick={()=>handleGenerateDoc(s)} className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded hover:bg-purple-600/30">Generate Annex IV</button>
                      <button onClick={()=>handleDeleteSystem(s.id!)} className="bg-red-600/20 text-red-400 px-3 py-1 rounded hover:bg-red-600/30">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CLASSIFICATION VIEW */}
        {view === "classify" && selectedSystem && classification && (
          <div>
            <button onClick={()=>setView("systems")} className="text-sm text-gray-400 hover:text-white mb-4 inline-block">&larr; Back to Systems</button>
            <h2 className="text-2xl font-bold mb-2">Risk Classification: {selectedSystem.name}</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
                <div className={`inline-block px-4 py-2 rounded-lg text-xl font-bold ${TIER_COLORS[classification.tier]}`}>{classification.tier}</div>
                <div className="text-xs text-gray-400 mt-2">Risk Tier</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
                <div className="text-3xl font-bold text-orange-400">{classification.score}</div>
                <div className="text-xs text-gray-400 mt-2">Risk Score</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
                <div className="text-3xl font-bold text-cyan-400">{classification.confidence}%</div>
                <div className="text-xs text-gray-400 mt-2">Confidence</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                <h3 className="font-bold mb-3">Risk Factors</h3>
                {classification.reasoning.map((r,i)=>(
                  <div key={i} className="mb-3 border-b border-gray-800 pb-3 last:border-0">
                    <div className="flex justify-between text-sm"><span className="font-medium">{r.factor}</span><span className="text-gray-400">Weight: {Math.round(r.weight*100)}%</span></div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1"><div className="h-2 rounded-full" style={{width:r.score+"%",background:r.score>70?"#ef4444":r.score>40?"#eab308":"#22c55e"}} /></div>
                    <div className="text-xs text-gray-400 mt-1">{r.explanation}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 mb-4">
                  <h3 className="font-bold mb-3">Compliance Obligations ({classification.obligations.length})</h3>
                  {classification.obligations.map(o=>(
                    <div key={o.id} className="flex items-start gap-2 mb-2 text-sm">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${o.priority==="CRITICAL"?"bg-red-600":"bg-yellow-600"} text-white`}>{o.priority}</span>
                      <div><div className="font-medium">{o.title} <span className="text-gray-500">({o.article})</span></div><div className="text-xs text-gray-400">{o.description}</div></div>
                    </div>
                  ))}
                </div>
                {classification.coloradoMapping && (
                  <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                    <h3 className="font-bold mb-2">Colorado AI Act</h3>
                    <div className={`text-sm ${classification.coloradoMapping.applicable?"text-red-400":"text-green-400"}`}>
                      {classification.coloradoMapping.applicable ? "⚠ Applicable" : "✓ Not Applicable"}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{classification.coloradoMapping.reason}</div>
                  </div>
                )}
                <div className="mt-4 bg-gray-900 rounded-lg border border-gray-800 p-4">
                  <h3 className="font-bold mb-2">EU AI Act Articles</h3>
                  <div className="flex flex-wrap gap-2">{classification.euAiActArticles.map(a=><span key={a} className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded text-xs">{a}</span>)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTS VIEW */}
        {view === "documents" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Annex IV Documents</h2>
            {docs.length === 0 ? (
              <div className="text-center py-12 text-gray-400">No documents generated yet. Go to <button onClick={()=>setView("systems")} className="text-blue-400 underline">AI Systems</button> and click &quot;Generate Annex IV&quot;.</div>
            ) : (
              <div className="space-y-4">
                {docs.map(d=>(
                  <div key={d.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-lg">{d.systemName}</div>
                        <div className="text-xs text-gray-500">Annex IV Technical Documentation | {d.sections?.length || 0} sections | {d.status}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right"><div className="text-2xl font-bold text-blue-400">{d.completeness}%</div><div className="text-xs text-gray-500">Complete</div></div>
                        <button onClick={()=>handleExportDoc(d)} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs">Export TXT</button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3"><div className="h-2 rounded-full bg-blue-500" style={{width:d.completeness+"%"}} /></div>
                    <div className="grid grid-cols-5 gap-2">
                      {d.sections?.slice(0,10).map(s=>(
                        <div key={s.number} className={`text-xs p-2 rounded ${s.isComplete?"bg-green-900/30 text-green-400 border border-green-800":"bg-gray-800 text-gray-400 border border-gray-700"}`}>
                          <div className="font-medium">S{s.number}</div>
                          <div className="truncate">{s.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return <AuthProvider><AppContent /></AuthProvider>;
}
