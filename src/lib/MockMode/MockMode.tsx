import { createContext, ReactNode, useContext } from "react";
import { useMockMode as useMockModeHook } from "./useMockMode";

export interface MockModeType {
  mockMode: boolean;
  toggleMockMode: () => void;
}

const MockModeContext = createContext<MockModeType | undefined>(undefined);

// supports toggling mock mode on/off
// currently only used for stocks, but could be used for mocking other APIs with a single switch
export function MockModeProvider({ children }: { children: ReactNode }) {
  // we could move the hook content here, but I already wrote unit tests for the hook, so let it be
  const { mockMode, toggleMockMode } = useMockModeHook(); 

  const value = {
    mockMode,
    toggleMockMode,
  };

  return (
    <MockModeContext.Provider value={value}>{children}</MockModeContext.Provider>
  );
}

export function useMockMode() {
  const context = useContext(MockModeContext);

  if (context === undefined) {
    throw new Error("useMockModeContext must be used within a MockModeContextProvider");
  }
  return context;
}
