import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  onSignedIn: () => void;
  onSignedOut: () => void;
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const onSignedIn = () => {
    setIsAuthenticated(true);
    // In a real app, you'd likely get the token from the backend response or cookies
    // and set it here. For now, we'll assume it's handled elsewhere or passed in.
  };

  const onSignedOut = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    localStorage.removeItem('authToken'); // Clear token from storage
  };

  // Initialize auth state from localStorage if token exists
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, onSignedIn, onSignedOut, authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};