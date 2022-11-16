import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DialogModalProvider } from './context/providers/dialogModal';
import { GaterwayStoreProvider } from './context/gaterwayStore';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <GaterwayStoreProvider>
            <DialogModalProvider>
                <App />
            </DialogModalProvider>
        </GaterwayStoreProvider>
    </React.StrictMode>
);
