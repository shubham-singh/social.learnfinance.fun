import { createSlice } from "@reduxjs/toolkit";
import {
  createProfileAsync,
  editProfileAsync,
  followAsync,
  getProfileAsync,
  loginAsync,
  signupAsync,
  unfollowAsync,
} from "../../utils/server.requests";

export interface ProfileState {
  newUser: boolean;
  profile: {
    img: {
      profile: {
        src: string;
      };
      cover: {
        src: string;
      };
    };
    _id: string;
    user_id: string;
    username: string;
    name: string;
    bio: string;
    following: string[];
    followers: string[];
  };
}

interface AuthState {
  token: string | void;
  firstName: string;
  loggedIn: boolean;
  profile: ProfileState;
}

const initialState: AuthState = {
  token: JSON.parse(localStorage.getItem("auth_learnfinance") as string),
  firstName: "",
  loggedIn: (function () {
    return localStorage.getItem("auth_learnfinance") ? true : false;
  })(),
  profile: {
    newUser: false,
    profile: {
      img: {
        profile: {
          src: ""
        },
        cover: {
          src: ""
        },
      },
      _id: "",
      user_id: "",
      username: "",
      name: "",
      bio: "",
      following: [],
      followers: [],
    },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = localStorage.removeItem("auth_learnfinance");
      state.firstName = "";
      state.loggedIn = false;
      state.profile = initialState.profile;
    },
    user_info: (state, action) => {
      state.firstName = action.payload.firstName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {})
      .addCase(loginAsync.fulfilled, (state, action) => {
        localStorage.setItem(
          "auth_learnfinance",
          JSON.stringify(action.payload.token)
        );
        state.token = action.payload.token;
        state.firstName = action.payload.firstName;
        state.loggedIn = true;
      })
      .addCase(loginAsync.rejected, (state) => {})
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.token = action.payload.token;
        state.loggedIn = true;
      })
      .addCase(createProfileAsync.fulfilled, (state, action) => {
        state.profile.newUser = false;
        state.profile.profile = action.payload.profile;
      })
      .addCase(editProfileAsync.fulfilled, (state, action) => {
        state.profile.profile = action.payload.profile;
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.profile.newUser = action.payload.newUser;
        if (action.payload.profile) {
          state.profile.profile = action.payload.profile;
        }
      })
      .addCase(followAsync.fulfilled, (state, action) => {
        const updatedFollowing = state.profile.profile.following.concat(action.payload.profileID);
        state.profile.profile.following = updatedFollowing;
      })
      .addCase(unfollowAsync.fulfilled, (state, action) => {
        const updatedFollowing = state.profile.profile.following.filter(userID => userID !== action.payload.profileID);
        state.profile.profile.following = updatedFollowing;
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
