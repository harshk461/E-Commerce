import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "./feattures/auth.slice";


export const store = configureStore({
    reducer: {
        auth: authSlice
    },
});
