"use client";

import { useEffect, useState, useMemo } from "react";
import {
  fetchSkillsList,
  createSkillRecord,
  updateSkillRecord,
  deleteSkillRecord,
  Skill,
} from "@/utils/api";

interface SkillFormData {
  category: string;
  name: string;
  proficiency: number;
  order: number;
}

const emptySkillForm: SkillFormData = {
  category: "Frontend",
  name: "",
  proficiency: 85,
  order: 0,
};

const defaultCategories = [
  "Frontend",
  "Backend",
  "Databases",
  "DevOps & Tools",
];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SkillFormData>(emptySkillForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [deletingSkill, setDeletingSkill] = useState<Skill | null>(null);

  const loadSkills = async () => {
    try {
      const data = await fetchSkillsList();
      setSkills(data);
    } catch (err) {
      console.error("Failed to load skills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const groupedSkills = useMemo(() => {
    const groups: Record<string, Skill[]> = {};
    skills.forEach((s) => {
      const cat = s.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s);
    });
    return groups;
  }, [skills]);

  const handleOpenCreate = (categoryPreset?: string) => {
    setEditingId(null);
    setFormData({
      ...emptySkillForm,
      category: categoryPreset || "Frontend",
      order: skills.length + 1,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      category: skill.category,
      name: skill.name,
      proficiency: skill.proficiency,
      order: skill.order,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim()) {
      setFormError("Skill name and category are required.");
      return;
    }

    setSaving(true);
    setFormError(null);

    try {
      if (editingId) {
        const updated = await updateSkillRecord(editingId, {
          name: formData.name.trim(),
          category: formData.category.trim(),
          proficiency: Number(formData.proficiency),
          order: Number(formData.order),
        });
        setSkills((prev) =>
          prev.map((s) => (s.id === editingId ? updated : s))
        );
      } else {
        const created = await createSkillRecord({
          name: formData.name.trim(),
          category: formData.category.trim(),
          proficiency: Number(formData.proficiency),
          order: Number(formData.order),
        });
        setSkills((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message || "Failed to save skill.");
      } else {
        setFormError("Unexpected error occurred.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingSkill) return;
    try {
      await deleteSkillRecord(deletingSkill.id);
      setSkills((prev) => prev.filter((s) => s.id !== deletingSkill.id));
      setDeletingSkill(null);
    } catch (err) {
      console.error("Failed to delete skill:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center font-mono text-sm text-[#18181b]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#18181b] border-t-transparent" />
          <span className="text-[#71717a]">Loading technical skills inventory...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#71717a]">
            Technical Capabilities
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#18181b]">
            Skills & Competencies
          </h1>
          <p className="mt-1 text-xs text-[#71717a]">
            Manage tech stacks, developer tools, and relative proficiency levels.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleOpenCreate()}
          className="flex items-center gap-2 rounded-xl bg-[#18181b] px-4 py-2 font-mono text-xs font-bold text-white hover:bg-black transition-all cursor-pointer shadow-sm"
        >
          <span>+ Add Technical Skill</span>
        </button>
      </div>

      {/* Skills Grouped by Category */}
      <div className="space-y-8">
        {Object.entries(groupedSkills).map(([category, catSkills]) => (
          <div key={category} className="rounded-2xl border border-[#e5e5ea] bg-white p-5 sm:p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#f0f0f2] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">⚡</span>
                <h2 className="font-mono text-sm uppercase tracking-wider text-[#18181b] font-bold">
                  {category}
                </h2>
                <span className="font-mono text-xs text-[#a1a1aa]">
                  ({catSkills.length} skills)
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenCreate(category)}
                className="font-mono text-xs text-[#18181b] font-semibold hover:underline cursor-pointer"
              >
                + Add to {category}
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {catSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] p-3.5 transition-all hover:border-[#d4d4d8] hover:bg-white"
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#18181b]">{skill.name}</span>
                      <span className="font-mono text-[11px] text-[#71717a] font-semibold">
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e5e5ea]">
                      <div
                        className="h-full rounded-full bg-[#18181b] transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 border-l border-[#e5e5ea] pl-3">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(skill)}
                      title="Edit Skill"
                      className="p-1 text-[#71717a] hover:text-[#18181b] transition-colors cursor-pointer"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingSkill(skill)}
                      title="Delete Skill"
                      className="p-1 text-[#71717a] hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Skill Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-[#e5e5ea] bg-white p-5 sm:p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#71717a] hover:text-[#18181b]"
            >
              ✕
            </button>

            <span className="font-mono text-xs uppercase tracking-wider text-[#71717a]">
              {editingId ? "Edit Skill" : "New Skill"}
            </span>
            <h2 className="mt-1 text-xl font-bold text-[#18181b]">
              {editingId ? "Update Skill" : "Add Technical Skill"}
            </h2>

            {formError && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 font-mono text-xs text-rose-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="mt-5 space-y-4 font-mono text-xs">
              <div>
                <label className="mb-1.5 block text-[#71717a]">Category</label>
                <div className="flex gap-2">
                  <select
                    value={
                      defaultCategories.includes(formData.category)
                        ? formData.category
                        : "Custom"
                    }
                    onChange={(e) => {
                      if (e.target.value !== "Custom") {
                        setFormData({ ...formData, category: e.target.value });
                      }
                    }}
                    className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                  >
                    {defaultCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Custom">Custom...</option>
                  </select>

                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Category name"
                    className="flex-1 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[#71717a]">Skill / Technology Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Next.js, PostgreSQL, Docker"
                  required
                  className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between text-[#71717a]">
                  <label>Proficiency: {formData.proficiency}%</label>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proficiency: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[#18181b] cursor-pointer"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[#71717a]">Order Sequence</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: Number(e.target.value) })
                  }
                  className="w-24 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-[#f0f0f2] pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-[#e5e5ea] bg-white px-4 py-2 text-[#71717a] hover:bg-[#f4f4f6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#18181b] px-5 py-2 font-bold text-white hover:bg-black disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {saving ? "Saving..." : editingId ? "Update Skill" : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl border border-rose-200 bg-white p-6 shadow-2xl">
            <h3 className="font-bold text-[#18181b]">
              Delete &quot;{deletingSkill.name}&quot;?
            </h3>
            <p className="mt-2 text-xs text-[#71717a]">
              This technical skill will be removed from your profile.
            </p>
            <div className="mt-5 flex justify-end gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setDeletingSkill(null)}
                className="rounded-xl border border-[#e5e5ea] bg-white px-3.5 py-2 text-[#71717a] hover:bg-[#f4f4f6]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl border border-rose-600 bg-rose-600 px-4 py-2 font-bold text-white hover:bg-rose-700 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
