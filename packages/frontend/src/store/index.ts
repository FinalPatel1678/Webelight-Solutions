import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderReducer";
import notificationReducer from "./notificationReducer";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    notification: notificationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
