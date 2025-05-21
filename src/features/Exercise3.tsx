import { useEffect, useState } from "react";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";

interface Address {
  city: string;
  geo: { lat: string; lng: string };
  street: string;
  suite: string;
  zipCode: string;
}
interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}
interface User {
  id: number;
  name: string;
  address: Address;
  company: Company;
  email: string;
  phone: string;
  username: string;
  website: string;
}
type CustomUser = Omit<User, "id"> & DropdownItem & { companyName: string };

interface State {
  code: string;
  name: string;
  subdivision: string | null;
}
interface Country {
  code2: string;
  code3: string;
  name: string;
  capital: string;
  region: string;
  subregion: string;
  states: State[];
}

const Exercise3 = () => {
  const [userList, setUserList] = useState<User[]>();
  const [userSelection, setUserSelection] = useState<
    Omit<User, "id"> & DropdownItem
  >();
  const [companySelection, setCompanySelection] = useState<CustomUser>();
  const [countries, setCountries] = useState<Country[]>([]);
  const [countrySelection, setCountrySelection] = useState<
    Country & DropdownItem
  >();
  const [countryMultipleSelection, setCountryMultipleSelection] =
    useState<(Country & DropdownItem)[]>();
  const [stateSelection, setStateSelection] = useState<State & DropdownItem>();

  /* Add a default user in the selection */
  useEffect(() => {
    if (!userList) return;

    const selectedUser = userList.find((i) => i.name.includes("Ervin"));
    if (!selectedUser) return;

    setUserSelection({ ...selectedUser, id: selectedUser.id.toString() });
  }, [userList]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result: User[]) => setUserList(result))
      .catch((err) => console.error("Error loading users:", err));

    fetch("src/assets/countries.json")
      .then((res) => res.json())
      .then((data: Country[]) => setCountries(data))
      .catch((err) => console.error("Error loading countries:", err));
  }, []);

  return (
    <>
      <h1 className="title">Exercise 3</h1>
      <h3 className="mb-2 font-bold text-xl">
        Select a user [{userList?.length}] :{" "}
        <span className="italic text-indigo-500 dark:text-rose-500">
          {userSelection?.name}
        </span>
      </h3>
      <div className="description">
        Allow you to select a <b>user name</b> and filter by <b>name</b>:
      </div>
      <Dropdown<Omit<User, "id"> & DropdownItem>
        list={
          userList?.map((i) => ({
            ...i,
            id: i.id.toString(),
          })) || []
        }
        itemKey="name"
        selection={userSelection}
        valueChange={(select) => setUserSelection(select)}
        className="mb-2"
      />

      <hr className="my-4" />

      <h3 className="mb-2 font-bold text-xl">
        Select a company [{userList?.length}] :{" "}
        <span className="italic text-indigo-500 dark:text-rose-500">
          {companySelection?.company.name}
        </span>
      </h3>
      <div className="description">
        Allow you to select a <b>company name</b> (with the <b>username</b> in
        '[]') and filter on the <b>company name</b> AND the <b>name</b>:
      </div>
      <Dropdown<CustomUser>
        list={
          userList?.map((i) => ({
            ...i,
            id: i.id.toString(),
            companyName: `${i.company.name} [${i.username}]`,
          })) || []
        }
        itemKey="companyName"
        filterBy={["name", "companyName"]}
        selection={companySelection}
        valueChange={(select) => setCompanySelection(select)}
      />

      <hr className="my-4" />

      <h3 className="mb-2 font-bold text-xl">
        Select multiple countries [{countries?.length}] :{" "}
        <span className="italic text-indigo-500 dark:text-rose-500">
          {countryMultipleSelection?.map((c) => c.name)?.join(", ")}
        </span>
      </h3>
      <div className="description">
        Allow you to select multiple <b>country names</b> and filter by{" "}
        <b>name</b>:
      </div>
      <Dropdown<Country & DropdownItem>
        list={countries.map((c) => ({ id: c.code2, ...c }))}
        itemKey="name"
        multiple
        selection={countryMultipleSelection}
        valueChange={(select) => {
          setCountryMultipleSelection(select);
        }}
      />

      <hr className="my-4" />

      <h3 className="mb-2 font-bold text-xl">
        Select a country [{countries?.length}] :{" "}
        <span className="italic text-indigo-500 dark:text-rose-500">
          {countrySelection?.name}
        </span>
      </h3>
      <div className="description">
        Allow you to select a <b>country name</b> and filter by <b>name</b>:
      </div>
      <Dropdown<Country & DropdownItem>
        list={countries.map((c) => ({ id: c.code2, ...c }))}
        itemKey="name"
        selection={countrySelection}
        valueChange={(select) => {
          if (!select) setStateSelection(undefined);
          setCountrySelection(select);
        }}
      />
      {countrySelection && (
        <>
          <h3 className="my-2 font-bold text-xl">
            Select a state [
            {
              countries.find((c) => c.code2 === countrySelection.code2)?.states
                ?.length
            }
            ] :{" "}
            <span className="italic text-indigo-500 dark:text-rose-500">{`Country "${
              countrySelection.name
            } ${
              stateSelection ? `- State "${stateSelection.name}"` : ""
            }`}</span>
          </h3>
          <div className="description">
            Allow you to select a <b>state name</b> and filter by <b>name</b>:
          </div>
          <Dropdown<State & DropdownItem>
            list={
              countries
                .find((c) => c.code2 === countrySelection.code2)
                ?.states?.map((c) => ({ id: c.code, ...c })) || []
            }
            itemKey="name"
            selection={stateSelection}
            valueChange={(select) => setStateSelection(select)}
            className="mt-2"
            noDataPlaceholder="No state found"
          />
        </>
      )}

      <hr className="my-4" />

      {countrySelection && stateSelection && (
        <span>{`Result: ${countrySelection.name} - ${stateSelection.name}`}</span>
      )}
    </>
  );
};

export default Exercise3;
