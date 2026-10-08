export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

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
    return res.data || [];
  } catch (err) {
    console.warn("[API Warning]: Could not fetch remote projects, falling back to local data.", err);
    return [];
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
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const res = await apiRequest<{ success: boolean; data: Skill[] }>(`/skills${query}`);
  return res.data || [];
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
