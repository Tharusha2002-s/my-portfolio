"use client";

import { useEffect, useState, useMemo } from "react";
import {
  fetchAllAdminProjects,
  createProjectRecord,
  updateProjectRecord,
  deleteProjectRecord,
  Project,
} from "@/utils/api";

interface ProjectFormData {
  number: string;
  title: string;
  description: string;
  category: string;
  technologies: string;
  github: string;
  demo: string;
  featured: boolean;
  order: number;
}

const emptyForm: ProjectFormData = {
  number: "",
  title: "",
  description: "",
  category: "Full-Stack",
  technologies: "",
  github: "",
  demo: "",
  featured: true,
  order: 0,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete modal state
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProjects = async () => {
    try {
      const data = await fetchAllAdminProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchFeatured = !featuredOnly || p.featured;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies?.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchFeatured && matchSearch;
    });
  }, [projects, selectedCategory, featuredOnly, search]);

  const handleOpenCreate = () => {
    setEditingId(null);
    const nextNumber = String(projects.length + 1).padStart(2, "0");
    setFormData({
      ...emptyForm,
      number: nextNumber,
      order: projects.length + 1,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      number: project.number,
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      github: project.github || "",
      demo: project.demo || "",
      featured: project.featured,
      order: project.order,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.number.trim()) {
      setFormError("Project title and number are required.");
      return;
    }

    setSaving(true);
    setFormError(null);

    const techArray = formData.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editingId) {
        const updated = await updateProjectRecord(editingId, {
          number: formData.number.trim(),
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category.trim(),
          technologies: techArray,
          github: formData.github.trim() || null,
          demo: formData.demo.trim() || null,
          featured: formData.featured,
          order: Number(formData.order),
        });
        setProjects((prev) =>
          prev.map((p) => (p.id === editingId ? updated : p))
        );
      } else {
        const created = await createProjectRecord({
          number: formData.number.trim(),
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category.trim(),
          technologies: techArray,
          github: formData.github.trim() || null,
          demo: formData.demo.trim() || null,
          featured: formData.featured,
          order: Number(formData.order),
        });
        setProjects((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message || "Failed to save project.");
      } else {
        setFormError("Unexpected error occurred while saving.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingProject) return;
    setIsDeleting(true);
    try {
      await deleteProjectRecord(deletingProject.id);
      setProjects((prev) => prev.filter((p) => p.id !== deletingProject.id));
      setDeletingProject(null);
    } catch (err) {
      console.error("Failed to delete project:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const updated = await updateProjectRecord(project.id, {
        featured: !project.featured,
      });
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? updated : p))
      );
    } catch (err) {
      console.error("Failed to toggle featured:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center font-mono text-sm text-[#18181b]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#18181b] border-t-transparent" />
          <span className="text-[#71717a]">Loading project records...</span>
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
            Portfolio Content Management
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#18181b]">
            Projects Directory
          </h1>
          <p className="mt-1 text-xs text-[#71717a]">
            Add, update, or remove portfolio projects displayed on the public site.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="flex items-center gap-2 rounded-xl bg-[#18181b] px-4 py-2 font-mono text-xs font-bold text-white hover:bg-black transition-all cursor-pointer shadow-sm"
        >
          <span>+ Add New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e5e5ea] bg-white p-4 shadow-sm">
        <div className="flex flex-1 flex-wrap items-center gap-3 w-full">
          {/* Search Input */}
          <div className="w-full sm:w-auto sm:min-w-[240px] flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, categories, technologies..."
              className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2 font-mono text-xs text-[#18181b] placeholder-[#a1a1aa] focus:border-[#18181b] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2 font-mono text-xs text-[#18181b] focus:border-[#18181b] focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          {/* Featured Toggle Checkbox */}
          <label className="flex items-center gap-2 font-mono text-xs text-[#71717a] cursor-pointer">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
              className="accent-[#18181b]"
            />
            <span>Featured Only</span>
          </label>
        </div>

        <span className="font-mono text-xs text-[#a1a1aa]">
          Showing {filteredProjects.length} of {projects.length}
        </span>
      </div>

      {/* Projects List / Table */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-[#e5e5ea] bg-white p-12 text-center font-mono shadow-sm">
          <p className="text-sm text-[#71717a]">No projects match your search criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
              setFeaturedOnly(false);
            }}
            className="mt-3 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-1.5 text-xs text-[#18181b] hover:bg-[#f4f4f6]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-[#e5e5ea] bg-white p-5 shadow-sm transition-all hover:border-[#d4d4d8]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md border border-[#e5e5ea] bg-[#f4f4f6] px-2 py-0.5 font-mono text-xs font-bold text-[#18181b]">
                      PROJ-{project.number}
                    </span>
                    <span className="font-mono text-xs text-[#71717a]">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[10px] px-2 py-0.5 font-bold">
                        ★ FEATURED
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#18181b]">
                    {project.title}
                  </h3>

                  <p className="max-w-3xl text-xs sm:text-sm text-[#71717a] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(project)}
                    className={`rounded-xl border px-3 py-1.5 transition-colors cursor-pointer ${
                      project.featured
                        ? "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                        : "border-[#e5e5ea] bg-white text-[#71717a] hover:text-[#18181b] hover:bg-[#f4f4f6]"
                    }`}
                  >
                    {project.featured ? "★ Unfeature" : "☆ Feature"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(project)}
                    className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3 py-1.5 text-[#18181b] hover:bg-[#f4f4f6] transition-colors cursor-pointer"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingProject(project)}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              {/* Technologies & External links */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0f0f2] pt-3 font-mono text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[#e5e5ea] bg-[#f9f9fb] px-2 py-0.5 text-[11px] text-[#71717a]"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-[#71717a]">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#18181b] transition-colors"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#18181b] font-medium hover:underline"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#e5e5ea] bg-white p-5 sm:p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#71717a] hover:text-[#18181b]"
            >
              ✕
            </button>

            <span className="font-mono text-xs uppercase tracking-wider text-[#71717a]">
              {editingId ? "Modify Record" : "New Record"}
            </span>
            <h2 className="mt-1 text-xl font-bold text-[#18181b]">
              {editingId ? "Edit Project" : "Create New Project"}
            </h2>

            {formError && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 font-mono text-xs text-rose-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="mt-6 space-y-4 font-mono text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[#71717a]">Project Number</label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({ ...formData, number: e.target.value })
                    }
                    placeholder="01"
                    required
                    className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[#71717a]">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Full-Stack, Web Application, DevOps, etc."
                    required
                    className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[#71717a]">Project Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. RoadAware"
                  required
                  className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[#71717a]">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="A detailed explanation of the project, features, and engineering architecture..."
                  rows={3}
                  required
                  className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[#71717a]">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  placeholder="React, Next.js, Node.js, Leaflet, Docker"
                  className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[#71717a]">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[#71717a]">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.demo}
                    onChange={(e) =>
                      setFormData({ ...formData, demo: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-[#18181b]">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="accent-[#18181b]"
                  />
                  <span>Feature on Portfolio Homepage</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-[#71717a]">Display Order:</span>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: Number(e.target.value) })
                    }
                    className="w-16 rounded-lg border border-[#e5e5ea] bg-[#f9f9fb] px-2 py-1 text-center text-[#18181b]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-[#f0f0f2] pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-[#e5e5ea] bg-white px-4 py-2 text-[#71717a] hover:bg-[#f4f4f6] hover:text-[#18181b]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#18181b] px-5 py-2 font-bold text-white hover:bg-black disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {saving ? "Saving..." : editingId ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 shadow-2xl">
            <span className="font-mono text-xs text-rose-600 uppercase tracking-wider font-bold">
              ⚠️ Permanent Action
            </span>
            <h3 className="mt-2 text-lg font-bold text-[#18181b]">
              Delete &quot;{deletingProject.title}&quot;?
            </h3>
            <p className="mt-2 text-xs text-[#71717a]">
              This project record will be permanently deleted from the database and removed from the public portfolio.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setDeletingProject(null)}
                className="rounded-xl border border-[#e5e5ea] bg-white px-4 py-2 text-[#71717a] hover:bg-[#f4f4f6]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-xl border border-rose-600 bg-rose-600 px-4 py-2 font-bold text-white hover:bg-rose-700 disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
