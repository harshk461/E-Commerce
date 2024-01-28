import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "./feattures/auth.slice";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: {
        auth: authSlice
    },
});
