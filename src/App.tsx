import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Login from './features/auth/login';
import Home from './features/home/home';
import PrivateRoute from './features/auth/privateRoute';
import ProfileSetup from "./features/profile/profileSetup";
import { setupAuthHeaderForServiceCalls } from './utils/function';
import { getProfileAsync } from './utils/server.requests';
import Signup from './features/auth/signup';

function App() {

  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.auth.loggedIn);
  const location = useLocation();
  
  useEffect(() => {
    setupAuthHeaderForServiceCalls();
    if (loggedIn) {
      dispatch(getProfileAsync());
    }
  }, [loggedIn, dispatch])

  return (
    <div className="App">
      {/* {["/login", "/signup"].includes(location.pathname) ? null : null} */}
      {/* <ProfileSetup /> */}
      <Routes>
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/profile/create" element={<ProfileSetup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="profile/create" element={<ProfileSetup />} /> */}
        {/* <Route path="/" element={<ProfileSetup />} /> */}
      </Routes>
    </div>
  );
}

export default App;
