import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { clients, updateData } from "../utils/client/client";
import { Client } from "../utils/client/clientTypes";

export const updateClient = createAsyncThunk(
  "client/updateClient",
  (clientData: Client[]) => {
    updateData(clientData);
    const data = clients;
    return data;
  }
);

export const clientUpdateSlice = createSlice({
  name: "clientUpdate",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateClient.pending, state => {
      state.common.loading = true;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.common.loading = false;
      state.common.success = true;
      state.common.contents = action.payload as never;
    });
    builder.addCase(updateClient.rejected, (state, action) => {
      state.common.loading = false;
      state.common.error = action.error.message as string;
    });
  }
});

export default clientUpdateSlice.reducer;
