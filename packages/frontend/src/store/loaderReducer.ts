import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

type LoaderSize = "small" | "medium" | "large";

export interface LoaderState {
  show: boolean;
  size: LoaderSize;
}

const initialState: LoaderState = {
  show: false,
  size: "medium",
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<LoaderSize>) => {
      state.show = true;
      state.size = action.payload;
    },
    hideLoader: (state) => {
      state.show = false;
      state.size = "medium";
    },
  },
});

export const { hideLoader, showLoader } = loaderSlice.actions;

export const selectLoader = (state: RootState) => state.loader;

export default loaderSlice.reducer;
