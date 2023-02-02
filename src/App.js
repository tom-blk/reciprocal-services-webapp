import { Route, Routes } from 'react-router';

import Home from './routes/home/home.component';
import Nav from './routes/nav/nav.component';
import LogIn from './routes/login/login.component';
import UserProfile from './routes/user-profile/user-profile.component';
import Services from './routes/services/services.component';
import Providers from './routes/providers/providers.component';
import Transactions from './routes/transactions/transactions.component';
import SignUp from './routes/sign-up/sign-up.component';
import ServicePage from './components/service-page/service-page.component';
import ProviderProfilePage from './components/provider-profile-page/provider-profile-page.component';
import TransactionPage from './components/transaction-page/transaction-page.component';
import EditUserProfile from './components/edit-user-profile-page/edit-user-profile-page.component';
import IncomingOrders from './routes/incoming-orders/incoming-orders.component';

import './App.styles.scss';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Nav/>} >
          <Route index element={<Home/>} />
          <Route path='/services' >
            <Route index element={<Services/>} />
            <Route path=':serviceId' element={<ServicePage/>} />
          </Route >
          <Route path='/providers'>
            <Route index element={<Providers/>}/>
            <Route path=':providerId' element={<ProviderProfilePage/>} />
          </Route>
          <Route path='/transactions' >
            <Route index element={<Transactions/>}/>
            <Route path=':transactionId' element={<TransactionPage/>}/>
          </Route>
          <Route path='/incoming-orders' element={<IncomingOrders/>} />
          <Route path='/userProfile' element={<UserProfile/>} />
        </Route>
        <Route path='/login' element={<LogIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/userProfile-edit' element={<EditUserProfile/>} />
      </Routes>
  );
}

export default App;
