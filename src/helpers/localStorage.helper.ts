export function getLocalStorage(key: string, defaultValue?: string) {
  const res = localStorage.getItem(key);
  return res || defaultValue;
}

export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function deleteLocalStorage(key: string) {
  localStorage.removeItem(key);
}
