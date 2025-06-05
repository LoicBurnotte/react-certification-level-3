import { useEffect, useState } from "react";
import { LocalStorageContext } from "./localStorageContext";
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "@/helpers/localStorage.helper";

export function LocalStorageProvider({ children }: React.PropsWithChildren) {
  const [value, setValue] = useState<string | undefined>(() =>
    getLocalStorage("key")
  );

  const updateValue = (newValue: string | undefined) => {
    if (!newValue) {
      deleteLocalStorage("key");
    } else {
      setLocalStorage("key", newValue);
    }
    setValue(newValue);
  };

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "key") setValue(e.newValue || undefined);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <LocalStorageContext.Provider value={{ value, updateValue }}>
      {children}
    </LocalStorageContext.Provider>
  );
}
