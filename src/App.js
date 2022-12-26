import './App.css';
import { Route, Routes } from 'react-router';
import Home from './routes/home/home.component';
import Nav from './routes/nav/nav.component';
import LogIn from './routes/login/login.component';
import RecentAssociates from './routes/recent-associates/recent-associates.component';
import UserProfile from './routes/user-profile/user-profile.component';
import Services from './routes/services/services.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Nav/>}>
        <Route index element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/recentAssociates' element={<RecentAssociates/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>
        <Route path='/login' element={<LogIn/>}/>
      </Route>
    </Routes>
  );
}

export default App;
