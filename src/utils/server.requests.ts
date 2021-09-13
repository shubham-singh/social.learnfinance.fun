import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showSnackbar } from "../features/snackbar/snackbarSlice";
import {
  CHECK_USERNAME,
  FEED,
  LOGIN,
  NOTIFICATION,
  POST,
  PROFILE,
  SIGNUP,
} from "./api.routes";
import { ProfileFormState } from "../features/profile/profileSetup";
import { addPost, PostState } from "../features/post/postSlice";
import { follow, unfollow } from "../features/profile/profileSlice";
import { deleteAuthToken } from "./function";
import { NavigateFunction } from "react-router-dom";

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
    } catch (error: any) {
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
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProfileAsync = createAsyncThunk(
  "profile/getProfile",
  async (navigate: NavigateFunction, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(PROFILE);
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      if (error.response.data.error === "jwt expired") {
        deleteAuthToken();
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeedAsync = createAsyncThunk(
  "feed/getFeed",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(FEED);
      console.log(response.data);
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNotificationAsync = createAsyncThunk(
  "notification/getNotification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(NOTIFICATION);
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const getAllPostAsync = createAsyncThunk(
//   "post/getAllPost",
//   async (username: string, { rejectWithValue }) => {
//     try {
//       console.log(`${POST}/${username}`);
//       const response = await axios.get(`${POST}/${username}`);
//       if (response.data.success) {
//         return response.data;
//       } else throw new Error("could not get your posts");
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const checkUsernameAsync = async (username: string) => {
  try {
    const response = await axios.post(CHECK_USERNAME, username);
    if (response.data.success) {
      if (response.data.isUsernameAvailable) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error: any) {}
};

export const createProfileAsync = createAsyncThunk(
  "profile/createProfile",
  async (profileForm: ProfileFormState, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(PROFILE, profileForm);
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPostAsync = createAsyncThunk(
  "post/create",
  async (post: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(POST, { body: post });
      if (response.data.success) {
        dispatch(addPost(response.data));
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePostAsync = createAsyncThunk(
  "post/like",
  async (postID: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${POST}/${postID}`, postID);
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostAsync = async (
  { postID, username }: { postID: string; username: string },
  setPost: React.Dispatch<React.SetStateAction<PostState | null>>
) => {
  try {
    const response = await axios.get(`${POST}/${username}/${postID}`);
    if (response.data.success) {
      setPost(response.data.post);
    }
  } catch (error: any) {
    setPost(error.message);
  }
};

export const getProfileByUsernameAsync = createAsyncThunk(
  "profile/getProfileByUsername",
  async (username: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${PROFILE}/${username}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const followAsync = createAsyncThunk(
  "auth/profile/follow",
  async ({profileID, userID} : {profileID: string, userID: string}, {dispatch, rejectWithValue}) => {
    try {
      const response = await axios.post(`${PROFILE}/follow`, {profileID});
      if (response.data.success) {
        dispatch(follow(userID))
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
  )
  
  export const unfollowAsync = createAsyncThunk(
    "auth/profile/unfollow",
    async ({profileID, userID} : {profileID: string, userID: string}, { dispatch, rejectWithValue }) => {
      try {
        const response = await axios.post(`${PROFILE}/unfollow`, {profileID});
        if (response.data.success) {
          dispatch(unfollow(userID))
          return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  }
)