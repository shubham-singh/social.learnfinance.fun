import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginAsync } from "../../utils/server.requests";
import { scrollToTop } from "../../utils/function";

interface LoginState {
  email: string;
  password: string;
}

interface State {
  from: string
}

const Login = () => {
  const { loggedIn } = useAppSelector((state) => state.auth);
  const { state } = useLocation() as { state: State };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginInfo, setLoginInfo] = useState<LoginState>({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: any) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(loginAsync(loginInfo));
  };

  const handleGuestLogin = () => {
    dispatch(loginAsync({
      email: "shubham@gmail.com",
      password: "Bitcoin",
    }));
    setLoginInfo({
      email: "shubham@gmail.com",
      password: "Bitcoin",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      if (state !== null) {
        navigate(state.from);
      } else {
        navigate("/");
      }
    }
  });

  return (
    <div className="flex-column-center form-container">
      <form className="flex-c form-credentials shadow" onSubmit={handleLogin}>
        <h1
          className="heading m-null p-s pointer"
          onClick={() => navigate("/")}
        >
          {/* {lang[language].learnFinance} */}
          Learn Finance
        </h1>
        <input
          className="m-xs p-s"
          type="email"
          //   placeholder={lang[language].email}
          placeholder="Email"
          name="email"
          value={loginInfo.email}
          onChange={onChangeHandler}
          required
        />
        <input
          className="m-xs p-s"
          type="password"
          //   placeholder={lang[language].password}
          placeholder="Password"
          name="password"
          value={loginInfo.password}
          onChange={onChangeHandler}
          required
        />
        <button className="btn btn-classic shadow mt-l" type="submit">
          {/* {lang[language].login} */}
          Login
        </button>
        <button
          className="btn btn-classic glow mt-l"
          onClick={handleGuestLogin}
        >
          {/* {lang[language].loginAsGuest} */}
          Login with Guest account
        </button>
      </form>
      <p className="mt-xl pointer" onClick={() => navigate("/signup")}>
        {/* {lang[language].signupText} */}
        Don't have an account? Signup now!
      </p>
    </div>
  );
};

export default Login;
