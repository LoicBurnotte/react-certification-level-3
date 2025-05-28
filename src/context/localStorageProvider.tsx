import { useEffect, useState } from "react";
import { LocalStorageContext } from "./localStorageContext";

export function LocalStorageProvider({ children }: React.PropsWithChildren) {
  const [value, setValue] = useState(() => localStorage.getItem("key"));

  const updateValue = (newValue: string) => {
    localStorage.setItem("key", newValue);
    setValue(newValue);
  };

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "key") setValue(e.newValue);
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
