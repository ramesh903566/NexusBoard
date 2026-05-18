"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (isNewUser?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check initial state
    const token = Cookies.get('auth_status');
    setIsAuthenticated(!!token);

    // Setup global fetch interceptor to catch 401s
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      if (response.status === 401) {
        logout();
      }
      return response;
    };

    return () => {
      window.fetch = originalFetch; // Restore on unmount
    };
  }, []);

  const login = (isNewUser: boolean = false) => {
    // Cookies are set by the backend HTTP response
    setIsAuthenticated(true);
    
    if (isNewUser) {
      router.replace('/onboarding');
    } else {
      router.replace('/dashboard/overview');
    }
  };

  const logout = () => {
    Cookies.remove('nexus_session'); // Only works if we ever make it not HttpOnly, but backend should clear it ideally via a /logout endpoint. For now we clear what we can.
    Cookies.remove('auth_status');
    Cookies.remove('is_new_user');
    setIsAuthenticated(false);
    
    // Only redirect if we are in a protected area to avoid loops
    if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/onboarding') || pathname?.startsWith('/settings')) {
      router.replace('/auth');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
