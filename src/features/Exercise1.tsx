import FormName from "@/components/FormName";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useLocaleStorageTest } from "@/context/localStorageContext";

const Exercise1 = () => {
  const { value: theme } = useLocalStorage({
    key: "theme",
  });
  const { value } = useLocaleStorageTest();

  return (
    <>
      <h1 className="title">Exercise 1 - {value}</h1>
      <h3 className="mb-2">Enter your name: </h3>
      <FormName />
      <div className="mt-2">
        You can change the theme (stored in the localStorage) on the{" "}
        <b>top right</b> button!
      </div>
      {!!theme && <div>{`Your current saved theme is : "${theme}"`}</div>}
    </>
  );
};

export default Exercise1;
