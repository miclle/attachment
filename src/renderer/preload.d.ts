import { IpcRendererEvent } from 'electron';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send(channel: string, ...args: unknown[]): void;
        invoke<T>(channel: string, ...args: unknown[]): Promise<T>;
        on(channel: string, func: (event: IpcRendererEvent, ...args: unknown[]) => void): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
