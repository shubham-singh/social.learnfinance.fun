import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showSnackbar } from "../features/snackbar/snackbarSlice";
import { LOGIN, PROFILE, SIGNUP } from "./api.routes";
import { ProfileFormState } from "../features/profile/profileSetup";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (
    loginInfo: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(showSnackbar("Logging in"));
      const response = await axios.post(LOGIN, loginInfo);
      if (response.data.success) {
        dispatch(showSnackbar("Successfully Logged In"));
        return response.data;
      } else throw new Error("login failed");
    } catch (error) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (signupInfo: object, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showSnackbar("Creating your account"));
      const response = await axios.post(SIGNUP, signupInfo);
      if (response.data.success) {
        dispatch(showSnackbar("Successfully Signed Up"));
        return response.data;
      }
    } catch (error) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProfileAsync = createAsyncThunk("profile/getProfile", 
  async (_, {dispatch, rejectWithValue}) => {
    try {
      const response = await axios.get(PROFILE);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const createProfileAsync = createAsyncThunk("profile/createProfile",
  // async ({username, name, bio, imgProfile, imgCover} : {username: String, name: String , bio: String, imgProfile: String, imgCover: String}, {dispatch, rejectWithValue}) => {
  async (profileForm: ProfileFormState, {dispatch, rejectWithValue}) => {
    try {
      const response = await axios.post(PROFILE, profileForm);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
