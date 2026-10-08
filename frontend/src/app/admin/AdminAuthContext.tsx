"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  AdminUser,
  getAuthToken,
  getCurrentAdmin,
  setAuthSession,
  clearAuthSession,
  fetchCurrentAdminProfile,
  adminLogin as apiAdminLogin,
} from "@/utils/api";

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    const verifyAuth = async () => {
      const savedToken = getAuthToken();
      const savedUser = getCurrentAdmin();

      if (savedToken) {
        try {
          const profile = await fetchCurrentAdminProfile();
          if (isMounted) {
            setToken(savedToken);
            setUser(profile || savedUser);
          }
        } catch {
          // Token is invalid/expired - clear stale session
          clearAuthSession();
          if (isMounted) {
            setToken(null);
            setUser(null);
          }
        }
      } else {
        clearAuthSession();
        if (isMounted) {
          setToken(null);
          setUser(null);
        }
      }

      if (isMounted) {
        setIsLoading(false);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const isLoginPage = pathname === "/admin/login";

    // Only redirect to login if trying to access protected admin pages without token
    if (!token && !isLoginPage && pathname.startsWith("/admin")) {
      router.replace("/admin/login");
    }
  }, [isLoading, token, pathname, router]);

  const login = async (identifier: string, password: string) => {
    const res = await apiAdminLogin(identifier, password);
    setAuthSession(res.token, res.admin);
    setToken(res.token);
    setUser(res.admin);
    router.replace("/admin");
  };

  const logout = () => {
    clearAuthSession();
    setToken(null);
    setUser(null);
    router.replace("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
