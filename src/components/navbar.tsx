import { useAppDispatch, useAppSelector } from "../app/hooks";
import UserLayout from "../features/post/userLayout";
import Acquaintance from "../components/acquaintance";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { ReactComponent as BackIcon } from "../assets/icons/BackIcon.svg";
import { showSnackbar } from "../features/snackbar/snackbarSlice";
const Navbar = ({
  nav,
  setNav,
}: {
  nav: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { name, username, img, followers, following } = useAppSelector(
    (state) => state.auth.profile.profile
  );
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);

  if (!loggedIn) {
    return (
      <div
        className={`bg-white transform duration-300 z-20 fixed px-6 py-10 flex flex-col h-full w-4/5 sm:w-3/5 md:shadow-none md:flex md:sticky md:top-0 md:w-1/4 md:pl-20 md:translate-x-0 ${
          nav ? "shadow-2xl translate-x-0" : "-translate-x-full shadow-none"
        }`}
      >
        <h1 className="heading mb-5">Learn Finance</h1>
        <Link to="/login" className="my-2 text-xl">
          Login
        </Link>
        <Link to="/signup" className="my-2 text-xl">
          Signup
        </Link>
        <button className="flex-grow flex flex-col justify-end md:hidden">
          <BackIcon />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white transform duration-300 z-20 fixed px-6 py-10 flex flex-col h-full w-4/5 sm:w-3/5 md:shadow-none md:flex md:sticky md:top-0 md:w-1/4 md:pl-20 md:translate-x-0 ${
        nav ? "shadow-2xl translate-x-0" : "-translate-x-full shadow-none"
      }`}
      onClick={() => setNav(false)}
    >
      <UserLayout name={name} username={username} image={img.profile.src} />
      <div className="my-3 md:hidden">
        <Acquaintance
          followingCount={following.length}
          followerCount={followers.length}
        />
      </div>
      <NavLink
        activeClassName="font-bold"
        to="/home"
        className="md:mt-6 my-2 text-xl"
      >
        Home
      </NavLink>
      <NavLink
        activeClassName="font-bold"
        to={`/${username}`}
        className="my-2 text-xl"
      >
        Profile
      </NavLink>
      <NavLink
        activeClassName="font-bold"
        to="/notifications"
        className="my-2 text-xl"
      >
        Notifications
      </NavLink>
      <Link to="/login" className="my-2 text-xl">
        <button
          onClick={() => {
            dispatch(logout());
            dispatch(showSnackbar("Logged out"));
          }}
        >
          Log out
        </button>
      </Link>
      <button className="flex-grow flex flex-col justify-end md:hidden">
        <BackIcon />
      </button>
    </div>
  );
};

export default Navbar;
