/* eslint-disable global-require */
/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "../slice/clientSlice";
import logger from "redux-logger";
import clientUpdateSlice from "../slice/clientUpdateSlice";

export const store = configureStore({
  reducer: {
    client: clientSlice,
    clientUpdate: clientUpdateSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
