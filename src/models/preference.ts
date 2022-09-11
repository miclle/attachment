import { IAccount } from './account';

export interface IPreference {
  lang: string;
  accounts: IAccount[];
}
