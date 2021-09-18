import { createSlice } from "@reduxjs/toolkit";
import { deletePostAsync, getProfileByUsernameAsync } from "../../utils/server.requests";
import { getAllPostAsync, PostState } from "../post/postSlice";
import { followAsync, unfollowAsync } from "../../utils/server.requests";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileByUsernameAsync.pending, (state) => {
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
        state.profile.img.profile.src = "";
        state.profile.img.cover.src = "";
      })
      .addCase(getAllPostAsync.pending, (state) => {
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
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => ({
        ...state,
        posts: state.posts.filter(post => post._id === action.payload.postID)
      }))
      .addCase(followAsync.fulfilled, (state, action) => {
        const updatedFollowers = state.profile.followers.concat(action.payload.followedBy);
        state.profile.followers = updatedFollowers;
      })
      .addCase(unfollowAsync.fulfilled, (state, action) => {
        const updatedFollowers = state.profile.followers.filter(
          (id) => id !== action.payload.unfollowedBy
        );
        state.profile.followers = updatedFollowers;
      })
  },
});

export default profileSlice.reducer;
