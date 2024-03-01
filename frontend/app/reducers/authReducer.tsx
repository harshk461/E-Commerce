import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

interface authState {
    loading: boolean,
    user: Object,
    isAuthenticated: boolean,
    token: string | null,
}

const initialState: authState = {
    loading: false,
    user: {},
    isAuthenticated: false,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
            state.loading = false;
        },
        setUser: (state, action: PayloadAction<Object>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    }
})

export const { setLoading, setIsAuthenticated, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;