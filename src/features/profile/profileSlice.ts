import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PROFILE } from "../../utils/api.routes";
import { getAllPostAsync, PostState } from "../post/postSlice";

export interface ProfileInterface {
  status: "idle" | "loading" | "failed";
  userExists: boolean;
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
  posts: PostState[];
}

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
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  status: "loading",
  userExists: true,
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
  posts: [] as PostState[],
} as ProfileInterface;

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    follow: (state, action) => {
      // if (state.profile !== null) {
      //   const updatedFollowers = state.profile.followers.concat(action.payload);
      //   state.profile.followers = updatedFollowers;
      // }
      const updatedFollowers = state.profile.followers.concat(action.payload);
      state.profile.followers = updatedFollowers;
    },
    unfollow: (state, action) => {
      // if (state.profile !== null) {
      //   const updatedFollowers = state.profile.followers.filter(
      //     (id) => id !== action.payload
      //   );
      //   state.profile.followers = updatedFollowers;
      // }
      const updatedFollowers = state.profile.followers.filter(
        (id) => id !== action.payload
      );
      state.profile.followers = updatedFollowers;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileByUsernameAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProfileByUsernameAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.profile = action.payload.profile;
        state.userExists = true;
      })
      .addCase(getProfileByUsernameAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userExists = false;
        state.profile.username = action.meta.arg;
        state.profile.name = action.meta.arg;
      })
      .addCase(getAllPostAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action.payload.posts.posts;
        state.userExists = true;
      })
      .addCase(getAllPostAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userExists = false;
      });
  },
});

export const { follow, unfollow } = profileSlice.actions;

export default profileSlice.reducer;
