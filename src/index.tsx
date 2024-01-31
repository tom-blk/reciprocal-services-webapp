import React from 'react';
import ReactDOM from 'react-dom/client';

import ModalContextProvider from './context/modal.context';
import UserContextProvider from './context/user.context';
import OrderContextProvider from './context/order.context';

import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Background from './utils/background/background.component';
import Modal from './components/modals/modal.component';
import App from './App';

import './components/alerts/alert-message.styles.scss';
import './index.scss';

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HashRouter basename='/'>
        <UserContextProvider>
          <OrderContextProvider>
            <ModalContextProvider>
              <Background>
                <App /> 
              </Background>
              <ToastContainer
                autoClose={3500}
                closeButton={false}
                icon={false} 
                position='bottom-center' 
                className='alert-message'
              />
              <Modal/>
            </ModalContextProvider>
          </OrderContextProvider>
        </UserContextProvider>
    </HashRouter>
  </React.StrictMode>
);