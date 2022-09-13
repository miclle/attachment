import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppContext, appStore } from 'renderer/stores/app-store';
import { Application } from './services';
import App from './App';

import 'antd/dist/antd.css';
import './App.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

// eslint-disable-next-line promise/catch-or-return, promise/always-return
Application.preferences().then((preference) => {
  // eslint-disable-next-line no-console
  console.log(preference);

  appStore.setPreferences(preference);

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={appStore}>
          <App />
        </AppContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
});

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.send('ipc-example', ['ping']);
