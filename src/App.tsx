import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Login from "./features/auth/login";
import Home from "./features/home/home";
import PrivateRoute from "./features/auth/privateRoute";
import ProfileSetup from "./features/profile/profileSetup";
import SinglePost from "./features/post/singlePost";
import { setupAuthHeaderForServiceCalls } from "./utils/function";
import {
  getFeedAsync,
  getNotificationAsync,
  getProfileAsync,
} from "./utils/server.requests";
import Signup from "./features/auth/signup";
import Snackbar from "./features/snackbar/snackbar";
import ComposePost from "./features/post/composePost";
import Profile from "./features/profile/profile";
import Notification from "./features/notification/notification";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

function App() {
  const [nav, setNav] = useState<boolean>(false);
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const { newUser, profile: {username} } = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setupAuthHeaderForServiceCalls();
    if (loggedIn) {
      dispatch(getProfileAsync(navigate));
    }
  }, [loggedIn, dispatch, navigate]);


  useEffect(() => {
    if (newUser) {
      navigate("/profile/setup");
    } else {
      dispatch(getFeedAsync());
      dispatch(getNotificationAsync());
    }
  }, [newUser, username, navigate, dispatch]);


  return (
    <div className="App md:flex md:relative">
    
      <Snackbar />
      
      {["/login", "/signup", "/", "/profile/setup"].includes(location.pathname) ? null : <Navbar nav={nav} setNav={setNav} />}

      <div className="flex-grow md:w-1/2">
        <Routes>
          <Route path="/" element={<Login />} />
          <PrivateRoute path="/home" element={<Home nav={nav} setNav={setNav} />} />
          <PrivateRoute path="/compose" element={<ComposePost />} />
          <PrivateRoute path="/reply/:username/:postID" element={<ComposePost isReply={true} />} />
          <PrivateRoute path="/profile/setup" element={<ProfileSetup />} />
          <PrivateRoute path="/notifications" element={<Notification />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/:username/:postID" element={<SinglePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      {["/login", "/signup", "/", "/profile/setup"].includes(location.pathname) ? null : <Sidebar />}

    </div>
  );
}

export default App;
