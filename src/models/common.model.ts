export interface Address {
  city: string;
  geo: { lat: string; lng: string };
  street: string;
  suite: string;
  zipCode: string;
}
export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}
export interface User {
  id: number;
  name: string;
  address: Address;
  company: Company;
  email: string;
  phone: string;
  username: string;
  website: string;
}

export interface State {
  code: string;
  name: string;
  subdivision: string | null;
}
export interface Country {
  code2: string;
  code3: string;
  name: string;
  capital: string;
  region: string;
  subregion: string;
  states: State[];
}
