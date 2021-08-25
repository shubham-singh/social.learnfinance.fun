import { createSlice } from "@reduxjs/toolkit";

interface LoaderInterface {
  status: "idle" | "loading" | "failed";
}

const initialState = {
status: "idle",
} as LoaderInterface;

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    loading: (state) => {
      state.status = "loading";
    },
    idle: (state) => {
      state.status = "idle";
    },
    failed: (state) => {
      state.status = "failed";
    }
  }
});

export const { loading, idle, failed } = loaderSlice.actions;

export default loaderSlice.reducer;
