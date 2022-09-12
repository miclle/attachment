import { IpcMainInvokeEvent } from 'electron';
import Store, { Schema } from 'electron-store';

import { IPreference, IAccount } from 'models';

const name = 'Attachment';
// const uuid = 'b48f500a-ec7a-4df0-9767-4eaf802e9640';

export const schema: Schema<IPreference> = {
  lang: {
    type: 'string',
    default: 'en_US',
  },
  accounts: {
    type: 'array',
    default: [],
  },
};

export default function Preference() {
  return new Store<IPreference>({
    schema,
    name,
    fileExtension: '',
    // encryptionKey: uuid,
  });
}

const preference = Preference();

export const PreferenceHandle = async (_: IpcMainInvokeEvent, op: string, args: Record<string, unknown>) => {
  switch (op) {
    case 'all': {
      return preference.store;
    }
    case 'update': {
      preference.store = { ...preference.store, ...args };
      return preference.store;
    }
    case 'addAccount': {
      const { accounts } = preference.store;
      const account: IAccount = args as unknown as IAccount;
      accounts.push(account);
      preference.set('accounts', accounts);
      return account;
    }
    default:
      return null;
  }
};
