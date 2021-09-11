import { createSlice } from "@reduxjs/toolkit";
import { createPostAsync, getFeedAsync } from "../../utils/server.requests";
import { PostState, reactPostAsync } from "../post/postSlice";

interface FeedState {
  feed: PostState[];
}

const initialState = {} as FeedState;

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedAsync.fulfilled, (state, action) => {
        state.feed = action.payload.feed;
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
      });
  },
});

export default feedSlice.reducer;
