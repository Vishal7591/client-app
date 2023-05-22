import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { clients } from "../utils/client/client";
import { Client } from "../utils/client/clientTypes";

export const fetchClient = createAsyncThunk("client/fetchClient", () => {
  const data = clients;
  return data;
});

export type ThunkDispatch = typeof fetchClient;

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchClient.pending, state => {
      state.common.loading = true;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.common.loading = false;
      state.common.success = true;
      state.common.contents = action.payload as never;
    });
    builder.addCase(fetchClient.rejected, (state, action) => {
      state.common.loading = false;
      state.common.error = action.error.message as string;
    });
  }
});

export default clientSlice.reducer;
