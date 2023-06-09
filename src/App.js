import { Route, Routes } from 'react-router';

import Home from './routes/home/home.component';
import Nav from './routes/nav/nav.component';
import LogIn from './routes/login/login.component';
import UserProfile from './routes/user-profile/user-profile.component';
import Services from './routes/services/services.component';
import Providers from './routes/providers/providers.component';
import SignUp from './routes/sign-up/sign-up.component';
import ServicePage from './components/service-page/service-page.component';
import ProviderProfilePage from './components/provider-profile-page/provider-profile-page.component';
import OrderPage from './components/order-page/order-page.component';
import EditUserProfile from './components/edit-user-profile-page/edit-user-profile-page.component';
import IncomingOrders from './routes/incoming-orders/incoming-orders.component';
import OutgoingOrders from './routes/outgoing-orders/outgoing-orders.component';
import EditUserServicesList from './components/edit-user-services-list/edit-user-services-list.component';

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
          <Route path='/outgoing-orders' >
            <Route index element={<OutgoingOrders/>}/>
            <Route path=':orderId' element={<OrderPage/>}/>
          </Route>
          <Route path='/incoming-orders'>
            <Route index element={<IncomingOrders/>}/>
            <Route path=':orderId' element={<OrderPage/>}/>
          </Route>
          <Route path='/userProfile' element={<UserProfile/>} />
          <Route path='/userProfile-edit'>
            <Route index element={<EditUserProfile/>}/>
            <Route path='/userProfile-edit/edit-services' element={<EditUserServicesList/>}/> 
          </Route>
        </Route>
        <Route path='/login' element={<LogIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
    </Routes>      
  );
}

export default App;
