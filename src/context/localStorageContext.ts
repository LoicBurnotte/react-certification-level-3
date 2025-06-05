import { createContext, useContext } from "react";

export const LocalStorageContext = createContext<{
  value: string | undefined;
  updateValue: (newValue?: string) => void;
}>({ value: undefined, updateValue: () => {} });

export function useLocaleStorageTest() {
  return useContext(LocalStorageContext);
}