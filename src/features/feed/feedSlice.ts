import { createSlice } from "@reduxjs/toolkit";
import { createPostAsync, getFeedAsync } from "../../utils/server.requests";
import { PostState } from "../post/postSlice";

interface FeedState {
    feed: PostState[]
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
    }
})

export default feedSlice.reducer