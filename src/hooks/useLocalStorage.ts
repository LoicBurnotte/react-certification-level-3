import { useEffect, useState } from 'react';
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from '../helpers/localStorage.helper';
import { localStorageBus } from '@/helpers/localStorageBus';

interface IUseLocalStorageProps {
  key: string;
  defaultValue?: string;
}

interface IUseLocalStorageReturnProps {
  value?: string;
  setValue: (newValue?: string) => void;
}

function useLocalStorage({
  key,
  defaultValue,
}: IUseLocalStorageProps): IUseLocalStorageReturnProps {
  const [value, setValueState] = useState(() => {
    return getLocalStorage(key, defaultValue);
  });

  const setValue = (val?: string) => {
    if (!val) {
      deleteLocalStorage(key);
      setValueState(undefined);
    } else {
      setLocalStorage(key, val);
      setValueState(val);
    }
    localStorageBus.dispatchEvent(new CustomEvent(key, { detail: val }));
  };

  useEffect(() => {
    if (!key) return;
    const onChange = (e: Event) => {
      const { detail } = e as CustomEvent;
      setValueState(detail);
    };

    localStorageBus.addEventListener(key, onChange);
    window.addEventListener('storage', () => {
      setValueState(getLocalStorage(key, defaultValue));
    });

    return () => {
      localStorageBus.removeEventListener(key, onChange);
    };
  }, [key, defaultValue]);

  return { value, setValue };
}

export default useLocalStorage;
