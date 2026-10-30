export const API_BASE =
  typeof window !== "undefined" && window.location.protocol === "https:" && (!process.env.NEXT_PUBLIC_API_URL || !process.env.NEXT_PUBLIC_API_URL.startsWith("https://"))
    ? "/api"
    : process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
        ? "/api"
        : "http://localhost:5001/api");

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github: string | null;
  demo: string | null;
  featured: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";
  adminNotes?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  proficiency: number;
  icon?: string | null;
  order: number;
}

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    number: "01",
    title: "TitanCore ERP",
    description:
      "An industrial-grade enterprise resource planning platform managing construction workflows, inventory tracking, tasks, and production analytics.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
    category: "Full-Stack",
    github: "https://github.com/Tharusha2002-s",
    demo: null,
    featured: true,
    order: 1,
  },
  {
    id: "proj-2",
    number: "02",
    title: "RoadAware AI",
    description:
      "A community geospatial hazard tracking platform integrated with computer vision AI for road defect and driver safety detection.",
    technologies: ["Python", "OpenCV", "TensorFlow", "Next.js", "Leaflet", "FastAPI"],
    category: "AI & ML",
    github: "https://github.com/Tharusha2002-s",
    demo: null,
    featured: true,
    order: 2,
  },
  {
    id: "proj-3",
    number: "03",
    title: "UnityHub",
    description:
      "A university event and community management platform designed for sports, student clubs, and campus organizations.",
    technologies: ["React", "TypeScript", "PostgreSQL", "JWT", "Express"],
    category: "Web Application",
    github: "https://github.com/Tharusha2002-s",
    demo: null,
    featured: false,
    order: 3,
  },
  {
    id: "proj-4",
    number: "04",
    title: "Continuous Deployment VPS",
    description:
      "Automated CI/CD pipeline deploying Dockerized multi-stage containers to a Hetzner Cloud Linux VPS with reverse proxying and automated backups.",
    technologies: ["Docker", "GitHub Actions", "Hetzner Cloud", "Nginx", "Linux"],
    category: "Cloud & DevOps",
    github: "https://github.com/Tharusha2002-s",
    demo: "https://tharushasangeeth.live",
    featured: true,
    order: 4,
  },
];

export const FALLBACK_SKILLS: Skill[] = [
  { id: "s-1", name: "Python", category: "AI & ML", proficiency: 90, order: 1 },
  { id: "s-2", name: "TensorFlow", category: "AI & ML", proficiency: 82, order: 2 },
  { id: "s-3", name: "OpenCV", category: "AI & ML", proficiency: 85, order: 3 },
  { id: "s-4", name: "Next.js", category: "Frontend", proficiency: 95, order: 4 },
  { id: "s-5", name: "TypeScript", category: "Language", proficiency: 92, order: 5 },
  { id: "s-6", name: "React", category: "Frontend", proficiency: 94, order: 6 },
  { id: "s-7", name: "Tailwind CSS", category: "Frontend", proficiency: 90, order: 7 },
  { id: "s-8", name: "Node.js", category: "Backend", proficiency: 90, order: 8 },
  { id: "s-9", name: "Express.js", category: "Backend", proficiency: 88, order: 9 },
  { id: "s-10", name: "PostgreSQL", category: "Database", proficiency: 88, order: 10 },
  { id: "s-11", name: "Prisma ORM", category: "Database", proficiency: 86, order: 11 },
  { id: "s-12", name: "Docker", category: "DevOps", proficiency: 85, order: 12 },
  { id: "s-13", name: "Hetzner Cloud", category: "Cloud", proficiency: 84, order: 13 },
  { id: "s-14", name: "GitHub Actions", category: "DevOps", proficiency: 86, order: 14 },
];

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
}

export interface DashboardStats {
  projects: {
    total: number;
    featured: number;
  };
  messages: {
    total: number;
    unread: number;
    replied: number;
  };
  skills: {
    total: number;
  };
  recentMessages: ContactMessage[];
  recentProjects: Project[];
  system: {
    status: string;
    uptimeSeconds: number;
    memoryRssMb: number;
    nodeVersion: string;
    platform: string;
    database: string;
    timestamp: string;
  };
}

// -------------------------------------------------------------
// Authentication Tokens & Session Storage Utilities
// -------------------------------------------------------------
const TOKEN_KEY = "tharusha_admin_session_token";
const USER_KEY = "tharusha_admin_session_user";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  // Clear any legacy persistent tokens from localStorage to prevent auto-login
  try {
    localStorage.removeItem("tharusha_admin_token");
    localStorage.removeItem("tharusha_admin_user");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  } catch {}

  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAuthSession(token: string, admin: AdminUser): void {
  if (typeof window === "undefined") return;
  // Save in sessionStorage (cleared as soon as session/tab is closed)
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(admin));

  // Clear any persistent localStorage entries
  try {
    localStorage.removeItem("tharusha_admin_token");
    localStorage.removeItem("tharusha_admin_user");
  } catch {}

  // Session cookie (cleared when session ends)
  document.cookie = `admin_token=${token}; path=/; SameSite=Lax`;
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem("tharusha_admin_token");
    localStorage.removeItem("tharusha_admin_user");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  } catch {}
  document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax";
}

export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// Generic API Client Wrapper
// -------------------------------------------------------------
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      // If token expired while navigating in admin, clear session
      if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
        clearAuthSession();
        window.location.href = "/admin/login?expired=true";
      }
    }
    throw new Error(data.error || `HTTP error ${response.status}`);
  }

  return data as T;
}

// -------------------------------------------------------------
// Public Endpoints
// -------------------------------------------------------------
export async function fetchPublicProjects(category?: string): Promise<Project[]> {
  try {
    const query = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
    const res = await apiRequest<{ success: boolean; data: Project[] }>(`/projects${query}`, {
      cache: "no-store",
    });
    if (res.data && res.data.length > 0) {
      return res.data;
    }
    return category && category !== "All"
      ? FALLBACK_PROJECTS.filter((p) => p.category === category)
      : FALLBACK_PROJECTS;
  } catch (err) {
    console.warn("[API Warning]: Could not fetch remote projects, falling back to local data.", err);
    return category && category !== "All"
      ? FALLBACK_PROJECTS.filter((p) => p.category === category)
      : FALLBACK_PROJECTS;
  }
}

export async function submitContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  return await apiRequest<{ success: boolean; message: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function checkServerHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// Admin Endpoints
// -------------------------------------------------------------
export async function adminLogin(identifier: string, password: string): Promise<{
  success: boolean;
  token: string;
  admin: AdminUser;
}> {
  return await apiRequest<{ success: boolean; token: string; admin: AdminUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });
}

export async function fetchCurrentAdminProfile(): Promise<AdminUser> {
  const res = await apiRequest<{ success: boolean; admin: AdminUser }>("/auth/me");
  return res.admin;
}

export async function fetchDashboardMetrics(): Promise<DashboardStats> {
  const res = await apiRequest<{ success: boolean; stats: DashboardStats }>("/stats/dashboard");
  return res.stats;
}

export async function fetchAllAdminProjects(): Promise<Project[]> {
  const res = await apiRequest<{ success: boolean; data: Project[] }>("/projects");
  return res.data || [];
}

export async function createProjectRecord(data: Partial<Project>): Promise<Project> {
  const res = await apiRequest<{ success: boolean; data: Project }>("/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function updateProjectRecord(id: string, data: Partial<Project>): Promise<Project> {
  const res = await apiRequest<{ success: boolean; data: Project }>(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function deleteProjectRecord(id: string): Promise<void> {
  await apiRequest(`/projects/${id}`, {
    method: "DELETE",
  });
}

export async function fetchAdminMessages(status?: string, search?: string): Promise<{
  messages: ContactMessage[];
  unreadCount: number;
}> {
  const params = new URLSearchParams();
  if (status && status !== "ALL") params.append("status", status);
  if (search) params.append("search", search);

  const qs = params.toString() ? `?${params.toString()}` : "";
  const res = await apiRequest<{ success: boolean; data: ContactMessage[]; unreadCount: number }>(
    `/contact/messages${qs}`
  );
  return {
    messages: res.data || [],
    unreadCount: res.unreadCount || 0,
  };
}

export async function updateMessageRecord(
  id: string,
  status: string,
  adminNotes?: string
): Promise<ContactMessage> {
  const res = await apiRequest<{ success: boolean; data: ContactMessage }>(`/contact/messages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status, adminNotes }),
  });
  return res.data;
}

export async function deleteMessageRecord(id: string): Promise<void> {
  await apiRequest(`/contact/messages/${id}`, {
    method: "DELETE",
  });
}

export async function fetchSkillsList(category?: string): Promise<Skill[]> {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    const res = await apiRequest<{ success: boolean; data: Skill[] }>(`/skills${query}`);
    if (res.data && res.data.length > 0) {
      return res.data;
    }
    return category && category !== "All"
      ? FALLBACK_SKILLS.filter((s) => s.category === category)
      : FALLBACK_SKILLS;
  } catch (err) {
    console.warn("[API Warning]: Could not fetch remote skills, falling back to local data.", err);
    return category && category !== "All"
      ? FALLBACK_SKILLS.filter((s) => s.category === category)
      : FALLBACK_SKILLS;
  }
}

export async function createSkillRecord(data: Partial<Skill>): Promise<Skill> {
  const res = await apiRequest<{ success: boolean; data: Skill }>("/skills", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function updateSkillRecord(id: string, data: Partial<Skill>): Promise<Skill> {
  const res = await apiRequest<{ success: boolean; data: Skill }>(`/skills/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function deleteSkillRecord(id: string): Promise<void> {
  await apiRequest(`/skills/${id}`, {
    method: "DELETE",
  });
}

export async function updateAdminPassword(currentPassword: string, newPassword: string): Promise<void> {
  await apiRequest("/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}
