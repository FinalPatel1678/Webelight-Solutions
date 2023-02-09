import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

export type SnackbarType = "success" | "info" | "warning" | "error";

export interface NotificationState {
  type: SnackbarType;
  message: string;
}

const initialState: NotificationState = {
  message: "",
  type: "success",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { showNotification } = notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;
