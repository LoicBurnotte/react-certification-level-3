import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeToggle = () => {
  const { value: theme, setValue: setTheme } = useLocalStorage({
    key: 'theme',
    defaultValue: 'dark',
  });

  useEffect(() => {
    if (!theme) return;

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    setTheme(theme);
  }, [theme]);

  return (
    <div className="flex flex-col items-center justify-center h-inherit">
      <button
        className="btn dark:bg-black bg-white px-1"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title={`${theme === 'dark' ? 'Light' : 'Dark'} theme`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default ThemeToggle;
