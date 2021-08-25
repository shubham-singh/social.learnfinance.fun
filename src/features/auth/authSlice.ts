import { createSlice } from "@reduxjs/toolkit";
import { loginAsync, signupAsync } from "../../utils/server.requests";

interface AuthState {
  token: string | void;
  firstName: string;
  loggedIn: boolean;
}

const initialState: AuthState = {
  token: JSON.parse(localStorage.getItem("auth_learnfinance") as string),
  firstName: "",
  loggedIn: (function () {
    return localStorage.getItem("auth_learnfinance") ? true : false;
  })(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = localStorage.removeItem("auth_learnfinance");
      state.firstName = "";
      state.loggedIn = false;
    },
    user_info: (state, action) => {
      state.firstName = action.payload.firstName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        localStorage.setItem(
          "auth_learnfinance",
          JSON.stringify(action.payload.token)
        )
        state.token = action.payload.token;
        state.firstName = action.payload.firstName;
        state.loggedIn = true;
      })
      .addCase(loginAsync.rejected, (state) => {
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.token = action.payload.token;
        state.loggedIn = true;
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
