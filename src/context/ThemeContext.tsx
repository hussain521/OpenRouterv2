import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  themePreference: ThemePreference;
  systemTheme: Theme;
  isSystemDarkMode: boolean;
  setThemePreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // اكتشاف تفضيل النظام
  const getSystemTheme = (): Theme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme());
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>(() => {
    const savedPreference = localStorage.getItem('themePreference') as ThemePreference | null;
    return savedPreference || 'system';
  });

  // الحصول على الثيم الفعلي بناءً على التفضيل
  const getActualTheme = (preference: ThemePreference, sysTheme: Theme): Theme => {
    if (preference === 'system') {
      return sysTheme;
    }
    return preference as Theme;
  };

  // حساب الثيم مباشرة من التفضيل ونظام التشغيل
  const theme = getActualTheme(themePreference, systemTheme);

  // مراقبة تغييرات تفضيل النظام
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
    };

    // دعم المتصفحات الحديثة والقديمة
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // حفظ التفضيل
  useEffect(() => {
    localStorage.setItem('themePreference', themePreference);
  }, [themePreference]);

  const setThemePreference = (preference: ThemePreference) => {
    setThemePreferenceState(preference);
  };

  const toggleTheme = () => {
    // عند التبديل، نخرج من وضع النظام ونتنقل بين light و dark
    if (themePreference === 'system') {
      setThemePreference(theme === 'light' ? 'dark' : 'light');
    } else {
      setThemePreference(themePreference === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      themePreference,
      systemTheme,
      isSystemDarkMode: systemTheme === 'dark',
      setThemePreference,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}