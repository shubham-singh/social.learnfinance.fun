import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { scrollToTop } from "../../utils/function";
import { signupAsync } from "../../utils/server.requests";

interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const { loggedIn } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [signupInfo, setSignupInfo] = useState<SignupState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e: any) => {
    setSignupInfo({
      ...signupInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e: any) => {
    e.preventDefault();
    dispatch(signupAsync(signupInfo));
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  });

  return (
    <div className="flex-column-center form-container">
      <form className="flex-c form-credentials shadow" onSubmit={handleSignup}>
        <h1
          className="heading m-null p-s pointer"
          onClick={() => navigate("/")}
        >
          {/* {lang[language].learnFinance} */}
          Learn Finance
        </h1>
        <input
          className="m-xs p-s"
          type="name"
        //   placeholder={lang[language].firstName}
          placeholder="First name"
          name="firstName"
          value={signupInfo.firstName}
          onChange={onChangeHandler}
          required
        />
        <input
          className="m-xs p-s"
          type="name"
        //   placeholder={lang[language].lastName}
          placeholder="Last name"
          name="lastName"
          value={signupInfo.lastName}
          onChange={onChangeHandler}
        />
        <input
          className="m-xs p-s"
          type="email"
        //   placeholder={lang[language].email}
          placeholder="Email"
          name="email"
          value={signupInfo.email}
          onChange={onChangeHandler}
          required
        />
        <input
          className="m-xs p-s"
          type="password"
        //   placeholder={lang[language].password}
          placeholder="Password"
          name="password"
          value={signupInfo.password}
          onChange={onChangeHandler}
          required
        />
        <button className="btn btn-classic shadow mt-l" type="submit">
          {/* {lang[language].signup} */}
          Create my account
        </button>
      </form>
      <p className="mt-xl pointer" onClick={() => navigate("/login")}>
        {/* {lang[language].loginText} */}
        Already have an account? Login now!
      </p>
    </div>
  );
};

export default Signup;
