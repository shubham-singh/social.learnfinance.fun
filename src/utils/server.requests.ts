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
  REPLY,
  SIGNUP,
} from "./api.routes";
import { PostState } from "../features/post/types";
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
        dispatch(showSnackbar("Logged In"));
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
        dispatch(showSnackbar("Please Login Again"));
        deleteAuthToken();
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProfileByUsernameAsync = createAsyncThunk(
  "profile/getProfileByUsername",
  async (username: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${PROFILE}/${username}`);
      if (response.data.success) {
        if (response.data.profile === null) {
          throw new Error(username);
        }
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeedAsync = createAsyncThunk(
  "feed/getFeed",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(FEED);
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNotificationAsync = createAsyncThunk(
  "notification/getNotification",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(NOTIFICATION);
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const readNotificationAsync = createAsyncThunk(
  "notification/read",
  async (notificationID: string, {dispatch, rejectWithValue}) => {
    try {
      const response = await axios.post(NOTIFICATION, {notificationID});
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
)

export const getAllPostAsync = createAsyncThunk(
  "post/getAllPost",
  async (username: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${POST}/${username}`);
      if (response.data.success) {
        return response.data;
      } else throw new Error("could not get your posts");
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const reactPostAsync = createAsyncThunk(
  "post/like",
  async (postID: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${POST}/${postID}/react`, { postID });
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);
export const checkUsernameAsync = async (username: string) => {
  try {
    if (username === "") return false;
    const response = await axios.post(CHECK_USERNAME, {username});
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
  async (profileForm: FormData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(PROFILE, profileForm);
      if (response.data.success) {
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPostAsync = createAsyncThunk(
  "post/create",
  async (postForm: FormData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(POST, postForm);
      if (response.data.success) {
        dispatch(showSnackbar("Yay! Posted"));
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
);

export const replyAsync = createAsyncThunk(
  "post/reply",
  async (replyForm: FormData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(REPLY, replyForm);
      if (response.data.success) {
        dispatch(showSnackbar("Reply sent"));
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deletePostAsync = createAsyncThunk(
  "post/delete",
  async (postID: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${POST}/${postID}`);
      if (response.data.success) {
        dispatch(showSnackbar("Deleted post"))
        return {postID};
      } else {
        throw new Error("Could not delete post");
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
)

export const getPostAsync = async (
  { postID, username }: { postID: string; username: string },
  setPost: React.Dispatch<React.SetStateAction<PostState | null | 'DELETED'>>
) => {
  try {
    const response = await axios.get(`${POST}/${username}/${postID}`);
    if (response.data.success) {
      setPost(response.data.post);
    }
    if (!response.data.success && response.data.error === 'post deleted') {
      setPost('DELETED');
    }
  } catch (error: any) {
    setPost(error.message);
  }
};


export const followAsync = createAsyncThunk(
  "auth/profile/follow",
  async ({profileID} : {profileID: string, userID: string}, {dispatch, rejectWithValue}) => {
    try {
      const response = await axios.post(`${PROFILE}/follow`, {profileID});
      if (response.data.success) {
        dispatch(showSnackbar("Followed"));
        return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data);
    }
  }
  )
  
  export const unfollowAsync = createAsyncThunk(
    "auth/profile/unfollow",
    async ({profileID} : {profileID: string, userID: string}, { dispatch, rejectWithValue }) => {
      try {
        const response = await axios.post(`${PROFILE}/unfollow`, {profileID});
        if (response.data.success) {
          dispatch(showSnackbar("Unfollowed"));
          return response.data;
      }
    } catch (error: any) {
      dispatch(showSnackbar(error.response.data.error));
      return rejectWithValue(error.response.data)
    }
  }
)