"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { getUserSystems, deleteSystem, createGeneratedDoc, getUserGeneratedDocs, AISystemDoc, GeneratedDoc } from "@/lib/firestore";
import { classifySystem } from "@/lib/risk-engine";
import { generateAnnexIV } from "@/lib/annex-iv-generator";
import AddSystemForm from "@/components/systems/AddSystemForm";

const tierColors: Record<string, string> = {
  Unacceptable: "bg-red-500/20 text-red-400 border-red-500/30",
  High: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Limited: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Minimal: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default function LiveDashboard() {
  const { user } = useAuth();
  const [systems, setSystems] = useState<AISystemDoc[]>([]);
  const [docs, setDocs] = useState<GeneratedDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<AISystemDoc | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"systems" | "documents">("systems");

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [s, d] = await Promise.all([
        getUserSystems(user.uid),
        getUserGeneratedDocs(user.uid),
      ]);
      setSystems(s);
      setDocs(d);
    } catch (err) {
      console.error("Error loading data:", err);
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this AI system?")) return;
    await deleteSystem(id);
    loadData();
  };

  const handleGenerateDoc = async (system: AISystemDoc) => {
    if (!user || !system.id) return;
    setGenerating(system.id);
    try {
      const content = generateAnnexIV(system);
      await createGeneratedDoc({
        systemId: system.id,
        systemName: system.name,
        docType: "Annex IV Technical Documentation",
        content,
        userId: user.uid,
      });
      loadData();
      setActiveTab("documents");
    } catch (err) {
      console.error("Error generating doc:", err);
    }
    setGenerating(null);
  };

  const handleDownload = (gdoc: GeneratedDoc) => {
    const blob = new Blob([gdoc.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Annex_IV_${gdoc.systemName.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tierCounts = systems.reduce((acc, s) => {
    acc[s.riskTier || "Unknown"] = (acc[s.riskTier || "Unknown"] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showForm && <AddSystemForm onClose={() => setShowForm(false)} onSaved={loadData} />}

      {selectedSystem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">{selectedSystem.name}</h2>
              <button onClick={() => setSelectedSystem(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className={"px-3 py-1 rounded-full text-xs font-medium border " + (tierColors[selectedSystem.riskTier || ""] || "bg-slate-700 text-slate-300")}>{selectedSystem.riskTier} Risk</span>
                <span className="px-3 py-1 rounded-full text-xs bg-slate-700 text-slate-300">Score: {selectedSystem.riskScore}/100</span>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-2">Classification Reasoning</h3>
                <p className="text-sm text-slate-300">{selectedSystem.riskReasoning}</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-2">Obligations</h3>
                <ul className="space-y-1">
                  {(selectedSystem.obligations || []).map((o, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span> {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Department</p>
                  <p className="text-sm text-white">{selectedSystem.department}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Owner</p>
                  <p className="text-sm text-white">{selectedSystem.owner}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Data Inputs</p>
                  <p className="text-sm text-white">{selectedSystem.dataInputs}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Tech Stack</p>
                  <p className="text-sm text-white">{selectedSystem.techStack}</p>
                </div>
              </div>
              <button
                onClick={() => { handleGenerateDoc(selectedSystem); setSelectedSystem(null); }}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >Generate Annex IV Documentation</button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <p className="text-xs text-slate-400">Total Systems</p>
          <p className="text-2xl font-bold text-white">{systems.length}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <p className="text-xs text-slate-400">High Risk</p>
          <p className="text-2xl font-bold text-orange-400">{tierCounts["High"] || 0}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <p className="text-xs text-slate-400">Documents Generated</p>
          <p className="text-2xl font-bold text-blue-400">{docs.length}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <p className="text-xs text-slate-400">EU AI Act Deadline</p>
          <p className="text-lg font-bold text-red-400">Aug 2, 2026</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700">
        <button onClick={() => setActiveTab("systems")} className={"px-4 py-2 text-sm font-medium border-b-2 " + (activeTab === "systems" ? "text-blue-400 border-blue-400" : "text-slate-400 border-transparent hover:text-white")}>AI Systems ({systems.length})</button>
        <button onClick={() => setActiveTab("documents")} className={"px-4 py-2 text-sm font-medium border-b-2 " + (activeTab === "documents" ? "text-blue-400 border-blue-400" : "text-slate-400 border-transparent hover:text-white")}>Generated Documents ({docs.length})</button>
      </div>

      {activeTab === "systems" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Registered AI Systems</h2>
            <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">+ Register System</button>
          </div>
          {systems.length === 0 ? (
            <div className="text-center py-16 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <p className="text-slate-400 mb-4">No AI systems registered yet</p>
              <button onClick={() => setShowForm(true)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Register Your First AI System</button>
            </div>
          ) : (
            <div className="grid gap-4">
              {systems.map((s) => (
                <div key={s.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold">{s.name}</h3>
                        <span className={"px-2 py-0.5 rounded-full text-xs font-medium border " + (tierColors[s.riskTier || ""] || "")}>{s.riskTier}</span>
                        <span className="text-xs text-slate-500">Score: {s.riskScore}/100</span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{s.description}</p>
                      <div className="flex gap-4 text-xs text-slate-500">
                        <span>{s.department}</span>
                        <span>Owner: {s.owner}</span>
                        <span>Status: {s.complianceStatus}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => setSelectedSystem(s)} className="px-3 py-1 text-xs bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600">View Details</button>
                      <button onClick={() => handleGenerateDoc(s)} disabled={generating === s.id} className="px-3 py-1 text-xs bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 disabled:opacity-50">
                        {generating === s.id ? "Generating..." : "Gen Annex IV"}
                      </button>
                      <button onClick={() => handleDelete(s.id!)} className="px-3 py-1 text-xs bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "documents" && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Generated Documents</h2>
          {docs.length === 0 ? (
            <div className="text-center py-16 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <p className="text-slate-400">No documents generated yet. Register a system and generate Annex IV documentation.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {docs.map((d) => (
                <div key={d.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{d.docType}</h3>
                    <p className="text-sm text-slate-400">System: {d.systemName}</p>
                    <p className="text-xs text-slate-500">{d.createdAt?.toDate?.()?.toLocaleDateString() || "Just now"}</p>
                  </div>
                  <button onClick={() => handleDownload(d)} className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 text-sm">Download .txt</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
