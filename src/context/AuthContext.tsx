import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  onSignedIn: (token?: string | null) => void;
  onSignedOut: () => void;
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PLACEHOLDER_TOKENS = new Set([
  'placeholder-token',
  'mock-token',
  'fake-token',
  'dummy-token',
  'undefined',
  'null',
]);

const normalizeAuthToken = (token: string | null | undefined): string | null => {
  if (typeof token !== 'string') {
    return null;
  }

  const normalizedToken = token.trim();

  if (!normalizedToken) {
    return null;
  }

  if (PLACEHOLDER_TOKENS.has(normalizedToken.toLowerCase())) {
    return null;
  }

  return normalizedToken;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authTokenState, setAuthTokenState] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('authToken');
    const normalizedToken = normalizeAuthToken(storedToken);

    if (!normalizedToken && storedToken) {
      localStorage.removeItem('authToken');
    }

    return normalizedToken;
  });

  const setAuthToken = useCallback((token: string | null) => {
    const normalizedToken = normalizeAuthToken(token);

    setAuthTokenState(normalizedToken);

    if (normalizedToken) {
      localStorage.setItem('authToken', normalizedToken);
      return;
    }

    localStorage.removeItem('authToken');
  }, []);

  const onSignedIn = useCallback((token?: string | null) => {
    if (typeof token !== 'undefined') {
      setAuthToken(token);
      return;
    }

    setAuthTokenState((currentToken) => {
      const normalizedCurrentToken = normalizeAuthToken(currentToken);

      if (!normalizedCurrentToken) {
        localStorage.removeItem('authToken');
        return null;
      }

      localStorage.setItem('authToken', normalizedCurrentToken);
      return normalizedCurrentToken;
    });
  }, [setAuthToken]);

  const onSignedOut = useCallback(() => {
    setAuthTokenState(null);
    localStorage.removeItem('authToken');
  }, []);

  const value = useMemo(() => ({
    isAuthenticated: Boolean(authTokenState),
    onSignedIn,
    onSignedOut,
    authToken: authTokenState,
    setAuthToken,
  }), [authTokenState, onSignedIn, onSignedOut, setAuthToken]);

  return (
    <AuthContext.Provider value={value}>
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