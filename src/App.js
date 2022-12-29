import './App.css';
import { Route, Routes } from 'react-router';
import Home from './routes/home/home.component';
import Nav from './routes/nav/nav.component';
import LogIn from './routes/login/login.component';
import UserProfile from './routes/user-profile/user-profile.component';
import Services from './routes/services/services.component';
import Providers from './routes/providers/providers.component';
import Transactions from './routes/transactions/transactions.component';
import SignUp from './routes/sign-up/sign-up.component';
import ProviderCard from './components/provider-card/provider-card.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Nav/>}>
        <Route index element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/providers' element={<Providers/>}>
          <Route path=":userId" element={<ProviderCard/>} />
        </Route>
        <Route path='/transactions' element={<Transactions/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>
      </Route>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
