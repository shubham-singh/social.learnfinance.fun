import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Login from './features/auth/login';
import Home from './features/home/home';
import PrivateRoute from './features/auth/privateRoute';
import ProfileSetup from "./features/profile/profileSetup";
import SinglePost from "./features/post/singlePost";
import { setupAuthHeaderForServiceCalls } from './utils/function';
import { getFeedAsync, getNotificationAsync, getProfileAsync } from './utils/server.requests';
import Signup from './features/auth/signup';
import Snackbar from './features/snackbar/snackbar';
import { getAllPostAsync } from './features/post/postSlice';
import TimeAgo from './features/post/timeAgo';
import ComposePost from './features/post/composePost';
import Profile from './features/profile/profile';
import Notification from './features/notification/notification';

function App() {

  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.auth.loggedIn);
  const { newUser , profile: {username}} = useAppSelector(state => state.auth.profile);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (newUser) {
      navigate("/profile/create");
    }
  }, [newUser])

  useEffect(() => {
    setupAuthHeaderForServiceCalls();
    if (loggedIn) {
      dispatch(getProfileAsync(navigate));
      // dispatch(getAllPostAsync(username));
      dispatch(getFeedAsync());
      dispatch(getNotificationAsync());
    }
  }, [loggedIn, dispatch, username])

  return (
    <div className="App">
      {/* {["/login", "/signup"].includes(location.pathname) ? null : null} */}
      {/* <ProfileSetup /> */}
      <Snackbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <PrivateRoute path="/home" element={<Home />} />
        <PrivateRoute path="/compose" element={<ComposePost />} />
        <PrivateRoute path="/profile/create" element={<ProfileSetup />} />
        <PrivateRoute path="/notifications" element={<Notification />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/:postID" element={<SinglePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="profile/create" element={<ProfileSetup />} /> */}
        {/* <Route path="/" element={<ProfileSetup />} /> */}
      </Routes>
    </div>
  );
}

export default App;
