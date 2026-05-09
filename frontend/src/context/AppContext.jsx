import { createContext, useContext } from 'react';
import { useAppStore } from '../store/useAppStore.js';

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const state = useAppStore();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
