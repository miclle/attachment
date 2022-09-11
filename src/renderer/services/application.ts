import { IPreference, IAccount } from 'models';

export function preferences(): Promise<IPreference> {
  return window.electron.ipcRenderer.invoke<IPreference>('preference', 'all');
}

export function updatePreferences(args: Record<string, unknown>): unknown {
  return window.electron.ipcRenderer.invoke<IPreference>('preference', 'update', args);
}

export function addAccount(account: Partial<IAccount>): Promise<IAccount> {
  return window.electron.ipcRenderer.invoke<IAccount>('preference', 'addAccount', account);
}
