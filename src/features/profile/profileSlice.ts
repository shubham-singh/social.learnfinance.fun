import { createSlice } from "@reduxjs/toolkit";
import { createProfileAsync, getProfileAsync } from "../../utils/server.requests";

export interface ProfileState {
    newUser: boolean,
    profile: {
        img: {
            profile: string,
            cover: string
        },
        _id: string,
        user_id: string,
        username: string,
        name: string,
        bio: string,
        following: [],
        followers: []
    }
}

const initialState = {
    newUser: false,
    profile: {
        img: {
            profile: "",
            cover: ""
        },
        _id: "",
        user_id: "",
        username: "",
        name: "",
        bio: "",
        following: [],
        followers: []
    }
} as ProfileState

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
                if (action.payload.profile) {
                    state.profile = action.payload.profile;
                } else {
                    state.profile = initialState.profile;
                }
            })
    }
})

export default profileSlice.reducer;