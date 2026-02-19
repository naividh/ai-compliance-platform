"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createSystem, updateSystem } from "@/lib/firestore";
import { classifySystem } from "@/lib/risk-engine";

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export default function AddSystemForm({ onClose, onSaved }: Props) {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    purpose: "",
    department: "",
    owner: "",
    dataInputs: "",
    outputType: "",
    deploymentContext: "",
    affectedPersons: "",
    techStack: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const classification = classifySystem(form);
      const id = await createSystem({
        ...form,
        riskTier: classification.riskTier,
        riskScore: classification.riskScore,
        riskReasoning: classification.reasoning,
        obligations: classification.obligations,
        complianceStatus: classification.riskTier === "Unacceptable" ? "Non-Compliant" : "Under Review",
        userId: user.uid,
      });
      onSaved();
      onClose();
    } catch (err) {
      console.error("Error creating system:", err);
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { name: "name", label: "System Name", placeholder: "e.g., Resume Screening AI", type: "input" },
    { name: "description", label: "Description", placeholder: "Brief description of what this AI system does...", type: "textarea" },
    { name: "purpose", label: "Intended Purpose", placeholder: "e.g., Automated screening and ranking of job applicants", type: "textarea" },
    { name: "department", label: "Department", placeholder: "e.g., Human Resources", type: "input" },
    { name: "owner", label: "System Owner", placeholder: "e.g., Jane Smith", type: "input" },
    { name: "dataInputs", label: "Data Inputs", placeholder: "e.g., Resumes, cover letters, application forms, demographic data", type: "textarea" },
    { name: "outputType", label: "Output Type", placeholder: "e.g., Ranked candidate list with scores", type: "input" },
    { name: "deploymentContext", label: "Deployment Context", placeholder: "e.g., Used in EU hiring pipeline for all open positions", type: "textarea" },
    { name: "affectedPersons", label: "Affected Persons", placeholder: "e.g., Job applicants across EU member states, including children for internships", type: "textarea" },
    { name: "techStack", label: "Technology Stack", placeholder: "e.g., Python, TensorFlow, AWS SageMaker", type: "input" },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Register AI System</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-slate-300 mb-1">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  name={f.name}
                  value={(form as any)[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  required
                  rows={2}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <input
                  name={f.name}
                  value={(form as any)[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  required
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {saving ? "Classifying & Saving..." : "Register & Auto-Classify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
