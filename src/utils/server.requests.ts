import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { showSnackbar } from "../features/snackbar/snackbarSlice";
import { LOGIN, SIGNUP } from "./api.routes";

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