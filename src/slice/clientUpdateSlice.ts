import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { Client } from "../types/client/clientTypes";

export const updateClient = createAsyncThunk(
  "client/updateClient",
  (clientData: Client[]) => {
    localStorage.setItem("clients", JSON.stringify(clientData));
    // const data = clients;
    const clientsData = JSON.parse(
      JSON.stringify(localStorage.getItem("clients"))
    );
    return JSON.parse(clientsData);
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
      state.common.contents = action.payload as Client[];
    });
    builder.addCase(updateClient.rejected, (state, action) => {
      state.common.loading = false;
      state.common.error = action.error.message as string;
    });
  }
});

export default clientUpdateSlice.reducer;
