/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const changeNav = createAsyncThunk("fetch/event", async (cred) => {
  return !cred;
});

const initialState = {
    navbar:false
};

export const navSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeNav.fulfilled, (state, action) => {
        state.navbar = action.payload;
      })
  },
});

export default navSlice.reducer;
