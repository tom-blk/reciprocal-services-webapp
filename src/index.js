import React from 'react';
import ReactDOM from 'react-dom/client';

import AlertMessageContextProvider from './context/alert-message.context';
import ModalContextProvider from './context/modal.context';
import UserContextProvider from './context/user.context';
import OrderContextProvider from './context/order.context';

import { HashRouter } from 'react-router-dom';

import AlertMessageList from './components/alerts/alert-message-list/alert-message-list.component';
import Modal from './components/modals/modal.component';
import App from './App';

import './index.scss';
import Background from './utils/background/background.component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter basename='/frontend.prometheus-backend.top'>
      <AlertMessageContextProvider>
        <UserContextProvider>
          <OrderContextProvider>
            <ModalContextProvider>
              <Background>
                <App /> 
              </Background>
              <AlertMessageList />
              <Modal/>
            </ModalContextProvider>
          </OrderContextProvider>
        </UserContextProvider>
      </AlertMessageContextProvider>
    </HashRouter>
  </React.StrictMode>
);