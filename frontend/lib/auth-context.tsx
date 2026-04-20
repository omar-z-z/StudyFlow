"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Types 
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Helpers
export function getToken() {
  return localStorage.getItem("studyflow_token");
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
}

// Context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider 
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app start, restore user from cookie
  useEffect(() => {
    const stored = Cookies.get("studyflow_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    console.log("Login response:", data);

    // Laravel returns { user, token }
    localStorage.setItem("studyflow_token", data.token);
    Cookies.set("studyflow_user", JSON.stringify(data.user), { expires: 7, path: "/" });
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await apiFetch("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    localStorage.setItem("studyflow_token", data.token);
    Cookies.set("studyflow_user", JSON.stringify(data.user), { expires: 7, path: "/" });
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await apiFetch("/logout", { method: "POST" });
    } finally {
      // Always clear local state even if the API call fails
      localStorage.removeItem("studyflow_token");
      Cookies.remove("studyflow_user", { path: "/" });
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- Hook ---
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}