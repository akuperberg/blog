import { ICompany } from "./ICompany";
import { IAddress } from "./IAddress";


export interface IUser {
  address: IAddress;
  company: ICompany;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}
