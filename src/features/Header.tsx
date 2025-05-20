import trashIcon from '@/assets/trash.svg';
import ThemeToggle from '@/components/ThemeToggle';
import useLocalStorage from '@/hooks/useLocalStorage';

const Header = () => {
  const { value: userName, setValue: setUserName } = useLocalStorage({
    key: 'userName',
  });

  return (
    <div
      id="header"
      className="w-full h-full bg-indigo-500 dark:bg-rose-500 flex flex-row justify-between px-2 text-white"
    >
      <span className="flex flex-row items-center">
        {userName ? `Hi ${userName}!` : ''}{' '}
        {userName && (
          <img
            onClick={() => setUserName(undefined)}
            className="ml-2 cursor-pointer"
            src={trashIcon}
            alt="Trash icon"
            title="Delete your name"
          />
        )}
      </span>
      <ThemeToggle />
    </div>
  );
};

export default Header;
