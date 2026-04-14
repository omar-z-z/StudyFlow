"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// --- Types ---
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
  logout: () => void;
}

// --- Context ---
const AuthContext = createContext<AuthContextType | null>(null);

// --- Provider ---
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // true on first load
  var inTwoMinutes = new Date(new Date().getTime() + 2 * 60 * 1000);

  // On app start, restore user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("studyflow_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 800));

    // TODO: Replace with → const res = await api.post("/auth/login", { email, password })
    const fakeUser: User = {
      id: "user-1",
      name: "Omar Zuhri",
      email,
    };

    // localStorage.setItem("studyflow_user", JSON.stringify(fakeUser));
    Cookies.set("studyflow_user", JSON.stringify(fakeUser), { expires: inTwoMinutes });

    setUser(fakeUser);
  };

  const register = async (name: string, email: string, _password: string) => {
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 1000));

    // TODO: Replace with → const res = await api.post("/auth/register", { name, email, password })
    const fakeUser: User = {
      id: "user-" + Date.now(),
      name,
      email,
    };

    // localStorage.setItem("studyflow_user", JSON.stringify(fakeUser));
    Cookies.set("studyflow_user", JSON.stringify(fakeUser), { expires: inTwoMinutes });
    setUser(fakeUser);
  };

  const logout = () => {
    // localStorage.removeItem("studyflow_user");
    Cookies.remove("studyflow_user");
    setUser(null);
    // TODO: Also call → api.post("/auth/logout") if your backend needs it
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