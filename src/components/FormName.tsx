import { useLocaleStorageTest } from "@/context/localStorageContext";
import useLocalStorage from "@/hooks/useLocalStorage";

const FormName = () => {
  const { value: name, setValue: setName } = useLocalStorage({
    key: "userName",
    defaultValue: "",
  });
  /* ALTERNATIVE */
  const { updateValue } = useLocaleStorageTest();

  return (
    <input
      type="text"
      className="border-2 border-solid border-indigo-500 dark:border-rose-500 rounded-sm p-2"
      value={name || ""}
      onChange={(e) => {
        setName(e.target.value);
        updateValue(e.target.value);
      }}
      placeholder="Full name"
      aria-label="fullname"
    />
  );
};

export default FormName;
