import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AlertMessageContextProvider from './context/alert-message.context';
import ModalContextProvider from './context/modal.context';
import UserContextProvider from './context/user.context';
import AlertMessageList from './components/alert-message-list/alert-message-list.component';
import Modal from './components/modal/modal.component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <UserContextProvider>
          <AlertMessageContextProvider>
            <ModalContextProvider>
              <App />
              <AlertMessageList />
              <Modal/>
            </ModalContextProvider>
          </AlertMessageContextProvider>
        </UserContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);