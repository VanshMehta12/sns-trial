"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const [LanguageRoute, setLanguageRoute] = useState("")

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      setLanguageRoute(`/${lang}/`);
    }
  }, [pathname])

  useEffect(() => {
    // Check for token in session storage when component mounts
    const token = sessionStorage.getItem("auth_token");
    console.log("Token from session storage:", token); // Debugging
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    console.log("Received token:", token); // Debugging
    if (!token) {
      console.error("No token received");
      return;
    }

    // Store token in session storage
    sessionStorage.setItem("auth_token", token);
    setIsAuthenticated(true);
    console.log("Auth token set:", sessionStorage.getItem("auth_token")); // Debugging
  };

  const logout = () => {
    // Remove token from session storage
    sessionStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    router.push(`${LanguageRoute}join`);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}