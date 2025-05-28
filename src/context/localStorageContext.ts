import { createContext, useContext } from "react";

export const LocalStorageContext = createContext<{
  value: string | null;
  updateValue: (newValue?: string) => void;
}>({ value: null, updateValue: () => {} });

export function useLocaleStorageTest() {
  return useContext(LocalStorageContext);
}