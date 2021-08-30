import { createSlice } from "@reduxjs/toolkit";
import { createProfileAsync, getProfileAsync } from "../../utils/server.requests";

export interface ProfileState {
    newUser: Boolean,
    profile: {
        img: {
            profile: String,
            cover: String
        },
        _id: String,
        user_id: String,
        username: String,
        name: String,
        bio: String,
        following: [],
        followers: []
    }
}

const initialState = {} as ProfileState

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProfileAsync.fulfilled, (state, action) => {
                state.newUser = false;
                state.profile = action.payload.profile;
            })
            .addCase(getProfileAsync.fulfilled, (state, action) => {
                state.newUser = action.payload.newUser;
                state.profile = action.payload.profile;
            })
    }
})

export default profileSlice.reducer;