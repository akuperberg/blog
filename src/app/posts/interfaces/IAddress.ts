import { IGeo } from "./IGeo";

export interface IAddress {
  city: string;
  geo: IGeo;
  street: string;
  suite: string;
  zipcode: string;
}
