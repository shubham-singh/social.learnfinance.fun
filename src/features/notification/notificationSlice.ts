import { createSlice } from "@reduxjs/toolkit";
import { getNotificationAsync } from "../../utils/server.requests";
import { UserState } from "../post/postSlice";

export interface NotificationState {
  _id: string;
  isRead: boolean;
  sender: UserState;
  type: "LIKED" | "FOLLOWED";
  onItem: string;
  createdAt: string;
}

export interface NotificationInterface {
  notifications: NotificationState[];
}

const initialState = {
  notifications: []
} as NotificationInterface;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    readNotification: (state) => {
      state.notifications.map((notification) => {
        return {
          ...notification,
          isRead: true,
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotificationAsync.fulfilled, (state, action) => {
      state.notifications = action.payload.notification.notifications;
    });
  },
});

export const { readNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
