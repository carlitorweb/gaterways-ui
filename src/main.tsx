import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DialogModalProvider } from './context/providers/dialogModal';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <DialogModalProvider>
            <App />
        </DialogModalProvider>
    </React.StrictMode>
);
