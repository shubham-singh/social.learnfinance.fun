import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import loaderReducer from "../features/loader/loaderSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import profileReducer from "../features/profile/profileSlice";
import postReducer from "../features/post/postSlice";
import feedReducer from "../features/feed/feedSlice";
import notificationReducer from "../features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    snackbar: snackbarReducer,
    profile: profileReducer,
    post: postReducer,
    notification: notificationReducer,
    feed :feedReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
