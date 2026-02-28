import { createContext, useContext, useState, type ReactNode } from "react";

type View = "home" | "activity" | "logs" | "credits" | "settings";

type ViewContextValue = {
  view: View;
  setView: (view: View) => void;
};

const ViewContext = createContext<ViewContextValue | undefined>(undefined);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>("home");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return ctx;
}