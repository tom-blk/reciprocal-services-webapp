import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AlertContextProvider from './context/alert.context';
import ModalContextProvider from './context/modal.context';
import UserContextProvider from './context/user.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <UserContextProvider>
          <AlertContextProvider>
            <ModalContextProvider>
              <App />
            </ModalContextProvider>
          </AlertContextProvider>
        </UserContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);