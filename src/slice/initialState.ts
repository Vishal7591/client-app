import { Client } from "../types/client/clientTypes";

export const initialState = {
  common: {
    loading: false,
    error: "",
    success: false,
    contents: [] as Client[]
  }
};
