import { createContext, useContext } from 'react';
import { makeAutoObservable, runInAction } from 'mobx';

import { IPreference, IAccount } from 'models';

export class AppStore {
  preferences: IPreference = {} as IPreference;

  account?: IAccount;

  constructor() {
    makeAutoObservable(this);
  }

  setPreferences(preferences: Partial<IPreference>) {
    runInAction(() => {
      this.preferences = { ...this.preferences, ...preferences };
    });
  }

  setAccount(account: IAccount) {
    runInAction(() => {
      this.account = account;
    });
  }
}

export const appStore = new AppStore();

export const AppContext = createContext<AppStore>(appStore);

export const useAppContext = () => useContext(AppContext);
