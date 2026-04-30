"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { apiFetch } from "./api";

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

    Cookies.set("studyflow_token", data.token, { expires: 1, path: "/" });
    Cookies.set("studyflow_user", JSON.stringify(data.user), { expires: 1, path: "/" });
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await apiFetch("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    Cookies.set("studyflow_token", data.token, { expires: 1, path: "/" });
    Cookies.set("studyflow_user", JSON.stringify(data.user), { expires: 1, path: "/" });
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await apiFetch("/logout", { method: "POST" });
    } finally {

      Cookies.remove("studyflow_token", { path: "/" });
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