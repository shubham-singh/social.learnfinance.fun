import { createSlice } from "@reduxjs/toolkit";
import { createPostAsync, deletePostAsync, getFeedAsync } from "../../utils/server.requests";
import { PostState, reactPostAsync } from "../post/postSlice";

interface FeedState {
  status: "idle" | "loading" | "failed";
  feed: PostState[];
}

const initialState = {
  status: "loading",
  feed: []
} as FeedState;

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getFeedAsync.fulfilled, (state, action) => {
        state.feed = action.payload.feed;
        state.status = "idle"
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.feed.unshift(action.payload.post);
      })
      .addCase(reactPostAsync.fulfilled, (state, action) => {
        const existingPost = state.feed.findIndex(
          (post) => post._id === action.payload.post._id
        );
        if (state.feed[existingPost].likes.includes(action.payload.profileID)) {
          const newLikes = state.feed[existingPost].likes.filter(
            (id) => id !== action.payload.profileID
          );
          state.feed[existingPost].likes = newLikes;
        } else {
          state.feed[existingPost].likes.push(action.payload.profileID);
        }
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => ({
        ...state,
        feed: state.feed.filter(post => post._id !== action.payload.postID)
      }))
  },
});

export default feedSlice.reducer;
