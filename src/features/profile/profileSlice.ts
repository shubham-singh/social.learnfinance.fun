import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PROFILE } from "../../utils/api.routes";
// import { getProfileByUsernameAsync } from "../../utils/server.requests";
import { getAllPostAsync, PostState } from "../post/postSlice";

export interface ProfileState {
  profile: {
    img: {
      profile: string;
      cover: string;
    };
    _id: string;
    user_id: string;
    username: string;
    name: string;
    bio: string;
    following: string[];
    followers: string[];
  };
  posts: PostState[];
}

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

const initialState = {
  profile: {
    img: {
      profile: "",
      cover: "",
    },
    _id: "",
    user_id: "",
    username: "",
    name: "",
    bio: "",
    following: [],
    followers: [],
  },
  posts: [] as PostState[],
} as ProfileState;

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    follow: (state, action) => {
      const updatedFollowers = state.profile.followers.concat(action.payload)
      state.profile.followers = updatedFollowers
    },
    unfollow: (state, action) => {
      const updatedFollowers = state.profile.followers.filter(id => id !== action.payload);
      state.profile.followers = updatedFollowers;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProfileByUsernameAsync.fulfilled, (state, action) => {
        state.profile = action.payload.profile
    })
    .addCase(getAllPostAsync.fulfilled, (state, action) => {
        state.posts = action.payload.posts.posts;
    })
  },
});

export const { follow, unfollow } = profileSlice.actions;

export default profileSlice.reducer;
